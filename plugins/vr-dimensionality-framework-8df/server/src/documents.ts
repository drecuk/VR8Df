import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  PageBreak,
  PageOrientation,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { PNG } from "pngjs";

import type { SceneDetail, StoryboardPanel } from "./visuals.js";

export type DimensionDecision = {
  dimension: string;
  coreDesignChoice: string;
  servesValueBy: string;
  informationFlow: string;
  modulation: string;
  effectsSpectrum: string;
};

export type TimelineItem = {
  phase: string;
  timing: string;
  activities: string;
  assumptions: string;
};

export type VredItem = { category: string; description: string };
export type StoryMapItem = { epic: string; userStory: string; acceptanceCriteria: string };
export type ConversationEntry = { speaker: "user" | "assistant" | "note"; label?: string; contentMarkdown: string };

export type Dm8DocumentInput = {
  projectTitle: string;
  preparedBy?: string;
  preparedFor?: string;
  documentDate?: string;
  experienceGoalsStatement: string;
  coreConcept: string;
  finalStatement: string;
  projectTimeline: TimelineItem[];
  dimensions: DimensionDecision[];
  vredDocument: VredItem[];
  storyMap: StoryMapItem[];
  sceneDetails: SceneDetail[];
  storyboardPanels: StoryboardPanel[];
  assumptions: string[];
  tradeoffs: string[];
  conversationEntries: ConversationEntry[];
};

const NAVY = "0C2938";
const NAVY_2 = "143D4E";
const CYAN = "35B7CD";
const PALE = "EDF3F5";
const PALE_2 = "F7FAFB";
const BORDER = "D9D9D9";
const BLACK = "000000";
const WHITE = "FFFFFF";

const borders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  left: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  right: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
};

function cleanMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, "[Code omitted from design record]")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[-*]\s+/gm, "• ")
    .trim();
}

function text(value: string, options: { bold?: boolean; color?: string; size?: number; italics?: boolean } = {}) {
  return new TextRun({
    text: value,
    bold: options.bold,
    italics: options.italics,
    color: options.color ?? BLACK,
    size: options.size ?? 22,
    font: "Aptos",
  });
}

function paragraph(value: string, options: { boldLead?: string; alignment?: (typeof AlignmentType)[keyof typeof AlignmentType]; spacingAfter?: number } = {}) {
  const children: TextRun[] = [];
  if (options.boldLead) children.push(text(options.boldLead, { bold: true }));
  children.push(text(value));
  return new Paragraph({
    children,
    alignment: options.alignment,
    spacing: { after: options.spacingAfter ?? 160, line: 300 },
  });
}

function heading(value: string, level: 1 | 2) {
  return new Paragraph({
    text: value,
    heading: level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
    spacing: { before: level === 1 ? 260 : 180, after: 120 },
  });
}

function bullet(value: string) {
  return new Paragraph({
    children: [text(value)],
    bullet: { level: 0 },
    spacing: { after: 90, line: 280 },
  });
}

function tableCell(value: string, header: boolean, shade: boolean, widthPercent?: number) {
  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 110, bottom: 110, left: 130, right: 130 },
    shading: {
      type: ShadingType.CLEAR,
      color: "auto",
      fill: header ? NAVY : shade ? PALE_2 : WHITE,
    },
    children: [
      new Paragraph({
        children: [text(value, { bold: header, color: header ? WHITE : BLACK, size: header ? 20 : 19 })],
        spacing: { after: 0, line: 270 },
      }),
    ],
  });
}

function dataTable(headers: string[], rows: string[][], widths?: number[]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders,
    rows: [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: headers.map((header, index) => tableCell(header, true, false, widths?.[index])),
      }),
      ...rows.map(
        (row, rowIndex) =>
          new TableRow({
            cantSplit: true,
            children: row.map((value, index) => tableCell(value, false, rowIndex % 2 === 1, widths?.[index])),
          }),
      ),
    ],
  });
}

function figure(title: string, image: Buffer, maxWidth: number, caption: string) {
  const dimensions = PNG.sync.read(image);
  const scale = Math.min(maxWidth / dimensions.width, 820 / dimensions.height);
  const width = Math.max(1, Math.round(dimensions.width * scale));
  const height = Math.max(1, Math.round(dimensions.height * scale));
  return [
    heading(title, 2),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new ImageRun({ data: image, type: "png", transformation: { width, height } })],
      spacing: { after: 90 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [text(caption, { italics: true, color: "4E636D", size: 18 })],
      spacing: { after: 180 },
    }),
  ];
}

function metadataTable(input: Dm8DocumentInput) {
  const rows = [
    ["Prepared by", input.preparedBy || "Not specified"],
    ["Prepared for", input.preparedFor || "Not specified"],
    ["Document date", input.documentDate || new Date().toISOString().slice(0, 10)],
    ["Framework", "VR Dimensionality Framework 8Df"],
  ];
  return dataTable(["Document detail", "Value"], rows, [28, 72]);
}

function cover(input: Dm8DocumentInput, documentKind: string, logo?: Buffer) {
  const blocks: Array<Paragraph | Table> = [];
  if (logo) {
    blocks.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new ImageRun({ data: logo, type: "png", transformation: { width: 110, height: 110 } })],
        spacing: { after: 260 },
      }),
    );
  }
  blocks.push(
    new Paragraph({
      style: "Title",
      alignment: AlignmentType.CENTER,
      children: [text(input.projectTitle, { bold: true, size: 42 })],
      spacing: { after: 160 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [text(documentKind, { bold: true, color: NAVY_2, size: 28 })],
      spacing: { after: 300 },
    }),
    paragraph(
      "This document records the approved DM-8 design and translates the eight-dimensional decisions into an implementation-ready specification. It preserves the value goal, scene logic, information flow, trade-offs, and visual sequence needed by a VR production team.",
    ),
    metadataTable(input),
    new Paragraph({ children: [new PageBreak()] }),
  );
  return blocks;
}

function coreSections(input: Dm8DocumentInput, layoutMap: Buffer, storyboard: Buffer, storyboardPages: Buffer[]) {
  const children: Array<Paragraph | Table> = [];
  children.push(
    heading("Experience Goals Statement", 1),
    paragraph(input.experienceGoalsStatement),
    heading("Core Concept", 1),
    paragraph(input.coreConcept),
    heading("Project Timeline", 1),
    dataTable(
      ["Phase", "Timing", "Activities", "Assumptions"],
      input.projectTimeline.map((item) => [item.phase, item.timing, item.activities, item.assumptions]),
      [16, 14, 42, 28],
    ),
    heading("Dimension Value Alignment", 1),
    dataTable(
      ["Dimension", "Core design choice", "Serves value by", "Information flow"],
      input.dimensions.map((item) => [item.dimension, item.coreDesignChoice, item.servesValueBy, item.informationFlow]),
      [15, 29, 27, 29],
    ),
    heading("Dimension Modulation and Effects Spectrum", 1),
    dataTable(
      ["Dimension", "Modulation", "Effects spectrum"],
      input.dimensions.map((item) => [item.dimension, item.modulation, item.effectsSpectrum]),
      [16, 42, 42],
    ),
    heading("VR Experience Design Document", 1),
    dataTable(
      ["Category", "Description"],
      input.vredDocument.map((item) => [item.category, item.description]),
      [25, 75],
    ),
    heading("Story Mapping", 1),
    dataTable(
      ["Epic", "User story", "Acceptance criteria"],
      input.storyMap.map((item) => [item.epic, item.userStory, item.acceptanceCriteria]),
      [24, 38, 38],
    ),
    heading("Final Statement", 1),
    paragraph(input.finalStatement),
    heading("Scene Details", 1),
    dataTable(
      ["Scene", "Title", "Detailed description", "Transition and interaction"],
      input.sceneDetails.map((scene) => [
        scene.sceneNumber,
        scene.title,
        scene.detailedDescription,
        [scene.transition, scene.interaction, scene.scaleCue].filter(Boolean).join("; "),
      ]),
      [10, 20, 47, 23],
    ),
    heading("Visual Deliverables", 1),
    ...figure(
      "Visual Layout Map",
      layoutMap,
      650,
      "Scene order, player flow, transitions, and interaction nodes derived from the approved scene details.",
    ),
    ...(storyboardPages.length <= 1
      ? figure(
          "Comic Storyboard",
          storyboard,
          650,
          "Chronological storyboard panels showing composition, player action, sensory cues, and intended emotion.",
        )
      : storyboardPages.flatMap((page, index) =>
          figure(
            `Comic Storyboard Page ${index + 1}`,
            page,
            650,
            `Storyboard page ${index + 1} of ${storyboardPages.length}. The complete storyboard is also supplied as a standalone PNG.`,
          ),
        )),
    heading("Assumptions and Tradeoffs", 1),
    heading("Assumptions", 2),
    ...(input.assumptions.length ? input.assumptions.map(bullet) : [paragraph("No additional assumptions were supplied.")]),
    heading("Tradeoffs", 2),
    ...(input.tradeoffs.length ? input.tradeoffs.map(bullet) : [paragraph("No additional trade-offs were supplied.")]),
    new Paragraph({ children: [new PageBreak()] }),
    heading("Artifact Index", 1),
    dataTable(
      ["Artifact", "Purpose"],
      [
        ["Word Specification", "Concise implementation-ready DM-8 specification"],
        ["Design Dossier", "Visible conversation record plus the complete approved design"],
        ["Visual Layout Map", "Spatial sequence, player movement, transitions, and interaction nodes"],
        ["Comic Storyboard", "Chronological visual communication of experience beats"],
      ],
      [34, 66],
    ),
  );
  return children;
}

function documentOptions(title: string, children: Array<Paragraph | Table>) {
  return new Document({
    creator: "VR Dimensionality Framework 8Df",
    title,
    description: "Approved DM-8 virtual reality design documentation",
    styles: {
      default: {
        document: {
          run: { font: "Aptos", size: 22, color: BLACK },
          paragraph: { spacing: { after: 160, line: 300 } },
        },
      },
      paragraphStyles: [
        {
          id: "Title",
          name: "Title",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Aptos Display", size: 42, bold: true, color: BLACK },
          paragraph: { spacing: { before: 0, after: 160 }, alignment: AlignmentType.CENTER },
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Aptos Display", size: 30, bold: true, color: BLACK },
          paragraph: { spacing: { before: 260, after: 120 }, keepNext: true },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Aptos Display", size: 24, bold: true, color: BLACK },
          paragraph: { spacing: { before: 180, after: 100 }, keepNext: true },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
            margin: { top: 900, right: 900, bottom: 900, left: 900 },
          },
        },
        children,
      },
    ],
  });
}

export async function createSpecification(input: Dm8DocumentInput, layoutMap: Buffer, storyboard: Buffer, storyboardPages: Buffer[], logo?: Buffer) {
  const children = [...cover(input, "VR Experience Word Specification", logo), ...coreSections(input, layoutMap, storyboard, storyboardPages)];
  return Packer.toBuffer(documentOptions(`${input.projectTitle} Word Specification`, children));
}

export async function createDossier(input: Dm8DocumentInput, layoutMap: Buffer, storyboard: Buffer, storyboardPages: Buffer[], logo?: Buffer) {
  const transcript: Array<Paragraph | Table> = [
    heading("Design Conversation Record", 1),
    paragraph("This record contains only visible design conversation supplied for the dossier. Hidden instructions, private reasoning, authentication data, and tool traces are excluded."),
  ];
  if (input.conversationEntries.length === 0) {
    transcript.push(paragraph("No visible conversation entries were supplied."));
  } else {
    input.conversationEntries.forEach((entry, index) => {
      const speaker = entry.label?.trim() || (entry.speaker === "user" ? "User" : entry.speaker === "assistant" ? "Design Assistant" : "Design Note");
      transcript.push(heading(`${index + 1} ${speaker}`, 2), paragraph(cleanMarkdown(entry.contentMarkdown)));
    });
  }
  transcript.push(new Paragraph({ children: [new PageBreak()] }), heading("Approved DM-8 Design Specification", 1));
  const children = [
    ...cover(input, "VR Experience Design Dossier", logo),
    ...transcript,
    ...coreSections(input, layoutMap, storyboard, storyboardPages),
  ];
  return Packer.toBuffer(documentOptions(`${input.projectTitle} Design Dossier`, children));
}
