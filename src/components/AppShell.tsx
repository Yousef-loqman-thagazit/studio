
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, FileUp, FileText, History, LogOut, Settings, Bell } from 'lucide-react'; // Added Bell
import { Toaster } from '@/components/ui/toaster';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  tooltip: string;
}

const navItems: NavItem[] = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/templates', icon: FileText, label: 'Email Templates', tooltip: 'Email Templates' },
  { href: '/logs', icon: History, label: 'Notification Log', tooltip: 'Notification Log' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 10.05c0 .52-.43.95-.95.95H15.5v1c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-1H9.45c-.52 0-.95-.43-.95-.95v-2.1C8.5 9.43 8.93 9 9.45 9h1.55V8c0-.55.45-1 1-1h2.5c.55 0 1 .45 1 1v1h1.55c.52 0 .95.43.95.95v2.1zM12 10.5H9.5v1H12v-1zm2.5 0H12v1h2.5v-1zm0-2.5H12v1h2.5v-1zm-5 0H12v-1H9.5v1z" />
              </svg>
              <h1 className="text-xl font-semibold group-data-[collapsible=icon]:hidden">CoursePro</h1>
            </div>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.tooltip, className: "bg-card text-card-foreground border-border" }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <Separator />
          <SidebarFooter className="p-4 mt-auto">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center">
                <Settings className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Button>
              <div className="flex items-center gap-2 p-2 rounded-md group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent">
                 <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <LogOut className="h-5 w-5 ml-auto group-data-[collapsible=icon]:hidden text-muted-foreground hover:text-foreground cursor-pointer" />
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-sm border-b">
            <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
            <h2 className="text-xl font-semibold">Course Reminder Pro</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5"/>
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Settings className="h-5 w-5"/>
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
