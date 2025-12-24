import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      |
      <Link href="/search">Search</Link>
      |
      <Link href="/episode">Episode</Link>
    </nav>
  );
}
