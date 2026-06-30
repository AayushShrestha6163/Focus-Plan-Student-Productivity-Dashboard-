import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, BookOpen } from "lucide-react";

import { getSessions, addSession } from "../api/studyApi";
import type { StudySession } from "../api/studyApi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Study.css";

export default function Study() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [saving, setSaving] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const loadSessions = async () => {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStart = () => {
    if (!subject.trim()) {
      setSubjectError("Enter a subject before starting the timer.");
      return;
    }
    setSubjectError("");
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleStop = async () => {
    setIsRunning(false);

    const minutes = Math.round(seconds / 60);

    if (minutes < 1) {
      setSeconds(0);
      return;
    }

    setSaving(true);

    try {
      await addSession({
        subject,
        duration: minutes,
      });

      setSeconds(0);
      setSubject("");
      loadSessions();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  // WEEKLY STATS
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weekSessions = sessions.filter(
    (s) => new Date(s.date) >= startOfWeek
  );

  const weekMinutes = weekSessions.reduce((sum, s) => sum + s.duration, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

  const avgSessionMinutes =
    sessions.length === 0 ? 0 : Math.round(totalMinutes / sessions.length);

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="study-page">
        <div className="study-header">
          <div>
            <h1>Study Tracker</h1>
            <p>Track your focused study sessions</p>
          </div>
        </div>

        {/* TIMER CARD */}
        <div className="timer-card">
          <div className="timer-display">{formatTime(seconds)}</div>

          <div className="timer-subject">
            <input
              type="text"
              placeholder="What are you studying?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isRunning}
            />
          </div>

          {subjectError && <p className="study-error">{subjectError}</p>}

          <div className="timer-controls">
            {!isRunning && seconds === 0 && (
              <button className="timer-btn start" onClick={handleStart}>
                <Play size={18} />
                Start
              </button>
            )}

            {isRunning && (
              <button className="timer-btn pause" onClick={handlePause}>
                <Pause size={18} />
                Pause
              </button>
            )}

            {!isRunning && seconds > 0 && (
              <button className="timer-btn start" onClick={handleResume}>
                <Play size={18} />
                Resume
              </button>
            )}

            {seconds > 0 && (
              <button
                className="timer-btn stop"
                onClick={handleStop}
                disabled={saving}
              >
                <Square size={18} />
                {saving ? "Saving..." : "Stop & Save"}
              </button>
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="study-stats">
          <div className="stat-box blue">
            <h2>{formatDuration(weekMinutes)}</h2>
            <p>THIS WEEK</p>
          </div>

          <div className="stat-box">
            <h2>{formatDuration(totalMinutes)}</h2>
            <p>TOTAL STUDY TIME</p>
          </div>

          <div className="stat-box">
            <h2>{formatDuration(avgSessionMinutes)}</h2>
            <p>AVG SESSION</p>
          </div>
        </div>

        {/* SESSION HISTORY */}
        <div className="session-list">
          <h2 className="section-title">Recent Sessions</h2>

          {sessions.length === 0 && (
            <div className="empty">
              <BookOpen size={32} />
              <h3>No sessions yet</h3>
              <p>Start the timer above to log your first study session.</p>
            </div>
          )}

          {[...sessions]
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((session) => (
              <div className="session-card" key={session._id}>
                <div>
                  <h3>{session.subject}</h3>
                  <p>{formatDate(session.date)}</p>
                </div>

                <span className="duration-badge">
                  {formatDuration(session.duration)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}