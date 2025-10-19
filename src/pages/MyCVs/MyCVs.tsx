import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

interface SavedCV {
  id: string;
  name: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
  };
}

const mockCVs: SavedCV[] = [
  {
    id: "1",
    name: "Software Engineer CV",
    template: "Modern Professional",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      title: "Senior Software Engineer"
    }
  },
  {
    id: "2",
    name: "Marketing Manager CV",
    template: "Creative Portfolio",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    personalInfo: {
      firstName: "Sarah",
      lastName: "Smith",
      title: "Marketing Manager"
    }
  },
  {
    id: "3",
    name: "Data Scientist CV",
    template: "Tech Specialist",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
    personalInfo: {
      firstName: "Michael",
      lastName: "Johnson",
      title: "Data Scientist"
    }
  }
];

export default function MyCVs() {
  const [cvs, setCvs] = useState<SavedCV[]>(mockCVs);
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);

  const deleteCV = (id: string) => {
    setCvs(cvs.filter(cv => cv.id !== id));
    setSelectedCVs(selectedCVs.filter(cvId => cvId !== id));
  };

  const duplicateCV = (cv: SavedCV) => {
    const newCV: SavedCV = {
      ...cv,
      id: Date.now().toString(),
      name: `${cv.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCvs([newCV, ...cvs]);
  };

  const toggleCVSelection = (id: string) => {
    setSelectedCVs(prev => 
      prev.includes(id) 
        ? prev.filter(cvId => cvId !== id)
        : [...prev, id]
    );
  };

  const selectAllCVs = () => {
    setSelectedCVs(cvs.map(cv => cv.id));
  };

  const deselectAllCVs = () => {
    setSelectedCVs([]);
  };

  const deleteSelectedCVs = () => {
    setCvs(cvs.filter(cv => !selectedCVs.includes(cv.id)));
    setSelectedCVs([]);
  };

  const getTemplatePreview = (template: string) => {
    const templates: { [key: string]: string } = {
      "Modern Professional": "bg-gradient-to-br from-blue-500 to-purple-600",
      "Creative Portfolio": "bg-gradient-to-br from-pink-500 to-orange-500",
      "Tech Specialist": "bg-gradient-to-br from-indigo-500 to-cyan-500",
      "Classic Executive": "bg-gradient-to-br from-gray-700 to-gray-900",
      "Minimal Clean": "bg-gradient-to-br from-green-400 to-blue-500",
      "Academic Scholar": "bg-gradient-to-br from-amber-500 to-red-500"
    };
    return templates[template] || "bg-gradient-to-br from-gray-400 to-gray-600";
  };

  return (
    <>
      <PageMeta
        title="My CVs - Manage Your CV Collection | Creative CV"
        description="View, edit, and manage all your saved CVs. Download, duplicate, or delete your professional resumes."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My CVs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your saved CVs and create new ones
            </p>
          </div>
          <Link to="/create">
            <Button variant="primary" size="md">
              + Create New CV
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 mb-8">
        <div className="col-span-12 md:col-span-4">
          <ComponentCard title="Total CVs" className="text-center">
            <div className="text-3xl font-bold text-brand-500 mb-2">{cvs.length}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">CVs in your collection</p>
          </ComponentCard>
        </div>
        <div className="col-span-12 md:col-span-4">
          <ComponentCard title="Recent Update" className="text-center">
            <div className="text-3xl font-bold text-brand-500 mb-2">
              {cvs.length > 0 ? new Date(cvs[0].updatedAt).toLocaleDateString() : "N/A"}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated CV</p>
          </ComponentCard>
        </div>
        <div className="col-span-12 md:col-span-4">
          <ComponentCard title="Templates Used" className="text-center">
            <div className="text-3xl font-bold text-brand-500 mb-2">
              {new Set(cvs.map(cv => cv.template)).size}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Different templates</p>
          </ComponentCard>
        </div>
      </div>

      {/* Bulk Actions */}
      {cvs.length > 0 && (
        <div className="col-span-12 mb-6">
          <ComponentCard title="Bulk Actions">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCVs.length} of {cvs.length} CVs selected
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectedCVs.length === cvs.length ? deselectAllCVs : selectAllCVs}
                  >
                    {selectedCVs.length === cvs.length ? "Deselect All" : "Select All"}
                  </Button>
                  {selectedCVs.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={deleteSelectedCVs}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete Selected ({selectedCVs.length})
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}

      {/* CVs Grid */}
      {cvs.length === 0 ? (
        <div className="col-span-12">
          <ComponentCard title="No CVs Yet" className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-6">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No CVs Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              You haven't created any CVs yet. Start building your professional resume with our easy-to-use CV builder.
            </p>
            <Link to="/create">
              <Button variant="primary" size="md">
                Create Your First CV
              </Button>
            </Link>
          </ComponentCard>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {cvs.map((cv) => (
            <div key={cv.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCVs.includes(cv.id) ? 'ring-2 ring-brand-500' : ''
              }`}>
                <ComponentCard title={cv.name}>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={selectedCVs.includes(cv.id)}
                      onChange={() => toggleCVSelection(cv.id)}
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {cv.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                      </p>
                    </div>
                  </div>

                  {/* CV Preview */}
                  <div className={`${getTemplatePreview(cv.template)} h-24 rounded-lg mb-4 flex items-center justify-center text-white font-semibold text-sm`}>
                    {cv.template}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Template:</span>
                      <span className="text-gray-900 dark:text-white">{cv.template}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Created:</span>
                      <span className="text-gray-900 dark:text-white">{new Date(cv.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Updated:</span>
                      <span className="text-gray-900 dark:text-white">{new Date(cv.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateCV(cv)}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCV(cv.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                </ComponentCard>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="col-span-12 mt-8">
        <ComponentCard title="Quick Actions" desc="Common actions for your CVs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/create" className="block">
              <Button variant="outline" className="w-full justify-center">
                + Create New CV
              </Button>
            </Link>
            <Link to="/templates" className="block">
              <Button variant="outline" className="w-full justify-center">
                Browse Templates
              </Button>
            </Link>
            <Link to="/gallery" className="block">
              <Button variant="outline" className="w-full justify-center">
                View Examples
              </Button>
            </Link>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
