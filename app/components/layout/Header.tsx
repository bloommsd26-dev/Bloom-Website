'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/blog', label: 'Blog' },
    { href: '/impact', label: 'Impact' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary-600">Bloom</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Link href="/volunteer">Volunteer</Link>
            </Button>
            <Button size="sm">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-neutral-200 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button size="sm" className="flex-1">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
