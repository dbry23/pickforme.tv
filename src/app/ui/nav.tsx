'use client';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

export default function Nav() {
  const isMobile = useIsMobile();

  type NavItem = {
    href: string;
    title: string;
  };

  const navItems: NavItem[] = [
    { href: '/', title: 'Home' },
    { href: '/search', title: 'Search' },
    { href: '/episode', title: 'Episode' },
  ];

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        {navItems.map((item, index) => (
          <>
            <NavigationMenuItem key={index}>
              <NavigationMenuLink asChild>
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {index < navItems.length - 1 && <Separator orientation="vertical" /> }
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
