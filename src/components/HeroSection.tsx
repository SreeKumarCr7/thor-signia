import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ChevronRight, CircleCheck, DollarSign, BarChart, Zap, Shield, Network, Cpu, Code, Server } from 'lucide-react';
import './hero-section.css';

const HeroSection = () => {
  return (
    <section id="hero-section-content" className="relative pt-20 pb-10 md:pt-32 lg:pt-36 md:pb-20 lg:pb-24 overflow-hidden bg-white text-gray-800 scroll-mt-28">
      {/* Modern decorative elements - Removed top right gradient */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#88bf42]/10 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 safe-area-padding">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
          <div className="lg:w-1/2 lg:pr-12 mb-6 lg:mb-0 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 mb-8 sm:mb-10 rounded-full bg-[#009898]/10 text-[#009898] font-medium text-sm border border-[#009898]/20 header-badge">
              <Zap className="h-4 w-4 mr-2 text-[#009898]" />
              <span>Enterprise AI Solutions</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4 md:mb-5 leading-tight tracking-tight text-gray-900 px-1 sm:px-0">
              <span>Transform Your Business With </span> 
              <div className="mt-1 relative inline-block md:inline">
                <span className="text-[#009898] inline-block">
                  Advanced AI
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#88bf42]"></div>
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-1 sm:px-0">
              Our cutting-edge AI technologies help enterprises achieve unprecedented growth, efficiency and competitive advantages through intelligent automation and data-driven insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Removed the "Explore AI Engineers" button */}
            </div>
            
            {/* Mobile view: Show AI visualization above stats */}
            <div className="lg:hidden mt-6 mb-6 px-1 sm:px-0">
              {/* Mobile-optimized AI Visualization with better edge handling */}
              <div className="relative h-[250px] sm:h-[300px] w-full max-w-[400px] mx-auto">
                {/* Mobile-optimized Floating Elements - Better positioned */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Digital Brain Network */}
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                      {/* Background Circles */}
                      <circle cx="200" cy="200" r="100" fill="rgba(0, 152, 152, 0.05)" />
                      <circle cx="200" cy="200" r="150" fill="rgba(136, 191, 66, 0.05)" />
                      <circle cx="200" cy="200" r="170" stroke="#009898" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                      
                      {/* Digital Brain Network Lines */}
                      <line x1="200" y1="200" x2="120" y2="120" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="280" y2="120" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="280" y2="280" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="120" y2="280" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="100" y2="200" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="300" y2="200" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="200" y2="100" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                      <line x1="200" y1="200" x2="200" y2="300" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                    </svg>
                  </div>
                  
                  {/* Central AI Element - Better centered */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#009898]/20">
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-[#009898]" />
                    </div>
                  </div>
                  
                  {/* Floating Technology Icons - Properly positioned */}
                  <div className="absolute top-[20%] left-[20%] w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 animate-float-slow">
                    <Cpu className="w-6 h-6 text-[#009898]" />
                  </div>
                  
                  <div className="absolute top-[20%] right-[20%] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 animate-float-medium">
                    <Network className="w-5 h-5 text-[#88bf42]" />
                  </div>
                  
                  <div className="absolute bottom-[20%] right-[20%] w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 animate-float-slow">
                    <Code className="w-6 h-6 text-[#009898]" />
                  </div>
                  
                  <div className="absolute bottom-[20%] left-[20%] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 animate-float-medium">
                    <Server className="w-5 h-5 text-[#88bf42]" />
                  </div>
                </div>
                
                {/* Mobile-visible labels - Better positioned */}
                <div className="absolute top-[15%] right-[10%] bg-white px-2 py-1 rounded-full shadow-md border border-[#009898]/20 flex items-center text-xs font-medium text-[#009898] animate-float-slow">
                  <Cpu className="w-3 h-3 mr-1" /> AI
                </div>
                
                <div className="absolute bottom-[15%] right-[10%] bg-white px-2 py-1 rounded-full shadow-md border border-[#88bf42]/20 flex items-center text-xs font-medium text-[#88bf42] animate-float-medium">
                  <Code className="w-3 h-3 mr-1" /> NLP
                </div>
                
                <div className="absolute bottom-[15%] left-[10%] bg-white px-2 py-1 rounded-full shadow-md border border-[#009898]/20 flex items-center text-xs font-medium text-[#009898] animate-float-slow">
                  <Brain className="w-3 h-3 mr-1" /> ML
                </div>
                
                {/* Stats Labels - Better positioned */}
                <div className="absolute bottom-[5%] right-[5%] bg-white px-2 py-1 rounded-lg shadow-md border border-gray-100 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#009898] rounded-full mr-1"></div>
                    <span className="font-medium text-[#009898]">99.9% Uptime</span>
                  </div>
                </div>
                
                <div className="absolute top-[5%] left-[5%] bg-white px-2 py-1 rounded-lg shadow-md border border-gray-100 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#88bf42] rounded-full mr-1"></div>
                    <span className="font-medium text-[#88bf42]">25ms Response</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section after AI viz on mobile */}
            <div className="mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mx-auto">
              <div className="flex items-center p-3 sm:p-4 bg-white shadow-lg rounded-2xl border border-gray-100 transition-all duration-300 group">
                <div className="mr-3 sm:mr-4 bg-[#88bf42] p-2 rounded-xl transition-all duration-300 shadow-lg shadow-[#88bf42]/20">
                  <CircleCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg sm:text-xl text-gray-800">500+</p>
                  <p className="text-xs sm:text-sm text-gray-500">Projects Delivered</p>
                </div>
              </div>
              <div className="flex items-center p-3 sm:p-4 bg-white shadow-lg rounded-2xl border border-gray-100 transition-all duration-300 group">
                <div className="mr-3 sm:mr-4 bg-[#009898] p-2 rounded-xl transition-all duration-300 shadow-lg shadow-[#009898]/20">
                  <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg sm:text-xl text-gray-800">98%</p>
                  <p className="text-xs sm:text-sm text-gray-500">Client Satisfaction</p>
                </div>
              </div>
              <div className="flex items-center p-3 sm:p-4 bg-white shadow-lg rounded-2xl border border-gray-100 transition-all duration-300 group">
                <div className="mr-3 sm:mr-4 bg-[#88bf42] p-2 rounded-xl transition-all duration-300 shadow-lg shadow-[#88bf42]/20">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg sm:text-xl text-gray-800">65%</p>
                  <p className="text-xs sm:text-sm text-gray-500">ROI Increase</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop view: AI visualization */}
          <div className="hidden lg:block lg:w-1/2 relative">
            {/* Modern AI Visualization - Improved for desktop */}
            <div className="relative h-[500px] w-full max-w-[600px] mx-auto">
              {/* Feature Labels - Better positioned */}
              <div className="absolute top-[15%] right-[25%] bg-white px-3 py-1.5 rounded-full shadow-md border border-[#009898]/20 flex items-center text-sm font-medium text-[#009898] animate-float-slow">
                <Cpu className="w-4 h-4 mr-2" /> Machine Learning
              </div>
              
              <div className="absolute top-[25%] right-[5%] bg-white px-3 py-1.5 rounded-full shadow-md border border-[#88bf42]/20 flex items-center text-sm font-medium text-[#88bf42] animate-float-medium">
                <Network className="w-4 h-4 mr-2" /> Deep Neural Networks
              </div>
              
              <div className="absolute bottom-[25%] right-[10%] bg-white px-3 py-1.5 rounded-full shadow-md border border-[#009898]/20 flex items-center text-sm font-medium text-[#009898] animate-float-slow">
                <Brain className="w-4 h-4 mr-2" /> Computer Vision
              </div>
              
              <div className="absolute bottom-[15%] left-[30%] bg-white px-3 py-1.5 rounded-full shadow-md border border-[#88bf42]/20 flex items-center text-sm font-medium text-[#88bf42] animate-float-medium">
                <Code className="w-4 h-4 mr-2" /> Natural Language
              </div>
              
              <div className="absolute top-[30%] left-[5%] bg-white px-3 py-1.5 rounded-full shadow-md border border-[#009898]/20 flex items-center text-sm font-medium text-[#009898] animate-float-slow">
                <BarChart className="w-4 h-4 mr-2" /> Predictive Analytics
              </div>
              
              {/* Desktop view floating technology icons */}
              <div className="absolute inset-0">
                {/* Digital Brain Network */}
                <div className="absolute w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                    {/* Background Circles */}
                    <circle cx="250" cy="250" r="120" fill="rgba(0, 152, 152, 0.05)" />
                    <circle cx="250" cy="250" r="180" fill="rgba(136, 191, 66, 0.05)" />
                    <circle cx="250" cy="250" r="200" stroke="#009898" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                    
                    {/* Digital Brain Network Lines */}
                    <line x1="250" y1="250" x2="150" y2="150" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="350" y2="150" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="350" y2="350" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="150" y2="350" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="120" y2="250" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="380" y2="250" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="250" y2="120" stroke="#88bf42" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="250" y1="250" x2="250" y2="380" stroke="#009898" strokeWidth="2" strokeDasharray="2,2" />
                  </svg>
                </div>
                
                {/* Central AI Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#009898]/20">
                    <Brain className="w-16 h-16 text-[#009898]" />
                  </div>
                </div>
                
                {/* Floating Technology Icons - Better positioned */}
                <div className="absolute top-[15%] right-[25%] w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 animate-float-slow">
                  <Cpu className="w-10 h-10 text-[#009898]" />
                </div>
                
                <div className="absolute bottom-[25%] right-[10%] w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 animate-float-slow">
                  <Code className="w-10 h-10 text-[#009898]" />
                </div>
                
                <div className="absolute bottom-[15%] left-[20%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 animate-float-medium">
                  <Server className="w-8 h-8 text-[#88bf42]" />
                </div>
                
                <div className="absolute top-[20%] left-[15%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 animate-float-medium">
                  <Network className="w-8 h-8 text-[#88bf42]" />
                </div>
              </div>
              
              {/* Stats Labels */}
              <div className="absolute bottom-[5%] right-[5%] bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#009898] rounded-full mr-2"></div>
                  <span className="font-medium text-[#009898]">99.9% Uptime</span>
                </div>
              </div>
              
              <div className="absolute top-[5%] left-[5%] bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#88bf42] rounded-full mr-2"></div>
                  <span className="font-medium text-[#88bf42]">25ms Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
