import { useState } from 'react'; // Remove useEffect import
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Star, X } from "lucide-react"; // Remove Share icon
import { Link } from 'react-router-dom';
// Import animation components
import { Fade, Slide } from 'react-awesome-reveal';

const AwardsPage = () => {
  // Add state for showing award details
  const [selectedAward, setSelectedAward] = useState(null);
  const [showAwardModal, setShowAwardModal] = useState(false);

  // Function to open award details modal
  const openAwardDetails = (award) => {
    // Ensure award has an image property
    const awardWithDefaults = {
      ...award,
      image: award.image || getDefaultAwardImage(award.organization)
    };
    
    setSelectedAward(awardWithDefaults);
    setShowAwardModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to get default award image based on organization
  const getDefaultAwardImage = (organization) => {
    const imageMap = {
      "World Business Conclave": "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=800&auto=format&fit=crop",
      "Tech Excellence Awards": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      "Global Technology Awards": "https://media.istockphoto.com/id/2209208710/photo/deep-learning-ai-network-gpu-abstract-lines-background-futuristic-neon-led-fluorescent-light.webp?b=1&s=612x612&w=0&k=20&c=cRyZyavn8yLSthySse2cotblSXb0gPASJndSwTZlk_M=",
      "Technology Leadership Awards": "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&auto=format&fit=crop",
      "Healthcare Technology Excellence": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      "World Economic Forum": "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&auto=format&fit=crop",
      "Financial Innovation Awards": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      "Fast Company": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
      "AI Breakthrough Awards": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
      "Great Place to Work": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
    };
    
    return imageMap[organization] || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop";
  };

  // Function to close award details modal
  const closeAwardModal = () => {
    setShowAwardModal(false);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  const awards = [
    {
      year: 2025,
      awards: [
        {
          name: "World Business Conclave India AI Award",
          organization: "World Business Conclave",
          date: "April 12th, 2025",
          description: "Recognized for our groundbreaking work in enterprise AI voice agents that achieved a 98% accuracy rate for a Fortune 100 financial institution.",
          featured: true
        },
        {
          name: "Enterprise AI Solution of the Year",
          organization: "Tech Excellence Awards",
          description: "Awarded for our innovative approach to AI implementation in the enterprise sector with measurable business results."
        }
      ]
    },
    {
      year: 2024,
      awards: [
        {
          name: "AI Innovator of the Year",
          organization: "Global Technology Awards",
          description: "Selected from over 500 nominees for our pioneering work in self-learning AI systems for enterprise applications."
        },
        {
          name: "CTO of the Year - Marcus Johnson",
          organization: "Technology Leadership Awards",
          description: "Our CTO was recognized for his visionary leadership in advancing enterprise AI technology."
        },
        {
          name: "Best AI Solution - Healthcare",
          organization: "Healthcare Technology Excellence",
          description: "Award for our predictive analytics platform that improved patient outcomes by 32% at MediCare Solutions."
        }
      ]
    }
    ,
    {
      year: 2023,
      awards: [
        {
          name: "Technology Pioneer Award",
          organization: "World Economic Forum",
          description: "Selected as one of the world's most promising technology pioneers for our work in ethical AI for enterprise use."
        },
        {
          name: "Best AI Implementation - Finance",
          organization: "Financial Innovation Awards",
          description: "Recognized for our AI-driven risk assessment platform that reduced fraud by 76% for a major banking institution."
        }
      ]
    },
    {
      year: 2022,
      awards: [
        {
          name: "Most Innovative AI Company",
          organization: "Fast Company",
          description: "Named the most innovative AI company in our annual ranking of businesses that are making the biggest impact."
        },
        {
          name: "Best in Enterprise AI",
          organization: "AI Breakthrough Awards",
          description: "Winner in the Enterprise AI category for our comprehensive suite of business intelligence solutions."
        },
        {
          name: "Best Workplace in Tech",
          organization: "Great Place to Work",
          description: "Recognized for our exceptional company culture and employee satisfaction ratings of 96%."
        }
      ]
    }
  ];

  // Featured awards with images for the top section
  const featuredAwards = [
    {
      name: "World Business Conclave India AI Award",
      organization: "World Business Conclave",
      year: 2025,
      date: "April 12th, 2025",
      image: "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWklMjBnZW5lcmF0ZWR8ZW58MHx8MHx8fDA%3Dhttps://media.istockphoto.com/id/2203742125/photo/futuristic-ai-generated-face-in-a-dreamlike-digital-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=FfM8Lyyag4psSSFIMxOCSzZbn7gqrv3nZHRQ84qwGtw=",
      icon: <Trophy className="h-8 w-8" />
    },
    {
      name: "AI Innovator of the Year",
      organization: "Global Technology Awards",
      year: 2024,
      image: "https://media.istockphoto.com/id/2209208710/photo/deep-learning-ai-network-gpu-abstract-lines-background-futuristic-neon-led-fluorescent-light.webp?a=1&b=1&s=612x612&w=0&k=20&c=cRyZyavn8yLSthySse2cotblSXb0gPASJndSwTZlk_M=",
      icon: <Star className="h-8 w-8" />
    },
    {
      name: "Technology Pioneer Award",
      organization: "World Economic Forum",
      year: 2023,
      image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?q=80&w=2070&auto=format&fit=crop",
      icon: <Award className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Enhanced padding for better mobile responsiveness */}
      <section className="pt-36 sm:pt-38 md:pt-40 pb-10 sm:pb-12 md:pb-16 bg-gradient-to-br from-[#009898]/10 to-[#2c3037]/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#009898]/10 rounded-br-full opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#2c3037]/10 rounded-tl-full opacity-40 z-0"></div>
        <div className="container mx-auto px-5 sm:px-4 md:px-6 relative z-10 max-w-6xl hover:shadow-xl rounded-2xl backdrop-blur-[2px] bg-white/5 py-6 sm:py-8 md:py-12 border border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <Fade triggerOnce direction="up" delay={50}> {/* Animate Hero Badge */}
              <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 md:mb-6 rounded-full bg-[#009898]/20 text-[#009898] font-medium text-sm animate-fade-in border border-[#009898]/30 shadow-inner shadow-[#009898]/5 mt-2">
            Industry Recognition
            </div>
            </Fade>
            <Fade triggerOnce direction="up" delay={150}> {/* Animate Hero Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 animate-slide-up">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009898] to-[#2c3037]">Award-Winning</span> Excellence
            </h1>
            </Fade>
            <Fade triggerOnce direction="up" delay={250}> {/* Animate Hero Paragraph */}
              <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 animate-slide-up mx-2 md:mx-0" style={{animationDelay: '0.2s'}}>
            Celebrating innovation, leadership, and excellence in AI technology
            </p>
            </Fade>
          </div>
        </div>
      </section>


      {/* Featured Awards Section - Includes the separator */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 hover:scale-[1.01] transition-transform duration-300">

          {/* --- ADDED SEPARATOR HERE --- */}
          <Fade triggerOnce delay={350}> {/* Animate the separator */}
            <div className="flex items-center justify-center my-8 md:my-12"> {/* my-12 adds vertical space */}
              <div className="flex-grow h-px bg-gray-300"></div> {/* Left Line */}
              <Star className="h-5 w-5 md:h-6 md:w-6 text-[#009898] mx-3 md:mx-4" /> {/* Icon */}
              <div className="flex-grow h-px bg-gray-300"></div> {/* Right Line */}
            </div>
          </Fade>
          {/* --- END SEPARATOR --- */}


          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
            {/* Animate the Heading (adjust delay) */}
            <Fade triggerOnce direction="up" delay={450}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Featured Recognition</h2>
            </Fade>
            {/* Animate the Paragraph (adjust delay) */}
            <Fade triggerOnce direction="up" delay={550}>
              <p className="text-base md:text-lg text-gray-700">
                Highlighting our most prestigious industry awards
              </p>
            </Fade>
          </div>

          {/* Animate the Grid container with cascade for the cards (adjust delay) */}
          <Fade triggerOnce cascade damping={0.1} direction="up" delay={650}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {featuredAwards.map((award, index) => (
                // Individual items within the cascade will be animated automatically
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#009898]/90 via-[#009898]/60 to-transparent z-10"></div>

                  {/* Background Image */}
                  <img
                    src={award.image}
                    alt={award.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Award Icon */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-gradient-to-r from-[#009898] to-[#88bf42] p-3 rounded-full shadow-lg">
                      {award.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center mb-2">
                      <span className="text-[#88bf42]/80 text-sm font-semibold">{award.date || award.year}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-300 text-sm">{award.organization}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{award.name}</h3>
                     {/* Ensure Button has a single child if needed */}
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-white text-white hover:bg-white/20 mt-2 group"
                      onClick={() => openAwardDetails(award)}
                    >
                      <span>
                        View Details
                        <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Fade> {/* Close Fade cascade wrapper */}
        </div>
      </section>

      {/* Awards Timeline (Animations already added) */}
      <section className="py-20 bg-gradient-to-br from-[#009898]/5 to-[#2c3037]/5">
        <div className="container mx-auto px-4 md:px-6">
          {/* Animate the Heading */}
          <Fade triggerOnce direction="up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">Awards Timeline</h2>
          </Fade>
          {/* Animate the Paragraph */}
          <Fade triggerOnce direction="up" delay={200}>
            <p className="text-lg text-gray-700 text-center mb-16">
              Our journey of recognition throughout the years
            </p>
          </Fade>


          <div className="space-y-16">
            {awards.map((yearGroup, index) => (
              <div key={index}>
                 {/* Animate the year heading */}
                 <Fade triggerOnce direction="right" delay={100}>
                   <div className="flex items-center mb-8">
                     <div className="p-4 bg-[#88bf42] hover:bg-[#009898] text-white text-xl font-bold rounded-lg">
                       {yearGroup.year}
                     </div>
                     <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-[#009898] to-[#88bf42]"></div>
                   </div>
                 </Fade>

                 {/* Animate the award cards within the grid with cascade */}
                 {/* This Fade with cascade is already correctly placed around the grid */}
                 <Fade triggerOnce cascade damping={0.1} direction="up" delay={200}>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                     {yearGroup.awards.map((award, awardIndex) => (
                       // Each Card is a child being animated by the cascade
                       <Card key={awardIndex} className={`hover:shadow-lg transition-shadow overflow-hidden ${award.featured ? 'border-2 border-[#009898]' : ''}`}>
                         {award.featured && (
                           <div className="h-1.5 bg-gradient-to-r from-[#009898] to-[#88bf42]"></div>
                         )}
                         <CardContent className="pt-6">
                           <div className="flex items-start justify-between mb-4">
                             <div className={`p-3 rounded-lg ${award.featured ? 'bg-gradient-to-r from-[#009898] to-[#88bf42] text-white' : 'bg-[#009898]/10 text-[#009898]'}`}>
                               {award.featured ? <Trophy className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                             </div>
                             <div>
                               <span className="text-gray-500 text-sm block text-right">{award.organization}</span>
                               {award.date && <span className="text-[#009898] font-medium text-sm">{award.date}</span>}
                             </div>
                           </div>
                           <h3 className={`text-xl font-bold mb-3 ${award.featured ? 'text-[#009898]' : 'text-gray-900'}`}>{award.name}</h3>
                           <p className="text-gray-700 text-sm mb-4">{award.description}</p>

                           <div className="mt-4">
                             <Button 
                               className={`w-full ${award.featured ? 'bg-[#88bf42]' : 'bg-[#009898]'} hover:bg-[#009898] text-white`}
                               onClick={() => openAwardDetails({...award, year: yearGroup.year})}
                             >
                               <span>Read Full Story</span>
                             </Button>
                           </div>
                         </CardContent>
                       </Card>
                     ))}
                   </div>
                 </Fade>
               </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Award Details Modal */}
      {showAwardModal && selectedAward && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] shadow-2xl my-8 flex flex-col">
            {/* Modal Header */}
            <div className="relative">
              {/* Background Image with Overlay */}
              <div className="h-32 md:h-40 w-full relative">
                <img 
                  src={selectedAward.image} 
                  alt={selectedAward.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#009898]/80 to-[#009898]/95"></div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={closeAwardModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-20"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Award Title - Positioned over the background image */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-1.5 rounded-md bg-white/20">
                    {selectedAward.icon || <Trophy className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium">{selectedAward.organization}</span>
                  <span className="text-white/70">•</span>
                  <span className="text-sm">{selectedAward.date || selectedAward.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{selectedAward.name}</h3>
              </div>
            </div>
            
            {/* Modal Content - Made scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col md:flex-row">
                {/* Award Image */}
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <img 
                      src={selectedAward.image} 
                      alt={selectedAward.name}
                      className="w-full h-48 sm:h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-br from-[#009898]/5 to-[#2c3037]/5 p-5 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#009898] flex items-center">
                      <Star className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Award Highlights</span>
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-[#88bf42] flex-shrink-0">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base">Recognized for innovation in AI technology</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-[#88bf42] flex-shrink-0">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base">Selected from hundreds of global nominees</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-[#88bf42] flex-shrink-0">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base">Praised for measurable business impact and results</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Award Details */}
                <div className="p-6 md:p-8 md:w-1/2">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">About This Award</h4>
                    <div className="border-l-4 border-[#009898] pl-4 py-1 italic">
                      <p className="text-gray-700 text-sm sm:text-base">{selectedAward.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">Impact & Recognition</h4>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                      This award represents a significant milestone in our journey to transform enterprise AI implementation. 
                      The {selectedAward.organization} recognized our commitment to innovation, ethical AI practices, and 
                      measurable business outcomes for our clients.
                    </p>
                  </div>
                  
                  {/* Bottom Actions */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    <Button 
                      className="bg-[#009898] hover:bg-[#007a7a] text-white"
                      onClick={closeAwardModal}
                    >
                      Close Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardsPage; 