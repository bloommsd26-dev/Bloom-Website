'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Color palette derived from Bloom theme
const COLORS = ['#965420', '#C37A47', '#E0A96D', '#F4D03F', '#4A5568'];
const STATUS_COLORS: Record<string, string> = {
  accepted: '#16a34a',
  pending: '#eab308',
  reviewed: '#3b82f6',
  rejected: '#dc2626',
};

interface ChartDataProps {
  volunteersByStatus: { status: string; count: number }[];
  blogsByCategory: { category: string; count: number }[];
  messagesByDate: { date: string; count: number }[];
}

export function DashboardCharts({ data }: { data: ChartDataProps }) {
  if (!data) return null;

  const { volunteersByStatus, blogsByCategory, messagesByDate } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      {/* Messages Over Time (Area Chart) */}
      <div className="rounded-4xl border border-espresso/10 bg-white p-8 shadow-sm lg:col-span-2">
        <h3 className="font-heading text-xl font-bold text-espresso mb-6">Inbound Messages (Last 30 Days)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={messagesByDate}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#965420" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#965420" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(tick) => {
                  const date = new Date(tick);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#A0AEC0' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#A0AEC0' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
              />
              <Area type="monotone" dataKey="count" stroke="#965420" strokeWidth={3} fillOpacity={1} fill="url(#colorMessages)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volunteers by Status (Pie Chart) */}
      <div className="rounded-4xl border border-espresso/10 bg-white p-8 shadow-sm">
        <h3 className="font-heading text-xl font-bold text-espresso mb-6">Volunteer Pipeline</h3>
        <div className="h-64 w-full relative flex items-center justify-center">
            {volunteersByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={volunteersByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                    >
                    {volunteersByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value, name) => [value, (name as string).toUpperCase()]}
                    />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-sm text-espresso/40 italic">No volunteer data available.</p>
            )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            {volunteersByStatus.map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[entry.status] || COLORS[index % COLORS.length] }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-espresso/60">{entry.status} ({entry.count})</span>
                </div>
            ))}
        </div>
      </div>

      {/* Blogs by Category (Bar Chart) */}
      <div className="rounded-4xl border border-espresso/10 bg-white p-8 shadow-sm">
        <h3 className="font-heading text-xl font-bold text-espresso mb-6">Content by Category</h3>
        <div className="h-64 w-full">
            {blogsByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={blogsByCategory}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    layout="vertical"
                >
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                    <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A0AEC0' }} width={80} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: 'rgba(150, 84, 32, 0.05)' }}
                    />
                    <Bar dataKey="count" fill="#C37A47" radius={[0, 4, 4, 0]} barSize={20}>
                    {blogsByCategory.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-espresso/40 italic">No published content available.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
