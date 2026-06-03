import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="font-bold text-xl text-blue-600">
          Focus Plan
        </h1>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}