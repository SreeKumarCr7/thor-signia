import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Users, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle, 
  Lightbulb, 
  Rocket, 
  Award, 
  Quote,
  MessageCircle,
  MessageSquare,
  Globe,
  Database,
  LineChart,
  Settings
} from "lucide-react";
import caseStudiesData, { CaseStudy } from '@/data/caseStudies';

// Map of icon names to Lucide components
const iconMap: any = {
  MessageCircle: MessageCircle,
  MessageSquare: MessageSquare,
  Globe: Globe,
  Database: Database,
  LineChart: LineChart,
  Settings: Settings
};

// Component to render a section heading with an icon
const SectionHeading = ({ icon, title, accentColor }: { icon: any, title: string, accentColor: string }) => {
  const Icon = icon;
  return (
    <div className="flex items-center mb-6">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-[#31adab]/20" 
      >
        <Icon className="w-6 h-6" style={{ color: "#31adab" }} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);
  const [activeSection, setActiveSection] = useState('challenge');
  
  // Refs for scroll sections
  const challengeRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const executionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  // Find the case study by slug
  useEffect(() => {
    const study = caseStudiesData.find(study => study.slug === slug);
    if (study) {
      setCaseStudy(study);
      // Get related case studies
      const related = study.relatedCaseStudies
        .map(id => caseStudiesData.find(cs => cs.id === id))
        .filter(Boolean) as CaseStudy[];
      setRelatedCaseStudies(related);
    } else {
      // If no study found, redirect to case studies page
      navigate('/case-studies');
    }
  }, [slug, navigate]);
  
  // Set up intersection observer for scrolling sections
  useEffect(() => {
    if (!caseStudy) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    const sections = [
      challengeRef.current,
      strategyRef.current,
      executionRef.current,
      resultsRef.current,
      testimonialRef.current
    ];
    
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [caseStudy]);
  
  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const sectionMap = {
      'challenge': challengeRef,
      'strategy': strategyRef,
      'execution': executionRef,
      'results': resultsRef,
      'testimonial': testimonialRef
    };
    
    const ref = sectionMap[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#10b4b7]"></div>
        <p className="mt-4 text-xl">Loading case study...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${caseStudy.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                <Link to="/case-studies" className="inline-flex items-center text-white hover:text-[#31adab] mb-6 transition duration-200 mt-20 md:mt-0">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back to Case Studies</span>
                </Link>
                <div className="mb-4">
                  <img 
                    src={caseStudy.logo} 
                    alt={`${caseStudy.company} logo`} 
                    className="h-16 md:h-20 bg-white/90 p-2 rounded-lg"
                  />
                </div>
                <div className="flex mb-4 mt-2">
                  <span 
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white" 
                    style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)` }}
                  >
                    {caseStudy.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mb-8">
                  {caseStudy.summary}
                </p>
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[#31adab]/40">
                      <BarChart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">ROI</p>
                      <p className="text-white font-bold text-lg">{caseStudy.roi}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[#31adab]/40">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Timeframe</p>
                      <p className="text-white font-bold text-lg">{caseStudy.timeframe}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[#31adab]/40">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Team Size</p>
                      <p className="text-white font-bold text-lg">{caseStudy.teamSize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content with Sidebar */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-8/12">
                {/* Challenge Section */}
                <div id="challenge" ref={challengeRef} className="mb-16 scroll-mt-32 animate-fade-in">
                  <SectionHeading 
                    icon={Lightbulb} 
                    title="The Challenge" 
                    accentColor="#31adab" 
                  />
                  <div className="space-y-4">
                    {caseStudy.challenge.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Strategy Section */}
                <div id="strategy" ref={strategyRef} className="mb-16 scroll-mt-32 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <SectionHeading 
                    icon={Briefcase} 
                    title="Our Strategy" 
                    accentColor="#31adab" 
                  />
                  <div className="space-y-4">
                    {caseStudy.strategy.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Execution Section */}
                <div id="execution" ref={executionRef} className="mb-16 scroll-mt-32 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <SectionHeading 
                    icon={Rocket} 
                    title="The Execution" 
                    accentColor="#31adab" 
                  />
                  <div className="space-y-4">
                    {caseStudy.execution.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Results Section */}
                <div id="results" ref={resultsRef} className="mb-16 scroll-mt-32 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <SectionHeading 
                    icon={Award} 
                    title="The Results" 
                    accentColor="#31adab" 
                  />
                  <div className="space-y-6">
                    <ul className="space-y-4">
                      {caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1 bg-[#31adab]"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-xl font-bold text-[#31adab]">
                            {result}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Testimonial Section */}
                <div id="testimonial" ref={testimonialRef} className="mb-16 scroll-mt-32 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <SectionHeading 
                    icon={Quote} 
                    title="Client Testimonial" 
                    accentColor="#31adab" 
                  />
                  <div className="bg-white rounded-xl shadow-lg p-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl bg-[#31adab]">
                    </div>
                    <div className="flex items-start">
                      <div className="hidden md:block mr-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img 
                            src={caseStudy.testimonial.image} 
                            alt={caseStudy.testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-6">
                          <Quote className="w-12 h-12 text-[#31adab]" />
                        </div>
                        <p className="text-lg text-gray-700 italic mb-6">
                          "{caseStudy.testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-bold text-lg text-[#31adab]">
                            {caseStudy.testimonial.author}
                          </p>
                          <p className="text-gray-600">
                            {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sticky Sidebar */}
              <div className="lg:w-4/12 hidden lg:block">
                <div className="sticky top-32">
                  <div 
                    className="p-6 rounded-xl mb-8 bg-[#31adab]/10"
                  >
                    <h3 className="text-xl font-bold mb-4" style={{ color: "#31adab" }}>
                      Overview
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Navigation Links */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => scrollToSection('challenge')}
                          className={`flex items-center w-full p-2 rounded-lg transition-all duration-200 ${
                            activeSection === 'challenge' 
                              ? 'bg-gradient-to-r from-[#31adab] to-[#31adab] text-white font-semibold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Lightbulb className="w-5 h-5 mr-2" />
                          <span>The Challenge</span>
                        </button>
                        
                        <button 
                          onClick={() => scrollToSection('strategy')}
                          className={`flex items-center w-full p-2 rounded-lg transition-all duration-200 ${
                            activeSection === 'strategy' 
                              ? 'bg-gradient-to-r from-[#31adab] to-[#31adab] text-white font-semibold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Briefcase className="w-5 h-5 mr-2" />
                          <span>Our Strategy</span>
                        </button>
                        
                        <button 
                          onClick={() => scrollToSection('execution')}
                          className={`flex items-center w-full p-2 rounded-lg transition-all duration-200 ${
                            activeSection === 'execution' 
                              ? 'bg-gradient-to-r from-[#31adab] to-[#31adab] text-white font-semibold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Rocket className="w-5 h-5 mr-2" />
                          <span>The Execution</span>
                        </button>
                        
                        <button 
                          onClick={() => scrollToSection('results')}
                          className={`flex items-center w-full p-2 rounded-lg transition-all duration-200 ${
                            activeSection === 'results' 
                              ? 'bg-gradient-to-r from-[#31adab] to-[#31adab] text-white font-semibold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Award className="w-5 h-5 mr-2" />
                          <span>The Results</span>
                        </button>
                        
                        <button 
                          onClick={() => scrollToSection('testimonial')}
                          className={`flex items-center w-full p-2 rounded-lg transition-all duration-200 ${
                            activeSection === 'testimonial' 
                              ? 'bg-gradient-to-r from-[#31adab] to-[#31adab] text-white font-semibold' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Quote className="w-5 h-5 mr-2" />
                          <span>Client Testimonial</span>
                        </button>
                      </div>
                      
                      {/* Services Used */}
                      <div>
                        <h4 className="font-semibold mb-2">Services Used</h4>
                        <div className="space-y-2">
                          {caseStudy.servicesUsed.map((service, index) => {
                            const ServiceIcon = iconMap[service.icon] || Settings;
                            return (
                              <div key={index} className="flex items-center">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-[#31adab]/20"
                                >
                                  <ServiceIcon className="w-4 h-4" style={{ color: "#31adab" }} />
                                </div>
                                <span className="text-gray-700">{service.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#10b4b7] to-[#1c9f1e] hover:opacity-90 text-white rounded-lg transition-all duration-300 hover:shadow-lg mb-4"
                      asChild
                    >
                      <Link to="/contact">Request a Similar Solution</Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-[#10b4b7] text-[#10b4b7] hover:bg-[#10b4b7]/10 rounded-lg transition-all duration-300"
                      asChild
                    >
                      <Link to="/services">View All Services</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related case studies grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">More Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((study, index) => (
                <Link 
                  key={index} 
                  to={`/case-studies/${study.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={study.imageUrl} 
                      alt={study.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40"></div>
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <span 
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white" 
                        style={{ background: `linear-gradient(to right, #31adab 0%, #31adab 100%)` }}
                      >
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#31adab] transition-colors">{study.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{study.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#31adab] font-semibold">{study.keyMetric}</span>
                      <div className="bg-[#31adab]/10 rounded-full p-1 group-hover:bg-[#31adab] transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#31adab] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button
                className="bg-gradient-to-r from-[#31adab] to-[#31adab] hover:opacity-90 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-md"
                asChild
              >
                <Link to="/case-studies">View All Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#10b4b7] to-[#9ac857] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Let us help you achieve similar results. Our AI solutions are tailored to your unique business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-black text-white hover:bg-white hover:text-black shadow-lg transition-all duration-300"
                asChild
              >
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button 
                variant="outline" 
                className="bg-black border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                asChild
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudyDetail; 