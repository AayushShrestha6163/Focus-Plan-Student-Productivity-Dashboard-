export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm">
            Productivity Reimagined
          </span>

          <h1 className="text-6xl font-bold mt-6">
            Stay Organized.
            <br />
            <span className="text-blue-600">
              Stay Productive.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-500">
            Manage tasks, schedules, goals and deadlines
            from one smart dashboard designed for students.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl">
              Get Started
            </button>

            <button className="border px-8 py-3 rounded-xl">
              Watch Demo
            </button>
          </div>

        </div>

        <div className="mt-20 bg-white border rounded-3xl shadow-xl p-8">
          <div className="h-[420px] bg-slate-50 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-xl">
              Dashboard Preview
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}