import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ProgramCard } from '@/components/cards/Card';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';

export const metadata: Metadata = generateMetadata(
  'Our Programs',
  'Explore Bloom\'s five focus areas: Educational Support, Personality Development, Creative Expression, Women Empowerment, and Community Care.'
);

const programsData = [
  {
    title: 'Educational Support & Academic Empowerment',
    slug: 'education',
    description: 'Quality education and academic support for underprivileged children',
    longDescription: 'We provide comprehensive tutoring, study support, and digital literacy programs to help children excel academically.',
    activities: ['Tutoring Sessions', 'Study Camps', 'Digital Literacy', 'Academic Resources', 'Homework Support'],
    goals: [
      'Help 500+ children improve academic performance',
      'Build digital literacy skills for the modern world',
      'Create accessible educational resources',
      'Support students in critical subjects',
    ],
    impact: 'Improved grades, increased confidence, and better academic opportunities for children in underserved communities.',
  },
  {
    title: 'Personality Development & Confidence Building',
    slug: 'personality',
    description: 'Build confidence, communication, and leadership skills',
    longDescription: 'Through interactive workshops and mentorship, we help children develop the confidence and communication skills needed to succeed.',
    activities: ['Public Speaking Workshops', 'Debate Clubs', 'Leadership Training', 'Communication Skills', 'Confidence Building'],
    goals: [
      'Train 200+ children in public speaking',
      'Develop young leaders',
      'Build self-confidence',
      'Improve communication abilities',
    ],
    impact: 'Confident, articulate young people ready to express themselves and take on leadership roles.',
  },
  {
    title: 'Creative Expression & Talent Development',
    slug: 'creative',
    description: 'Unlock creativity through art, writing, storytelling, and performance',
    longDescription: 'We provide platforms for children to express themselves creatively and develop their artistic talents.',
    activities: ['Art Programs', 'Writing Workshops', 'Storytelling Circles', 'Theatre & Performance', 'Talent Showcases'],
    goals: [
      'Support 300+ children in creative pursuits',
      'Create platforms for talent showcase',
      'Build artistic skills and expression',
      'Nurture creative confidence',
    ],
    impact: 'Creative, expressive young people who can communicate their ideas and emotions through art.',
  },
  {
    title: 'Women Empowerment & Gender Equality',
    slug: 'women',
    description: 'Empower girls through education, leadership, and awareness',
    longDescription: 'We focus on creating equal opportunities for girls through awareness campaigns, leadership programs, and education initiatives.',
    activities: ['Girl Leadership Programs', 'Awareness Campaigns', 'Hygiene Education', 'Equal Opportunity Initiatives', 'Mentorship'],
    goals: [
      'Empower 400+ girls',
      'Raise awareness about gender equality',
      'Create leadership opportunities',
      'Ensure access to quality education',
    ],
    impact: 'Empowered girls who understand their rights and have the confidence to pursue their dreams.',
  },
  {
    title: 'Community Care & Awareness',
    slug: 'community',
    description: 'Create community support through donation drives and awareness',
    longDescription: 'We organize donation camps and awareness campaigns to address community needs and foster social responsibility.',
    activities: ['Donation Drives', 'Community Outreach', 'Awareness Campaigns', 'Health Education', 'Relief Programs'],
    goals: [
      'Reach 25+ communities',
      'Collect resources for 500+ families',
      'Raise awareness on key issues',
      'Create culture of giving',
    ],
    impact: 'Strong communities supported through sustainable giving and awareness about social issues.',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Our Work</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Five Focus Areas, One Mission
            </h1>
            <p className="text-xl text-neutral-600">
              Through five comprehensive programs, we address different aspects of child development and community needs.
            </p>
          </div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Comprehensive Programs"
            description="Each program is designed to address specific needs in our community while building skills, confidence, and opportunity."
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
                      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                        {program.title}
                      </h2>
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
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
                        <p className="text-sm font-semibold text-primary-900">
                          <span className="font-bold">Impact:</span> {program.impact}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-80 rounded-lg flex items-center justify-center text-neutral-400">
                      <span>{program.title} Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-80 rounded-lg flex items-center justify-center text-neutral-400">
                      <span>{program.title} Image</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                        {program.title}
                      </h2>
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
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
                        <p className="text-sm font-semibold text-primary-900">
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
