/**
 * NRPG Proposal PDF Generator
 *
 * Generates professional job scope proposal PDFs with embedded scope diagrams,
 * equipment lists, timelines, and NRPG branding.
 */

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { ScopeDiagram } from './scope-generator';

// Extend jsPDF type for autotable plugin
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage Restoration',
  fire: 'Fire & Smoke Remediation',
  mould: 'Mould Remediation',
  storm: 'Storm Damage Restoration',
  asbestos: 'Asbestos Removal',
};

interface ProposalData {
  jobNumber: string;
  jobType: string;
  propertyAddress: string;
  clientName?: string;
  scheduledDate?: string;
  notes?: string;
}

export async function generateProposalPDF(
  proposal: ProposalData,
  diagram: ScopeDiagram,
  diagramImageDataUrl?: string,
): Promise<Blob> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ===== HEADER =====
  // Teal header bar
  doc.setFillColor(13, 148, 136);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('NATIONAL RESTORATION PROFESSIONALS GROUP', margin, 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Job Scope Proposal & Equipment Plan', margin, 23);
  doc.text(`Ref: ${proposal.jobNumber}`, pageWidth - margin, 15, { align: 'right' });
  doc.text(new Date().toLocaleDateString('en-AU'), pageWidth - margin, 23, { align: 'right' });

  y = 45;

  // ===== JOB DETAILS =====
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Job Details', margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  const details: [string, string][] = [
    ['Job Number', proposal.jobNumber],
    ['Service Type', JOB_TYPE_LABELS[proposal.jobType] || proposal.jobType],
    ['Property', proposal.propertyAddress],
    ['Total Area', `${diagram.totalArea} m\u00B2`],
    ['Estimated Duration', diagram.estimatedDuration],
    ['Rooms Affected', `${diagram.rooms.length}`],
  ];
  if (proposal.clientName) {
    details.push(['Client', proposal.clientName]);
  }
  if (proposal.scheduledDate) {
    details.push(['Scheduled', proposal.scheduledDate]);
  }

  for (const [label, value] of details) {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 40, y);
    y += 5;
  }
  y += 5;

  // ===== SCOPE DIAGRAM IMAGE =====
  if (diagramImageDataUrl) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Scope Diagram', margin, y);
    y += 5;

    const imgWidth = contentWidth;
    const imgHeight = imgWidth * 0.6;
    doc.addImage(diagramImageDataUrl, 'PNG', margin, y, imgWidth, imgHeight);
    y += imgHeight + 8;
  }

  // ===== EQUIPMENT LIST =====
  if (y > 230) {
    doc.addPage();
    y = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 51, 51);
  doc.text('Equipment Requirements', margin, y);
  y += 3;

  const eqRows = diagram.equipmentSummary.map((eq) => [eq.item, eq.quantity.toString()]);

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Equipment', 'Quantity']],
    body: eqRows,
    theme: 'grid',
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 51, 51],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ===== TIMELINE =====
  if (y > 230) {
    doc.addPage();
    y = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Timeline', margin, y);
  y += 3;

  const timelineRows = diagram.timeline.map((phase) => [
    phase.label,
    `Day ${phase.days}`,
    phase.activities.join('; '),
  ]);

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Phase', 'Days', 'Activities']],
    body: timelineRows,
    theme: 'grid',
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [51, 51, 51],
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 'auto' },
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ===== ROOM BREAKDOWN =====
  if (y > 230) {
    doc.addPage();
    y = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Room Breakdown', margin, y);
  y += 3;

  const roomRows = diagram.rooms.map((rd) => [
    rd.room.name,
    `${rd.room.width}m x ${rd.room.length}m`,
    `${rd.room.width * rd.room.length} m\u00B2`,
    rd.room.severity,
    rd.elements.filter((e) => e.type === 'equipment').length.toString(),
  ]);

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Room', 'Dimensions', 'Area', 'Severity', 'Equipment']],
    body: roomRows,
    theme: 'grid',
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 51, 51],
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ===== COST ESTIMATE =====
  if (y > 250) {
    doc.addPage();
    y = margin;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Estimated Cost Breakdown', margin, y);
  y += 8;

  // Calculate estimates based on area and job type
  const ratePerSqm: Record<string, number> = {
    water: 55,
    fire: 75,
    mould: 85,
    storm: 50,
    asbestos: 120,
  };
  const rate = ratePerSqm[proposal.jobType] || 60;
  const areaCharge = diagram.totalArea * rate;
  const equipmentCharge = diagram.equipmentSummary.reduce((sum, eq) => sum + eq.quantity * 150, 0);
  const subtotal = Math.max(areaCharge + equipmentCharge, 2750);
  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  const costRows = [
    ['Area treatment', `${diagram.totalArea} m\u00B2 @ $${rate}/m\u00B2`, `$${areaCharge.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`],
    ['Equipment hire', `${diagram.equipmentSummary.reduce((s, e) => s + e.quantity, 0)} units`, `$${equipmentCharge.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`],
    ['', '', ''],
    ['Subtotal (ex GST)', '', `$${subtotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`],
    ['GST (10%)', '', `$${gst.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`],
    ['TOTAL (inc GST)', '', `$${total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`],
  ];

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Item', 'Details', 'Amount']],
    body: costRows,
    theme: 'grid',
    headStyles: {
      fillColor: [13, 148, 136],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 51, 51],
    },
    columnStyles: {
      2: { halign: 'right', fontStyle: 'bold' },
    },
    didParseCell: (data: { row: { index: number }; cell: { styles: { fontStyle: string; fillColor: number[] } } }) => {
      if (data.row.index >= 3) {
        data.cell.styles.fontStyle = 'bold';
        if (data.row.index === 5) {
          data.cell.styles.fillColor = [13, 148, 136];
        }
      }
    },
  });

  y = doc.lastAutoTable.finalY + 8;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  doc.text('* Minimum charge applies: $2,750 (ex GST). Final costs subject to on-site assessment.', margin, y);
  y += 4;

  // ===== NOTES =====
  if (proposal.notes) {
    if (y > 260) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text('Additional Notes', margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const noteLines = doc.splitTextToSize(proposal.notes, contentWidth);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 4 + 5;
  }

  // ===== FOOTER =====
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const footerY = doc.internal.pageSize.getHeight() - 10;

    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(
      'National Restoration Professionals Group | support@disasterrecovery.com.au | ABN: XX XXX XXX XXX',
      margin,
      footerY,
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, footerY, { align: 'right' });
  }

  return doc.output('blob');
}
