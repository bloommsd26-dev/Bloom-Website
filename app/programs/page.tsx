import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';
import Image from 'next/image';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = generateMetadata(
  'Our Programs',
  "Explore Bloom's five focus areas: Educational Support, Personality Development, Creative Expression, Women Empowerment, and Community Care."
);

const programsData = [
  {
    title: 'Homework Tables',
    slug: 'education',
    description: 'Small study circles where volunteers work beside children after school.',
    longDescription:
      'Homework Tables are deliberately small. A volunteer sits with a few children, opens the notebook, notices where the confusion begins, and builds from there. The goal is not a perfect worksheet. The goal is a child who feels less alone with the page.',
    activities: ['Math help', 'Reading practice', 'Exam prep', 'Study habits', 'Notebook review'],
    impact:
      'Children return to schoolwork with clearer basics, steadier habits, and someone they can ask without fear.',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Voice Rooms',
    slug: 'personality',
    description: 'A room where children practice speaking before the world asks them to perform.',
    longDescription:
      'Voice Rooms are not polished-stage workshops. They are practice spaces: one sentence today, a two-minute speech next week, a debate the week after. Children learn that confidence can be rehearsed.',
    activities: [
      'Public speaking',
      'Debate prompts',
      'Story circles',
      'Role-play',
      'Peer feedback',
    ],
    impact:
      'Children who once avoided the front of the room begin volunteering for the first line.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Blank Page Labs',
    slug: 'creative',
    description: 'Art, writing, theatre, and storytelling for children who need a place to begin.',
    longDescription:
      'Blank Page Labs start with the simplest invitation: make something. A scene, a sketch, a poem, a cardboard prop. The work is playful, but the outcome is serious: children learn that their imagination deserves space.',
    activities: ['Art sessions', 'Writing prompts', 'Storytelling', 'Theatre games', 'Showcases'],
    impact:
      'Children leave with something they made and the feeling that their ideas can take shape.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Girls Who Lead',
    slug: 'women',
    description: 'Confidence, health, rights, and leadership sessions built for girls.',
    longDescription:
      'Girls Who Lead is about everyday power: asking questions, understanding health, naming unfairness, and stepping into responsibility. We pair practical awareness with mentorship so girls are not just included, but heard.',
    activities: [
      'Leadership circles',
      'Rights awareness',
      'Health education',
      'Mentorship',
      'Peer support',
    ],
    impact:
      'Girls begin leading discussions, asking sharper questions, and seeing themselves as decision-makers.',
    image:
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Care Drives',
    slug: 'community',
    description: 'Donation and awareness drives run with planning, sorting, and follow-through.',
    longDescription:
      'Care Drives are not about collecting random piles of things. We collect what can actually be used, sort it carefully, record it, and connect it to families and children who need practical support.',
    activities: [
      'Collection drives',
      'Sorting days',
      'Community outreach',
      'Awareness walks',
      'Distribution logs',
    ],
    impact: 'Families receive usable materials, and volunteers learn the discipline behind care.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Our Work</p>
            <h1 className="accent-statement mb-8">
              Five formats. Many rooms. One promise.
            </h1>
            <p className="story-copy text-espresso/80">
              Bloom programs are designed for real rooms: noisy, uneven, full of different ages, and
              always worth returning to.
            </p>
          </div>
        </Container>
      </section>

      {/* Programs List */}
      <section className="section-padding bg-horchata/10 border-y border-espresso/5">
        <Container>
          <div className="space-y-40">
            {programsData.map((program, idx) => (
              <div key={idx} className="editorial-grid">
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-square lg:aspect-[3/4] overflow-hidden group rounded-3xl shadow-xl">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <p className="eyebrow">Program 0{idx + 1}</p>
                  <h2 className="accent-statement text-4xl mb-6">{program.title}</h2>
                  <p className="story-copy mb-8 text-espresso/70">{program.longDescription}</p>
                  
                  <div className="mb-10 space-y-4">
                    <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-espresso/40">Activities</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {program.activities.map((act, i) => (
                        <li key={i} className="flex items-baseline gap-3 text-espresso/80">
                          <span className="w-1.5 h-1.5 bg-cinnamon rounded-full" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="field-note">
                    <p className="text-espresso/90 italic">
                      <strong>Impact:</strong> {program.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Join the work */}
      <section className="section-padding bg-white px-4 sm:px-6">
        <Container className="max-w-4xl mx-auto bg-espresso text-horchata p-10 sm:p-24 text-center relative rounded-block overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-cinnamon/20 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="accent-statement text-horchata mb-8">Join the work behind the photo.</h2>
            <p className="story-copy text-horchata/80 mx-auto mb-10">
              We are looking for volunteers who value preparation as much as participation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-cinnamon text-white hover:bg-cinnamon/90 px-12 border-none">
                <Link href="/volunteer">Volunteer Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-horchata text-horchata hover:bg-horchata hover:text-espresso px-12">
                <Link href="/contact">Inquire</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
