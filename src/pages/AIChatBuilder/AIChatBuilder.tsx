import { useState, useRef, useEffect } from 'react';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';
import { startConversation, sendMessage, ConversationState } from '../../services/aiConversationService';
import { useCv } from '../../context/CvContext';
import { useNavigate } from 'react-router';
import PreviewStep from '../../components/cv/steps/PreviewStep';
import { CvData } from '../../components/cv/CvWizard';
import { useConversation } from '../../context/ConversationContext';
import { useAuth } from '../../context/AuthContext';

export default function AIChatBuilder() {
  const { user } = useAuth();
  const { currentConversation, saveConversation, updateConversation, createNewConversation, conversations } = useConversation();
  const [conversation, setConversation] = useState<ConversationState>(
    currentConversation?.state || startConversation()
  );
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { createCv } = useCv();
  const navigate = useNavigate();

  // Load current conversation
  useEffect(() => {
    if (currentConversation) {
      setConversation(currentConversation.state);
    }
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isTyping) return;

    const message = userInput.trim();
    setUserInput('');
    setIsTyping(true);

    try {
      const { reply, updatedState } = await sendMessage(conversation, message);
      setConversation(updatedState);
      
      // Auto-save söhbəti
      if (user) {
        if (currentConversation) {
          updateConversation(currentConversation.id, updatedState);
        } else if (updatedState.cvData.personalInfo?.firstName) {
          // Əsər ad dəyilişdirilib, ilk dəfə saxla
          saveConversation(updatedState);
        }
      }
      
      // Preview-i göstərmək üçün minimum məlumatlar
      const hasMinimumData = 
        updatedState.cvData.personalInfo?.firstName &&
        updatedState.cvData.personalInfo?.email &&
        (updatedState.cvData.workExperience?.length > 0 || 
         updatedState.cvData.education?.length > 0);
      
      if (hasMinimumData && !showPreview) {
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Message send error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getFullCvData = (): CvData => {
    return {
      personalInfo: {
        firstName: conversation.cvData.personalInfo?.firstName || '',
        lastName: conversation.cvData.personalInfo?.lastName || '',
        email: conversation.cvData.personalInfo?.email || '',
        phone: conversation.cvData.personalInfo?.phone || '',
        location: conversation.cvData.personalInfo?.location || '',
        website: conversation.cvData.personalInfo?.website || '',
        linkedin: conversation.cvData.personalInfo?.linkedin || '',
        github: conversation.cvData.personalInfo?.github || '',
        summary: conversation.cvData.personalInfo?.summary || '',
        title: conversation.cvData.personalInfo?.title || '',
      },
      workExperience: conversation.cvData.workExperience || [],
      skills: conversation.cvData.skills || { technical: [], soft: [], languages: [] },
      education: conversation.cvData.education || [],
      certifications: conversation.cvData.certifications || [],
      projects: conversation.cvData.projects || [],
      selectedTemplate: conversation.cvData.selectedTemplate || 'modern',
    };
  };

  const handleSaveCV = () => {
    const fullCvData = getFullCvData();
    const cvId = createCv(fullCvData);
    navigate(`/my-cvs`);
  };

  const handleRestart = () => {
    if (window.confirm('Yeni söhbət başlatmaq istəyirsiniz? Cäri söhbət saxlanılacaq.')) {
      if (user && conversation.cvData.personalInfo?.firstName) {
        // Cäri söhbəti saxla
        if (currentConversation) {
          updateConversation(currentConversation.id, conversation);
        } else {
          saveConversation(conversation);
        }
      }
      
      // Yeni söhbət
      createNewConversation();
      setConversation(startConversation());
      setShowPreview(false);
    }
  };

  // Progress calculation
  const progress = {
    personal: conversation.cvData.personalInfo?.firstName ? 15 : 0,
    contact: conversation.cvData.personalInfo?.email ? 15 : 0,
    summary: conversation.cvData.personalInfo?.summary ? 10 : 0,
    experience: conversation.cvData.workExperience && conversation.cvData.workExperience.length > 0 ? 25 : 0,
    skills: conversation.cvData.skills ? 15 : 0,
    education: conversation.cvData.education && conversation.cvData.education.length > 0 ? 15 : 0,
    template: conversation.cvData.selectedTemplate ? 5 : 0,
  };
  
  const totalProgress = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <>
      <PageMeta title="AI Chat CV Builder - Creative CV" description="AI ilə söhbət edərək CV yaradın" />
      
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                AI Chat CV Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                AI ilə söhbət edin, CV avtomatik yaradılsın
              </p>
            </div>
            
            <div className="flex gap-3">
              {user && conversations.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setShowConversations(!showConversations)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Tarixçə ({conversations.length})
                </Button>
              )}
              {conversation.cvData.personalInfo?.firstName && (
                <Button 
                  variant={showPreview ? "primary" : "outline"}
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {showPreview ? 'Preview-i gizlət' : 'Preview göstər'}
                </Button>
              )}
              <Button variant="outline" onClick={handleRestart}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Yeni Söhbət
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tamamlanma: {totalProgress}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {conversation.currentStep}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-brand-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
          {/* Messages */}
          <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-3'} flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden`}>
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation.messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-end gap-3">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  rows={2}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:text-white resize-none"
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  onClick={handleSend}
                  disabled={!userInput.trim() || isTyping}
                  className="px-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter - göndər, Shift+Enter - yeni sətir
              </p>
            </div>
          </div>

          {/* Preview Area */}
          {showPreview && conversation.cvData && (
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
                <h3 className="font-semibold text-gray-900 dark:text-white">CV Preview</h3>
                <Button variant="primary" onClick={handleSaveCV}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  CV-ni Saxla
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <PreviewStep cvData={getFullCvData()} />
              </div>
            </div>
          )}
        </div>

        {/* Söhbət Tarixçəsi Modal */}
        {showConversations && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowConversations(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Söhbət Tarixçəsi</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{conversations.length} söhbət</p>
              </div>
              
              <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      currentConversation?.id === conv.id
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
                    }`}
                    onClick={() => {
                      if (conv.id !== currentConversation?.id) {
                        setConversation(conv.state);
                        setShowConversations(false);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{conv.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(conv.updatedAt).toLocaleDateString()} - {conv.state.messages.length} mesaj
                        </p>
                      </div>
                      {currentConversation?.id === conv.id && (
                        <span className="px-2 py-1 bg-brand-500 text-white text-xs rounded-full">Aktiv</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <Button variant="outline" onClick={() => setShowConversations(false)} className="w-full">
                  Bağla
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
