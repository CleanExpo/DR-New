'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  downloadUrl: string;
  resourceId: string;
  downloadFormat?: string;
}

export function DownloadButton({ downloadUrl, resourceId, downloadFormat }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      await fetch('/api/resources/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to track download:', error);
    }
    window.location.href = downloadUrl;
  };

  return (
    <Button className="w-full gap-2" size="lg" onClick={handleDownload}>
      <Download className="h-4 w-4" />
      Download {downloadFormat?.toUpperCase()}
    </Button>
  );
}
