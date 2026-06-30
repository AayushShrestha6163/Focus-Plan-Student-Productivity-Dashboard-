import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Goals from "./pages/Goals";
import Study from "./pages/Study";
import Analytics from "./pages/Analytics";
import CalendarPage from "./pages/Calendar";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/study" element={<Study />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/calendar" element={<CalendarPage />} />

    </Routes>
  );
}

export default App;