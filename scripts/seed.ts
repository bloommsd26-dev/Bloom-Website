import { connectDB } from '../lib/db/connect';
import { Admin } from '../lib/models/Admin';
import { Program } from '../lib/models/Program';
import { Blog } from '../lib/models/Blog';
import { Impact } from '../lib/models/Impact';
import { Testimonial } from '../lib/models/Testimonial';
import { hashPassword } from '../lib/utils/auth';

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear collections
    await Admin.deleteMany({});
    await Program.deleteMany({});
    await Blog.deleteMany({});
    await Impact.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data');

    // Create super admin user
    const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'ChangeMe123!');
    const superAdmin = await Admin.create({
      name: 'Bloom Super Admin',
      email: process.env.ADMIN_EMAIL || 'bloom.msd26@gmail.com',
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: adminPassword,
      role: 'super_admin',
    });
    console.log('Created super admin user:', superAdmin.email);

    // Create a regular admin for demonstration
    const regularAdminPassword = await hashPassword('RegularAdmin123!');
    const regularAdmin = await Admin.create({
      name: 'Bloom Team Lead',
      email: 'bloom.msd26+lead@gmail.com',
      username: 'lead',
      passwordHash: regularAdminPassword,
      role: 'admin',
    });
    console.log('Created regular admin user:', regularAdmin.email);

    // Create programs
    const programs = [
      {
        title: 'Educational Support & Academic Empowerment',
        slug: 'education',
        focusArea: 'education',
        description: 'Quality education and academic support for underprivileged children',
        longDescription: `We provide comprehensive tutoring, study support, and digital literacy programs to help children excel academically. Our goal is to bridge the educational gap and ensure every child has access to quality learning resources and mentorship.`,
        activities: [
          'One-on-one tutoring',
          'Group study sessions',
          'Study camps during holidays',
          'Digital literacy programs',
          'Academic resource library',
          'Homework support',
        ],
        goals: [
          'Help 500+ children improve academic performance',
          'Build digital literacy skills for the modern world',
          'Create accessible educational resources',
          'Support students in critical subjects',
          'Increase school enrollment and attendance',
        ],
        impact: 'Children gain confidence, improved grades, and better academic opportunities.',
        impactMetrics: {
          childrenReached: 500,
          sessionsConducetd: 150,
          volunteerHours: 450,
        },
        seoTitle: 'Educational Support Programs | Bloom',
        seoDescription:
          'Tutoring, study support, and digital literacy for underprivileged children',
      },
      {
        title: 'Personality Development & Confidence Building',
        slug: 'personality',
        focusArea: 'personality',
        description: 'Build confidence, communication, and leadership skills',
        longDescription: `Through interactive workshops and mentorship, we help children develop the confidence and communication skills needed to succeed. We believe every child has unique talents and abilities waiting to be unlocked.`,
        activities: [
          'Public speaking workshops',
          'Debate clubs and competitions',
          'Leadership training programs',
          'Communication skills workshops',
          'Confidence-building exercises',
          'Motivation and goal-setting',
        ],
        goals: [
          'Train 200+ children in public speaking',
          'Develop young leaders in communities',
          'Build self-confidence and self-esteem',
          'Improve communication abilities',
          'Create support networks',
        ],
        impact:
          'Confident, articulate young people ready to express themselves and take on leadership roles.',
        impactMetrics: {
          childrenReached: 200,
          sessionsConducetd: 100,
          volunteerHours: 300,
        },
        seoTitle: 'Personality Development Programs | Bloom',
        seoDescription:
          'Public speaking, debate, and leadership training for confident young leaders',
      },
      {
        title: 'Creative Expression & Talent Development',
        slug: 'creative',
        focusArea: 'creative',
        description: 'Unlock creativity through art, writing, storytelling, and performance',
        longDescription: `We provide platforms for children to express themselves creatively and develop their artistic talents. Creativity is fundamental to learning, problem-solving, and personal growth.`,
        activities: [
          'Art and painting programs',
          'Writing and storytelling workshops',
          'Theatre and drama classes',
          'Music and performance training',
          'Talent showcase events',
          'Creative competitions',
        ],
        goals: [
          'Support 300+ children in creative pursuits',
          'Create platforms for talent showcase',
          'Build artistic skills and expression',
          'Nurture creative confidence',
          'Preserve cultural heritage',
        ],
        impact:
          'Creative, expressive young people who can communicate their ideas and emotions through art.',
        impactMetrics: {
          childrenReached: 300,
          sessionsConducetd: 120,
          volunteerHours: 360,
        },
        seoTitle: 'Creative Expression Programs | Bloom',
        seoDescription: 'Art, writing, theatre, and talent development programs for young artists',
      },
      {
        title: 'Women Empowerment & Gender Equality',
        slug: 'women',
        focusArea: 'women',
        description: 'Empower girls through education, leadership, and awareness',
        longDescription: `We focus on creating equal opportunities for girls through awareness campaigns, leadership programs, and education initiatives. Gender equality is essential for community development.`,
        activities: [
          'Girl leadership programs',
          'Gender awareness campaigns',
          'Hygiene and health education',
          'Equal opportunity initiatives',
          'Mentorship for girls',
          'Safety and rights awareness',
        ],
        goals: [
          'Empower 400+ girls',
          'Raise awareness about gender equality',
          'Create leadership opportunities for girls',
          'Ensure access to quality education',
          'Build support networks for girls',
        ],
        impact:
          'Empowered girls who understand their rights and have the confidence to pursue their dreams.',
        impactMetrics: {
          childrenReached: 400,
          sessionsConducetd: 110,
          volunteerHours: 330,
        },
        seoTitle: 'Women Empowerment Programs | Bloom',
        seoDescription: 'Girl leadership and gender equality awareness programs',
      },
      {
        title: 'Community Care & Awareness',
        slug: 'community',
        focusArea: 'community',
        description: 'Create community support through donation drives and awareness',
        longDescription: `We organize donation camps and awareness campaigns to address community needs and foster social responsibility. Strong communities are built on mutual care and support.`,
        activities: [
          'Donation camps and drives',
          'Community outreach programs',
          'Awareness campaigns',
          'Health and hygiene education',
          'Relief and support programs',
          'Community engagement events',
        ],
        goals: [
          'Reach 25+ communities',
          'Collect resources for 500+ families',
          'Raise awareness on key social issues',
          'Create culture of giving and sharing',
          'Build community connections',
        ],
        impact:
          'Strong communities supported through sustainable giving and awareness about social issues.',
        impactMetrics: {
          childrenReached: 600,
          sessionsConducetd: 80,
          volunteerHours: 240,
        },
        seoTitle: 'Community Care Programs | Bloom',
        seoDescription: 'Donation camps and community awareness initiatives',
      },
    ];

    await Program.insertMany(programs);
    console.log('Created 5 programs');

    console.log('Skipped demo blog posts. Add real posts from /admin.');

    // Create impact record
    await Impact.create({
      childrenReached: 2500,
      sessionsConducted: 500,
      volunteerHours: 1200,
      donationsCollected: 50000,
      communitiesReached: 25,
      stories: [
        {
          title: "Ravi's Journey: From Failing to Thriving",
          content: 'A 7th grader who struggled with math found confidence through tutoring.',
          image: '/impact/ravi.jpg',
        },
        {
          title: "Priya's Second Chance",
          content:
            'An inconsistent student became a perfect attendee after joining our support program.',
          image: '/impact/priya.jpg',
        },
      ],
      reports: [
        {
          title: 'Bloom Impact Report 2025',
          date: new Date('2025-12-31'),
          url: '/reports/bloom-impact-2025.pdf',
        },
      ],
    });
    console.log('Created impact record');

    // Create testimonials
    const testimonials = [
      {
        name: 'Ravi Kumar',
        role: 'Student',
        quote:
          'Bloom tutoring helped me believe in myself. Now I am among the top students in my class.',
        category: 'student',
        image: '/testimonials/ravi.jpg',
      },
      {
        name: 'Mrs. Sharma',
        role: 'Parent',
        quote:
          'I see a change in my daughter. She is more confident, more engaged, and happier at school.',
        category: 'parent',
        image: '/testimonials/mother.jpg',
      },
      {
        name: 'Priya Singh',
        role: 'Volunteer',
        quote:
          'Volunteering with Bloom has been the most rewarding experience. Watching children grow is incredible.',
        category: 'volunteer',
        image: '/testimonials/priya.jpg',
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Created testimonials');

    console.log('\nDatabase seeding completed successfully!');
    console.log(`
Admin Credentials:
Email: ${process.env.ADMIN_EMAIL || 'bloom.msd26@gmail.com'}
Password: ${process.env.ADMIN_PASSWORD || 'ChangeMe123!'}

Data Created:
- 1 Admin user
- 5 Programs
- 0 Blog posts
- 1 Impact record
- 3 Testimonials

Next steps:
1. Change admin password immediately
2. Update program images in admin panel
3. Publish more blog posts
4. Collect impact stories from community
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
