import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";
import { useCv } from "../../context/CvContext";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { cvs } = useCv();
  const { user } = useAuth();
  
  const totalCvs = cvs.length;
  const templatesAvailable = 6;
  const recentCvs = cvs.slice(0, 3);
  const cvDownloads = cvs.reduce((acc, cv) => acc + (cv.downloads || 0), 0);
  
  const completedCvs = cvs.filter(cv => {
    const data = cv.data;
    return data.personalInfo.firstName && 
           data.personalInfo.email && 
           data.workExperience.length > 0 && 
           data.education.length > 0;
  }).length;
  const completionRate = totalCvs > 0 ? Math.round((completedCvs / totalCvs) * 100) : 0;

  return (
    <>
      <PageMeta
        title="CV Creator - Professional Resume Builder | Creative CV"
        description="Create professional CVs and resumes with our easy-to-use CV builder. Choose from multiple templates and customize your CV to land your dream job."
      />
      
      {/* Hero Section */}
      <div className="mb-12 animate-slide-up">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-10 rounded-3xl bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 dark:from-brand-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-brand-100 dark:border-brand-800 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-200/20 dark:bg-brand-700/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200/20 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
          
          <div className="flex-1 relative z-10">
            <div className="inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
              👋 Welcome back
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Hello, {user?.name || 'User'}!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Ready to create your next professional CV? Let's make it stand out.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create">
                <Button variant="primary" size="md" className="shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all px-6 py-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New CV
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="md" className="px-6 py-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 hidden lg:block">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl transform -rotate-6 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-32 h-32 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-6 mb-12">
        <div className="flex-1 min-w-[200px] p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{totalCvs}</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Your CVs</p>
        </div>

        <div className="flex-1 min-w-[200px] p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{templatesAvailable}</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Templates</p>
        </div>

        <div className="flex-1 min-w-[200px] p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{completionRate}%</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion</p>
        </div>

        <div className="flex-1 min-w-[200px] p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{cvDownloads}</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloads</p>
        </div>
      </div>


      {/* Recent CVs */}
      {recentCvs.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent CVs</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Your most recently updated CVs</p>
            </div>
            {cvs.length > 3 && (
              <Link to="/my-cvs">
                <Button variant="outline" size="sm">
                  View All ({totalCvs})
                </Button>
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-6">
            {recentCvs.map((cv) => (
              <Link 
                key={cv.id} 
                to={`/create?id=${cv.id}`}
                className="flex-1 min-w-[280px] group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-600 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/30 rounded-lg text-xs font-semibold text-brand-700 dark:text-brand-300">
                    {cv.template}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(cv.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cv.data.personalInfo.firstName} {cv.data.personalInfo.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {cv.data.personalInfo.title || 'No title'}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {cv.downloads || 0} downloads
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Getting Started - Show only if user has no CVs */}
      {totalCvs === 0 && (
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Create your first professional CV in just a few minutes. Choose a template, fill in your details, and download.
            </p>
            <Link to="/create">
              <Button variant="primary" size="md" className="px-6 py-3">
                Create Your First CV
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
