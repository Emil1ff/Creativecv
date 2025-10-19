import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <PageMeta
        title="CV Creator - Professional Resume Builder | Creative CV"
        description="Create professional CVs and resumes with our easy-to-use CV builder. Choose from multiple templates and customize your CV to land your dream job."
      />
      
      {/* Hero Section */}
      <div className="col-span-12 mb-8 animate-slide-up">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-brand-500 to-brand-600 dark:border-gray-800 dark:from-brand-900 dark:to-brand-800 p-8 text-center relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-8 right-8 w-16 h-16 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-6 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          
          <h1 className="text-4xl font-bold text-white mb-4 animate-bounce-in">
            Professional CV Builder
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
            Create stunning, professional CVs in minutes. Choose from our collection of modern templates and customize them to match your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: '0.6s'}}>
            <Link to="/create">
              <Button variant="primary" size="md" className="bg-blue-500 text-white hover:bg-blue-600 hover-lift animate-glow">
                Create Your CV
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="md" className="border-white text-white hover:bg-white/10 hover-lift">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Quick Stats */}
        <div className="col-span-12 md:col-span-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <ComponentCard title="Total CVs Created" className="text-center hover-lift">
            <div className="text-3xl font-bold text-brand-500 mb-2 animate-pulse-slow">1,234</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Professional CVs generated</p>
          </ComponentCard>
        </div>

        <div className="col-span-12 md:col-span-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <ComponentCard title="Templates Available" className="text-center hover-lift">
            <div className="text-3xl font-bold text-brand-500 mb-2 animate-pulse-slow">12+</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Modern CV templates</p>
          </ComponentCard>
        </div>

        <div className="col-span-12 md:col-span-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <ComponentCard title="Success Rate" className="text-center hover-lift">
            <div className="text-3xl font-bold text-brand-500 mb-2 animate-pulse-slow">95%</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Job interview success</p>
          </ComponentCard>
        </div>

        {/* Features */}
        <div className="col-span-12 xl:col-span-8">
          <ComponentCard title="Why Choose Our CV Builder?" desc="Everything you need to create a professional CV">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Easy to Use</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive interface that makes CV creation simple and fast.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Professional Templates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose from professionally designed templates.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">PDF Export</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Download your CV as a high-quality PDF.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">ATS Friendly</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for Applicant Tracking Systems.</p>
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <ComponentCard title="Quick Actions" desc="Get started with these quick actions">
            <div className="space-y-4">
              <Link to="/create" className="block">
                <Button variant="primary" className="w-full justify-center">
                  Create New CV
                </Button>
              </Link>
              <Link to="/templates" className="block">
                <Button variant="outline" className="w-full justify-center">
                  Browse Templates
                </Button>
              </Link>
              <Link to="/gallery" className="block">
                <Button variant="outline" className="w-full justify-center">
                  View Gallery
                </Button>
              </Link>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
