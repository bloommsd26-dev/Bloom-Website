'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Contact</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
                Start with a real note.
              </h1>
              <p className="text-xl text-neutral-600">
                Write to us about a session, donation, partnership, report, or idea. The more specific you are, the faster we can route it to the right student team.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
                alt="Students writing and planning together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Email</h3>
                <a href="mailto:hello@bloom.org" className="text-primary-600 hover:text-primary-700">
                  hello@bloom.org
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Location</h3>
                <p className="text-neutral-600">
                  Maxfort School
                  <br />
                  New Delhi, India
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com/bloominitiative" className="text-neutral-600 hover:text-primary-600">
                    Instagram
                  </a>
                  <a href="https://linkedin.com" className="text-neutral-600 hover:text-primary-600">
                    LinkedIn
                  </a>
                  <a href="mailto:hello@bloom.org" className="text-neutral-600 hover:text-primary-600">
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                <div className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Session, donation, partnership, report..."
                  />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us what you need, where you are writing from, and what timeline matters..."
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={5}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        Thank you for your message. We will route it to the right Bloom team.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={submitStatus === 'loading'}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="Before you write"
            description="A little context helps us respond with something useful."
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How do I volunteer with Bloom?',
                a: 'Use the Volunteer page and tell us what work you can do consistently. We match people with session prep, teaching support, creative labs, or donation logistics.',
              },
              {
                q: 'What should I donate?',
                a: 'Clean, usable items only: books, stationery, uniforms, bags, working devices, and essentials. If it needs repair before use, please repair it first.',
              },
              {
                q: 'Can an organization partner with Bloom?',
                a: 'Yes. Write with the location, age group, available dates, and the kind of support needed so our student team can assess fit.',
              },
              {
                q: 'Can I request impact records?',
                a: 'Yes. We can share session summaries, volunteer-hour records, donation logs, and program notes with partners and supporters.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
