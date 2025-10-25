import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

interface CvExample {
  id: string;
  name: string;
  title: string;
  industry: string;
  template: string;
  preview: string;
  featured?: boolean;
}

const cvExamples: CvExample[] = [
  {
    id: "john-doe",
    name: "John Doe",
    title: "Senior Frontend Developer",
    industry: "Technology",
    template: "modern",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    featured: true,
  },
  {
    id: "sarah-smith",
    name: "Sarah Smith",
    title: "Marketing Manager",
    industry: "Marketing",
    template: "creative",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500",
    featured: true,
  },
  {
    id: "michael-johnson",
    name: "Michael Johnson",
    title: "Data Scientist",
    industry: "Data Science",
    template: "modern",
    preview: "bg-gradient-to-br from-indigo-500 to-cyan-500",
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    title: "UX Designer",
    industry: "Design",
    template: "creative",
    preview: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "david-brown",
    name: "David Brown",
    title: "Financial Analyst",
    industry: "Finance",
    template: "classic",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "lisa-garcia",
    name: "Lisa Garcia",
    title: "Project Manager",
    industry: "Management",
    template: "modern",
    preview: "bg-gradient-to-br from-green-400 to-blue-500",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    title: "Software Engineer",
    industry: "Technology",
    template: "modern",
    preview: "bg-gradient-to-br from-teal-500 to-green-500",
  },
  {
    id: "maria-rodriguez",
    name: "Maria Rodriguez",
    title: "Graphic Designer",
    industry: "Design",
    template: "creative",
    preview: "bg-gradient-to-br from-amber-500 to-red-500",
  },
];

const industries = ["All", "Technology", "Marketing", "Data Science", "Design", "Finance", "Management"];

export default function Gallery() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedCv, setSelectedCv] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCvs = cvExamples
    .filter(cv => selectedIndustry === "All" || cv.industry === selectedIndustry)
    .filter(cv => 
      searchQuery === "" ||
      cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const featuredCvs = cvExamples.filter(cv => cv.featured);

  return (
    <>
      <PageMeta
        title="CV Gallery - Professional Resume Examples | Creative CV"
        description="Explore our gallery of professional CV examples. Get inspired by real CVs created with our templates."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            CV Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Explore professional CV examples created with our templates. Get inspired and see what's possible.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, title, or industry..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Featured CVs */}
      <div className="col-span-12 mb-8">
        <ComponentCard title="Featured CVs" desc="Some of our best CV examples">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCvs.map((cv) => (
              <div key={cv.id} className="group cursor-pointer" onClick={() => setSelectedCv(cv.id)}>
                <div className={`${cv.preview} h-32 rounded-lg mb-3 flex items-center justify-center text-white font-semibold transition-transform group-hover:scale-105`}>
                  {cv.name}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{cv.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cv.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{cv.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Industry Filter */}
      <div className="col-span-12 mb-8">
        <ComponentCard title="Filter by Industry">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry)}
                className="mb-2"
              >
                {industry}
              </Button>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* CV Examples Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {filteredCvs.map((cv) => (
          <div key={cv.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <div
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCv === cv.id ? 'ring-2 ring-brand-500' : ''
              }`}
              onClick={() => setSelectedCv(cv.id)}
            >
              <ComponentCard title={cv.name}>
              <div className="relative">
                {cv.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* CV Preview */}
                <div className={`${cv.preview} h-32 rounded-lg mb-4 flex items-center justify-center text-white font-semibold`}>
                  {cv.name}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {cv.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {cv.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {cv.industry}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {cv.template}
                    </span>
                  </div>
                </div>
              </div>
              </ComponentCard>
            </div>
          </div>
        ))}
      </div>

      {/* Selected CV Actions */}
      {selectedCv && (
        <div className="col-span-12 mt-8">
          <ComponentCard title="Create Similar CV" desc="Want to create a CV similar to this example?">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button variant="primary" size="md">
                  Create Your CV
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="md">
                  Browse Templates
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="md"
                onClick={() => setSelectedCv(null)}
              >
                Cancel Selection
              </Button>
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Call to Action */}
      <div className="col-span-12 mt-8">
        <ComponentCard title="Ready to Create Your CV?" className="text-center bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have created their perfect CV using our templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button variant="primary" size="md">
                Start Creating Now
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="md">
                View All Templates
              </Button>
            </Link>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
