import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { Modal } from './ui'
import { MapPin, Clock, User, CalendarDays } from 'lucide-react'

export default function CalendarView({ events }) {
  const [selected, setSelected] = useState(null)

  const calendarEvents = events.map(e => ({
    id: String(e.id),
    title: e.title,
    date: e.event_date,
    extendedProps: e,
    backgroundColor: getEventColor(e),
    borderColor: getEventColor(e),
  }))

  function getEventColor(e) {
    const targetType = e.targets?.[0]?.target_type
    if (targetType === 'COLLEGE') return '#7c3aed'
    if (targetType === 'DEPARTMENT') return '#2563eb'
    return '#16a34a'
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-purple-600 inline-block" />College
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" />Department
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-green-600 inline-block" />Class
          </span>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          events={calendarEvents}
          eventClick={({ event }) => setSelected(event.extendedProps)}
          height="auto"
        />
      </div>

      {selected && (
        <Modal open={!!selected} onClose={() => setSelected(null)} title="Event Details">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selected.title}</h2>
            {selected.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{selected.description}</p>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CalendarDays size={14} />
                <span>{selected.event_date}</span>
              </div>
              {(selected.start_time || selected.end_time) && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock size={14} />
                  <span>{selected.start_time} {selected.end_time && `— ${selected.end_time}`}</span>
                </div>
              )}
              {selected.venue && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={14} />
                  <span>{selected.venue}</span>
                </div>
              )}
              {selected.creator_name && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <User size={14} />
                  <span>{selected.creator_name}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selected.targets?.map((t, i) => (
                <span key={i} className={`text-xs px-2 py-1 rounded-md font-medium ${
                  t.target_type === 'COLLEGE' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                  t.target_type === 'DEPARTMENT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {t.target_type}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
