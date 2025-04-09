
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Users,
  Calendar,
  Bell,
  PieChart,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface NavLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navigationLinks: NavLink[] = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Members', path: '/members', icon: Users },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Announcements', path: '/announcements', icon: Bell },
  { name: 'Budget', path: '/budget', icon: PieChart },
];

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  // Close sidebar on mobile when navigation happens
  const handleNavigation = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-aces-900 text-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-aces-400 rounded-lg p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
            </div>
            <span className="text-xl font-bold">ACES Hub</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleNavigation}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-aces-800 transition-colors"
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-aces-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-aces-400">AC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-gray-400">ACES Committee</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AppSidebar;
