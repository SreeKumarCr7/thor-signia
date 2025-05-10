import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

const CTASection = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-teal-50 opacity-40 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-green-50 opacity-40 -translate-y-1/2 blur-3xl"></div>
      
      {/* SVG Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-auto">
          <path 
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z" 
            fill="#f9fafb" 
            fillOpacity="0.8"
          />
        </svg>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-6 py-20">
          <Fade direction="up" triggerOnce>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center max-w-3xl">
              Ready to Transform Your Business with AI?
            </h2>
          </Fade>
          
          <Fade direction="up" delay={100} triggerOnce>
            <p className="text-lg text-gray-600 max-w-xl mx-auto text-center">
              Join industry leaders leveraging Thor Signia's enterprise AI platform to gain competitive advantages and transform customer experiences.
            </p>
          </Fade>
          
          <Fade direction="up" delay={200} triggerOnce>
            <Button 
              asChild 
              className="mt-4 bg-teal-500 text-white px-8 py-6 rounded-full hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 text-lg"
            >
              <Link to="/contact">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule AI Consultation
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </Fade>
          
          {/* Optional decorative element for desktop only */}
          <div className="hidden md:block absolute right-[10%] top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-teal-500 to-green-400 rounded-xl opacity-10 animate-float"></div>
          <div className="hidden md:block absolute left-[10%] top-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-teal-500 to-green-400 rounded-full opacity-10 animate-float-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
