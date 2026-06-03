export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold">
          Simple Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-2xl p-8">
            <h3 className="font-bold">Free</h3>
            <p className="text-5xl mt-4">$0</p>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-8">
            <h3 className="font-bold">Pro</h3>
            <p className="text-5xl mt-4">$12</p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="font-bold">Team</h3>
            <p className="text-5xl mt-4">$39</p>
          </div>

        </div>

      </div>
    </section>
  );
}