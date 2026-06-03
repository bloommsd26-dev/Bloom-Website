'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ProgramCard } from '@/components/cards/Card';
import { ImpactCounter } from '@/components/cards/ImpactCounter';

const programs = [
  {
    title: 'Homework Tables',
    description: 'Small after-school circles where volunteers sit beside children, not above them.',
    activities: ['Math help', 'Reading practice', 'Exam prep', 'Study habits'],
  },
  {
    title: 'Voice Rooms',
    description: 'A safe place to speak, debate, perform, stumble, laugh, and try again.',
    activities: ['Public speaking', 'Debate', 'Story circles', 'Confidence drills'],
  },
  {
    title: 'Blank Page Labs',
    description: 'Art, theatre, writing, and storytelling sessions built around what children already carry inside them.',
    activities: ['Art', 'Theatre', 'Writing', 'Showcases'],
  },
  {
    title: 'Girls Who Lead',
    description: 'Workshops where girls learn rights, health, confidence, and how to take up space.',
    activities: ['Leadership', 'Awareness', 'Health education', 'Mentorship'],
  },
  {
    title: 'Care Drives',
    description: 'Useful donation drives and neighborhood outreach planned like real operations, not photo-ops.',
    activities: ['Collection drives', 'Outreach', 'Awareness', 'Distribution'],
  },
];

const fieldNotes = [
  {
    label: 'A session starts with names',
    text: 'No child is a number on a poster. We begin by learning who is in the room.',
  },
  {
    label: 'Volunteers prepare like teachers',
    text: 'Worksheets, reading prompts, activity kits, and backup plans come before the visit.',
  },
  {
    label: 'Impact is written down',
    text: 'Attendance, stories, gaps, and next steps are tracked so care does not depend on memory.',
  },
];

export default function Home() {
  return (
    <>
      <section className="pt-20 pb-32 bg-gradient-to-b from-primary-50 via-white to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center animate-fadeInUp">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-widest mb-6">
                Maxfort students, Delhi communities
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Not charity.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  A weekly promise.
                </span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Bloom is a student-run initiative from Maxfort School that shows up for children through study circles, confidence rooms, creative labs, and care drives. We do the small work repeatedly until it becomes trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  <Link href="/volunteer">Join a Session</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/about">Read Our Story</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg border border-primary-200 bg-white p-6 shadow-lg rotate-1">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-4">
                  This week's board
                </p>
                <div className="space-y-4">
                  {[
                    ['Monday', 'Reading circle: 18 children, 6 volunteers'],
                    ['Wednesday', 'Debate prompt: Should every child get a library card?'],
                    ['Saturday', 'Care drive sorting: notebooks, pencils, storybooks'],
                  ].map(([day, task]) => (
                    <div key={day} className="border-l-4 border-primary-600 pl-4">
                      <p className="font-bold text-neutral-900">{day}</p>
                      <p className="text-neutral-600">{task}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-secondary-50 border border-secondary-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-neutral-900">Field note</p>
                  <p className="text-neutral-600 text-sm">
                    The best moment is usually quiet: a child asking for one more page, one more sum, one more chance.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden sm:block bg-primary-600 text-white rounded-lg px-5 py-4 shadow-lg -rotate-2">
                <p className="text-3xl font-bold">2500+</p>
                <p className="text-sm">children reached</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            subtitle="The ledger"
            title="Numbers we can stand behind"
            description="These are not decoration. They are the records that help us plan the next visit better."
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

      <section className="section-padding">
        <Container>
          <SectionHeader
            subtitle="What we actually run"
            title="Programs with fingerprints on them"
            description="Each format is built for rooms full of real children, limited time, and volunteers who are learning to lead while serving."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard
                key={program.title}
                title={program.title}
                description={program.description}
                activities={program.activities}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {programs.slice(3).map((program) => (
              <ProgramCard
                key={program.title}
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

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            subtitle="The Bloom method"
            title="How we keep it human"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fieldNotes.map((note, index) => (
              <div
                key={note.label}
                className="p-6 bg-white rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-primary-600 font-semibold uppercase tracking-wide mb-3">
                  Note {index + 1}
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{note.label}</h3>
                <p className="text-neutral-600">{note.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">Why Bloom feels different</h2>
              <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                We are close enough to notice the small things: who stopped raising their hand, who needs a quieter explanation, who secretly wants to perform but needs a friend beside them first.
              </p>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                That is why Bloom is not built around one grand campaign. It is built around repeat visits, prepared volunteers, honest records, and children who know we will come back.
              </p>
              <Button>
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-8 border border-primary-200">
              <div className="grid grid-cols-2 gap-4">
                {['chalk dust', 'borrowed books', 'debate slips', 'paint hands'].map((item) => (
                  <div key={item} className="aspect-square bg-white rounded-lg border border-neutral-200 flex items-center justify-center p-4 text-center">
                    <span className="text-neutral-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Come with prepared hands.</h2>
            <p className="text-lg mb-8 opacity-90">
              Volunteer for the work behind the photo: planning, listening, teaching, sorting, recording, and returning.
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
