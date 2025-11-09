import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://disasterrecovery.com.au';

  // Future-ready video sitemap
  // When videos are added, populate this array with video metadata
  const videos = [
    // Example structure:
    // {
    //   pageUrl: `${baseUrl}/services/water-damage`,
    //   videoUrl: `${baseUrl}/videos/water-damage-process.mp4`,
    //   thumbnailUrl: `${baseUrl}/images/video-thumbs/water-damage-thumb.jpg`,
    //   title: 'Water Damage Restoration Process - IICRC S500',
    //   description: 'Complete walkthrough of professional water damage restoration following IICRC standards',
    //   duration: 180, // seconds
    //   uploadDate: '2025-01-15T00:00:00Z',
    //   rating: 4.9,
    //   viewCount: 1250,
    //   familyFriendly: 'yes',
    //   requiresSubscription: 'no'
    // }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videos.map(video => `
  <url>
    <loc>${video.pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>
      <video:title>${video.title}</video:title>
      <video:description>${video.description}</video:description>
      <video:content_loc>${video.videoUrl}</video:content_loc>
      <video:duration>${video.duration}</video:duration>
      <video:upload_date>${video.uploadDate}</video:upload_date>
      <video:rating>${video.rating}</video:rating>
      <video:view_count>${video.viewCount}</video:view_count>
      <video:family_friendly>${video.familyFriendly}</video:family_friendly>
      <video:requires_subscription>${video.requiresSubscription}</video:requires_subscription>
    </video:video>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
