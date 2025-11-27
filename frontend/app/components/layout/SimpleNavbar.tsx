"use client";
import Link from 'next/link';
import Image from 'next/image';

export const SimpleNavbar = () => {
  return (
    <div className="bg-[#191713] py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center relative mt-5">
          <div className="absolute left-0 flex items-center">
            <Link href="/" aria-label="Accueil">
              <Image src="/favicon.ico" alt="My Legend Team" width={100} height={100} />
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-5xl font-bold text-yellow-500 font-[family-name:var(--font-title)]">My Legend Team</h1>
          </div>
          
          {/* Espace vide pour maintenir l'alignement */}
          <div className="absolute right-0 w-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

