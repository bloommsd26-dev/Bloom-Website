'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    About: [
      { label: 'How We Work', href: '/about' },
      { label: 'Our Standard', href: '/about' },
      { label: 'Leadership', href: '/about' },
    ],
    Programs: [
      { label: 'Homework Tables', href: '/programs' },
      { label: 'Voice Rooms', href: '/programs' },
      { label: 'Blank Page Labs', href: '/programs' },
    ],
    'Get Involved': [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Partner', href: '/contact' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Impact', href: '/impact' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-espresso text-horchata/90 border-t border-white/5">
      <Container className="py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative w-8 h-8 transition-transform group-hover:scale-110 duration-500">
                <Image
                  src="/favicon.png"
                  alt="Bloom Logo"
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <div className="font-heading text-3xl font-black uppercase tracking-tighter text-white">
                Bloom
              </div>
            </Link>
            <p className="story-copy text-sm opacity-60 max-w-sm mb-8">
              A student-led initiative from Maxfort School showing up weekly with notebooks,
              prompts, and a promise to return.
            </p>
            <div className="flex gap-8">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/bloom_msd' },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/bloom-maxfort-school-dwarka-246594413',
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-cinnamon transition-colors"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold hover:text-cinnamon transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            &copy; {currentYear} Bloom. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <Link href="#" className="hover:text-cinnamon transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-cinnamon transition-colors">
              Terms
            </Link>
            <Link href="/admin" className="hover:text-cinnamon transition-colors italic">
              Internal Access
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
