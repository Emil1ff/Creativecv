import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import InputField from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I create my first CV?",
    answer: "To create your first CV, click on 'Create New CV' from the dashboard or use the CV Builder in the navigation. Follow the step-by-step wizard to add your personal information, work experience, skills, and education. Choose a template and download your CV as PDF.",
    category: "Getting Started"
  },
  {
    id: "2",
    question: "Can I customize the CV templates?",
    answer: "Yes! All our templates are fully customizable. You can change colors, fonts, layout sections, and add or remove sections based on your needs. The templates are designed to be flexible while maintaining professional appearance.",
    category: "Templates"
  },
  {
    id: "3",
    question: "How do I save and manage my CVs?",
    answer: "Your CVs are automatically saved as you create them. You can view all your saved CVs in the 'My CVs' section, where you can edit, duplicate, or delete them. You can also organize them with custom names for easy identification.",
    category: "Management"
  },
  {
    id: "4",
    question: "Is my data secure?",
    answer: "Absolutely! We take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties, and you have full control over your information.",
    category: "Security"
  },
  {
    id: "5",
    question: "Can I export my CV in different formats?",
    answer: "Currently, we support PDF export with high quality output. The PDFs are optimized for both digital viewing and printing. We're working on adding more export formats in future updates.",
    category: "Export"
  },
  {
    id: "6",
    question: "How do I change my account settings?",
    answer: "You can access your account settings by clicking on your profile icon and selecting 'Settings'. From there, you can update your profile information, change preferences, manage notifications, and update security settings.",
    category: "Account"
  }
];

const categories = ["All", "Getting Started", "Templates", "Management", "Security", "Export", "Account"];

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'guides'>('faq');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageMeta
        title="Help & Support - Creative CV Support Center"
        description="Get help with Creative CV platform. Find answers to frequently asked questions, contact support, and learn how to use all features effectively."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8 animate-slide-up">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Support Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get the help you need to create amazing CVs. Find answers, contact support, and learn best practices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Quick Help Cards */}
        <div className="col-span-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ComponentCard title="🚀 Getting Started" className="text-center hover-lift animate-scale-in">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                New to Creative CV? Learn the basics and create your first professional CV.
              </p>
              <Button variant="primary" className="w-full">
                Start Guide
              </Button>
            </ComponentCard>

            <div className="animate-scale-in" style={{animationDelay: '0.1s'}}>
              <ComponentCard title="📞 Contact Support" className="text-center hover-lift">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need personalized help? Our support team is here to assist you.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('contact')}>
                Contact Us
              </Button>
              </ComponentCard>
            </div>

            <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
              <ComponentCard title="💡 Best Practices" className="text-center hover-lift">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn professional CV writing tips and industry best practices.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('guides')}>
                View Tips
              </Button>
              </ComponentCard>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12">
          {/* Tabs */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <ComponentCard title="Support Center">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'faq'
                    ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>❓</span>
                <span>FAQ</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'contact'
                    ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>📞</span>
                <span>Contact</span>
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'guides'
                    ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>📚</span>
                <span>Guides</span>
              </button>
            </div>

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="animate-fade-in">
                {/* Search */}
                <div className="mb-6">
                  <InputField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FAQ..."
                    className="w-full"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {faq.answer}
                      </p>
                      <span className="text-xs bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="animate-fade-in">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Support Team
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Name</Label>
                        <InputField
                          id="contactName"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email</Label>
                        <InputField
                          id="contactEmail"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contactSubject">Subject</Label>
                      <InputField
                        id="contactSubject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactMessage">Message</Label>
                      <TextArea
                        value={contactForm.message}
                        onChange={(value) => setContactForm({ ...contactForm, message: value })}
                        rows={5}
                      />
                    </div>
                    <Button variant="primary" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Guides Tab */}
            {activeTab === 'guides' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ComponentCard title="📝 CV Writing Tips">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Keep your CV concise (1-2 pages)</li>
                      <li>• Use action verbs to describe achievements</li>
                      <li>• Tailor your CV for each job application</li>
                      <li>• Include relevant keywords from job descriptions</li>
                      <li>• Proofread carefully for spelling and grammar</li>
                    </ul>
                  </ComponentCard>

                  <ComponentCard title="🎨 Template Selection">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Choose templates that match your industry</li>
                      <li>• Use ATS-friendly templates for online applications</li>
                      <li>• Creative templates work well for design roles</li>
                      <li>• Keep formatting consistent throughout</li>
                      <li>• Test how your CV looks when printed</li>
                    </ul>
                  </ComponentCard>

                  <ComponentCard title="💼 Industry-Specific Advice">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Tech roles: Highlight technical skills and projects</li>
                      <li>• Marketing: Show measurable campaign results</li>
                      <li>• Finance: Emphasize analytical and numerical skills</li>
                      <li>• Healthcare: Include certifications and licenses</li>
                      <li>• Education: List teaching experience and credentials</li>
                    </ul>
                  </ComponentCard>

                  <ComponentCard title="🔍 ATS Optimization">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Use standard section headings</li>
                      <li>• Avoid complex formatting and graphics</li>
                      <li>• Include relevant keywords naturally</li>
                      <li>• Save your CV as a PDF for best compatibility</li>
                      <li>• Test your CV with ATS checkers</li>
                    </ul>
                  </ComponentCard>
                </div>
              </div>
            )}
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
}
