'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { generateBreadcrumbSchema } from '@/lib/utils/schema';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Contact', item: '/contact' },
  ]);

  const faqs = [
    {
      q: 'How can I join as a volunteer?',
      a: 'We have a formal application process. Start by filling out the volunteer form on our website. We prioritize students who can commit to weekly sessions.',
    },
    {
      q: 'Where do the sessions take place?',
      a: 'We work in various community centers and local schools across Delhi. Specific locations are shared with volunteers after training.',
    },
    {
      q: 'Can I donate items instead of money?',
      a: 'Yes. We run regular Care Drives for notebooks, storybooks, and creative supplies. Contact us directly to know about current collection points.',
    },
    {
      q: 'Is Bloom a registered NGO?',
      a: 'Bloom is a student-led initiative from Maxfort School. We operate with full transparency and are held accountable to our community standards.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Get in Touch</p>
            <h1 className="accent-statement mb-8 text-5xl sm:text-7xl leading-tight">
              Let's talk about <br />
              <span className="italic font-accent font-normal text-cinnamon underline decoration-horchata decoration-4 underline-offset-8">
                the work.
              </span>
            </h1>
            <p className="story-copy text-espresso/80">
              Whether you want to partner with us, ask about our records, or join a session—we are
              here to respond.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-horchata/10 border-y border-espresso/5 px-4 sm:px-6">
        <Container className="bg-white p-12 sm:p-24 rounded-block shadow-2xl border border-horchata/50">
          <div className="editorial-grid items-start">
            <div className="lg:col-span-5">
              <div className="space-y-12">
                <h2 className="accent-statement">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full bg-horchata/5 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full bg-horchata/5 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="subject"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-horchata/5 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      How can we help?
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="w-full bg-horchata/5 border-2 border-horchata p-6 rounded-3xl focus:border-cinnamon outline-none transition-all resize-none text-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-6 text-xl shadow-lg"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>

                  {message && (
                    <div
                      className={`p-6 rounded-3xl text-center text-sm font-bold ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                    >
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-20 lg:pl-10">
                <div>
                  <p className="eyebrow">Common Questions</p>
                  <div className="divide-y divide-espresso/10 border-t border-espresso/10 mt-8">
                    {faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="py-8 group hover:bg-horchata/5 transition-colors px-4 -mx-4 rounded-2xl"
                      >
                        <h3 className="font-heading text-xl font-bold mb-4 group-hover:text-cinnamon transition-colors tabular-nums">
                          0{idx + 1}. {faq.q}
                        </h3>
                        <p className="text-espresso/70 leading-relaxed text-lg">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-espresso text-horchata p-10 sm:p-12 rounded-block shadow-xl relative overflow-hidden transform lg:rotate-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cinnamon/20 rounded-full blur-2xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl font-bold mb-6">Bloom Tech Team</h3>
                    <p className="opacity-80 mb-10 text-lg">
                      For technical inquiries or website feedback, you can reach out to our digital
                      leads:
                    </p>
                    <Link
                      href="mailto:bloom.msd26@gmail.com"
                      className="text-cinnamon font-black text-2xl hover:underline underline-offset-8"
                    >
                      bloom.msd26@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Socials / Footer Intro */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center">
            <p className="eyebrow">Find us online</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12">
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
                  className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tighter hover:text-cinnamon transition-all hover:scale-110"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
