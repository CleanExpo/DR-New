
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

export interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

export interface BookingDate {
  date: string;
  slots: TimeSlot[];
  isAvailable: boolean;
}

interface BookingCalendarProps {
  availableDates: BookingDate[];
  onBookSlot: (date: string, time: string) => Promise<void>;
  title?: string;
  description?: string;
  className?: string;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function BookingCalendar({
  availableDates,
  onBookSlot,
  title = 'Schedule Appointment',
  description = 'Select a date and time for your appointment',
  className = '',
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleBookSlot = async (time: string) => {
    if (!selectedDate || isBooking) return;

    setIsBooking(true);
    try {
      await onBookSlot(selectedDate, time);
    } catch (error) {
      console.error('Failed to book slot:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const isDateAvailable = (dateString: string) => {
    return availableDates.some((d) => d.date === dateString && d.isAvailable);
  };

  const getDateSlots = (dateString: string) => {
    return availableDates.find((d) => d.date === dateString)?.slots || [];
  };

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Generate calendar grid
  const calendarDays = [];
  // Empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const selectedDateData = selectedDate ? availableDates.find((d) => d.date === selectedDate) : null;

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        {description && <p className="text-sm text-portal-muted mt-1">{description}</p>}
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousMonth}
                className="border-portal-border hover:border-semantic-contractor"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold text-gray-900">
                {MONTHS[month]} {year}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextMonth}
                className="border-portal-border hover:border-semantic-contractor"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-portal-muted py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateString = formatDateString(year, month, day);
                const isAvailable = isDateAvailable(dateString);
                const isSelected = selectedDate === dateString;
                const isPast = new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0));

                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && !isPast && handleDateClick(dateString)}
                    disabled={!isAvailable || isPast}
                    className={`aspect-square rounded-lg text-sm font-medium transition-all duration-200
                               ${
                                 isSelected
                                   ? 'bg-semantic-contractor text-white shadow-lg scale-105'
                                   : isAvailable && !isPast
                                   ? 'bg-portal-hover text-gray-900 hover:bg-semantic-contractor/10 hover:border-semantic-contractor border border-portal-border'
                                   : 'bg-portal-card text-portal-muted cursor-not-allowed'
                               }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs text-portal-muted">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-semantic-contractor" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-portal-hover border border-portal-border" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-portal-card" />
                <span>Unavailable</span>
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div>
            {selectedDate ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="h-5 w-5 text-semantic-contractor" />
                  <h4 className="font-semibold text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('en-AU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h4>
                </div>

                {selectedDateData && selectedDateData.slots.length > 0 ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {selectedDateData.slots.map((slot) => (
                      <Button
                        key={slot.time}
                        onClick={() => handleBookSlot(slot.time)}
                        disabled={!slot.available || slot.booked || isBooking}
                        className={`w-full justify-start ${
                          slot.available && !slot.booked
                            ? 'border-portal-border hover:border-semantic-contractor hover:bg-semantic-contractor hover:text-white'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        variant="outline"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                        {slot.booked && (
                          <Badge className="ml-auto bg-gray-400 text-white">Booked</Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-portal-muted mx-auto mb-3 opacity-50" />
                    <p className="text-portal-muted">No time slots available for this date</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-portal-muted mx-auto mb-3 opacity-50" />
                <p className="text-portal-muted">Select a date to view available time slots</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
