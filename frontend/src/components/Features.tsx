const features = [
  {
    title: "Smart Task Tracking",
    desc: "Organize assignments and deadlines."
  },
  {
    title: "Focus Mode",
    desc: "Remove distractions while studying."
  },
  {
    title: "Analytics",
    desc: "Track productivity over time."
  },
  {
    title: "Sync Anywhere",
    desc: "Access from any device."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Built for clarity and focus
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-16">

          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}