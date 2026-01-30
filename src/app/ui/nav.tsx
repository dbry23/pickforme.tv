'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Menu, X } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

export default function Nav() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  type NavItem = {
    href: string;
    title: string;
  };

  const navItems: NavItem[] = [
    { href: '/', title: 'Home' },
    { href: '/search', title: 'Search' },
    { href: '/library', title: 'Library' },
    { href: '/episode', title: 'Episode' },
    { href: '/about', title: 'About' },
  ];

  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        {isMobile && (
          <div className="flex justify-between items-center py-4">
            <span className="text-white font-bold text-lg">Pick For Me TV</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}

        {/* Desktop menu - always visible */}
        {!isMobile && (
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">
              {navItems.map((item, index) => (
                <Fragment key={index}>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="rounded-none">
                      <Link
                        href={item.href}
                        className="text-slate-300 hover:bg-muted-foreground focus:bg-transparent focus:hover:bg-muted-foreground transition-colors duration-500 py-4 px-3 font-medium"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {index < navItems.length - 1 && (
                    <Separator orientation="vertical" className="bg-slate-700" />
                  )}
                </Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile menu - collapsible */}
        {isMobile && isMenuOpen && (
          <div className="pb-4">
            {navItems.map((item, index) => (
              <Fragment key={index}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-300 py-3 px-4 font-medium"
                >
                  {item.title}
                </Link>
                {index < navItems.length - 1 && (
                  <Separator className="bg-slate-700" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
