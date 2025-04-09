
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Github,
  Linkedin
} from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Mock data for committee members
const committeeMembers = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    role: 'President', 
    year: '4th Year', 
    email: 'alex@aces.edu', 
    phone: '(555) 123-4567',
    skills: ['React', 'Node.js', 'MongoDB'],
    image: '',
    social: {
      github: 'alexj',
      linkedin: 'alexjohnson'
    }
  },
  { 
    id: 2, 
    name: 'Samantha Lee', 
    role: 'Vice President', 
    year: '3rd Year', 
    email: 'samantha@aces.edu', 
    phone: '(555) 234-5678',
    skills: ['Python', 'Machine Learning', 'AWS'],
    image: '',
    social: {
      github: 'samlee',
      linkedin: 'samlee'
    }
  },
  { 
    id: 3, 
    name: 'Marcus Chen', 
    role: 'Treasurer', 
    year: '3rd Year', 
    email: 'marcus@aces.edu', 
    phone: '(555) 345-6789',
    skills: ['Java', 'Spring Boot', 'SQL'],
    image: '',
    social: {
      github: 'mchen',
      linkedin: 'marcuschen'
    }
  },
  { 
    id: 4, 
    name: 'Priya Patel', 
    role: 'Secretary', 
    year: '2nd Year', 
    email: 'priya@aces.edu', 
    phone: '(555) 456-7890',
    skills: ['UI/UX Design', 'Figma', 'HTML/CSS'],
    image: '',
    social: {
      github: 'priyap',
      linkedin: 'priyapatel'
    }
  },
];

// Mock data for students
const students = [
  ...committeeMembers,
  { 
    id: 5, 
    name: 'David Wilson', 
    role: 'Student Member', 
    year: '2nd Year', 
    email: 'david@aces.edu', 
    phone: '(555) 567-8901',
    skills: ['C++', 'Data Structures', 'Algorithms'],
    image: '',
    social: {
      github: 'davidw',
      linkedin: 'davidwilson'
    }
  },
  { 
    id: 6, 
    name: 'Sophia Garcia', 
    role: 'Student Member', 
    year: '1st Year', 
    email: 'sophia@aces.edu', 
    phone: '(555) 678-9012',
    skills: ['JavaScript', 'React Native', 'Firebase'],
    image: '',
    social: {
      github: 'sophiag',
      linkedin: 'sophiagarcia'
    }
  },
  { 
    id: 7, 
    name: 'Ethan Brown', 
    role: 'Student Member', 
    year: '4th Year', 
    email: 'ethan@aces.edu', 
    phone: '(555) 789-0123',
    skills: ['DevOps', 'Docker', 'Kubernetes'],
    image: '',
    social: {
      github: 'ethanb',
      linkedin: 'ethanbrown'
    }
  },
  { 
    id: 8, 
    name: 'Olivia Martinez', 
    role: 'Student Member', 
    year: '3rd Year', 
    email: 'olivia@aces.edu', 
    phone: '(555) 890-1234',
    skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
    image: '',
    social: {
      github: 'oliviam',
      linkedin: 'oliviamartinez'
    }
  },
];

// Member card component
const MemberCard = ({ member }: { member: typeof students[0] }) => {
  return (
    <Card className="aces-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.image} />
            <AvatarFallback className="bg-aces-400 text-white text-xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              <Badge variant="secondary" className="bg-aces-100 text-aces-600 hover:bg-aces-200">
                {member.role}
              </Badge>
              <Badge variant="outline">{member.year}</Badge>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{member.phone}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <a href={`https://github.com/${member.social.github}`} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-aces-400">
                <Github className="h-5 w-5" />
              </a>
              <a href={`https://linkedin.com/in/${member.social.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-aces-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// New member form dialogue
const NewMemberForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-aces-400 hover:bg-aces-500">
          <Plus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new member to add them to the directory.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Name</label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="role" className="text-right">Role</label>
            <Input id="role" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="year" className="text-right">Year</label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">1st Year</SelectItem>
                <SelectItem value="2nd">2nd Year</SelectItem>
                <SelectItem value="3rd">3rd Year</SelectItem>
                <SelectItem value="4th">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">Email</label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">Phone</label>
            <Input id="phone" type="tel" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skills" className="text-right">Skills</label>
            <Input id="skills" placeholder="Comma separated skills" className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button type="submit" className="bg-aces-400 hover:bg-aces-500">Save Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MembersDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [currentTab, setCurrentTab] = useState('committee');
  
  // Filter members based on search term, selected year, and current tab
  const filterMembers = () => {
    let filtered = currentTab === 'committee' ? committeeMembers : students;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(member => member.year === selectedYear);
    }
    
    return filtered;
  };
  
  const filteredMembers = filterMembers();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
        <p className="text-gray-500 mt-1">Manage all ACES members and student directory</p>
      </div>
      
      <Tabs defaultValue="committee" onValueChange={setCurrentTab}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="committee">Committee Members</TabsTrigger>
            <TabsTrigger value="all">All Students</TabsTrigger>
          </TabsList>
          
          <NewMemberForm />
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="committee" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No committee members found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No students found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MembersDirectory;
