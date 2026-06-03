import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = generateMetadata(
  'About Bloom',
  'Learn how Bloom began at Maxfort School and how students turn weekly preparation into dependable community work.'
);

const principles = [
  {
    title: 'Show up prepared',
    description: 'Every session starts before the visit: prompts, worksheets, roles, and backup activities.',
  },
  {
    title: 'Notice the quiet child',
    description: 'The child who does not ask is often the one who needs the gentlest invitation.',
  },
  {
    title: 'Write things down',
    description: 'Attendance, gaps, small wins, and next steps are recorded so care can continue.',
  },
  {
    title: 'Return',
    description: 'Trust is not built by one event. It is built by coming back when promised.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">About Bloom</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
                A school-born initiative with field notes.
              </h1>
              <p className="text-xl text-neutral-600">
                Bloom began at Maxfort School with students who wanted service to feel less like an annual event and more like a dependable habit.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Students collaborating around a table"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              subtitle="Origin"
              title="It started as a question after school"
              align="center"
            />
            <div className="prose prose-lg max-w-none text-neutral-600">
              <p>
                We kept seeing the same distance: between children and books, between talent and a stage, between need and someone organized enough to respond. Bloom became our answer to that distance.
              </p>
              <p>
                The first version was simple: gather students, prepare a session, visit, listen, return. That structure still guides us. Bloom is student-led, but it is not casual. We plan like the work matters because it does.
              </p>
              <p>
                Our volunteers learn to teach, sort, explain, document, and lead without turning children into statistics. The work is practical. The feeling is personal.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                To create recurring spaces where children can learn, speak, make, ask, and receive practical support from students who prepare carefully and return consistently.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Standard</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                If a program cannot be repeated, recorded, and improved, it is not finished. Bloom is built for continuity, not just good photographs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeader
            subtitle="How we work"
            title="The rules we keep returning to"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {principles.map((principle) => (
              <div key={principle.title} className="p-8 bg-white rounded-lg border border-neutral-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{principle.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-80 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
                alt="Books arranged in a library"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Leadership</p>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">Led by students, held to standards.</h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                We are still learning. That is part of the point. Bloom trains students to be useful before they are impressive: to listen first, plan properly, and stay accountable after the session ends.
              </p>
              <Button size="lg">
                <Link href="/contact">Talk to the Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Come see the work up close.</h2>
            <p className="text-lg mb-8 opacity-90">
              The best way to understand Bloom is to join a session, help prepare one, or ask us what we learned from the last visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
