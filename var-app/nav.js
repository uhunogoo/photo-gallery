import Link from "next/link";

function Navigation() {
  return (
    <nav className="flex justify-center gap-10 py-5 text-white">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}

export default Navigation;