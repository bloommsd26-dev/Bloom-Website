import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import type { Metadata } from 'next';
import Image from 'next/image';
import { generateMetadata } from '@/utils/seo';

export const metadata: Metadata = generateMetadata(
  'Our Programs',
  'Explore Bloom\'s five focus areas: Educational Support, Personality Development, Creative Expression, Women Empowerment, and Community Care.'
);

const programsData = [
  {
    title: 'Homework Tables',
    slug: 'education',
    description: 'Small study circles where volunteers work beside children after school.',
    longDescription: 'Homework Tables are deliberately small. A volunteer sits with a few children, opens the notebook, notices where the confusion begins, and builds from there. The goal is not a perfect worksheet. The goal is a child who feels less alone with the page.',
    activities: ['Math help', 'Reading practice', 'Exam prep', 'Study habits', 'Notebook review'],
    goals: [
      'Make study support feel personal',
      'Track recurring gaps across sessions',
      'Build confidence before marks',
      'Create repeatable study routines',
    ],
    impact: 'Children return to schoolwork with clearer basics, steadier habits, and someone they can ask without fear.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Voice Rooms',
    slug: 'personality',
    description: 'A room where children practice speaking before the world asks them to perform.',
    longDescription: 'Voice Rooms are not polished-stage workshops. They are practice spaces: one sentence today, a two-minute speech next week, a debate the week after. Children learn that confidence can be rehearsed.',
    activities: ['Public speaking', 'Debate prompts', 'Story circles', 'Role-play', 'Peer feedback'],
    goals: [
      'Help shy children speak safely',
      'Turn listening into leadership',
      'Make mistakes feel survivable',
      'Build voice through repetition',
    ],
    impact: 'Children who once avoided the front of the room begin volunteering for the first line.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Blank Page Labs',
    slug: 'creative',
    description: 'Art, writing, theatre, and storytelling for children who need a place to begin.',
    longDescription: 'Blank Page Labs start with the simplest invitation: make something. A scene, a sketch, a poem, a cardboard prop. The work is playful, but the outcome is serious: children learn that their imagination deserves space.',
    activities: ['Art sessions', 'Writing prompts', 'Storytelling', 'Theatre games', 'Showcases'],
    goals: [
      'Give quiet talent a platform',
      'Build expression beyond academics',
      'Make creativity low-cost and accessible',
      'Celebrate process, not polish',
    ],
    impact: 'Children leave with something they made and the feeling that their ideas can take shape.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Girls Who Lead',
    slug: 'women',
    description: 'Confidence, health, rights, and leadership sessions built for girls.',
    longDescription: 'Girls Who Lead is about everyday power: asking questions, understanding health, naming unfairness, and stepping into responsibility. We pair practical awareness with mentorship so girls are not just included, but heard.',
    activities: ['Leadership circles', 'Rights awareness', 'Health education', 'Mentorship', 'Peer support'],
    goals: [
      'Help girls take up space',
      'Create peer support networks',
      'Make sensitive topics easier to ask about',
      'Build visible young leaders',
    ],
    impact: 'Girls begin leading discussions, asking sharper questions, and seeing themselves as decision-makers.',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Care Drives',
    slug: 'community',
    description: 'Donation and awareness drives run with planning, sorting, and follow-through.',
    longDescription: 'Care Drives are not about collecting random piles of things. We collect what can actually be used, sort it carefully, record it, and connect it to families and children who need practical support.',
    activities: ['Collection drives', 'Sorting days', 'Community outreach', 'Awareness walks', 'Distribution logs'],
    goals: [
      'Reduce waste through useful reuse',
      'Match donations to real needs',
      'Train volunteers in logistics',
      'Make giving accountable',
    ],
    impact: 'Families receive usable materials, and volunteers learn the discipline behind care.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">What we run</p>
            <h1 className="font-heading text-5xl sm:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Five formats. Many rooms. One promise.
            </h1>
            <p className="story-copy text-xl">
              Bloom programs are designed for real rooms: noisy, uneven, full of different ages, and always worth returning to.
            </p>
          </div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Programs with a working rhythm"
            description="Every format has a purpose, a prep list, and a follow-up note. That is how a student-led initiative becomes dependable."
            align="center"
          />
          <div className="space-y-12">
            {programsData.map((program, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-neutral-200 last:border-b-0`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
                        {program.title}
                      </h2>
                      <p className="story-copy mb-6">
                        {program.longDescription}
                      </p>

                      <div className="mb-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">Key Activities</h3>
                        <ul className="space-y-2">
                          {program.activities.map((activity, i) => (
                            <li key={i} className="flex items-center gap-3 text-neutral-600">
                              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                        <p className="font-accent text-sm font-bold text-primary-900 leading-relaxed">
                          <span className="font-bold">Impact:</span> {program.impact}
                        </p>
                      </div>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative h-80 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
                        {program.title}
                      </h2>
                      <p className="story-copy mb-6">
                        {program.longDescription}
                      </p>

                      <div className="mb-6">
                        <h3 className="font-semibold text-neutral-900 mb-3">Key Activities</h3>
                        <ul className="space-y-2">
                          {program.activities.map((activity, i) => (
                            <li key={i} className="flex items-center gap-3 text-neutral-600">
                              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                        <p className="font-accent text-sm font-bold text-primary-900 leading-relaxed">
                          <span className="font-bold">Impact:</span> {program.impact}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
