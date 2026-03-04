'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, X, MapPin, Calendar, Phone, AlertCircle } from 'lucide-react';

export interface ServiceRequest {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  description?: string;
  location: string;
  phone?: string;
  urgency: 'emergency' | 'urgent' | 'normal';
  status: 'PENDING' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  leadScore?: number;
  insurance?: boolean;
  urgentResponse?: boolean;
  preferredTime?: string;
  createdAt: string;
  budget?: string;
}

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onViewDetails: (request: ServiceRequest) => void;
  onCancel?: (requestId: string) => void;
  categoryDisplayName?: string;
  urgencyDisplayName?: string;
  className?: string;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  MATCHED: 'bg-blue-100 text-blue-800 border-blue-200',
  IN_PROGRESS: 'bg-purple-100 text-purple-800 border-purple-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusDisplay = {
  PENDING: 'Pending',
  MATCHED: 'Matched',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const urgencyColors = {
  emergency: 'border-dr-emergency text-dr-emergency bg-dr-emergency/10',
  urgent: 'border-yellow-500 text-yellow-700 bg-yellow-500/10',
  normal: 'border-portal-border text-portal-muted bg-portal-hover',
};

const progressPercentage = {
  PENDING: 0,
  MATCHED: 25,
  IN_PROGRESS: 50,
  COMPLETED: 100,
  CANCELLED: 0,
};

export function ServiceRequestCard({
  request,
  onViewDetails,
  onCancel,
  categoryDisplayName,
  urgencyDisplayName,
  className = '',
}: ServiceRequestCardProps) {
  const progress = progressPercentage[request.status];

  return (
    <Card
      className={`group bg-portal-card border-l-4 border-l-semantic-contractor rounded-xl
                  shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-0.5
                  border-portal-border ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Title and Lead Score */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-semantic-contractor transition-colors">
                  {request.serviceTitle}
                </h4>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-portal-muted mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Category:</span>
                    <Badge variant="outline" className="border-portal-border text-gray-700">
                      {categoryDisplayName || request.serviceCategory}
                    </Badge>
                  </div>

                  {request.leadScore && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Lead Score:</span>
                      <Badge
                        className={`${
                          request.leadScore >= 80
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : request.leadScore >= 60
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }`}
                      >
                        {request.leadScore.toFixed(0)}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="font-medium">Urgency:</span>
                    <Badge
                      variant="outline"
                      className={urgencyColors[request.urgency]}
                    >
                      {urgencyDisplayName || request.urgency}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-gray-900 font-medium">{request.location}</span>
                  </div>
                </div>

                {/* Description */}
                {request.description && (
                  <p className="text-portal-muted text-sm leading-relaxed line-clamp-2">
                    {request.description}
                  </p>
                )}

                {/* Additional Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-portal-muted pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Budget:</span>
                    <span className="text-gray-900">{request.budget || 'To be discussed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-gray-900">
                      {new Date(request.createdAt).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                  {request.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-gray-900">{request.phone}</span>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  {request.insurance && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      Insurance Claim
                    </Badge>
                  )}
                  {request.urgentResponse && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Urgent Response
                    </Badge>
                  )}
                  {request.preferredTime && (
                    <Badge variant="outline" className="border-portal-border text-gray-700">
                      Preferred: {request.preferredTime}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col lg:items-end space-y-4 lg:min-w-[200px]">
            {/* Status Badge */}
            <div className="text-right">
              <Badge className={`${statusColors[request.status]} text-sm px-3 py-1.5 border`}>
                {statusDisplay[request.status]}
              </Badge>

              {/* Progress Bar */}
              {progress > 0 && (
                <div className="mt-3 w-full lg:w-40">
                  <div className="flex justify-between text-xs text-portal-muted mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-semantic-contractor h-2 rounded-full transition-[width] duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="group-hover:border-semantic-contractor group-hover:text-semantic-contractor
                           transition-colors border-portal-border text-gray-700 hover:bg-portal-hover
                           justify-start lg:justify-center"
                onClick={() => onViewDetails(request)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>

              {request.status === 'PENDING' && onCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:border-dr-emergency group-hover:text-dr-emergency
                             transition-colors border-portal-border text-gray-700 hover:bg-dr-emergency/5
                             justify-start lg:justify-center"
                  onClick={() => onCancel(request.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
