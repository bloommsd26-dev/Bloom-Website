'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'Our Story' },
    { href: '/programs', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/impact', label: 'Impact' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-espresso/5 bg-white/95 backdrop-blur-sm">
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 duration-500">
              <Image src="/favicon.png" alt="Bloom Logo" fill className="object-contain" priority />
            </div>
            <div className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tighter text-espresso group-hover:text-cinnamon transition-colors">
              Bloom
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-espresso/60 hover:text-cinnamon transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/admin"
              className="text-[10px] font-bold uppercase tracking-widest text-espresso/40 hover:text-cinnamon transition-colors"
            >
              Admin
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-espresso text-espresso hover:bg-espresso hover:text-white"
            >
              <Link href="/volunteer">Volunteer</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-espresso"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-10 space-y-6 pt-6 border-t border-espresso/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading block text-2xl font-bold text-espresso"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-6">
              <Button variant="primary" size="lg" className="w-full">
                <Link href="/volunteer">Volunteer Now</Link>
              </Button>
              <Link
                href="/admin"
                className="text-center text-xs font-bold uppercase tracking-widest text-espresso/40 pt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Access
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
