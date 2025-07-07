import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  Menu,
  Warehouse
} from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: 'Products',
      href: '/products',
      icon: Package,
      badge: '198'
    },
    {
      title: 'Stock Movements',
      href: '/movements',
      icon: ArrowRightLeft,
      badge: null
    },
    {
      title: 'Inventory Adjustments',
      href: '/adjustments',
      icon: Settings,
      badge: null
    },
    {
      title: 'Locations',
      href: '/locations',
      icon: Warehouse,
      badge: null
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: BarChart3,
      badge: null
    }
  ];

  const NavigationContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Inventory Pro
          </h2>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 h-10 px-3 transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                )}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="px-3 py-2 border-t">
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Low Stock Alert</p>
            <p className="text-xs text-amber-700">2 items need reordering</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex w-72 min-h-screen bg-white border-r border-gray-200 flex-col">
        <NavigationContent />
      </div>
    </>
  );
};

export default Navigation;