import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle2, Clock, TrendingUp, Target } from "lucide-react";

import { getTasks } from "../api/taskApi";
import { getGoals } from "../api/goalApi";
import { getSessions } from "../api/studyApi";
import type { Task } from "../api/taskApi";
import type { Goal } from "../api/goalApi";
import type { StudySession } from "../api/studyApi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Analytics.css";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const COLORS = ["#2563eb", "#e5e7eb"];

export default function Analytics() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [taskData, goalData, sessionData] = await Promise.all([
        getTasks(),
        getGoals(),
        getSessions(),
      ]);
      setTasks(taskData);
      setGoals(goalData);
      setSessions(sessionData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // TASK COMPLETION
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const taskPieData = [
    { name: "Completed", value: completedTasks },
    { name: "Remaining", value: totalTasks - completedTasks },
  ];

  // WEEKLY STUDY HOURS (last 7 days, Sun-Sat of current week)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyData = DAY_LABELS.map((label, index) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + index);

    const dayMinutes = sessions
      .filter((s) => {
        const sessionDate = new Date(s.date);
        return (
          sessionDate.getFullYear() === dayDate.getFullYear() &&
          sessionDate.getMonth() === dayDate.getMonth() &&
          sessionDate.getDate() === dayDate.getDate()
        );
      })
      .reduce((sum, s) => sum + s.duration, 0);

    return {
      day: label,
      hours: Math.round((dayMinutes / 60) * 10) / 10,
    };
  });

  const weekMinutes = sessions
    .filter((s) => new Date(s.date) >= startOfWeek)
    .reduce((sum, s) => sum + s.duration, 0);

  const totalStudyMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

  // GOALS PROGRESS
  const completedGoals = goals.filter((g) => g.completed).length;
  const avgGoalProgress =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce(
            (sum, g) =>
              sum + Math.min((g.currentValue / g.targetValue) * 100, 100),
            0
          ) / goals.length
        );

  // PRODUCTIVITY SCORE (weighted: 40% task completion, 30% goal progress, 30% study consistency)
  const studyConsistency = Math.min((weekMinutes / 600) * 100, 100); // 10 hrs/week = 100%

  const productivityScore = Math.round(
    completionRate * 0.4 + avgGoalProgress * 0.3 + studyConsistency * 0.3
  );

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  if (loading) {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <div className="analytics-page">
          <p className="analytics-loading">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="analytics-page">
        <div className="analytics-header">
          <div>
            <h1>Analytics</h1>
            <p>Your productivity insights at a glance</p>
          </div>
        </div>

        {/* TOP METRIC CARDS */}
        <div className="metric-grid">
          <div className="metric-card">
            <div className="metric-icon blue">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h2>{completionRate}%</h2>
              <p>Task Completion Rate</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon green">
              <Clock size={20} />
            </div>
            <div>
              <h2>{formatDuration(weekMinutes)}</h2>
              <p>Study Hours This Week</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon orange">
              <Target size={20} />
            </div>
            <div>
              <h2>{avgGoalProgress}%</h2>
              <p>Avg Goal Progress</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon purple">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2>{productivityScore}</h2>
              <p>Productivity Score</p>
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="chart-grid">
          <div className="chart-card">
            <h3>Weekly Study Hours</h3>
            {sessions.length === 0 ? (
              <p className="chart-empty">No study sessions logged yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} hrs`, "Studied"]} />
                  <Bar dataKey="hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-card">
            <h3>Task Completion</h3>
            {totalTasks === 0 ? (
              <p className="chart-empty">No tasks created yet.</p>
            ) : (
              <div className="pie-wrapper">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={taskPieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={2}
                    >
                      {taskPieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-center-label">
                  <h2>{completionRate}%</h2>
                  <p>Complete</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SUMMARY */}
        <div className="summary-grid">
          <div className="summary-card">
            <h3>Tasks</h3>
            <div className="summary-row">
              <span>Total</span>
              <strong>{totalTasks}</strong>
            </div>
            <div className="summary-row">
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
            <div className="summary-row">
              <span>Pending</span>
              <strong>{totalTasks - completedTasks}</strong>
            </div>
          </div>

          <div className="summary-card">
            <h3>Goals</h3>
            <div className="summary-row">
              <span>Total</span>
              <strong>{goals.length}</strong>
            </div>
            <div className="summary-row">
              <span>Completed</span>
              <strong>{completedGoals}</strong>
            </div>
            <div className="summary-row">
              <span>Avg Progress</span>
              <strong>{avgGoalProgress}%</strong>
            </div>
          </div>

          <div className="summary-card">
            <h3>Study</h3>
            <div className="summary-row">
              <span>Total Sessions</span>
              <strong>{sessions.length}</strong>
            </div>
            <div className="summary-row">
              <span>Total Time</span>
              <strong>{formatDuration(totalStudyMinutes)}</strong>
            </div>
            <div className="summary-row">
              <span>This Week</span>
              <strong>{formatDuration(weekMinutes)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}