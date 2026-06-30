import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getTasks } from "../api/taskApi";
import type { Task } from "../api/taskApi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Calendar.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const PRIORITY_COLORS: Record<string, string> = {
  High: "#ef4444",
  Medium: "#d97706",
  Low: "#2563eb",
};

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"Day" | "Week" | "Month">("Month");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Build a Mon-Sun grid covering the full month
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  // JS getDay(): 0=Sun..6=Sat. Convert to Mon-first index (0=Mon..6=Sun)
  const mondayIndex = (d: number) => (d === 0 ? 6 : d - 1);

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - mondayIndex(firstOfMonth.getDay()));

  const gridEnd = new Date(lastOfMonth);
  gridEnd.setDate(lastOfMonth.getDate() + (6 - mondayIndex(lastOfMonth.getDay())));

  const days: Date[] = [];
  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  const tasksByDate: Record<string, Task[]> = {};
  tasks.forEach((task) => {
    if (!task.schedule) return;
    const d = new Date(task.schedule);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!tasksByDate[key]) tasksByDate[key] = [];
    tasksByDate[key].push(task);
  });

  const getTasksForDay = (day: Date) => {
    const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    return tasksByDate[key] || [];
  };

  const isCurrentMonth = (day: Date) => day.getMonth() === month;

  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    );
  };

  const tasksThisMonth = tasks.filter((task) => {
    if (!task.schedule) return false;
    const d = new Date(task.schedule);
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="calendar-page">
        <div className="calendar-header">
          <div>
            <div className="month-nav">
              <button onClick={goToPrevMonth} className="nav-btn">
                <ChevronLeft size={18} />
              </button>
              <h1>
                {MONTH_NAMES[month]} {year}
              </h1>
              <button onClick={goToNextMonth} className="nav-btn">
                <ChevronRight size={18} />
              </button>
            </div>
            <p>{tasksThisMonth} tasks scheduled this month</p>
          </div>

          <div className="view-toggle">
            {(["Day", "Week", "Month"] as const).map((v) => (
              <button
                key={v}
                className={view === v ? "view-btn active" : "view-btn"}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-grid-wrapper">
          <div className="calendar-day-headers">
            {DAY_HEADERS.map((d) => (
              <div key={d} className="day-header-cell">
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {days.map((day, index) => {
              const dayTasks = getTasksForDay(day);
              const visibleTasks = dayTasks.slice(0, 1);
              const extraCount = dayTasks.length - visibleTasks.length;

              return (
                <div
                  key={index}
                  className={
                    "calendar-cell" +
                    (!isCurrentMonth(day) ? " muted" : "") +
                    (isToday(day) ? " today" : "")
                  }
                >
                  <span className="day-number">{day.getDate()}</span>

                  <div className="day-events">
                    {visibleTasks.map((task) => (
                      <div
                        key={task._id}
                        className="event-badge"
                        style={{
                          background: `${PRIORITY_COLORS[task.priority]}1A`,
                          color: PRIORITY_COLORS[task.priority],
                        }}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}

                    {extraCount > 0 && (
                      <div className="event-dots">
                        {dayTasks.slice(1, 4).map((task) => (
                          <span
                            key={task._id}
                            className="event-dot"
                            style={{
                              background: PRIORITY_COLORS[task.priority],
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}