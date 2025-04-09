
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Users, MapPin, Clock, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Annual Hackathon 2025',
    description: 'Our biggest event of the year! Join us for a 24-hour coding competition with amazing prizes.',
    date: new Date(2025, 3, 20, 9, 0), // April 20, 2025, 9:00 AM
    endDate: new Date(2025, 3, 21, 9, 0), // April 21, 2025, 9:00 AM
    location: 'Main Auditorium',
    capacity: 100,
    registered: 85,
    type: 'Competition',
    image: '',
    organizer: 'Alex Johnson',
  },
  {
    id: 2,
    title: 'Tech Talk: AI in Education',
    description: 'Learn about the latest applications of AI in educational technology from industry experts.',
    date: new Date(2025, 3, 15, 15, 30), // April 15, 2025, 3:30 PM
    endDate: new Date(2025, 3, 15, 17, 0), // April 15, 2025, 5:00 PM
    location: 'Room 202',
    capacity: 50,
    registered: 42,
    type: 'Seminar',
    image: '',
    organizer: 'Samantha Lee',
  },
  {
    id: 3,
    title: 'Workshop: Frontend Development',
    description: 'Hands-on workshop covering the latest trends and technologies in frontend development.',
    date: new Date(2025, 3, 12, 13, 0), // April 12, 2025, 1:00 PM
    endDate: new Date(2025, 3, 12, 16, 0), // April 12, 2025, 4:00 PM
    location: 'Computer Lab',
    capacity: 30,
    registered: 28,
    type: 'Workshop',
    image: '',
    organizer: 'Marcus Chen',
  },
  {
    id: 4,
    title: 'Resume Review Session',
    description: 'Get your resume reviewed by industry professionals and receive valuable feedback.',
    date: new Date(2025, 3, 25, 14, 0), // April 25, 2025, 2:00 PM
    endDate: new Date(2025, 3, 25, 17, 0), // April 25, 2025, 5:00 PM
    location: 'Career Center',
    capacity: 40,
    registered: 18,
    type: 'Career',
    image: '',
    organizer: 'Priya Patel',
  },
];

// Event type badge component
const EventTypeBadge = ({ type }: { type: string }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'Competition':
        return 'bg-blue-100 text-blue-800';
      case 'Seminar':
        return 'bg-green-100 text-green-800';
      case 'Workshop':
        return 'bg-purple-100 text-purple-800';
      case 'Career':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge variant="outline" className={`${getTypeStyles()} border-none`}>
      {type}
    </Badge>
  );
};

// Event card component
const EventCard = ({ event }: { event: typeof events[0] }) => {
  const isUpcoming = event.date > new Date();
  const isPastEvent = event.date < new Date();
  const registrationFull = event.registered >= event.capacity;
  
  const formattedDate = format(event.date, 'MMM dd, yyyy');
  const formattedTime = format(event.date, 'h:mm a');
  const durationHours = Math.round((event.endDate.getTime() - event.date.getTime()) / (1000 * 60 * 60));
  
  return (
    <Card className={cn(
      "aces-card overflow-hidden transition-all",
      isPastEvent ? "opacity-75" : ""
    )}>
      <div className="relative">
        {/* Event Image or Color Banner */}
        <div className={cn(
          "h-32 w-full",
          event.image ? "" : "bg-gradient-to-r from-aces-300 to-aces-400"
        )}>
          {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover" />}
        </div>
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <EventTypeBadge type={event.type} />
        </div>
        
        {/* Registration Status Badge */}
        {isUpcoming && (
          <div className="absolute top-4 right-4">
            <Badge className={registrationFull ? "bg-red-500" : "bg-green-500"}>
              {registrationFull ? "Full" : `${event.capacity - event.registered} spots left`}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {formattedDate} • {formattedTime} ({durationHours}h)
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{event.registered}/{event.capacity} registered</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <QrCode className="h-4 w-4 mr-2" />
              {isPastEvent ? "Attendance" : "Check-in"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md text-center">
            <DialogHeader>
              <DialogTitle>{event.title} - QR Code</DialogTitle>
              <DialogDescription>
                Scan this QR code to check in for the event.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              {/* Placeholder for QR code */}
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <span className="text-gray-500">QR Code Placeholder</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          className={cn(
            "bg-aces-400 hover:bg-aces-500",
            (isPastEvent || registrationFull) && "opacity-50 cursor-not-allowed"
          )}
          disabled={isPastEvent || registrationFull}
        >
          {isPastEvent ? "Event Ended" : registrationFull ? "Registration Full" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// New event form dialogue
const NewEventForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-aces-400 hover:bg-aces-500">
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new event for ACES.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" placeholder="Event title" className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <select id="type" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>Competition</option>
              <option>Seminar</option>
              <option>Workshop</option>
              <option>Career</option>
            </select>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">Description</Label>
            <Textarea id="description" placeholder="Event description" className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">Time</Label>
            <Input id="time" type="time" className="col-span-1" />
            <Label htmlFor="endTime" className="text-right">End Time</Label>
            <Input id="endTime" type="time" className="col-span-1" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input id="location" placeholder="Event location" className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">Capacity</Label>
            <Input id="capacity" type="number" placeholder="Maximum participants" className="col-span-3" />
          </div>
        </div>
        
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button type="submit" className="bg-aces-400 hover:bg-aces-500">Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EventsManagement = () => {
  const upcomingEvents = events.filter(event => event.date > new Date());
  const pastEvents = events.filter(event => event.date <= new Date());
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
        <p className="text-gray-500 mt-1">Create, track, and manage all department events</p>
      </div>
      
      <Tabs defaultValue="upcoming">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
          </TabsList>
          
          <NewEventForm />
        </div>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcomingEvents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No upcoming events scheduled.</p>
                <Button className="bg-aces-400 hover:bg-aces-500 mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {pastEvents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No past events found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsManagement;
