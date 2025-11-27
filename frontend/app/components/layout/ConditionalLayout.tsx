"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { SimpleNavbar } from './SimpleNavbar';
import { Footer } from './Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSharedTeamPage = pathname?.startsWith('/team/');

  return (
    <>
      {isSharedTeamPage ? <SimpleNavbar /> : <Navbar />}
      <main>{children}</main>
      {!isSharedTeamPage && <Footer />}
    </>
  );
}

