import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import CTASection from '@/components/CTASection';
import ChatbotDemo from '@/components/ChatbotDemo';
import VoiceAgentDemo from '@/components/VoiceAgentDemo';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, CircleCheck } from 'lucide-react';

const Index = () => {
  const heroRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Handle initial page load and navigation
    if (location.hash === '') {
      // No specific hash in URL, scroll to top on page load
      window.scrollTo(0, 0);
    } else if (location.hash === '#hero') {
      // Explicitly scroll to hero section 
      const heroSection = document.getElementById('home-hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Check if we should scroll to hero section (coming from another page with flag)
    if (sessionStorage.getItem('scrollToHero') === 'true') {
      // Clear the flag
      sessionStorage.removeItem('scrollToHero');
      
      // Scroll to hero section
      const heroSection = document.getElementById('home-hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'auto' });
      }
      
      // Replace current history state to prevent unwanted scroll restoration
      const currentState = window.history.state;
      window.history.replaceState(
        { ...currentState, __forcedScroll: true },
        document.title
      );
    }
    
    // Prevent scroll restoration issues
    const handlePopState = (e) => {
      if (e.state && e.state.__forcedScroll) {
        setTimeout(() => {
          const heroSection = document.getElementById('home-hero-section');
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'auto' });
          }
        }, 0);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Set up intersection observer for hero section
    const options = {
      threshold: 0.1,
      rootMargin: '0px',
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible
          document.body.classList.add('hero-visible');
        } else {
          // Hero is not visible
          document.body.classList.remove('hero-visible');
        }
      });
    }, options);
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [location]);

  return (
    <div className="home-page">
      <Navbar />
      <div id="home-hero-section" ref={heroRef} className="scroll-mt-20 scroll-my-0 relative">
        <HeroSection />
      </div>
      <StatsSection />
      
      {/* New Demos Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gray-50"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#88bf42]/5 opacity-70 z-0"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-[#009898]/5 opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-10 w-24 h-24 rounded-full border-2 border-[#88bf42]/20 opacity-70"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-lg border-2 border-[#009898]/20 opacity-70 rotate-12"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#88bf42]/10 text-[#88bf42] rounded-full text-sm font-medium mb-4">
              INTERACTIVE DEMONSTRATIONS
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experience Our AI Technology
            </h2>
            <p className="text-base lg:text-lg text-gray-700">
              Try our AI solutions firsthand to see how they can transform customer interactions and business processes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="chatbot" className="w-full">
              <div className="flex justify-center mb-6 md:mb-8">
                <TabsList className="bg-white shadow-lg border border-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="chatbot" 
                    className="px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:bg-[#88bf42] data-[state=active]:text-white rounded-md"
                  >
                    AI Chatbot
                  </TabsTrigger>
                  <TabsTrigger 
                    value="voice" 
                    className="px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:bg-[#88bf42] data-[state=active]:text-white rounded-md"
                  >
                    AI Voice Agent
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="h-1.5 bg-[#88bf42]"></div>
                <div className="p-4 sm:p-6 md:p-8">
                <TabsContent value="chatbot" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">AI Chatbot</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-6">
                        Our AI Chatbots deliver personalized, contextual conversations across your digital channels. Try this demo to experience the advanced conversational capabilities firsthand.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Instant Responses</h4>
                            <p className="text-xs md:text-sm text-gray-600">Provides immediate answers to customer questions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Persistent Memory</h4>
                            <p className="text-xs md:text-sm text-gray-600">Retains context throughout the conversation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Natural Conversations</h4>
                            <p className="text-xs md:text-sm text-gray-600">Engages with users in a human-like manner</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 md:mt-8">
                        <Button 
                            className="bg-[#88bf42] hover:bg-[#6d9c31] text-white shadow-md transition-all duration-300"
                          asChild
                        >
                          <Link to="/contact">Request Full Demo</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <ChatbotDemo />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="voice" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">AI Voice Agent</h3>
                      <p className="text-sm md:text-base text-gray-700 mb-6">
                        Our AI Voice Agents provide human-like conversations that can handle complex customer inquiries. Try this demo to experience voice interaction firsthand.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Natural Voice Interaction</h4>
                            <p className="text-xs md:text-sm text-gray-600">Responds with human-like speech patterns</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Sentiment Analysis</h4>
                            <p className="text-xs md:text-sm text-gray-600">Detects emotions to tailor responses appropriately</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="bg-[#88bf42]/10 rounded-full p-2 mr-3 text-[#88bf42]">
                              <CircleCheck className="w-5 h-5" />
                          </div>
                          <div>
                              <h4 className="font-semibold text-gray-900">Multi-channel Support</h4>
                            <p className="text-xs md:text-sm text-gray-600">Works across phone, web, and mobile applications</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 md:mt-8">
                        <Button 
                            className="bg-[#88bf42] hover:bg-[#6d9c31] text-white shadow-md transition-all duration-300"
                          asChild
                        >
                          <Link to="/contact">Request Full Demo</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <VoiceAgentDemo />
                    </div>
                  </div>
                </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Index;
