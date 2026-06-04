'use client';

import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    About: [
      { label: 'How We Work', href: '/about' },
      { label: 'Our Standard', href: '/about' },
      { label: 'Student Leadership', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
    ],
    Programs: [
      { label: 'Homework Tables', href: '/programs?focus=education' },
      { label: 'Voice Rooms', href: '/programs?focus=personality' },
      { label: 'Blank Page Labs', href: '/programs?focus=creative' },
      { label: 'Girls Who Lead', href: '/programs?focus=women' },
    ],
    'Get Involved': [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donate', href: '/donate' },
      { label: 'Partner With Us', href: '/contact' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Impact Reports', href: '/impact' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/contact#faqs' },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="font-heading text-2xl font-bold text-primary-400">Bloom</div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Maxfort students showing up weekly with notebooks, prompts, sorted supplies, and a promise to return.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/bloominitiative" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                  <path d="M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2zm0 2A3.8 3.8 0 004 7.8v8.4A3.8 3.8 0 007.8 20h8.4a3.8 3.8 0 003.8-3.8V7.8A3.8 3.8 0 0016.2 4H7.8z" />
                  <path d="M12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-2.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                  <path d="M4.98 3.5a2.5 2.5 0 11-.01 5.01 2.5 2.5 0 01.01-5.01zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V21h-4V9z" />
                </svg>
              </a>
              <a href="mailto:hello@bloom.org" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">Email</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 3.24V18h16V7.24l-8 5.33-8-5.33zM5.2 6l6.8 4.53L18.8 6H5.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
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
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">
            Copyright {currentYear} Bloom. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-400">
            <Link href="#" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
