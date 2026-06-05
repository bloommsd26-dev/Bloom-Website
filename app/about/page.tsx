import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';
import Image from 'next/image';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { generateBreadcrumbSchema } from '@/lib/utils/schema';

export const metadata: Metadata = generateMetadata(
  'About Bloom',
  'Learn how Bloom began at Maxfort School and how students turn weekly preparation into dependable community work.'
);

const principles = [
  {
    title: 'Show up prepared',
    description:
      'Every session starts before the visit: prompts, worksheets, roles, and backup activities.',
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Our Story', item: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero: Bold & Asymmetrical with Smooth Edges */}
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="editorial-grid">
            <div className="lg:col-span-6">
              <p className="eyebrow">Our Story</p>
              <h1 className="accent-statement mb-8">A school-born initiative with field notes.</h1>
              <p className="story-copy mb-10 text-espresso/80">
                Bloom began at Maxfort School with students who wanted service to feel less like an
                annual event and more like a dependable habit.
              </p>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-block overflow-hidden group shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Students collaborating around a table"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-block"
                />
              </div>
              <div className="hidden lg:block absolute -bottom-10 -left-10 w-48 h-48 bg-horchata rounded-full -z-10 blur-2xl opacity-60" />
            </div>
          </div>
        </Container>
      </section>

      {/* Origin: Long-form Editorial */}
      <section className="section-padding bg-horchata/10">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Origin</p>
            <h2 className="accent-statement mb-12">It started as a question after school.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-6 text-espresso/70 text-lg">
                <p>
                  We kept seeing the same distance: between children and books, between talent and a
                  stage, between need and someone organized enough to respond. Bloom became our
                  answer to that distance.
                </p>
                <p>
                  Our volunteers learn to teach, sort, explain, document, and lead without turning
                  children into statistics. The work is practical. The feeling is personal.
                </p>
              </div>
              <div className="field-note self-start transform md:translate-y-12">
                <p className="text-xl leading-relaxed italic">
                  The first version was simple: gather students, prepare a session, visit, listen,
                  return. That structure still guides us.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Standard: Staggered Blocks with Smooth Edges */}
      <section className="section-padding bg-white px-4 sm:px-6">
        <Container className="space-y-32">
          <div className="editorial-grid">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-4xl font-bold mb-6 text-espresso">Our Mission</h2>
              <p className="story-copy text-espresso/80">
                To create recurring spaces where children can learn, speak, make, ask, and receive
                practical support from students who prepare carefully and return consistently.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 bg-espresso text-horchata p-12 lg:p-16 transform lg:-rotate-1 rounded-block shadow-2xl">
              <h2 className="font-heading text-4xl font-bold mb-6">Our Standard</h2>
              <p className="text-xl leading-relaxed opacity-90 italic font-accent">
                "If a program cannot be repeated, recorded, and improved, it is not finished. Bloom
                is built for continuity, not just good photographs."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles: List style, with Smooth Interaction */}
      <section className="section-padding bg-horchata/20 border-y border-espresso/5">
        <Container>
          <div className="mb-20">
            <p className="eyebrow text-center">How we work</p>
            <h2 className="accent-statement text-center">The rules we keep returning to.</h2>
          </div>
          <div className="max-w-4xl mx-auto divide-y divide-espresso/10 border-y border-espresso/10">
            {principles.map((principle, idx) => (
              <div
                key={idx}
                className="py-12 group flex flex-col md:flex-row md:items-start gap-6 md:gap-12 px-6 -mx-6 transition-colors hover:bg-white/40 rounded-3xl"
              >
                <span className="font-heading text-4xl font-bold text-cinnamon/20 group-hover:text-cinnamon transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-cinnamon transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-espresso/70 text-lg max-w-2xl">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership: Editorial Split with Smooth Image */}
      <section className="section-padding bg-white">
        <Container>
          <div className="editorial-grid">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
                  alt="Books arranged in a library"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
              <p className="eyebrow">Leadership</p>
              <h2 className="accent-statement mb-8">Led by students, held to standards.</h2>
              <p className="story-copy mb-10 text-espresso/80">
                We are still learning. That is part of the point. Bloom trains students to be useful
                before they are impressive: to listen first, plan properly, and stay accountable
                after the session ends.
              </p>
              <Button variant="outline" size="lg" className="border-espresso text-espresso">
                <Link href="/contact">Talk to the Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA: Large Soft Block */}
      <section className="section-padding bg-horchata text-espresso">
        <Container className="bg-white/40 backdrop-blur-sm p-12 sm:p-24 rounded-block text-center border border-white/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="accent-statement mb-6">Come see the work up close.</h2>
            <p className="story-copy mx-auto mb-10 text-espresso/70">
              The best way to understand Bloom is to join a session, help prepare one, or ask us
              what we learned from the last visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-espresso text-white hover:bg-ink px-12">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-espresso text-espresso px-12">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
