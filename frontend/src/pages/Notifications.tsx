import { useEffect, useState, type JSX } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  CheckSquare,
  Target,
  BookOpen,
  Info,
} from "lucide-react";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../api/NotificationApi";
import type { Notification } from "../api/NotificationApi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Notifications.css";

const TYPE_ICON: Record<string, JSX.Element> = {
  task: <CheckSquare size={18} />,
  goal: <Target size={18} />,
  study: <BookOpen size={18} />,
  system: <Info size={18} />,
};

const TYPE_LABEL: Record<string, string> = {
  task: "Task",
  goal: "Goal",
  study: "Study",
  system: "System",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(unread.map((n) => markAsRead(n._id)));
    loadNotifications();
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteNotification(deleteId);
      setDeleteId(null);
      loadNotifications();
    }
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visibleNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="notifications-page">
        <div className="notifications-header">
          <div>
            <h1>Notifications</h1>
            <p>
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up"}
            </p>
          </div>

          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={handleMarkAllRead}>
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
        </div>

        <div className="notif-filter-tabs">
          <button
            className={filter === "all" ? "tab active" : "tab"}
            onClick={() => setFilter("all")}
          >
            All ({notifications.length})
          </button>
          <button
            className={filter === "unread" ? "tab active" : "tab"}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        <div className="notif-list">
          {visibleNotifications.length === 0 && (
            <div className="empty">
              <Bell size={32} />
              <h3>No notifications</h3>
              <p>
                {filter === "unread"
                  ? "You've read everything."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          )}

          {visibleNotifications.map((notif) => (
            <div
              key={notif._id}
              className={notif.read ? "notif-card" : "notif-card unread"}
            >
              <div className={`notif-icon ${notif.type}`}>
                {TYPE_ICON[notif.type] || TYPE_ICON.system}
              </div>

              <div className="notif-body">
                <div className="notif-top-row">
                  <h3>{notif.title}</h3>
                  <span className="notif-type-badge">
                    {TYPE_LABEL[notif.type] || "System"}
                  </span>
                </div>

                <p>{notif.message}</p>

                <span className="notif-time">
                  {formatTime(notif.createdAt)}
                </span>
              </div>

              <div className="notif-actions">
                {!notif.read && (
                  <button
                    className="notif-read-btn"
                    title="Mark as read"
                    onClick={() => handleMarkAsRead(notif._id)}
                  >
                    <CheckCheck size={16} />
                  </button>
                )}

                <button
                  className="notif-delete-btn"
                  title="Delete"
                  onClick={() => setDeleteId(notif._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {!notif.read && <span className="unread-dot" />}
            </div>
          ))}
        </div>
      </div>

      {deleteId && (
        <div className="delete-overlay">
          <div className="delete-popup">
            <h2>Delete Notification?</h2>
            <p>This notification will be permanently removed.</p>

            <div className="popup-actions">
              <button
                className="cancel-delete"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button className="confirm-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}