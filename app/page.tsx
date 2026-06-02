'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ProgramCard } from '@/components/cards/Card';
import { ImpactCounter } from '@/components/cards/ImpactCounter';
import { Suspense } from 'react';

const programs = [
  {
    title: 'Educational Support',
    description: 'Tutoring, study support, and digital literacy programs for underprivileged children.',
    activities: ['Tutoring', 'Study Camps', 'Digital Literacy', 'Academic Resources'],
    focusArea: 'education',
  },
  {
    title: 'Personality Development',
    description: 'Build confidence through public speaking, debate, and leadership training.',
    activities: ['Public Speaking', 'Debate', 'Leadership', 'Communication Skills'],
    focusArea: 'personality',
  },
  {
    title: 'Creative Expression',
    description: 'Unleash creativity through art, storytelling, writing, and theatre programs.',
    activities: ['Art', 'Storytelling', 'Writing', 'Theatre'],
    focusArea: 'creative',
  },
  {
    title: 'Women Empowerment',
    description: 'Awareness and leadership programs for girls to ensure equal opportunities.',
    activities: ['Leadership', 'Awareness', 'Hygiene Education', 'Equal Opportunities'],
    focusArea: 'women',
  },
  {
    title: 'Community Care',
    description: 'Donation drives and awareness campaigns to support local communities.',
    activities: ['Donation Drives', 'Outreach', 'Awareness', 'Health Education'],
    focusArea: 'community',
  },
];

const coreValues = [
  { title: 'Empowerment', description: 'Enabling children to reach their full potential' },
  { title: 'Compassion', description: 'Serving with genuine care and empathy' },
  { title: 'Creativity', description: 'Fostering innovation and creative thinking' },
  { title: 'Leadership', description: 'Developing leaders who serve others' },
  { title: 'Integrity', description: 'Operating with honesty and transparency' },
  { title: 'Inclusion', description: 'Ensuring opportunities for all' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-primary-50 via-white to-white">
        <Container className="text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-6">
              Student-Led Social Impact
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Every child deserves to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                bloom
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Students creating meaningful change by empowering children through education, mentorship, and creative opportunities. Because great things happen when young people lead with purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Link href="/volunteer">Get Involved</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Stats Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            subtitle="Our Impact"
            title="Growing Every Day"
            description="Together, we're building a movement of young leaders creating real change in their communities."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <ImpactCounter number={2500} label="Children Reached" />
            <ImpactCounter number={150} label="Active Volunteers" />
            <ImpactCounter number={500} label="Sessions Conducted" />
            <ImpactCounter number={1200} label="Volunteer Hours" />
            <ImpactCounter number={25} label="Communities Served" />
          </div>
        </Container>
      </section>

      {/* Programs Section */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            subtitle="Our Programs"
            title="Five Focus Areas"
            description="We work across multiple areas to create comprehensive impact in our communities."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                description={program.description}
                activities={program.activities}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {programs.slice(3).map((program, index) => (
              <ProgramCard
                key={index + 3}
                title={program.title}
                description={program.description}
                activities={program.activities}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            subtitle="Core Values"
            title="What We Stand For"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Mission Section */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                To reach underprivileged children in our community and provide them access to education, mentorship, and a platform to express themselves.
              </p>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                We believe every child deserves the chance to learn, grow, and thrive — regardless of their background. Through structured programs and passionate volunteers, we're making that belief a reality.
              </p>
              <Button>
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-80 rounded-lg flex items-center justify-center text-neutral-400">
              <span className="text-6xl">Bloom Logo/Image</span>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our community of student leaders and volunteers making real change in our schools and neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/volunteer">Volunteer Now</Link>
              </Button>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                <Link href="/donate">Support Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
