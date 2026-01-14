import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';

export default function Nav() {
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
    <nav>
      {navItems.map((item, index) => (
        <Fragment key={item.title}>
          <Link href={item.href}>{item.title}</Link>
          {index < navItems.length - 1 && ' | '}
        </Fragment>
      ))}
    </nav>
  );
}
