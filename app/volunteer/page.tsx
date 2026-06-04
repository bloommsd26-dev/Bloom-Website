'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const volunteerBenefits = [
  {
    title: 'Prepare before you serve',
    description: 'Help build prompts, worksheets, activity kits, and backup plans before a session begins.',
  },
  {
    title: 'Lead at child-height',
    description: 'Learn how to explain without showing off and guide without taking over.',
  },
  {
    title: 'Listen for what is unsaid',
    description: 'Notice hesitation, confusion, and small breakthroughs that do not announce themselves.',
  },
  {
    title: 'Work like a crew',
    description: "Share roles, carry materials, document outcomes, and make the next volunteer's job easier.",
  },
  {
    title: 'Build useful confidence',
    description: 'Grow through responsibility: planning, showing up, adapting, and returning.',
  },
  {
    title: 'Stay accountable',
    description: 'Volunteer hours become notes, records, and improvements, not just certificates.',
  },
];

const interests = [
  { label: 'Education Support', value: 'education' },
  { label: 'Personality Development', value: 'mentorship' },
  { label: 'Creative Expression', value: 'creative' },
  { label: 'Women Empowerment', value: 'women_empowerment' },
  { label: 'Community Care', value: 'community' },
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    skills: '',
    availability: 'flexible',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          interests: [],
          skills: '',
          availability: 'flexible',
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Volunteer</p>
              <h1 className="font-heading text-5xl sm:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Come ready to do the small work well.
              </h1>
              <p className="story-copy text-xl">
                Bloom volunteers teach, sort, listen, carry, write, explain, and return. If that sounds ordinary, good. Ordinary work done consistently is where trust begins.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                alt="Students planning together"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="What volunteers actually practice"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerBenefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border border-neutral-200">
                <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <Container size="md">
          <SectionHeader
            title="Tell us where you can show up"
            description="We use this form to match you with prep work, sessions, donation logistics, or creative labs."
            align="center"
          />

          <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
            <div className="space-y-6">
              {/* Name */}
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />

              {/* Email */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />

              {/* Phone */}
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
              />

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="space-y-2">
                  {interests.map((interest) => (
                    <label key={interest.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.value)}
                        onChange={() => handleInterestChange(interest.value)}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-neutral-700">{interest.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Skills (optional)
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., explaining math, poster design, sorting supplies, public speaking"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-neutral-700 mb-2">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Tell us how you want to help (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what kind of work you can do consistently..."
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    Thank you for your interest! We'll be in touch soon.
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

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                isLoading={submitStatus === 'loading'}
                className="w-full"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </Container>
      </section>

      {/* Expectations Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="What we ask from volunteers"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3">Commitment</h3>
              <p className="text-neutral-600">
                We ask for regular participation and reliability. Your consistency makes a real difference in children's lives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3">Respect</h3>
              <p className="text-neutral-600">
                Treat children, families, and fellow volunteers with dignity and cultural sensitivity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3">Responsibility</h3>
              <p className="text-neutral-600">
                Take your role seriously and be accountable for your commitments and actions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3">Growth Mindset</h3>
              <p className="text-neutral-600">
                Be open to learning, feedback, and continuously improving your skills.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
