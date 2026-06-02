'use client';

import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    About: [
      { label: 'Our Mission', href: '/about' },
      { label: 'Our Vision', href: '/about#vision' },
      { label: 'Our Values', href: '/about#values' },
      { label: 'Our Story', href: '/about#story' },
    ],
    Programs: [
      { label: 'Education', href: '/programs?focus=education' },
      { label: 'Personality Development', href: '/programs?focus=personality' },
      { label: 'Creative Expression', href: '/programs?focus=creative' },
      { label: 'Women Empowerment', href: '/programs?focus=women' },
    ],
    Get Involved: [
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
              <div className="text-2xl font-bold text-primary-400">Bloom</div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Students creating meaningful change by empowering children through education, mentorship, and opportunity.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.338 5.338a8 8 0 1013.324 13.324A8 8 0 015.338 5.338zM8 9a1 1 0 100-2 1 1 0 000 2zm1.5 1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
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
