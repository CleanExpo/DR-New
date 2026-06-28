/**
 * Tamper-evident signed-ICA PDF generation (DR-887).
 *
 * The body is rendered from the EXACT canonical text (getIcaCanonicalText), so
 * the PDF content matches the displayed text and the stored documentHash. A
 * signature block (signatory, timestamp, IP, version, documentHash) is appended,
 * and the ABN appears in the canonical entity footer. The returned pdfHash is the
 * SHA-256 of the PDF bytes — persisted for tamper-evidence of the stored file.
 */
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { createHash } from 'crypto';
import { getIcaCanonicalText } from './ica';

export interface IcaPdfInput {
  version: string;
  documentHash: string;
  signedName: string;
  acceptedAt: Date;
  ipAddress?: string | null;
}

const PAGE = { width: 612, height: 792 };
const MARGIN = 50;
const USABLE_WIDTH = PAGE.width - MARGIN * 2;
const BODY_SIZE = 9;
const LINE_HEIGHT = 12;

function wrapLine(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (text === '') return [''];
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && font.widthOfTextAtSize(candidate, size) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateIcaPdf(
  input: IcaPdfInput
): Promise<{ bytes: Buffer; pdfHash: string }> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const color = rgb(0.1, 0.1, 0.12);

  let page: PDFPage = pdfDoc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;

  const ensureSpace = (needed: number) => {
    if (y - needed < MARGIN) {
      page = pdfDoc.addPage([PAGE.width, PAGE.height]);
      y = PAGE.height - MARGIN;
    }
  };

  const drawText = (text: string, f: PDFFont, size: number) => {
    for (const wrapped of wrapLine(text, f, size, USABLE_WIDTH)) {
      ensureSpace(LINE_HEIGHT);
      page.drawText(wrapped, { x: MARGIN, y, size, font: f, color });
      y -= LINE_HEIGHT;
    }
  };

  // Body: the exact canonical text, line by line.
  for (const line of getIcaCanonicalText().split('\n')) {
    drawText(line, font, BODY_SIZE);
  }

  // Signature block.
  y -= LINE_HEIGHT;
  ensureSpace(LINE_HEIGHT * 7);
  drawText('—'.repeat(40), font, BODY_SIZE);
  drawText('EXECUTION', fontBold, 11);
  drawText(`Signed by: ${input.signedName}`, font, BODY_SIZE);
  drawText(`Accepted at: ${input.acceptedAt.toISOString()}`, font, BODY_SIZE);
  drawText(`IP address: ${input.ipAddress ?? 'unknown'}`, font, BODY_SIZE);
  drawText(`Agreement version: ${input.version}`, font, BODY_SIZE);
  drawText(`Document SHA-256: ${input.documentHash}`, font, BODY_SIZE);

  const bytes = Buffer.from(await pdfDoc.save());
  const pdfHash = createHash('sha256').update(bytes).digest('hex');
  return { bytes, pdfHash };
}
