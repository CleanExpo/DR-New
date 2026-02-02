'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { ServiceRequest } from './ServiceRequestCard';

interface RequestsTableProps {
  requests: ServiceRequest[];
  onViewDetails: (request: ServiceRequest) => void;
  className?: string;
}

type SortField = 'serviceTitle' | 'createdAt' | 'status' | 'urgency' | 'location';
type SortDirection = 'asc' | 'desc';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  MATCHED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

const statusDisplay = {
  PENDING: 'Pending',
  MATCHED: 'Matched',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const urgencyOrder = { emergency: 3, urgent: 2, normal: 1 };

export function RequestsTable({
  requests,
  onViewDetails,
  className = '',
}: RequestsTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRequests = [...requests].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case 'serviceTitle':
        aValue = a.serviceTitle.toLowerCase();
        bValue = b.serviceTitle.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'urgency':
        aValue = urgencyOrder[a.urgency];
        bValue = urgencyOrder[b.urgency];
        break;
      case 'location':
        aValue = a.location.toLowerCase();
        bValue = b.location.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-portal-muted" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 text-semantic-contractor" />
    ) : (
      <ArrowDown className="h-4 w-4 text-semantic-contractor" />
    );
  };

  return (
    <div className={`bg-portal-card rounded-xl border border-portal-border shadow-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-portal-hover hover:bg-portal-hover border-b border-portal-border">
              <TableHead className="font-semibold text-gray-900">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-semantic-contractor p-0 h-auto font-semibold"
                  onClick={() => handleSort('serviceTitle')}
                >
                  Service
                  <SortIcon field="serviceTitle" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-semantic-contractor p-0 h-auto font-semibold"
                  onClick={() => handleSort('location')}
                >
                  Location
                  <SortIcon field="location" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-semantic-contractor p-0 h-auto font-semibold"
                  onClick={() => handleSort('urgency')}
                >
                  Urgency
                  <SortIcon field="urgency" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-semantic-contractor p-0 h-auto font-semibold"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <SortIcon field="status" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-semantic-contractor p-0 h-auto font-semibold"
                  onClick={() => handleSort('createdAt')}
                >
                  Submitted
                  <SortIcon field="createdAt" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-portal-muted">
                  No service requests found
                </TableCell>
              </TableRow>
            ) : (
              sortedRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="border-b border-portal-border hover:bg-portal-hover transition-colors cursor-pointer group"
                  onClick={() => onViewDetails(request)}
                >
                  <TableCell className="font-medium text-gray-900 group-hover:text-semantic-contractor transition-colors">
                    <div className="max-w-xs">
                      <p className="font-semibold truncate">{request.serviceTitle}</p>
                      {request.leadScore && (
                        <Badge
                          className={`mt-1 text-xs ${
                            request.leadScore >= 80
                              ? 'bg-green-100 text-green-700'
                              : request.leadScore >= 60
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          Score: {request.leadScore.toFixed(0)}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    <span className="text-sm">{request.location}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        request.urgency === 'emergency'
                          ? 'border-dr-emergency text-dr-emergency bg-dr-emergency/10'
                          : request.urgency === 'urgent'
                          ? 'border-yellow-500 text-yellow-700 bg-yellow-500/10'
                          : 'border-portal-border text-portal-muted'
                      }
                    >
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[request.status]}>
                      {statusDisplay[request.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    <span className="text-sm">
                      {new Date(request.createdAt).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity border-portal-border hover:border-semantic-contractor hover:text-semantic-contractor"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(request);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination placeholder */}
      {sortedRequests.length > 0 && (
        <div className="px-6 py-4 border-t border-portal-border bg-portal-hover">
          <p className="text-sm text-portal-muted">
            Showing {sortedRequests.length} request{sortedRequests.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
