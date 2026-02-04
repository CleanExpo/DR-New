'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DamagePhoto, DAMAGE_TYPES, ROOM_LOCATIONS, DamageType, RoomLocation } from './DamageAssessmentUpload';
import { AlertCircle } from 'lucide-react';

interface PhotoCategorizationModalProps {
  photo: DamagePhoto;
  onComplete: (photoId: string, damageType: DamageType, roomLocation: RoomLocation, caption: string) => void;
  onCancel: () => void;
}

export function PhotoCategorizationModal({
  photo,
  onComplete,
  onCancel,
}: PhotoCategorizationModalProps) {
  const [damageType, setDamageType] = useState<DamageType | null>(photo.damageType);
  const [roomLocation, setRoomLocation] = useState<RoomLocation | null>(photo.roomLocation);
  const [caption, setCaption] = useState(photo.caption);
  const [error, setError] = useState<string | null>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [damageType, roomLocation, caption]);

  const handleSave = () => {
    // Validation
    if (!damageType) {
      setError('Please select a damage type');
      return;
    }

    if (!roomLocation) {
      setError('Please select a room location');
      return;
    }

    // Clear error and complete
    setError(null);
    onComplete(photo.id, damageType, roomLocation, caption);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Categorize Damage Photo
          </DialogTitle>
          <p className="text-sm text-portal-muted mt-1">
            Help us organize your damage assessment by selecting the type of damage and location
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Photo Preview */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-portal-border">
            <img
              src={photo.preview}
              alt="Photo to categorize"
              className="w-full h-full object-contain bg-gray-50"
            />
          </div>

          {/* Damage Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="damage-type" className="text-sm font-medium">
              Damage Type <span className="text-dr-emergency">*</span>
            </Label>
            <Select
              value={damageType || undefined}
              onValueChange={(value) => {
                setDamageType(value as DamageType);
                setError(null);
              }}
            >
              <SelectTrigger id="damage-type" className="w-full">
                <SelectValue placeholder="Select damage type" />
              </SelectTrigger>
              <SelectContent>
                {DAMAGE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-portal-muted">
              What type of damage does this photo show?
            </p>
          </div>

          {/* Room Location Selection */}
          <div className="space-y-2">
            <Label htmlFor="room-location" className="text-sm font-medium">
              Room Location <span className="text-dr-emergency">*</span>
            </Label>
            <Select
              value={roomLocation || undefined}
              onValueChange={(value) => {
                setRoomLocation(value as RoomLocation);
                setError(null);
              }}
            >
              <SelectTrigger id="room-location" className="w-full">
                <SelectValue placeholder="Select room location" />
              </SelectTrigger>
              <SelectContent>
                {ROOM_LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-portal-muted">
              Which room or area of the property is shown?
            </p>
          </div>

          {/* Caption (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="caption" className="text-sm font-medium">
              Caption <span className="text-portal-muted">(Optional)</span>
            </Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a brief description of what this photo shows..."
              className="resize-none h-20"
              maxLength={200}
            />
            <p className="text-xs text-portal-muted text-right">
              {caption.length}/200 characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-dr-emergency/10 border border-dr-emergency/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-dr-emergency flex-shrink-0" />
              <p className="text-sm text-dr-emergency">{error}</p>
            </div>
          )}

          {/* Keyboard Shortcuts Hint */}
          <div className="text-xs text-portal-muted bg-portal-hover p-3 rounded-lg">
            <p className="font-medium mb-1">Keyboard Shortcuts:</p>
            <ul className="space-y-1">
              <li>• Press <kbd className="px-1.5 py-0.5 bg-white border border-portal-border rounded">Esc</kbd> to cancel</li>
              <li>• Press <kbd className="px-1.5 py-0.5 bg-white border border-portal-border rounded">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white border border-portal-border rounded">Enter</kbd> to save</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-portal-border hover:bg-portal-hover"
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleSave}
            disabled={!damageType || !roomLocation}
            className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
          >
            Save & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
