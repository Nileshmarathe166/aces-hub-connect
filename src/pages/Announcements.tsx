
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Search, Plus, Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock announcements data
const announcementsData = [
  {
    id: 1,
    title: 'Election Results Announced',
    content: `Congratulations to the newly elected ACES committee members for the academic year 2025-26:

- President: Alex Johnson
- Vice President: Samantha Lee
- Secretary: Priya Patel
- Treasurer: Marcus Chen
- Technical Head: David Wilson
- Event Coordinator: Sophia Garcia

We wish them all the best for their tenure. The new committee will officially take charge on May 1st, 2025.`,
    date: '2025-04-06T14:30:00',
    type: 'Committee',
    author: 'Prof. Williams',
    likes: 24,
    comments: 8,
    pinned: true,
  },
  {
    id: 2,
    title: 'Registration Open for Annual Hackathon',
    content: `We're excited to announce that registration is now open for the Annual Hackathon 2025! 

The event will be held on April 20-21, 2025, in the Main Auditorium. This year's theme is "Tech for Sustainable Future."

Prizes worth $5000 to be won! Register before April 15th to secure your spot. Limited to 100 participants only.

For registration and more details, visit the Events section of the ACES Hub.`,
    date: '2025-04-04T09:15:00',
    type: 'Event',
    author: 'Alex Johnson',
    likes: 56,
    comments: 12,
    pinned: true,
  },
  {
    id: 3,
    title: 'Internship Opportunities at Tech Giants',
    content: `Several tech companies are offering summer internships for Computer Engineering students. The following companies have open positions:

1. Google - Software Engineering Intern
2. Microsoft - Cloud Engineering Intern
3. Amazon - Machine Learning Intern
4. Apple - iOS Development Intern
5. Meta - AR/VR Research Intern

Interested students should submit their applications through the career portal by April 18th, 2025.

For resume reviews, attend the Resume Review Session on April 25th.`,
    date: '2025-04-02T16:45:00',
    type: 'Career',
    author: 'Career Services Team',
    likes: 42,
    comments: 15,
    pinned: false,
  },
  {
    id: 4,
    title: 'Department Seminar: AI in Healthcare',
    content: `The Computer Engineering Department is hosting a seminar on "Artificial Intelligence Applications in Healthcare" on April 13th, 2025, from 2:00 PM to 4:00 PM in Room 301.

Guest Speaker: Dr. Sarah Johnson, AI Research Lead at Medical Innovations Inc.

The seminar will cover:
- Current applications of AI in healthcare
- Challenges and ethical considerations
- Future trends and research opportunities

Attendance is mandatory for all final year students. Others are welcome to join based on availability of seats.`,
    date: '2025-03-30T11:20:00',
    type: 'Academic',
    author: 'Prof. Rodriguez',
    likes: 18,
    comments: 3,
    pinned: false,
  },
];

// Announcement card component
const AnnouncementCard = ({ announcement }: { announcement: typeof announcementsData[0] }) => {
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const getTypeBadgeColor = () => {
    switch (announcement.type) {
      case 'Committee':
        return 'bg-blue-100 text-blue-800';
      case 'Event':
        return 'bg-green-100 text-green-800';
      case 'Career':
        return 'bg-purple-100 text-purple-800';
      case 'Academic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center">
              {announcement.pinned && (
                <span className="text-aces-400 mr-2" title="Pinned announcement">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 2-9 9 5 5 9-9z"></path>
                    <circle cx="9.5" cy="9.5" r=".5" fill="currentColor"></circle>
                    <path d="M6 15a3 3 0 0 0-3 3c0 1.1.9 2 2 2a3 3 0 0 0 3-3"></path>
                    <path d="M18 2h4v4"></path>
                  </svg>
                </span>
              )}
              {announcement.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </CardDescription>
          </div>
          <Badge variant="outline" className={`${getTypeBadgeColor()} border-none`}>
            {announcement.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm max-w-none space-y-3">
          {announcement.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.includes('- ')) {
              // Handle lists
              return (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {paragraph.split('\n').map((item, j) => (
                    <li key={j}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            } else if (paragraph.match(/^\d+\./)) {
              // Handle numbered lists
              return (
                <ol key={i} className="list-decimal pl-5 space-y-1">
                  {paragraph.split('\n').map((item, j) => {
                    const content = item.replace(/^\d+\./, '').trim();
                    return <li key={j}>{content}</li>;
                  })}
                </ol>
              );
            } else {
              // Regular paragraph
              return <p key={i}>{paragraph}</p>;
            }
          })}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Posted by <span className="font-medium">{announcement.author}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between text-sm text-gray-500 border-t pt-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-aces-400">
            <ThumbsUp className="h-4 w-4" />
            <span>{announcement.likes}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-aces-400">
            <MessageSquare className="h-4 w-4" />
            <span>{announcement.comments}</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

// New announcement form dialogue
const NewAnnouncementForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-aces-400 hover:bg-aces-500">
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Compose a new announcement to be shared with ACES members.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" placeholder="Announcement title" className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <select id="type" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>Committee</option>
              <option>Event</option>
              <option>Career</option>
              <option>Academic</option>
            </select>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">Content</Label>
            <Textarea id="content" placeholder="Write your announcement here..." className="col-span-3 min-h-[200px]" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right"></div>
            <div className="col-span-3 flex items-center space-x-2">
              <input type="checkbox" id="pin" className="rounded border-gray-300" />
              <Label htmlFor="pin" className="cursor-pointer">Pin this announcement</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button type="submit" className="bg-aces-400 hover:bg-aces-500">Publish Announcement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const pinnedAnnouncements = announcementsData.filter(a => a.pinned);
  const regularAnnouncements = announcementsData.filter(a => !a.pinned);
  
  // Filter announcements based on search
  const filterAnnouncements = (announcements: typeof announcementsData) => {
    if (searchTerm.trim() === '') return announcements;
    
    return announcements.filter(announcement => 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredPinned = filterAnnouncements(pinnedAnnouncements);
  const filteredRegular = filterAnnouncements(regularAnnouncements);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-500 mt-1">Stay updated with the latest news and information</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search announcements..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <NewAnnouncementForm />
      </div>
      
      {/* Pinned Announcements */}
      {filteredPinned.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Pinned Announcements</h2>
          </div>
          <div className="grid gap-6">
            {filteredPinned.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Announcements */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">All Announcements</h2>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6">
              {filteredRegular.map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
              {filteredRegular.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No announcements found.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {['committee', 'event', 'career', 'academic'].map(type => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="grid gap-6">
                {filterAnnouncements(regularAnnouncements)
                  .filter(a => a.type.toLowerCase() === type)
                  .map(announcement => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))
                }
                {filterAnnouncements(regularAnnouncements).filter(a => a.type.toLowerCase() === type).length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No {type} announcements found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Announcements;
