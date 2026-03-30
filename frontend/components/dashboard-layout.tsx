'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { 
  LayoutGrid, 
  Megaphone, 
  BarChart3, 
  Settings, 
  Moon, 
  Sun,
  Search,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [instagramConnected] = useState(true)

  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(path)
  }

  return (
    <div className="flex h-screen surface" data-testid="app-layout">
      {/* Sidebar */}
      <aside className="w-52 surface-container-low flex flex-col" data-testid="sidebar">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="white" opacity="0.9"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-on-surface">CommentFlow</h1>
              <p className="text-xs text-on-surface-variant">CREATOR SUITE</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1" data-testid="main-navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-[hsl(var(--primary-fixed))] text-[hsl(var(--primary))]'
                    : 'text-on-surface-variant hover:bg-[hsl(var(--surface-container))]'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            data-testid="theme-toggle"
            className="w-full justify-start gap-3 px-4"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header 
          className="surface-container-lowest px-8 py-4 flex items-center justify-between border-b border-[hsl(var(--outline-variant)_/_0.15)]" 
          data-testid="app-header"
        >
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search analytics..."
                data-testid="search-input"
                className="w-full pl-10 pr-4 py-2 rounded-lg surface-container-low text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {instagramConnected && (
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full surface-container-high" 
                data-testid="instagram-status"
              >
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] status-active" />
                <span className="text-xs font-medium text-on-surface">Instagram Connected</span>
              </div>
            )}

            <Button variant="ghost" size="icon" className="relative" data-testid="notifications-button">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(var(--error))] rounded-full" />
            </Button>

            <Avatar data-testid="user-avatar">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-on-surface">Alex Rivera</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
