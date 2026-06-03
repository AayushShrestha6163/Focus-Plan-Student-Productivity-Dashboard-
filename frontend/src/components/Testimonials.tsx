export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Loved by Students
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {[1,2,3].map((item) => (
            <div
              key={item}
              className="border rounded-2xl p-6"
            >
              <p className="text-gray-600">
                This dashboard completely changed how I
                manage assignments and exams.
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">
                  Student {item}
                </h4>
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}