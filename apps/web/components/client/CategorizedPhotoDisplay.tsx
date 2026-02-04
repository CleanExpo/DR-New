'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Image as ImageIcon,
  X,
  ZoomIn,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { DAMAGE_TYPES, ROOM_LOCATIONS, type DamageType, type RoomLocation } from './DamageAssessmentUpload';

interface CategorizedPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  damageType: DamageType | string;
  roomLocation: RoomLocation | string;
  caption: string;
  capturedAt?: string;
  filename: string;
}

interface CategorizedPhotoDisplayProps {
  photos: CategorizedPhoto[];
  className?: string;
}

export function CategorizedPhotoDisplay({ photos, className = '' }: CategorizedPhotoDisplayProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<CategorizedPhoto | null>(null);
  const [damageTypeFilter, setDamageTypeFilter] = useState<string>('all');
  const [roomLocationFilter, setRoomLocationFilter] = useState<string>('all');
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set());

  if (photos.length === 0) {
    return (
      <Card className={`bg-portal-card rounded-xl border border-portal-border ${className}`}>
        <CardContent className="p-12 text-center">
          <ImageIcon className="h-16 w-16 text-portal-muted mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">No photos available</p>
          <p className="text-sm text-portal-muted">Photos from the damage assessment will appear here</p>
        </CardContent>
      </Card>
    );
  }

  // Filter photos
  const filteredPhotos = photos.filter((photo) => {
    const damageTypeMatch = damageTypeFilter === 'all' || photo.damageType === damageTypeFilter;
    const roomLocationMatch = roomLocationFilter === 'all' || photo.roomLocation === roomLocationFilter;
    return damageTypeMatch && roomLocationMatch;
  });

  // Group photos by damage type
  const photosByDamageType = filteredPhotos.reduce((acc, photo) => {
    const type = photo.damageType || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(photo);
    return acc;
  }, {} as Record<string, CategorizedPhoto[]>);

  // Group photos by room location
  const photosByRoom = filteredPhotos.reduce((acc, photo) => {
    const room = photo.roomLocation || 'Other';
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(photo);
    return acc;
  }, {} as Record<string, CategorizedPhoto[]>);

  // Get unique damage types and room locations from photos
  const uniqueDamageTypes = [...new Set(photos.map((p) => p.damageType))];
  const uniqueRoomLocations = [...new Set(photos.map((p) => p.roomLocation))];

  // Toggle room expansion
  const toggleRoom = (room: string) => {
    const newExpanded = new Set(expandedRooms);
    if (newExpanded.has(room)) {
      newExpanded.delete(room);
    } else {
      newExpanded.add(room);
    }
    setExpandedRooms(newExpanded);
  };

  // Reset filters
  const resetFilters = () => {
    setDamageTypeFilter('all');
    setRoomLocationFilter('all');
  };

  return (
    <>
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardHeader className="pb-3 border-b border-portal-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Damage Photos</CardTitle>
              <p className="text-sm text-portal-muted mt-1">
                {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
                {filteredPhotos.length !== photos.length && ` (${photos.length} total)`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'grouped' : 'grid')}
                className="border border-portal-border"
              >
                {viewMode === 'grid' ? (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    Grouped View
                  </>
                ) : (
                  <>
                    <Grid3x3 className="h-4 w-4 mr-2" />
                    Grid View
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-portal-muted" />
              <span className="text-sm font-medium text-gray-900">Filter by:</span>

              {/* Damage Type Filter */}
              <select
                value={damageTypeFilter}
                onChange={(e) => setDamageTypeFilter(e.target.value)}
                className="px-3 py-1.5 text-sm border border-portal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-semantic-contractor"
              >
                <option value="all">All Damage Types</option>
                {uniqueDamageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Room Location Filter */}
              <select
                value={roomLocationFilter}
                onChange={(e) => setRoomLocationFilter(e.target.value)}
                className="px-3 py-1.5 text-sm border border-portal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-semantic-contractor"
              >
                <option value="all">All Rooms</option>
                {uniqueRoomLocations.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>

              {/* Reset Filters */}
              {(damageTypeFilter !== 'all' || roomLocationFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-semantic-contractor hover:text-semantic-contractor/80"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Photo Display */}
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer border border-portal-border rounded-lg overflow-hidden hover:border-semantic-contractor/50 transition-colors"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.caption || 'Damage photo'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="space-y-1">
                      <Badge className="bg-semantic-contractor text-white text-xs">
                        {photo.damageType}
                      </Badge>
                      <p className="text-white text-xs">{photo.roomLocation}</p>
                      {photo.caption && (
                        <p className="text-white text-xs opacity-80 truncate">{photo.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Grouped View */
            <Tabs defaultValue="damage-type" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="damage-type">By Damage Type</TabsTrigger>
                <TabsTrigger value="room">By Room</TabsTrigger>
              </TabsList>

              <TabsContent value="damage-type" className="space-y-4">
                {Object.entries(photosByDamageType).map(([damageType, typePhotos]) => (
                  <div key={damageType} className="border border-portal-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRoom(damageType)}
                      className="w-full px-4 py-3 bg-portal-hover hover:bg-portal-card transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {expandedRooms.has(damageType) ? (
                          <ChevronDown className="h-4 w-4 text-portal-muted" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-portal-muted" />
                        )}
                        <span className="font-semibold text-gray-900">{damageType}</span>
                        <Badge variant="outline" className="border-portal-border">
                          {typePhotos.length} photo{typePhotos.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </button>
                    {expandedRooms.has(damageType) && (
                      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {typePhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative group cursor-pointer border border-portal-border rounded-lg overflow-hidden hover:border-semantic-contractor/50 transition-colors"
                            onClick={() => setSelectedPhoto(photo)}
                          >
                            <img
                              src={photo.thumbnailUrl || photo.url}
                              alt={photo.caption || 'Damage photo'}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                              <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                              <p className="text-white text-xs">{photo.roomLocation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="room" className="space-y-4">
                {Object.entries(photosByRoom).map(([room, roomPhotos]) => (
                  <div key={room} className="border border-portal-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRoom(room)}
                      className="w-full px-4 py-3 bg-portal-hover hover:bg-portal-card transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {expandedRooms.has(room) ? (
                          <ChevronDown className="h-4 w-4 text-portal-muted" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-portal-muted" />
                        )}
                        <span className="font-semibold text-gray-900">{room}</span>
                        <Badge variant="outline" className="border-portal-border">
                          {roomPhotos.length} photo{roomPhotos.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </button>
                    {expandedRooms.has(room) && (
                      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {roomPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative group cursor-pointer border border-portal-border rounded-lg overflow-hidden hover:border-semantic-contractor/50 transition-colors"
                            onClick={() => setSelectedPhoto(photo)}
                          >
                            <img
                              src={photo.thumbnailUrl || photo.url}
                              alt={photo.caption || 'Damage photo'}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                              <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-semantic-contractor text-white text-xs">
                                {photo.damageType}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>

            {/* Image */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Damage photo'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
              <div className="flex gap-2 mb-3">
                <Badge className="bg-semantic-contractor text-white">
                  {selectedPhoto.damageType}
                </Badge>
                <Badge className="bg-white text-gray-900">
                  {selectedPhoto.roomLocation}
                </Badge>
              </div>
              {selectedPhoto.caption && (
                <p className="text-white text-lg mb-2">{selectedPhoto.caption}</p>
              )}
              <p className="text-white/70 text-sm">{selectedPhoto.filename}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
