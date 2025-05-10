import React from 'react'; // Removed useEffect import
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Users, Award, Clock, Globe, Target, Lightbulb, Brain, Building } from "lucide-react"; // Added Brain and Building for new section icons
// Import animation components
import { Fade, Slide } from 'react-awesome-reveal'; // <-- Import animation components

const AboutPage = () => {

  const team = [
    {
      name: "Dr. Amelia Chen",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      bio: "Former Head of AI Research at MIT, with over 15 years of experience in AI development and implementation."
    },
    {
      name: "Marcus Johnson",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
      bio: "Previously led engineering at Google's AI division, specializing in enterprise-level AI solutions."
    },
    {
      name: "Sophia Rodriguez",
      role: "VP of Product",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      bio: "10+ years experience in product management for AI solutions at Fortune 500 companies."
    },
    {
      name: "David Park",
      role: "VP of Client Success",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
      bio: "Former management consultant specializing in digital transformation and AI integration."
    }
  ];

  const values = [
    {
      icon: <Target className="h-10 w-10 text-white" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI technology.",
      color: "border-teal-500",
      bgColor: "bg-teal-100",
      iconGradient: "from-teal-400 to-teal-600"
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Collaboration",
      description: "We work closely with our clients to ensure solutions align perfectly with their needs.",
      color: "border-blue-500",
      bgColor: "bg-blue-100",
      iconGradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Excellence",
      description: "We hold ourselves to the highest standards in every aspect of our work.",
      color: "border-purple-500",
      bgColor: "bg-purple-100",
      iconGradient: "from-purple-400 to-purple-600"
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-white" />,
      title: "Forward Thinking",
      description: "We anticipate future challenges and build solutions that stand the test of time.",
      color: "border-amber-500",
      bgColor: "bg-amber-100",
      iconGradient: "from-amber-400 to-amber-600"
    },
    {
      icon: <Clock className="h-10 w-10 text-white" />,
      title: "Efficiency",
      description: "We optimize processes to deliver maximum value with minimal resource investment.",
      color: "border-green-500",
      bgColor: "bg-green-100",
      iconGradient: "from-green-400 to-green-600"
    },
    {
      icon: <Globe className="h-10 w-10 text-white" />,
      title: "Global Perspective",
      description: "We bring diverse insights from around the world to solve complex challenges.",
      color: "border-indigo-500",
      bgColor: "bg-indigo-100",
      iconGradient: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col"> {/* Added flex-col for main div */}
      <Navbar />

      {/* Hero Section - Adding animations here */}
      <section className="pt-20 pb-12 sm:pt-24 md:pt-28 lg:pt-32 md:pb-16 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#88bf42]/10 rounded-tl-full opacity-40 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-6xl hover:scale-[1.01] transition-transform duration-300 safe-area-padding">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animate the badge */}
            <Fade triggerOnce direction="up" delay={50}>
              <div className="inline-block px-4 py-1.5 mb-8 sm:mb-10 rounded-full bg-[#009898]/10 text-[#009898] font-medium text-sm header-badge">
                Our Story
              </div>
            </Fade>
            {/* Animate the main heading */}
            <Fade triggerOnce direction="up" delay={150}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 px-1 sm:px-0">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009898] to-[#88bf42]">Thor Signia</span>
              </h1>
            </Fade>
             {/* Animate the paragraph */}
            <Fade triggerOnce direction="up" delay={250}>
               <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 px-1 sm:px-0">
                 Leading the way in enterprise AI solutions since 2015
               </p>
             </Fade>
          </div>
        </div>
      </section>

      {/* Our Story Section - Adding animations here */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-[#009898]/5 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-20 left-0 w-80 h-80 bg-gray-50 rounded-full opacity-60 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl hover:scale-[1.01] transition-transform duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Animate heading */}
              <Fade triggerOnce direction="up" delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Journey</h2>
              </Fade>
               {/* Animate text block */}
              <Fade triggerOnce direction="up" delay={200}>
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg">
                    Thor Signia was founded in 2015 by a group of visionary AI researchers and business leaders who saw the transformative potential of artificial intelligence for enterprise applications.
                  </p>
                  <p>
                    What began as a small team of five AI specialists has grown into a global company with over 250 employees across offices in San Francisco, London, Singapore, and Tokyo. Our initial focus on voice AI has expanded to encompass a comprehensive suite of AI solutions serving clients in 6 countries.
                  </p>
                  <p>
                    Through continuous innovation and a commitment to excellence, we've established ourselves as the premier provider of enterprise AI solutions, helping businesses across industries harness the power of artificial intelligence to achieve unprecedented growth and efficiency.
                  </p>
                </div>
              </Fade>

               {/* Animate stats grid with cascade */}
              <Fade triggerOnce cascade damping={0.1} direction="up" delay={300}>
                 <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                   <div className="bg-gradient-to-br from-[#009898]/10 to-white p-6 rounded-lg shadow-md border border-[#009898]/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                     <div className="text-3xl font-bold text-[#009898] mb-2">250+</div>
                     <p className="text-gray-600">Global employees</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#009898]/10 to-white p-6 rounded-lg shadow-md border border-[#009898]/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                     <div className="text-3xl font-bold text-[#009898] mb-2">6</div>
                     <p className="text-gray-600">Countries served</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#009898]/10 to-white p-6 rounded-lg shadow-md border border-[#009898]/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                     <div className="text-3xl font-bold text-[#009898] mb-2">500+</div>
                     <p className="text-gray-600">Projects delivered</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#009898]/10 to-white p-6 rounded-lg shadow-md border border-[#009898]/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                     <div className="text-3xl font-bold text-[#009898] mb-2">27</div>
                     <p className="text-gray-600">Industry awards</p>
                   </div>
                 </div>
               </Fade>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#009898]/10 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gray-200 rounded-full opacity-30 blur-3xl"></div>
               {/* Animate image grid with cascade */}
              <Fade triggerOnce cascade damping={0.05} direction="up" delay={400}>
                <div className="relative z-10 grid grid-cols-2 gap-4 transform transition-all duration-500 hover:rotate-1">
                  <div className="aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                      alt="Team collaboration"
                      className="w-full h-full object-cover rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="aspect-[4/5] mt-8">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                      alt="Office space"
                      className="w-full h-full object-cover rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="aspect-[4/5] -mt-8">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                      alt="Team meeting"
                      className="w-full h-full object-cover rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                      alt="Technology work"
                      className="w-full h-full object-cover rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                    />
                  </div>
                </div>
               </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION & MISSION SECTION --- */}
      <section className="py-20 bg-gray-100"> {/* Subtle contrasting background */}
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Section heading */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Purpose</h2>
            <p className="text-lg text-gray-700">
              Guiding principles that define who we are and where we're going
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Block - Animate from the left */}
            <Fade triggerOnce direction="left" delay={100}>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-[#009898]/10 text-[#009898] p-3 rounded-lg mr-4 flex-shrink-0">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 text-lg flex-grow">
                  To be the leading force in ethical and transformative enterprise AI, empowering businesses to achieve unprecedented human-machine collaboration and innovation.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#009898]">Driving AI innovation since 2015</span>
                </div>
              </div>
            </Fade>

            {/* Mission Block - Animate from the right */}
            <Fade triggerOnce direction="right" delay={100}> {/* Same delay for simultaneous appearance */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-[#88bf42]/10 text-[#88bf42] p-3 rounded-lg mr-4 flex-shrink-0">
                    <Building className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg flex-grow">
                  To deliver cutting-edge, customized AI solutions that solve complex business challenges, drive measurable ROI, and foster a future where AI enhances human potential.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#88bf42]">Improving businesses in 6 countries</span>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
      {/* --- END VISION & MISSION SECTION --- */}


      {/* Values Section - Completely redesigned */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background texture/SVG abstract shape */}
        <div className="absolute inset-0 opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 20 10 L 20 0 L 30 0 L 30 10 L 40 10 L 40 20 L 30 20 L 30 30 L 20 30 L 20 20 L 10 20 L 10 30 L 0 30 Z" fill="none" stroke="currentColor" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          {/* Section heading */}
          <div className="text-center mb-16">
            <Fade triggerOnce cascade direction="up" delay={100}>
              <span className="inline-block px-4 py-1.5 bg-[#009898]/10 text-[#009898] rounded-full text-sm font-medium mb-4">
                Our Principles
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-[#009898] to-gray-900 bg-clip-text text-transparent">
                Core Values
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                The foundational principles that guide our approach to AI innovation and client partnerships
              </p>
            </Fade>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 hover:translate-y-[-8px] transition-all duration-300 hover:shadow-xl rounded-xl">
            {values.map((value, index) => (
              <Fade key={index} triggerOnce direction="up" delay={100 + (index * 50)}>
                <div 
                  className={`rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-100 p-6 md:p-8 ${value.color} border-t-4 my-4 sm:my-0 relative overflow-hidden`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Removed subtle glow effect on hover */}
                  <div className="absolute inset-0 -z-10 opacity-0">
                    {value.color === "border-teal-500" && (
                      <div className="absolute inset-0 bg-teal-300 blur-xl rounded-full scale-150"></div>
                    )}
                    {value.color === "border-blue-500" && (
                      <div className="absolute inset-0 bg-blue-300 blur-xl rounded-full scale-150"></div>
                    )}
                    {value.color === "border-purple-500" && (
                      <div className="absolute inset-0 bg-purple-300 blur-xl rounded-full scale-150"></div>
                    )}
                    {value.color === "border-amber-500" && (
                      <div className="absolute inset-0 bg-amber-300 blur-xl rounded-full scale-150"></div>
                    )}
                    {value.color === "border-green-500" && (
                      <div className="absolute inset-0 bg-green-300 blur-xl rounded-full scale-150"></div>
                    )}
                    {value.color === "border-indigo-500" && (
                      <div className="absolute inset-0 bg-indigo-300 blur-xl rounded-full scale-150"></div>
                    )}
                  </div>
                  
                  <div className="flex items-start mb-6 relative z-10">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${value.iconGradient} shadow-md`}>
                      {value.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{value.description}</p>
                    </div>
                  </div>

                  {/* Subtle divider - removed hover effects */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    {value.color === "border-teal-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-10"></div>
                    )}
                    {value.color === "border-blue-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10"></div>
                    )}
                    {value.color === "border-purple-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-10"></div>
                    )}
                    {value.color === "border-amber-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-10"></div>
                    )}
                    {value.color === "border-green-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-10"></div>
                    )}
                    {value.color === "border-indigo-500" && (
                      <div className="h-1 w-0 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-10"></div>
                    )}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage; 