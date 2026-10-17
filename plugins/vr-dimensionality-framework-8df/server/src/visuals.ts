import { PNG } from "pngjs";

export type SceneDetail = {
  sceneNumber: string;
  title: string;
  detailedDescription: string;
  transition?: string;
  interaction?: string;
  scaleCue?: string;
};

export type StoryboardPanel = {
  scene: string;
  beat: string;
  visual: string;
  action: string;
  sensoryCues: string;
  emotion: string;
};

type Rgb = [number, number, number];

const COLORS = {
  navy: [12, 41, 56] as Rgb,
  navy2: [20, 61, 78] as Rgb,
  cyan: [53, 183, 205] as Rgb,
  teal: [57, 181, 170] as Rgb,
  orange: [244, 132, 54] as Rgb,
  yellow: [247, 190, 44] as Rgb,
  white: [248, 249, 246] as Rgb,
  ink: [23, 34, 42] as Rgb,
  gray: [102, 119, 128] as Rgb,
  pale: [237, 243, 245] as Rgb,
  line: [194, 208, 214] as Rgb,
};

const FONT: Record<string, string[]> = {
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  "?": ["01110", "10001", "00001", "00010", "00100", "00000", "00100"],
  ".": ["00000", "00000", "00000", "00000", "00000", "00110", "00110"],
  ",": ["00000", "00000", "00000", "00000", "00110", "00110", "00100"],
  ":": ["00000", "00110", "00110", "00000", "00110", "00110", "00000"],
  ";": ["00000", "00110", "00110", "00000", "00110", "00110", "00100"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  "=": ["00000", "11111", "00000", "11111", "00000", "00000", "00000"],
  "/": ["00001", "00010", "00100", "01000", "10000", "00000", "00000"],
  "&": ["01100", "10010", "10100", "01000", "10101", "10010", "01101"],
  "(": ["00010", "00100", "01000", "01000", "01000", "00100", "00010"],
  ")": ["01000", "00100", "00010", "00010", "00010", "00100", "01000"],
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
  J: ["00001", "00001", "00001", "00001", "10001", "10001", "01110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
};

function canvas(width: number, height: number, background: Rgb) {
  const png = new PNG({ width, height });
  fillRect(png, 0, 0, width, height, background);
  return png;
}

function pixel(png: PNG, x: number, y: number, color: Rgb) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const index = (png.width * Math.floor(y) + Math.floor(x)) << 2;
  png.data[index] = color[0];
  png.data[index + 1] = color[1];
  png.data[index + 2] = color[2];
  png.data[index + 3] = 255;
}

function fillRect(png: PNG, x: number, y: number, width: number, height: number, color: Rgb) {
  for (let yy = Math.max(0, y); yy < Math.min(png.height, y + height); yy += 1) {
    for (let xx = Math.max(0, x); xx < Math.min(png.width, x + width); xx += 1) pixel(png, xx, yy, color);
  }
}

function strokeRect(png: PNG, x: number, y: number, width: number, height: number, color: Rgb, thickness = 2) {
  fillRect(png, x, y, width, thickness, color);
  fillRect(png, x, y + height - thickness, width, thickness, color);
  fillRect(png, x, y, thickness, height, color);
  fillRect(png, x + width - thickness, y, thickness, height, color);
}

function line(png: PNG, x0: number, y0: number, x1: number, y1: number, color: Rgb, thickness = 2) {
  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  let x = x0;
  let y = y0;
  while (true) {
    fillRect(png, x - Math.floor(thickness / 2), y - Math.floor(thickness / 2), thickness, thickness, color);
    if (x === x1 && y === y1) break;
    const e2 = 2 * error;
    if (e2 >= dy) { error += dy; x += sx; }
    if (e2 <= dx) { error += dx; y += sy; }
  }
}

function circle(png: PNG, cx: number, cy: number, radius: number, color: Rgb) {
  for (let y = -radius; y <= radius; y += 1) {
    const width = Math.floor(Math.sqrt(radius * radius - y * y));
    fillRect(png, cx - width, cy + y, width * 2 + 1, 1, color);
  }
}

function ascii(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "?").toUpperCase();
}

function drawText(png: PNG, value: string, x: number, y: number, scale: number, color: Rgb) {
  let cursor = x;
  for (const character of ascii(value)) {
    const glyph = FONT[character] ?? FONT["?"];
    for (let row = 0; row < glyph.length; row += 1) {
      for (let col = 0; col < glyph[row].length; col += 1) {
        if (glyph[row][col] === "1") fillRect(png, cursor + col * scale, y + row * scale, scale, scale, color);
      }
    }
    cursor += 6 * scale;
  }
}

function wrap(value: string, maxCharacters: number, maxLines: number) {
  const words = ascii(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters) current = candidate;
    else {
      if (current) lines.push(current);
      current = word.length > maxCharacters ? `${word.slice(0, maxCharacters - 3)}...` : word;
    }
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && current) lines.push(current);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, Math.max(0, maxCharacters - 3))}...`;
  }
  return lines;
}

function drawWrappedText(png: PNG, value: string, x: number, y: number, maxCharacters: number, maxLines: number, scale: number, color: Rgb) {
  const lines = wrap(value, maxCharacters, maxLines);
  const lineHeight = scale * 9;
  lines.forEach((text, index) => drawText(png, text, x, y + index * lineHeight, scale, color));
  return lines.length * lineHeight;
}

function arrow(png: PNG, x0: number, y0: number, x1: number, y1: number, color: Rgb) {
  line(png, x0, y0, x1, y1, color, 4);
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const size = 18;
  line(png, x1, y1, Math.round(x1 - size * Math.cos(angle - Math.PI / 6)), Math.round(y1 - size * Math.sin(angle - Math.PI / 6)), color, 4);
  line(png, x1, y1, Math.round(x1 - size * Math.cos(angle + Math.PI / 6)), Math.round(y1 - size * Math.sin(angle + Math.PI / 6)), color, 4);
}

export function renderLayoutMap(projectTitle: string, scenes: SceneDetail[]) {
  const columns = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(scenes.length))));
  const rows = Math.ceil(scenes.length / columns);
  const width = 1800;
  const top = 170;
  const panelWidth = Math.floor((width - 160 - (columns - 1) * 44) / columns);
  const panelHeight = 190;
  const height = top + rows * 245 + 170;
  const png = canvas(width, height, COLORS.navy);
  drawText(png, "VISUAL LAYOUT MAP", 70, 45, 5, COLORS.white);
  drawWrappedText(png, projectTitle, 72, 96, 72, 2, 3, COLORS.cyan);

  const positions = scenes.map((_, index) => {
    const row = Math.floor(index / columns);
    const within = index % columns;
    const col = row % 2 === 0 ? within : columns - 1 - within;
    return {
      x: 80 + col * (panelWidth + 44),
      y: top + row * 245,
    };
  });

  for (let index = 0; index < positions.length - 1; index += 1) {
    const from = positions[index];
    const to = positions[index + 1];
    arrow(png, from.x + panelWidth / 2, from.y + panelHeight / 2, to.x + panelWidth / 2, to.y + panelHeight / 2, COLORS.yellow);
  }

  const accents = [COLORS.cyan, COLORS.orange, COLORS.teal, COLORS.yellow];
  scenes.forEach((scene, index) => {
    const { x, y } = positions[index];
    fillRect(png, x, y, panelWidth, panelHeight, COLORS.white);
    strokeRect(png, x, y, panelWidth, panelHeight, accents[index % accents.length], 5);
    fillRect(png, x, y, panelWidth, 40, accents[index % accents.length]);
    circle(png, x + 28, y + 20, 14, COLORS.navy);
    drawText(png, String(index + 1), x + 19, y + 11, 2, COLORS.white);
    drawWrappedText(png, scene.title || `Scene ${scene.sceneNumber}`, x + 55, y + 10, Math.floor((panelWidth - 70) / 12), 1, 2, COLORS.navy);
    drawWrappedText(png, scene.detailedDescription, x + 18, y + 58, Math.floor((panelWidth - 36) / 12), 4, 2, COLORS.ink);
    drawText(png, "MOVE", x + 18, y + 146, 2, COLORS.gray);
    drawWrappedText(png, scene.transition || "SEQUENTIAL TRANSITION", x + 82, y + 146, Math.floor((panelWidth - 100) / 12), 2, 2, COLORS.navy2);
    drawText(png, "ACT", x + 18, y + 169, 2, COLORS.gray);
    drawWrappedText(png, scene.interaction || "SCENE INTERACTION", x + 82, y + 169, Math.floor((panelWidth - 100) / 12), 1, 2, COLORS.navy2);
  });

  const legendY = height - 105;
  drawText(png, "LEGEND", 72, legendY, 3, COLORS.white);
  drawText(png, "NUMBERED ZONES = SCENE ORDER", 250, legendY, 2, COLORS.pale);
  arrow(png, 790, legendY + 8, 865, legendY + 8, COLORS.yellow);
  drawText(png, "ARROW = PLAYER FLOW OR TRANSITION", 900, legendY, 2, COLORS.pale);
  drawText(png, "MOVE = TRANSITION CUE   ACT = INTERACTION NODE", 250, legendY + 38, 2, COLORS.pale);
  return PNG.sync.write(png);
}

function emotionColor(value: string, index: number): Rgb {
  const normalized = value.toLowerCase();
  if (/fear|tense|urgent|anx|danger/.test(normalized)) return COLORS.orange;
  if (/joy|hope|calm|safe|wonder/.test(normalized)) return COLORS.teal;
  return [COLORS.cyan, COLORS.yellow, COLORS.orange, COLORS.teal][index % 4];
}

function drawPanelIllustration(png: PNG, x: number, y: number, width: number, height: number, accent: Rgb, index: number) {
  fillRect(png, x, y, width, height, COLORS.navy2);
  fillRect(png, x, y + Math.floor(height * 0.64), width, Math.ceil(height * 0.36), COLORS.navy);
  const horizon = y + Math.floor(height * 0.64);
  line(png, x + 20, horizon, x + width - 20, horizon, COLORS.cyan, 3);
  circle(png, x + Math.floor(width * 0.25), y + Math.floor(height * 0.43), 24, accent);
  fillRect(png, x + Math.floor(width * 0.25) - 14, y + Math.floor(height * 0.43) + 20, 28, 70, COLORS.white);
  const objectX = x + Math.floor(width * (0.62 + (index % 3) * 0.06));
  fillRect(png, objectX, y + 45, 90, 100, accent);
  strokeRect(png, objectX, y + 45, 90, 100, COLORS.white, 3);
  arrow(png, x + Math.floor(width * 0.32), y + Math.floor(height * 0.55), objectX - 15, y + 95, COLORS.yellow);
}

export function renderStoryboard(projectTitle: string, panels: StoryboardPanel[], startNumber = 0) {
  const columns = 3;
  const rows = Math.ceil(panels.length / columns);
  const width = 1800;
  const top = 180;
  const panelWidth = 530;
  const panelHeight = 470;
  const gap = 45;
  const height = top + rows * (panelHeight + gap) + 100;
  const png = canvas(width, height, COLORS.pale);
  drawText(png, "COMIC STORYBOARD", 70, 44, 5, COLORS.navy);
  drawWrappedText(png, projectTitle, 72, 98, 76, 2, 3, COLORS.navy2);

  panels.forEach((panel, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = 62 + col * (panelWidth + gap);
    const y = top + row * (panelHeight + gap);
    const accent = emotionColor(panel.emotion, index);
    fillRect(png, x, y, panelWidth, panelHeight, COLORS.white);
    strokeRect(png, x, y, panelWidth, panelHeight, COLORS.line, 4);
    fillRect(png, x, y, panelWidth, 44, accent);
    circle(png, x + 27, y + 22, 15, COLORS.navy);
    drawText(png, String(startNumber + index + 1), x + 18, y + 13, 2, COLORS.white);
    drawWrappedText(png, `${panel.scene} ${panel.beat}`, x + 58, y + 12, 36, 1, 2, COLORS.navy);
    drawPanelIllustration(png, x + 16, y + 58, panelWidth - 32, 190, accent, index);
    drawText(png, "VISUAL", x + 18, y + 269, 2, COLORS.gray);
    drawWrappedText(png, panel.visual, x + 108, y + 269, 33, 3, 2, COLORS.ink);
    drawText(png, "ACTION", x + 18, y + 335, 2, COLORS.gray);
    drawWrappedText(png, panel.action, x + 108, y + 335, 33, 2, 2, COLORS.ink);
    drawText(png, "SENSE", x + 18, y + 382, 2, COLORS.gray);
    drawWrappedText(png, panel.sensoryCues, x + 108, y + 382, 33, 2, 2, COLORS.ink);
    drawText(png, "EMOTION", x + 18, y + 430, 2, COLORS.gray);
    drawWrappedText(png, panel.emotion, x + 108, y + 430, 33, 1, 2, accent);
  });

  return PNG.sync.write(png);
}
