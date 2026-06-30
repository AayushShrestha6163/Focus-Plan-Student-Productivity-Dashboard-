import { useEffect, useState } from "react";
import { Plus, Trash2, Target, Check } from "lucide-react";

import { getGoals, addGoal, updateGoal, deleteGoal } from "../api/goalApi";
import type { Goal } from "../api/goalApi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Goals.css";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [progressInputs, setProgressInputs] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTargetValue("");
    setError("");
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Goal title is required.");
      return;
    }

    if (!targetValue || Number(targetValue) <= 0) {
      setError("Target value must be greater than 0.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await addGoal({
        title,
        description,
        targetValue: Number(targetValue),
      });

      resetForm();
      setShowModal(false);
      loadGoals();
    } catch (err) {
      console.error(err);
      setError("Failed to create goal. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteGoal(deleteId);
      setDeleteId(null);
      loadGoals();
    }
  };

  const handleProgressChange = (id: string, value: string) => {
    setProgressInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleProgressSave = async (goal: Goal) => {
    const inputValue = progressInputs[goal._id];
    if (inputValue === undefined) return;

    let newValue = Number(inputValue);
    if (isNaN(newValue)) return;

    if (newValue < 0) newValue = 0;
    if (newValue > goal.targetValue) newValue = goal.targetValue;

    await updateGoal(goal._id, {
      currentValue: newValue,
      completed: newValue >= goal.targetValue,
    });

    setProgressInputs((prev) => {
      const copy = { ...prev };
      delete copy[goal._id];
      return copy;
    });

    loadGoals();
  };

  const toggleComplete = async (goal: Goal) => {
    const newCompleted = !goal.completed;

    await updateGoal(goal._id, {
      completed: newCompleted,
      currentValue: newCompleted ? goal.targetValue : goal.currentValue,
    });

    loadGoals();
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const avgProgress =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce(
            (sum, g) =>
              sum + Math.min((g.currentValue / g.targetValue) * 100, 100),
            0
          ) / goals.length
        );

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="goals-page">
        <div className="goals-header">
          <div>
            <h1>My Goals</h1>
            <p>
              {goals.length} goals total · {completedCount} completed
            </p>
          </div>

          <button
            className="add-goal"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus size={18} />
            Add Goal
          </button>
        </div>

        <div className="goal-list">
          {goals.length === 0 && (
            <div className="empty">
              <Target size={32} />
              <h3>No goals yet</h3>
              <p>Click "Add Goal" to set your first goal.</p>
            </div>
          )}

          {goals.map((goal) => {
            const percent = Math.min(
              Math.round((goal.currentValue / goal.targetValue) * 100),
              100
            );

            return (
              <div className="goal-card" key={goal._id}>
                <div className="goal-top">
                  <div>
                    <h3 className={goal.completed ? "completed" : ""}>
                      {goal.title}
                    </h3>
                    {goal.description && <p>{goal.description}</p>}
                  </div>

                  <div className="goal-actions">
                    <button
                      className={
                        goal.completed ? "complete-btn done" : "complete-btn"
                      }
                      onClick={() => toggleComplete(goal)}
                    >
                      <Check size={15} />
                      {goal.completed ? "Completed" : "Mark Complete"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => setDeleteId(goal._id)}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="goal-progress">
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="progress-meta">
                    <span>
                      {goal.currentValue} / {goal.targetValue} ({percent}%)
                    </span>

                    <div className="progress-update">
                      <input
                        type="number"
                        min={0}
                        max={goal.targetValue}
                        placeholder="Update"
                        value={
                          progressInputs[goal._id] !== undefined
                            ? progressInputs[goal._id]
                            : ""
                        }
                        onChange={(e) =>
                          handleProgressChange(goal._id, e.target.value)
                        }
                      />
                      <button onClick={() => handleProgressSave(goal)}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="goal-stats">
          <div className="stat-box blue">
            <h2>{goals.length}</h2>
            <p>TOTAL GOALS</p>
          </div>

          <div className="stat-box">
            <h2>{completedCount}</h2>
            <p>COMPLETED</p>
          </div>

          <div className="stat-box">
            <h2>{avgProgress}%</h2>
            <p>AVERAGE PROGRESS</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="goal-overlay">
          <div className="goal-modal">
            <h2>Add New Goal</h2>

            <form onSubmit={handleAddGoal}>
              {error && <p className="goal-error">{error}</p>}

              <div className="form-group">
                <label>Goal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Read 12 books this year"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Optional details"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Target Value</label>
                <input
                  type="number"
                  min={1}
                  placeholder="e.g. 12"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                />
              </div>

              <div className="goal-modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Create Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="delete-overlay">
          <div className="delete-popup">
            <h2>Delete Goal?</h2>
            <p>Are you sure you want to delete this goal?</p>

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