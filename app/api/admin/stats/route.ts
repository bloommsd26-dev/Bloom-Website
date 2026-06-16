import { apiHandler } from '@/lib/api/handler';
import { withRole } from '@/lib/middleware/auth';
import { successResponse } from '@/utils/api-response';
import { Blog } from '@/models/Blog';
import { Contact } from '@/models/Contact';
import { Volunteer } from '@/models/Volunteer';
import { Program } from '@/models/Program';
import { subDays } from 'date-fns';

async function getAdminStats() {
  const thirtyDaysAgo = subDays(new Date(), 30);

  const [
    totalBlogs,
    draftBlogs,
    totalMessages,
    newMessages,
    totalVolunteers,
    totalPrograms,
    volunteersByStatus,
    blogsByCategory,
    messagesByDate,
  ] = await Promise.all([
    // Basic counts
    Blog.countDocuments({}),
    Blog.countDocuments({ status: 'draft' }),
    Contact.countDocuments({}),
    Contact.countDocuments({ status: 'new' }),
    Volunteer.countDocuments({}),
    Program.countDocuments({}),

    // Aggregations for charts
    Volunteer.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]),
    Contact.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  // Format aggregations for frontend
  const formattedVolunteersByStatus = volunteersByStatus.map((v) => ({
    status: v._id,
    count: v.count,
  }));

  const formattedBlogsByCategory = blogsByCategory.map((b) => ({
    category: b._id,
    count: b.count,
  }));

  // Fill in missing dates for the last 30 days to make chart continuous
  const formattedMessagesByDate = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i).toISOString().split('T')[0];
    const match = messagesByDate.find((m) => m._id === date);
    formattedMessagesByDate.push({
      date,
      count: match ? match.count : 0,
    });
  }

  return successResponse({
    overview: {
      blogs: {
        total: totalBlogs,
        published: totalBlogs - draftBlogs,
        drafts: draftBlogs,
      },
      messages: {
        total: totalMessages,
        unread: newMessages,
      },
      volunteers: {
        total: totalVolunteers,
      },
      programs: {
        total: totalPrograms,
      },
    },
    charts: {
      volunteersByStatus: formattedVolunteersByStatus,
      blogsByCategory: formattedBlogsByCategory,
      messagesByDate: formattedMessagesByDate,
    },
  });
}

// Role-based auth (admin+ only)
export const GET = apiHandler(withRole('super_admin', 'admin', 'editor', 'viewer')(getAdminStats));
