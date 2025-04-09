
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  linkTo
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType;
  linkTo: string;
}) => (
  <Link to={linkTo}>
    <Card className="aces-card hover:border-aces-400 cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-aces-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
);

const UpcomingEvent = ({ 
  title, 
  date, 
  location,
  attendees 
}: { 
  title: string; 
  date: string; 
  location: string;
  attendees: number;
}) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-3">
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
      <Calendar className="h-4 w-4" />
      <span>{date}</span>
    </div>
    <div className="mt-2 flex justify-between items-center">
      <span className="text-xs bg-aces-100 text-aces-600 px-2 py-1 rounded-full">{location}</span>
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <Users className="h-3 w-3" /> {attendees} registered
      </span>
    </div>
  </div>
);

const LatestAnnouncement = ({
  title,
  date,
  excerpt
}: {
  title: string;
  date: string;
  excerpt: string;
}) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-3">
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
  </div>
);

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: 'Total Members', value: '120', description: '15 new this month', icon: Users, linkTo: '/members' },
    { title: 'Upcoming Events', value: '4', description: 'Next: Hackathon 2025', icon: Calendar, linkTo: '/events' },
    { title: 'Announcements', value: '8', description: '3 unread notifications', icon: Bell, linkTo: '/announcements' },
    { title: 'Budget Status', value: '$2,500', description: '60% utilized this semester', icon: Activity, linkTo: '/budget' },
  ];

  const upcomingEvents = [
    { title: 'Annual Hackathon 2025', date: 'Apr 20, 2025 - 9:00 AM', location: 'Main Auditorium', attendees: 85 },
    { title: 'Tech Talk: AI in Education', date: 'Apr 15, 2025 - 3:30 PM', location: 'Room 202', attendees: 42 },
    { title: 'Workshop: Frontend Development', date: 'Apr 12, 2025 - 1:00 PM', location: 'Computer Lab', attendees: 28 },
  ];

  const announcements = [
    { title: 'Election Results Announced', date: '3 days ago', excerpt: 'Congratulations to the newly elected ACES committee members for the academic year 2025-26.' },
    { title: 'Registration Open for Annual Hackathon', date: '5 days ago', excerpt: 'Be ready for the biggest tech event of the year. Registration is now open for the Annual Hackathon 2025.' },
    { title: 'Internship Opportunities at Tech Giants', date: '1 week ago', excerpt: 'Several tech companies are offering summer internships. Check the portal for details and apply.' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ACES Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the Association of Computer Engineering Students hub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Two column layout for events and announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="aces-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-aces-400" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <UpcomingEvent key={index} {...event} />
            ))}
            <Link to="/events" className="block text-sm text-aces-400 hover:text-aces-500 font-medium mt-2">
              View all events →
            </Link>
          </CardContent>
        </Card>

        <Card className="aces-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-aces-400" />
              Latest Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
              <LatestAnnouncement key={index} {...announcement} />
            ))}
            <Link to="/announcements" className="block text-sm text-aces-400 hover:text-aces-500 font-medium mt-2">
              View all announcements →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
