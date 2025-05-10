import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Clock, Building, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import caseStudiesData from '@/data/caseStudies';

const CaseStudiesPage = () => {
  // Function to render a featured case study (spanning 2 columns)
  const renderFeaturedCaseStudy = (study, index) => (
    <Link 
      key={index} 
      to={`/case-studies/${study.slug}`}
      className="col-span-1 md:col-span-2 relative h-96 overflow-hidden rounded-xl group cursor-pointer"
      style={{ boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 brightness-75"
        style={{ backgroundImage: `url(${study.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"></div>
      <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <div className="mb-4 sm:mb-0">
            <div className="flex mb-3">
              <span 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white" 
                style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)` }}
              >
                {study.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{study.title}</h2>
            <div className="flex items-center mb-4">
              <Building className="w-4 h-4 mr-2" />
              <span className="text-white/80">{study.company}</span>
            </div>
            <p className="text-white/90 max-w-2xl mb-4 text-sm sm:text-base">{study.summary}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                  style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)`, opacity: 0.4 }}>
                  <BarChart className="w-5 h-5" />
                </div>
                <div className="ml-2">
                  <p className="text-sm text-white/70">ROI</p>
                  <p className="font-semibold">{study.roi}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                  style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)`, opacity: 0.4 }}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="ml-2">
                  <p className="text-sm text-white/70">Timeframe</p>
                  <p className="font-semibold">{study.timeframe}</p>
                </div>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white bg-transparent hover:bg-white/20 transition-all duration-300 group-hover:scale-105 pointer-events-none mt-4 sm:mt-0"
          >
            <span>Read Case Study</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
  
  // Function to render a regular case study
  const renderCaseStudy = (study, index) => (
    <Link 
      key={index} 
      to={`/case-studies/${study.slug}`}
      className="relative h-80 overflow-hidden rounded-xl group cursor-pointer"
      style={{ boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 brightness-75"
        style={{ backgroundImage: `url(${study.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40"></div>
      <div className="absolute bottom-6 left-6 right-6 text-white z-10">
        <div className="flex mb-2">
          <span 
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white"
            style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)` }}
          >
            {study.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{study.title}</h3>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{study.summary}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{study.keyMetric}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white text-white hover:bg-white/20 rounded-full w-8 h-8 p-0 flex items-center justify-center bg-transparent pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-gradient-to-r from-[#10b4b7]/10 to-[#9ac857]/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-8 rounded-full bg-gradient-to-r from-[#10b4b7]/20 to-[#9ac857]/20 text-[#1c9f1e] text-sm font-medium mt-2">
              Client Success Stories
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Transforming <span className="text-[#10b4b7]">Industries</span> with <span className="text-[#1c9f1e]">Enterprise AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Real-world case studies showcasing how our AI solutions drive measurable business impact across diverse sectors
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8">
            {renderFeaturedCaseStudy(caseStudiesData[0], 'featured')}
          </div>
        </div>
      </section>
      
      {/* Magazine Style Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">More Success Stories</h2>
            <div className="hidden md:block">
              <Button className="bg-[#10b4b7] hover:bg-[#10b4b7]/90 text-white" asChild>
                <Link to="/case-studies">View All Case Studies</Link>
              </Button>
            </div>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudiesData.slice(1).map((study, index) => renderCaseStudy(study, index))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button className="bg-[#10b4b7] hover:bg-[#10b4b7]/90 text-white w-full" asChild>
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Industry Results */}
      <section className="py-16 bg-gradient-to-r from-[#31adab]/5 to-[#31adab]/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1c1c1c] mb-4">Measurable Impact Across Industries</h2>
            <p className="text-base text-[#4b5563] max-w-2xl mx-auto">
              Our AI solutions deliver consistent, significant results regardless of industry or challenge
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "157%", label: "Average ROI", icon: BarChart, color: "#31adab" },
              { value: "42%", label: "Efficiency Gains", icon: Clock, color: "#31adab" },
              { value: "9.5mo", label: "Avg. Implementation", icon: "🚀", color: "#31adab" },
              { value: "95%", label: "Client Satisfaction", icon: "👥", color: "#31adab" }
            ].map((stat, index) => (
              <div key={index} className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden">
                {/* Custom top-rounded shape/badge crown */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2" 
                  style={{ 
                    background: `linear-gradient(to right, #31adab 0%, #31adab 100%)` 
                  }}
                ></div>
                
                <div className="px-6 py-8">
                  {/* Icon in circular container */}
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-gradient-to-br from-[#10b4b7]/10 to-[#9ac857]/10 transform transition-transform group-hover:rotate-12"> 
                    {typeof stat.icon === 'string' ? (
                      <span className="text-2xl">{stat.icon}</span>
                    ) : (
                      <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                    )}
                  </div>
                  
                  {/* Metric and label */}
                  <div className="text-center">
                    <div className="text-3xl font-semibold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;