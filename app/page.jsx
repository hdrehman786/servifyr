import Link from "next/link";
import connectDB from "../lib/db"

const categories = [
  { name: "Electrician", slug: "electrician" },
  { name: "Plumber", slug: "plumber" },
  { name: "Tutor", slug: "tutor" },
  { name: "Mechanic", slug: "mechanic" },
];


export const metadata = {
  title: "Servifyr - Find Local Services Near You",
  description: "Find electricians, plumbers, tutors, and other services in your city with Servifyr.",
};

const ServicesPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Find Local Services Near You</h1>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Enter your city..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/services/${cat.slug}`}
            className="p-6 border rounded-lg hover:shadow-lg transition text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-500">Find best {cat.name.toLowerCase()}s near you</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
