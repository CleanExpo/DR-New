'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CheckCircle,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Shield,
  Briefcase,
  Calendar,
  TrendingUp
} from 'lucide-react';

export interface ContractorBid {
  id: string;
  contractor: {
    id: string;
    name: string;
    businessName?: string;
    avatar?: string;
    rating: number;
    totalJobs: number;
    yearsExperience: number;
    location: string;
    verified?: boolean;
    certifications?: string[];
  };
  bid: {
    amount: number;
    currency?: string;
    estimatedDuration: string;
    startDate: string;
    includedServices: string[];
    warranty?: string;
    insuranceCovered?: boolean;
  };
  matchScore?: number;
  isRecommended?: boolean;
  status: 'pending' | 'accepted' | 'rejected';
}

interface BidComparisonTableProps {
  bids: ContractorBid[];
  onAcceptBid: (bidId: string) => void;
  onRejectBid?: (bidId: string) => void;
  onViewContractor: (contractorId: string) => void;
  title?: string;
  className?: string;
}

export function BidComparisonTable({
  bids,
  onAcceptBid,
  onRejectBid,
  onViewContractor,
  title = 'Compare Contractor Bids',
  className = '',
}: BidComparisonTableProps) {
  const sortedBids = [...bids].sort((a, b) => {
    // Recommended bids first
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    // Then by match score
    if (a.matchScore && b.matchScore) return b.matchScore - a.matchScore;
    // Then by price (lowest first)
    return a.bid.amount - b.bid.amount;
  });

  if (bids.length === 0) {
    return (
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardContent className="p-12 text-center">
          <Briefcase className="h-12 w-12 text-portal-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bids Yet</h3>
          <p className="text-portal-muted">
            Contractors haven't submitted bids for this request yet. Check back soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <Badge variant="outline" className="border-portal-border text-portal-muted">
            {bids.length} {bids.length === 1 ? 'Bid' : 'Bids'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBids.map((bidData) => {
            const { contractor, bid, matchScore, isRecommended, status } = bidData;

            return (
              <Card
                key={bidData.id}
                className={`relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
                           ${isRecommended ? 'border-2 border-semantic-contractor' : 'border border-portal-border'}
                           ${status === 'accepted' ? 'bg-green-50' : status === 'rejected' ? 'bg-gray-50 opacity-60' : 'bg-white'}`}
              >
                {/* Recommended badge */}
                {isRecommended && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-semantic-contractor text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Recommended
                    </div>
                  </div>
                )}

                {/* Status badge */}
                {status !== 'pending' && (
                  <div className="absolute top-0 left-0">
                    <Badge className={status === 'accepted' ? 'bg-green-500' : 'bg-gray-400'}>
                      {status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-5">
                  {/* Contractor info */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-12 w-12 border-2 border-portal-border">
                        <AvatarImage src={contractor.avatar} alt={contractor.name} />
                        <AvatarFallback className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 text-semantic-contractor font-semibold">
                          {contractor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {contractor.businessName || contractor.name}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-medium text-gray-900">
                                {contractor.rating.toFixed(1)}
                              </span>
                              <span className="text-xs text-portal-muted">
                                ({contractor.totalJobs})
                              </span>
                            </div>
                          </div>

                          {contractor.verified && (
                            <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center gap-1 mt-2 text-xs text-portal-muted">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{contractor.location}</span>
                        </div>

                        <div className="flex items-center gap-1 mt-1 text-xs text-portal-muted">
                          <Briefcase className="h-3 w-3" />
                          <span>{contractor.yearsExperience} years experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Match score */}
                    {matchScore && (
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-semantic-contractor" />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-portal-muted">Match Score</span>
                            <span className="font-semibold text-semantic-contractor">{matchScore}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-semantic-contractor h-1.5 rounded-full transition-all"
                              style={{ width: `${matchScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bid details */}
                  <div className="space-y-3 mb-4">
                    {/* Price */}
                    <div className="bg-portal-hover rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-portal-muted">Bid Amount</span>
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {bid.currency || 'A$'}{bid.amount.toLocaleString()}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-portal-muted" />
                      <span className="text-portal-muted">Duration:</span>
                      <span className="font-medium text-gray-900">{bid.estimatedDuration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-portal-muted" />
                      <span className="text-portal-muted">Start:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(bid.startDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Included services */}
                    {bid.includedServices && bid.includedServices.length > 0 && (
                      <div className="pt-2 border-t border-portal-border">
                        <p className="text-xs font-medium text-gray-900 mb-2">Included Services:</p>
                        <ul className="space-y-1">
                          {bid.includedServices.slice(0, 3).map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-portal-muted">
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{service}</span>
                            </li>
                          ))}
                          {bid.includedServices.length > 3 && (
                            <li className="text-xs text-portal-muted pl-5">
                              +{bid.includedServices.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Extras */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {bid.warranty && (
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          {bid.warranty} Warranty
                        </Badge>
                      )}
                      {bid.insuranceCovered && (
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                          Insurance Covered
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
                        onClick={() => onAcceptBid(bidData.id)}
                      >
                        Accept Bid
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-portal-border hover:border-gray-400"
                        onClick={() => onViewContractor(contractor.id)}
                      >
                        View Profile
                      </Button>
                    </div>
                  )}

                  {status === 'accepted' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => onViewContractor(contractor.id)}
                    >
                      View Contractor
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
