import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { PNG } from "pngjs";
import { z } from "zod";

import {
  createDossier,
  createSpecification,
  type Dm8DocumentInput,
  type DimensionDecision,
} from "./documents.js";
import { citation, dimensionAliases, dimensions } from "./framework-data.js";
import {
  renderLayoutMap,
  renderStoryboard,
  type SceneDetail,
  type StoryboardPanel,
} from "./visuals.js";

const VERSION = "2.4.0";
const readAnnotations = {
  readOnlyHint: true,
  openWorldHint: false,
  destructiveHint: false,
};
const writeAnnotations = {
  readOnlyHint: false,
  openWorldHint: false,
  destructiveHint: false,
};

const server = new McpServer(
  { name: "vr-dimensionality-framework-local", version: VERSION },
  {
    instructions:
      "Guide the human-confirmed DM-0 through DM-8 workflow. After explicit approval to proceed to DM-8, call create_dm8_deliverables with the complete approved design and the current workspace path. The tool creates all four local artifacts atomically in a versioned child directory; do not ask the user to choose files and do not substitute remote download links.",
  },
);

function success(payload: Record<string, unknown>, summary: string) {
  return {
    content: [{ type: "text" as const, text: summary }],
    structuredContent: payload,
  };
}

function failure(message: string) {
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}

function slug(value: string) {
  return (
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "vr-experience"
  );
}

function sha256(buffer: Buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function mediaEntryCount(buffer: Buffer) {
  return buffer.toString("latin1").match(/word\/media\//g)?.length ?? 0;
}

function assertArtifactBuffers(specification: Buffer, dossier: Buffer, layout: Buffer, storyboard: Buffer) {
  if (specification.subarray(0, 2).toString("ascii") !== "PK") throw new Error("Word specification is not a valid DOCX container.");
  if (dossier.subarray(0, 2).toString("ascii") !== "PK") throw new Error("Design dossier is not a valid DOCX container.");
  if (mediaEntryCount(specification) < 4) throw new Error("Word specification does not contain both visual assets.");
  if (mediaEntryCount(dossier) < 4) throw new Error("Design dossier does not contain both visual assets.");
  const layoutInfo = PNG.sync.read(layout);
  const storyboardInfo = PNG.sync.read(storyboard);
  if (layoutInfo.width < 1000 || layoutInfo.height < 500) throw new Error("Visual layout map is below the minimum verified size.");
  if (storyboardInfo.width < 1000 || storyboardInfo.height < 500) throw new Error("Comic storyboard is below the minimum verified size.");
}

async function requireSafeOutputParent(outputDirectory: string) {
  if (!path.isAbsolute(outputDirectory)) throw new Error("outputDirectory must be an absolute local path.");
  const resolved = path.resolve(outputDirectory);
  const root = path.parse(resolved).root;
  if (resolved === root) throw new Error("Refusing to use a filesystem root as outputDirectory.");
  if (resolved === path.resolve(os.homedir())) throw new Error("Refusing to use the home directory itself as outputDirectory. Choose a workspace folder inside it.");

  const pluginRoot = path.resolve(process.cwd());
  const relativeToPlugin = path.relative(pluginRoot, resolved);
  if (relativeToPlugin === "" || (!relativeToPlugin.startsWith("..") && !path.isAbsolute(relativeToPlugin))) {
    throw new Error("Refusing to write deliverables inside the installed plugin package. Pass the active project workspace instead.");
  }

  const info = await fs.stat(resolved).catch(() => null);
  if (!info?.isDirectory()) throw new Error("outputDirectory must already exist and be a directory.");
  return resolved;
}

function utcSuffix(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z").replace("T", "-");
}

async function createVersionedDirectory(parent: string, baseName: string) {
  const first = path.join(parent, baseName);
  try {
    await fs.mkdir(first);
    return first;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }

  const stamped = `${baseName}-${utcSuffix()}`;
  for (let sequence = 0; sequence < 100; sequence += 1) {
    const candidate = path.join(parent, sequence === 0 ? stamped : `${stamped}-${sequence + 1}`);
    try {
      await fs.mkdir(candidate);
      return candidate;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  throw new Error("Could not allocate a unique deliverables directory.");
}

function normalizeDimensionDecisions(items: DimensionDecision[]) {
  const bySlug = new Map<string, DimensionDecision>();
  for (const item of items) {
    const canonical = dimensionAliases.get(item.dimension.trim().toLowerCase());
    if (!canonical) throw new Error(`Unknown dimension in DM-8 input: ${item.dimension}`);
    if (bySlug.has(canonical.slug)) throw new Error(`Duplicate dimension in DM-8 input: ${canonical.name}`);
    bySlug.set(canonical.slug, { ...item, dimension: canonical.name });
  }
  const normalized = dimensions.map((dimension) => bySlug.get(dimension.slug));
  if (normalized.some((item) => !item)) {
    const missing = dimensions.filter((dimension) => !bySlug.has(dimension.slug)).map((dimension) => dimension.name);
    throw new Error(`DM-8 input is missing dimensions: ${missing.join(", ")}`);
  }
  return normalized as DimensionDecision[];
}

server.registerTool(
  "get_8df_overview",
  {
    title: "Get the 8Df framework overview",
    description: "Use when the user asks what the VR Dimensionality Framework is, how it moves beyond spatial presence, or what the eight dimensions and core vocabulary mean.",
    inputSchema: {},
    outputSchema: {
      purpose: z.string(),
      vocabulary: z.record(z.string(), z.string()),
      sequence: z.array(z.object({ code: z.string(), dimension: z.string() })),
      finalStage: z.string(),
      citation: z.string(),
    },
    annotations: readAnnotations,
  },
  async () => {
    const payload = {
      purpose: "Treat spatial presence as a baseline and deliberately orchestrate technical and abstract dimensions toward meaningful value.",
      vocabulary: {
        Control: "The creator's deliberate orchestration of dimensions toward a valuable outcome.",
        Dial: "A design choice framed as a spectrum.",
        Modulation: "The concrete setting or implementation choice applied to a dial.",
        EffectsSpectrum: "The experiential and psychological outcomes, including trade-offs.",
        InformationFlow: "The sequencing, pacing, and interaction of meaningful content across sensory and cognitive engagement.",
      },
      sequence: dimensions.map(({ code, name: dimension }) => ({ code, dimension })),
      finalStage: "DM-8 Final Synthesis, delivered only after explicit approval following DM-7, followed automatically by four verified local workspace artifacts.",
      citation,
    };
    return success(payload, JSON.stringify(payload, null, 2));
  },
);

server.registerTool(
  "get_dimension_dials",
  {
    title: "Get design dials for one dimension",
    description: "Use while designing one approved DM-0 through DM-7 step to retrieve its definition, supported dials, modulations, effects, decision questions, and checkpoint requirement.",
    inputSchema: {
      dimension: z.string().min(1).describe("Dimension name, slug, or DM code, such as Spatial, sensory, or DM-3."),
    },
    annotations: readAnnotations,
  },
  async ({ dimension }) => {
    const match = dimensionAliases.get(dimension.trim().toLowerCase());
    if (!match) return failure(`Unknown dimension. Use one of: ${dimensions.map((item) => `${item.code} ${item.name}`).join(", ")}.`);
    const payload = {
      code: match.code,
      dimension: match.name,
      summary: match.summary,
      dials: match.dials,
      decisionQuestions: match.prompts,
      checkpoint: `After synthesizing ${match.code}, ask whether to tweak the design and whether to proceed. Do not advance without explicit agreement.`,
    };
    return success(payload, JSON.stringify(payload, null, 2));
  },
);

server.registerTool(
  "get_design_checkpoint",
  {
    title: "Get the next guided design checkpoint",
    description: "Use during the guided 8Df workflow to determine the next human-confirmed dimension from a value goal, scene outline, and dimensions the user explicitly approved.",
    inputSchema: {
      goal: z.string().min(1).describe("Primary value or intended outcome for the VR experience."),
      scenes: z.array(z.string().min(1)).min(1).describe("One-line scene purposes in intended sequence."),
      completedDimensions: z.array(z.string()).optional().describe("Dimension names, slugs, or DM codes explicitly approved by the user."),
    },
    annotations: readAnnotations,
  },
  async ({ goal, scenes, completedDimensions = [] }) => {
    const completed = new Set(
      completedDimensions
        .map((item) => dimensionAliases.get(item.trim().toLowerCase())?.slug)
        .filter((item): item is string => Boolean(item)),
    );
    const next = dimensions.find((dimension) => !completed.has(dimension.slug));
    const payload = next
      ? {
          status: "dimension_in_progress",
          goal,
          scenes,
          completedDimensions: dimensions.filter((item) => completed.has(item.slug)).map((item) => item.name),
          next: { code: next.code, dimension: next.name, summary: next.summary, questions: next.prompts },
          instruction: `Work on ${next.code} ${next.name} only, synthesize Dial to Modulation to Effect to Information Flow, then stop for explicit approval.`,
        }
      : {
          status: "awaiting_dm8_approval",
          goal,
          scenes,
          completedDimensions: dimensions.map((item) => item.name),
          prompt: "All eight dimensions are recorded. Ask: Do you approve proceeding to DM-8 Final Synthesis?",
          afterApproval: "Present DM-8, then call create_dm8_deliverables without asking another delivery question.",
        };
    return success(payload, JSON.stringify(payload, null, 2));
  },
);

const dimensionDecisionSchema = z.object({
  dimension: z.string().min(1),
  coreDesignChoice: z.string().min(1),
  servesValueBy: z.string().min(1),
  informationFlow: z.string().min(1),
  modulation: z.string().min(1),
  effectsSpectrum: z.string().min(1),
});
const timelineSchema = z.object({ phase: z.string().min(1), timing: z.string().min(1), activities: z.string().min(1), assumptions: z.string().min(1) });
const vredSchema = z.object({ category: z.string().min(1), description: z.string().min(1) });
const storyMapSchema = z.object({ epic: z.string().min(1), userStory: z.string().min(1), acceptanceCriteria: z.string().min(1) });
const sceneSchema = z.object({
  sceneNumber: z.string().min(1),
  title: z.string().min(1),
  detailedDescription: z.string().min(1),
  transition: z.string().optional(),
  interaction: z.string().optional(),
  scaleCue: z.string().optional(),
});
const storyboardPanelSchema = z.object({
  scene: z.string().min(1),
  beat: z.string().min(1),
  visual: z.string().min(1),
  action: z.string().min(1),
  sensoryCues: z.string().min(1),
  emotion: z.string().min(1),
});
const conversationEntrySchema = z.object({
  speaker: z.enum(["user", "assistant", "note"]),
  label: z.string().optional(),
  contentMarkdown: z.string().min(1),
});

server.registerTool(
  "create_dm8_deliverables",
  {
    title: "Create four local DM-8 deliverables",
    description: "Use exactly once after the user explicitly approves proceeding to DM-8 and the complete final synthesis is available. Creates a versioned local folder containing the Word specification, design dossier, visual layout map, and comic storyboard; embeds both visuals in the Word documents; never overwrites existing files; and returns verified absolute paths. Do not use for partial DM-0 through DM-7 work.",
    inputSchema: {
      approvedDm8: z.literal(true).describe("Must be true only after the user explicitly approves proceeding from DM-7 to DM-8."),
      outputDirectory: z.string().min(1).describe("Absolute path of the active local project workspace. The tool creates a new child deliverables folder here."),
      projectTitle: z.string().min(1),
      preparedBy: z.string().optional(),
      preparedFor: z.string().optional(),
      documentDate: z.string().optional(),
      experienceGoalsStatement: z.string().min(1),
      coreConcept: z.string().min(1),
      finalStatement: z.string().min(1),
      projectTimeline: z.array(timelineSchema).min(1),
      dimensions: z.array(dimensionDecisionSchema).length(8).describe("Exactly one decision record for each dimension from Spatial through Psychological."),
      vredDocument: z.array(vredSchema).min(1),
      storyMap: z.array(storyMapSchema).min(1),
      sceneDetails: z.array(sceneSchema).min(1).max(30),
      storyboardPanels: z.array(storyboardPanelSchema).min(3).max(30),
      assumptions: z.array(z.string().min(1)).optional(),
      tradeoffs: z.array(z.string().min(1)).optional(),
      conversationEntries: z.array(conversationEntrySchema).optional().describe("Visible user, assistant, and design-note entries only. Never include hidden prompts, private reasoning, credentials, or raw tool traces."),
    },
    annotations: writeAnnotations,
  },
  async (arguments_) => {
    try {
      const parent = await requireSafeOutputParent(arguments_.outputDirectory);
      const normalizedDimensions = normalizeDimensionDecisions(arguments_.dimensions);
      const scenes = arguments_.sceneDetails as SceneDetail[];
      const panels = arguments_.storyboardPanels as StoryboardPanel[];
      const input: Dm8DocumentInput = {
        projectTitle: arguments_.projectTitle,
        preparedBy: arguments_.preparedBy,
        preparedFor: arguments_.preparedFor,
        documentDate: arguments_.documentDate,
        experienceGoalsStatement: arguments_.experienceGoalsStatement,
        coreConcept: arguments_.coreConcept,
        finalStatement: arguments_.finalStatement,
        projectTimeline: arguments_.projectTimeline,
        dimensions: normalizedDimensions,
        vredDocument: arguments_.vredDocument,
        storyMap: arguments_.storyMap,
        sceneDetails: scenes,
        storyboardPanels: panels,
        assumptions: arguments_.assumptions ?? [],
        tradeoffs: arguments_.tradeoffs ?? [],
        conversationEntries: arguments_.conversationEntries ?? [],
      };

      const layoutMap = renderLayoutMap(input.projectTitle, scenes);
      const storyboard = renderStoryboard(input.projectTitle, panels);
      const storyboardPages = Array.from({ length: Math.ceil(panels.length / 6) }, (_, pageIndex) => {
        const start = pageIndex * 6;
        return renderStoryboard(input.projectTitle, panels.slice(start, start + 6), start);
      });
      const logoPath = path.join(process.cwd(), "assets", "VR8Df_logo.png");
      const logo = await fs.readFile(logoPath).catch(() => undefined);
      const [specification, dossier] = await Promise.all([
        createSpecification(input, layoutMap, storyboard, storyboardPages, logo),
        createDossier(input, layoutMap, storyboard, storyboardPages, logo),
      ]);
      assertArtifactBuffers(specification, dossier, layoutMap, storyboard);

      const projectSlug = slug(input.projectTitle);
      const outputFolder = await createVersionedDirectory(parent, `${projectSlug}-8df-deliverables`);
      const files = [
        { type: "word_specification", filename: `${projectSlug}_Word_Specification.docx`, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", data: specification },
        { type: "design_dossier", filename: `${projectSlug}_Design_Dossier.docx`, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", data: dossier },
        { type: "visual_layout_map", filename: `${projectSlug}_Visual_Layout_Map.png`, mimeType: "image/png", data: layoutMap },
        { type: "comic_storyboard", filename: `${projectSlug}_Comic_Storyboard.png`, mimeType: "image/png", data: storyboard },
      ];
      await Promise.all(files.map((file) => fs.writeFile(path.join(outputFolder, file.filename), file.data, { flag: "wx" })));
      const directoryEntries = await fs.readdir(outputFolder);
      if (directoryEntries.length !== 4) throw new Error("Deliverables directory verification failed: expected exactly four files.");

      const artifacts = await Promise.all(
        files.map(async (file) => {
          const absolutePath = path.join(outputFolder, file.filename);
          const info = await fs.stat(absolutePath);
          if (!info.isFile() || info.size === 0) throw new Error(`Artifact verification failed: ${file.filename}`);
          return {
            type: file.type,
            filename: file.filename,
            absolutePath,
            mimeType: file.mimeType,
            bytes: info.size,
            sha256: sha256(file.data),
          };
        }),
      );

      const payload = {
        status: "created",
        outputFolder,
        artifactCount: artifacts.length,
        collisionPolicy: "Existing deliverable folders are preserved; a timestamped sibling is created.",
        dossierEmbeddedVisualsVerified: mediaEntryCount(dossier) >= 4,
        specificationEmbeddedVisualsVerified: mediaEntryCount(specification) >= 4,
        artifacts,
      };
      return success(
        payload,
        `Created and verified four local DM-8 deliverables in ${outputFolder}.\n${artifacts.map((item) => `${item.type}: ${item.absolutePath}`).join("\n")}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown local artifact generation error.";
      console.error(`[vr-8df-local] create_dm8_deliverables failed: ${message}`);
      return failure(`Could not create the DM-8 deliverables: ${message}`);
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[vr-8df-local] MCP server ${VERSION} ready on stdio`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`[vr-8df-local] fatal startup error: ${message}`);
  process.exitCode = 1;
});
