'use client';

import { useRef, useCallback } from 'react';
import { Download } from 'lucide-react';
import type { ScopeDiagram, RoomDiagram, DiagramElement } from '@/lib/diagrams/scope-generator';

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage Restoration',
  fire: 'Fire & Smoke Remediation',
  mould: 'Mould Remediation',
  storm: 'Storm Damage Restoration',
  asbestos: 'Asbestos Removal',
};

function EquipmentIcon({ element, scale }: { element: DiagramElement; scale: number }) {
  const size = 6 * scale;
  const cx = element.x * scale;
  const cy = element.y * scale;

  const iconMap: Record<string, string> = {
    'dehumidifier': 'DH',
    'air-mover': 'AM',
    'hepa': 'HF',
    'scrubber': 'AS',
    'negative-air': 'NA',
    'decon': 'DC',
  };

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={size / 2}
        fill={element.colour}
        opacity={0.9}
        stroke="#fff"
        strokeWidth={0.5}
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={size * 0.45}
        fontWeight="bold"
        fontFamily="monospace"
      >
        {iconMap[element.icon || ''] || '?'}
      </text>
      <text
        x={cx}
        y={cy + size / 2 + size * 0.35}
        textAnchor="middle"
        fill="#94A3B8"
        fontSize={size * 0.3}
        fontFamily="sans-serif"
      >
        {element.label}
      </text>
    </g>
  );
}

function MonitorIcon({ element, scale }: { element: DiagramElement; scale: number }) {
  const size = 4.5 * scale;
  const cx = element.x * scale;
  const cy = element.y * scale;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={size / 2}
        fill="none"
        stroke="#FFB800"
        strokeWidth={1}
        strokeDasharray="2 1"
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#FFB800"
        fontSize={size * 0.5}
        fontWeight="bold"
        fontFamily="monospace"
      >
        {element.label}
      </text>
    </g>
  );
}

function ZoneRect({ element, scale }: { element: DiagramElement; scale: number }) {
  const colours: Record<string, { fill: string; stroke: string }> = {
    extraction: { fill: 'rgba(59, 130, 246, 0.12)', stroke: '#3B82F6' },
    contamination: { fill: 'rgba(239, 68, 68, 0.10)', stroke: '#EF4444' },
    containment: { fill: 'rgba(249, 115, 22, 0.08)', stroke: '#F97316' },
    clean: { fill: 'rgba(34, 197, 94, 0.10)', stroke: '#22C55E' },
  };

  const c = colours[element.subtype] || { fill: 'rgba(255,255,255,0.05)', stroke: '#555' };

  return (
    <g>
      <rect
        x={element.x * scale}
        y={element.y * scale}
        width={(element.width || 10) * scale}
        height={(element.height || 10) * scale}
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={1}
        strokeDasharray={element.subtype === 'containment' ? '4 2' : 'none'}
        rx={2}
      />
      <text
        x={(element.x + (element.width || 10) / 2) * scale}
        y={(element.y + 3) * scale}
        textAnchor="middle"
        fill={c.stroke}
        fontSize={3 * scale * 0.35}
        fontFamily="sans-serif"
        opacity={0.8}
      >
        {element.label}
      </text>
    </g>
  );
}

function BarrierRect({ element, scale }: { element: DiagramElement; scale: number }) {
  return (
    <rect
      x={element.x * scale - ((element.width || 4) * scale) / 2}
      y={element.y * scale - ((element.height || 4) * scale) / 2}
      width={(element.width || 4) * scale}
      height={(element.height || 4) * scale}
      fill={element.colour}
      opacity={0.7}
      rx={1}
    />
  );
}

function RoomCard({ roomDiagram, index }: { roomDiagram: RoomDiagram; index: number }) {
  const { room, elements } = roomDiagram;
  const svgSize = 300;
  const scale = svgSize / 100;
  const padding = 8;

  // Sort: zones first, then barriers, then equipment, then monitors
  const sortOrder: Record<string, number> = { zone: 0, barrier: 1, equipment: 2, monitor: 3, label: 4 };
  const sorted = [...elements].sort((a, b) => (sortOrder[a.type] || 5) - (sortOrder[b.type] || 5));

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {/* Room header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-white">{room.name}</h4>
          <p className="text-xs text-gray-500">
            {room.width}m x {room.length}m ({room.width * room.length} m2) | Severity: {room.severity}
          </p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">Room {index + 1}</span>
      </div>

      {/* SVG diagram */}
      <div className="p-4 flex justify-center">
        <svg
          width={svgSize + padding * 2}
          height={svgSize + padding * 2}
          viewBox={`-${padding} -${padding} ${svgSize + padding * 2} ${svgSize + padding * 2}`}
          className="bg-[#0a0a0a] rounded-lg border border-white/5"
        >
          {/* Room outline */}
          <rect
            x={0} y={0}
            width={svgSize} height={svgSize}
            fill="none"
            stroke="#334155"
            strokeWidth={1.5}
            rx={3}
          />

          {/* Grid lines */}
          {Array.from({ length: 9 }, (_, i) => {
            const pos = ((i + 1) * svgSize) / 10;
            return (
              <g key={`grid-${i}`}>
                <line x1={pos} y1={0} x2={pos} y2={svgSize} stroke="#1E293B" strokeWidth={0.5} />
                <line x1={0} y1={pos} x2={svgSize} y2={pos} stroke="#1E293B" strokeWidth={0.5} />
              </g>
            );
          })}

          {/* Room dimension labels */}
          <text x={svgSize / 2} y={-3} textAnchor="middle" fill="#64748B" fontSize={9} fontFamily="monospace">
            {room.width}m
          </text>
          <text x={-3} y={svgSize / 2} textAnchor="middle" fill="#64748B" fontSize={9} fontFamily="monospace"
            transform={`rotate(-90, -3, ${svgSize / 2})`}
          >
            {room.length}m
          </text>

          {/* Render elements */}
          {sorted.map((el) => {
            switch (el.type) {
              case 'zone':
                return <ZoneRect key={el.id} element={el} scale={scale} />;
              case 'equipment':
                return <EquipmentIcon key={el.id} element={el} scale={scale} />;
              case 'monitor':
                return <MonitorIcon key={el.id} element={el} scale={scale} />;
              case 'barrier':
                return <BarrierRect key={el.id} element={el} scale={scale} />;
              default:
                return null;
            }
          })}
        </svg>
      </div>
    </div>
  );
}

interface ScopeDiagramProps {
  diagram: ScopeDiagram;
  jobNumber?: string;
  propertyAddress?: string;
}

export default function ScopeDiagramView({ diagram, jobNumber, propertyAddress }: ScopeDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExportPng = useCallback(async () => {
    if (!containerRef.current) return;

    // Use html2canvas-style approach via canvas + SVG serialisation
    const svgs = containerRef.current.querySelectorAll('svg');
    if (svgs.length === 0) return;

    // For simplicity, export the first room diagram as PNG
    const svg = svgs[0];
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(2, 2);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `scope-diagram-${jobNumber || 'export'}.png`;
        a.click();
        URL.revokeObjectURL(downloadUrl);
      }, 'image/png');

      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [jobNumber]);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            {JOB_TYPE_LABELS[diagram.jobType] || diagram.jobType} — Scope Diagram
          </h3>
          {jobNumber && (
            <p className="text-sm text-gray-400 mt-0.5">
              {jobNumber} {propertyAddress ? `| ${propertyAddress}` : ''}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Total Area: {diagram.totalArea} m2 | Est. Duration: {diagram.estimatedDuration} |{' '}
            {diagram.rooms.length} room{diagram.rooms.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleExportPng}
          className="flex items-center gap-2 px-3 py-2 bg-[#0d9488]/10 border border-[#0d9488]/30 text-[#0d9488] rounded-lg text-sm hover:bg-[#0d9488]/20 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export PNG
        </button>
      </div>

      {/* Room diagrams grid */}
      <div className={`grid gap-6 ${diagram.rooms.length === 1 ? 'grid-cols-1 max-w-lg' : 'grid-cols-1 md:grid-cols-2'}`}>
        {diagram.rooms.map((rd, idx) => (
          <RoomCard key={rd.room.id} roomDiagram={rd} index={idx} />
        ))}
      </div>

      {/* Equipment Summary */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Equipment Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {diagram.equipmentSummary.map((eq) => (
            <div key={eq.item} className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#0d9488]/20 flex items-center justify-center text-[#0d9488] text-xs font-bold">
                {eq.quantity}
              </div>
              <span className="text-sm text-gray-300">{eq.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Project Timeline</h4>
        <div className="flex flex-col sm:flex-row gap-0">
          {diagram.timeline.map((phase, idx) => (
            <div key={phase.label} className="flex-1 relative">
              {/* Connector */}
              {idx < diagram.timeline.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-4 w-full h-0.5 bg-white/10 -z-0" />
              )}
              <div className="relative z-10 px-3 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: phase.colour }}
                  />
                  <span className="text-sm font-medium text-white">{phase.label}</span>
                </div>
                <ul className="space-y-1">
                  {phase.activities.map((act) => (
                    <li key={act} className="text-xs text-gray-400 flex items-start gap-1.5">
                      <span className="text-gray-600 mt-0.5">-</span>
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/30 border border-[#EF4444]" />
          Contamination Zone
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]/30 border border-[#3B82F6]" />
          Extraction Area
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#0d9488]" />
          Equipment
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border border-dashed border-[#FFB800]" />
          Monitor Point
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[#F97316]/50" />
          Containment
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]/30 border border-[#22C55E]" />
          Clean Zone
        </div>
      </div>

      {/* NRPG Branding */}
      <div className="text-centre border-t border-white/10 pt-4">
        <p className="text-xs text-gray-600">
          Generated by NRPG Scope Diagram Engine | National Restoration Professionals Group |{' '}
          {new Date().toLocaleDateString('en-AU')}
        </p>
      </div>
    </div>
  );
}
