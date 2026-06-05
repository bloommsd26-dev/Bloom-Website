'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

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
      a: 'Yes. We run regular Care Drives for notebooks, storybooks, and creative supplies. Check our "Donate" page for currently needed items.',
    },
    {
      q: 'Is Bloom a registered NGO?',
      a: 'Bloom is a student-led initiative from Maxfort School. We operate with full transparency and are held accountable to our community standards.',
    },
  ];

  return (
    <>
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Get in Touch</p>
            <h1 className="accent-statement mb-8 text-5xl sm:text-7xl">
              Let's talk about <br />
              <span className="italic font-accent font-normal text-cinnamon">the work.</span>
            </h1>
            <p className="story-copy">
              Whether you want to partner with us, ask about our records, or join a session—we are
              here to respond.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-horchata/10 border-y border-espresso/5">
        <Container>
          <div className="editorial-grid items-start">
            <div className="lg:col-span-5">
              <div className="bg-white p-8 sm:p-12 border border-espresso/10">
                <h2 className="font-heading text-3xl font-bold mb-10">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
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
                      className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
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
                      className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
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
                      className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
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
                      className="w-full border border-espresso/10 p-4 focus:border-cinnamon outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 text-lg"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>

                  {message && (
                    <p
                      className={`text-center text-sm font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-16">
                <div>
                  <p className="eyebrow">Common Questions</p>
                  <div className="divide-y divide-espresso/10 border-t border-espresso/10 mt-6">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="py-8 group">
                        <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-cinnamon transition-colors tabular-nums">
                          0{idx + 1}. {faq.q}
                        </h3>
                        <p className="text-espresso/70 leading-relaxed text-lg">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-espresso text-horchata p-10 transform lg:rotate-1">
                  <h3 className="font-heading text-2xl font-bold mb-6">Bloom Tech Team</h3>
                  <p className="opacity-80 mb-8">
                    For technical inquiries or website feedback, you can reach out to our digital
                    leads at:
                  </p>
                  <Link
                    href="mailto:tech@bloom.org"
                    className="text-cinnamon font-bold text-xl hover:underline"
                  >
                    tech@bloom.org
                  </Link>
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
            <div className="flex justify-center gap-12 mt-8">
              {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="font-heading text-2xl font-black uppercase tracking-tighter hover:text-cinnamon transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
