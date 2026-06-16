'use client';

import { useMemo, useState } from 'react';
import { VolunteerDTO } from '@/lib/types';
import { VolunteerStatus, VOLUNTEER_STATUSES } from '@/lib/constants';
import { updateVolunteerStatusAction, deleteVolunteerAction } from '@/lib/actions/admin';
import { DataTable } from '../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface VolunteersClientProps {
  initialVolunteers: VolunteerDTO[];
}

export default function VolunteersClient({ initialVolunteers }: VolunteersClientProps) {
  const [volunteers, setVolunteers] = useState<VolunteerDTO[]>(initialVolunteers);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | VolunteerStatus>('all');
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const selectedVolunteer = useMemo(
    () => volunteers.find((v) => v._id === selectedVolunteerId) || null,
    [volunteers, selectedVolunteerId]
  );

  const filteredVolunteers = useMemo(() => {
    if (statusFilter === 'all') return volunteers;
    return volunteers.filter((v) => v.status === statusFilter);
  }, [volunteers, statusFilter]);

  async function handleUpdateStatus(id: string, status: VolunteerStatus) {
    setIsSaving(true);
    setNotice('');
    setError('');

    try {
      await updateVolunteerStatusAction(id, status);
      setVolunteers((prev) => prev.map((v) => (v._id === id ? { ...v, status } : v)));
      setNotice('Status updated.');
    } catch (err) {
      setError('Failed to update volunteer.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedVolunteerId || !window.confirm('Delete this application permanently?')) return;
    setIsSaving(true);

    try {
      await deleteVolunteerAction(selectedVolunteerId);
      setVolunteers((prev) => prev.filter((v) => v._id !== selectedVolunteerId));
      setNotice('Application deleted.');
      setSelectedVolunteerId(null);
    } catch (err) {
      setError('Failed to delete volunteer.');
    } finally {
      setIsSaving(false);
    }
  }

  const columns: ColumnDef<VolunteerDTO>[] = [
    {
      accessorKey: 'name',
      header: 'Volunteer',
      cell: ({ row }) => <span className="font-bold">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'interests',
      header: 'Interests',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {(row.getValue('interests') as string[]).map((interest) => (
            <span
              key={interest}
              className="px-2 py-0.5 rounded-md bg-horchata/10 text-espresso/60 text-[8px] font-black uppercase tracking-widest"
            >
              {interest}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusColors = {
          pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
          reviewed: 'bg-blue-50 text-blue-700 border-blue-100',
          accepted: 'bg-green-50 text-green-700 border-green-100',
          rejected: 'bg-red-50 text-red-700 border-red-100',
        };
        const status = row.getValue('status') as VolunteerStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[status]}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
          Volunteer Network
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-espresso/30 mr-2">
            Filter:
          </span>
          {(['all', ...VOLUNTEER_STATUSES] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-6 py-2 text-[10px] font-black uppercase tracking-widest transition ${
                statusFilter === status
                  ? 'border-cinnamon bg-cinnamon text-white shadow-lg'
                  : 'border-espresso/10 bg-white text-espresso/40 hover:border-espresso/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <DataTable
            columns={columns}
            data={filteredVolunteers}
            onRowClick={(v) => setSelectedVolunteerId(v._id)}
            selectedRowId={selectedVolunteerId || undefined}
          />
        </div>
        <div className="lg:col-span-4 sticky top-32">
          {selectedVolunteer ? (
            <div className="rounded-4xl border border-espresso/10 bg-white p-8 shadow-sm">
              <div className="mb-8">
                <p className="eyebrow mb-2">Application Details</p>
                <h3 className="font-heading text-2xl font-bold text-espresso">
                  {selectedVolunteer.name}
                </h3>
              </div>

              <div className="space-y-6 mb-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-espresso/30 mb-1">
                      Email
                    </p>
                    <p className="text-sm font-bold text-espresso truncate">
                      {selectedVolunteer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-espresso/30 mb-1">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-espresso tabular-nums">
                      {selectedVolunteer.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-espresso/30 mb-1">
                    Availability
                  </p>
                  <p className="text-sm text-espresso/70">{selectedVolunteer.availability}</p>
                </div>

                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-espresso/30 mb-1">
                    Message
                  </p>
                  <div className="p-4 rounded-2xl bg-horchata/5 border border-espresso/5 text-sm text-espresso/80 leading-relaxed max-h-48 overflow-y-auto italic">
                    "{selectedVolunteer.message}"
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedVolunteer._id, 'accepted')}
                    disabled={isSaving || selectedVolunteer.status === 'accepted'}
                    className="rounded-full bg-espresso text-white py-3 text-[10px] font-black uppercase tracking-widest transition hover:bg-ink disabled:opacity-30"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedVolunteer._id, 'rejected')}
                    disabled={isSaving || selectedVolunteer.status === 'rejected'}
                    className="rounded-full border-2 border-espresso/10 text-espresso py-3 text-[10px] font-black uppercase tracking-widest transition hover:bg-horchata/10 disabled:opacity-30"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="rounded-full bg-red-50 text-red-600 py-3 text-[10px] font-black uppercase tracking-widest transition hover:bg-red-100 disabled:opacity-30"
                >
                  Delete Record
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-4xl border border-dashed border-espresso/10 p-10 text-center">
              <p className="text-sm text-espresso/30 italic">
                Select an application to view details.
              </p>
            </div>
          )}

          {notice && (
            <p className="mt-4 p-4 rounded-2xl bg-green-50 text-green-700 text-xs font-bold border border-green-100">
              {notice}
            </p>
          )}
          {error && (
            <p className="mt-4 p-4 rounded-2xl bg-red-50 text-red-700 text-xs font-bold border border-red-100">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
