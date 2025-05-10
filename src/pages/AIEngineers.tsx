import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Code, 
  Brain, 
  Search,
  CircleCheck,
  Filter,
  Users,
  ChevronRight,
  Calendar,
  Clock,
  Building,
  Sparkles,
  LineChart,
  BookOpen,
  Star,
  GraduationCap,
  Rocket,
  BarChart,
  CheckCircle,
  MapPin,
  MessageSquare,
  ArrowRight,
  Eye,
  Server,
  Shield,
  Mail
} from 'lucide-react';

// Modern redesigned AI Engineers page
const AIEngineers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('profiles');

  // Engineer data
  const engineers = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Machine Learning Engineer",
      experience: "8+ years",
      skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
      availability: "Available from July 2023",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: true,
      category: "ml",
      bio: "Alex has led ML teams at Fortune 500 companies and specializes in building production-ready computer vision systems that deliver measurable business value.",
      projects: [
        "Retail customer analytics system that increased conversion by 27%",
        "Manufacturing defect detection with 99.8% accuracy"
      ]
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "AI Research Scientist",
      experience: "6+ years",
      skills: ["Deep Learning", "Reinforcement Learning", "GANs", "Python"],
      availability: "Available from June 2023",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
      featured: true,
      category: "research",
      bio: "Sarah specializes in cutting-edge reinforcement learning approaches with previous research at DeepMind and publications in top AI conferences.",
      projects: [
        "Game AI system that outperforms human experts",
        "Multi-agent reinforcement learning for logistics optimization"
      ]
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "Computer Vision Specialist",
      experience: "5+ years",
      skills: ["OpenCV", "CNNs", "Object Detection", "Image Processing"],
      availability: "Available from August 2023",
      photo: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: false,
      category: "vision",
      bio: "Michael has built computer vision systems for retail, manufacturing, and security sectors with a focus on real-time processing and edge deployment.",
      projects: [
        "Retail inventory tracking system using object detection",
        "Security system with human pose estimation"
      ]
    },
    {
      id: 4,
      name: "Emily Watson",
      title: "NLP Engineer",
      experience: "4+ years",
      skills: ["BERT", "GPT", "Language Models", "Transformers"],
      availability: "Available from July 2023",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: false,
      category: "nlp",
      bio: "Emily specializes in building conversational AI systems and has expertise in fine-tuning large language models for specialized business applications.",
      projects: [
        "Customer service AI that reduced support tickets by 45%",
        "Healthcare documentation system using medical-specific LLMs"
      ]
    },
    {
      id: 5,
      name: "Daniel Kim",
      title: "AI Systems Architect",
      experience: "7+ years",
      skills: ["MLOps", "Kubernetes", "AI Infrastructure", "Model Deployment"],
      availability: "Available from June 2023",
      photo: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: false,
      category: "infra",
      bio: "Daniel focuses on the infrastructure needed to deploy AI at scale, with expertise in building resilient, high-performance ML systems.",
      projects: [
        "Enterprise MLOps platform supporting 200+ models in production",
        "Edge AI deployment for IoT devices with minimal latency"
      ]
    },
    {
      id: 6,
      name: "Rachel Patel",
      title: "AI Ethics Researcher",
      experience: "6+ years",
      skills: ["Responsible AI", "Ethical Frameworks", "Bias Detection", "ML"],
      availability: "Available from August 2023",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: false,
      category: "ethics",
      bio: "Rachel ensures AI systems are built ethically and responsibly, with expertise in bias detection and mitigation strategies.",
      projects: [
        "Fairness audit framework for financial AI systems",
        "Bias detection and mitigation for hiring algorithms"
      ]
    },
  ];

  // Filter engineers by search term and active filter
  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = 
      engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesFilter = activeFilter === 'all' || engineer.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Modern Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#10b4b7]/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#88bf42]/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-20 right-20 w-20 h-20 rounded-full border border-[#10b4b7]/20"></div>
          <div className="absolute bottom-40 left-40 w-16 h-16 rounded-lg border border-[#88bf42]/20 rotate-12"></div>
          <div className="absolute top-40 left-1/4 w-5 h-5 rounded-full bg-[#10b4b7]/10"></div>
          <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-[#88bf42]/10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#10b4b7]/10 text-[#10b4b7] text-sm font-medium mb-6">
                <Brain className="w-4 h-4 mr-2" />
                <span>AI Talent Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Expert <span className="text-[#10b4b7]">AI Engineers</span> Ready to Transform Your Business
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Access our pre-vetted network of AI specialists with proven expertise in machine learning, natural language processing, computer vision, and more.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-2.5 rounded-lg border border-gray-200 shadow-sm"
                  asChild
                >
                  <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Calendar className="w-5 h-5 mr-2 text-[#88bf42]" />
                    <span>Contact for Consultation</span>
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#88bf42] mr-2" />
                  <span className="text-gray-700 text-sm">Pre-vetted experts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#88bf42] mr-2" />
                  <span className="text-gray-700 text-sm">Project-based hiring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#88bf42] mr-2" />
                  <span className="text-gray-700 text-sm">NDA protection</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#10b4b7]/20 to-[#88bf42]/20 rounded-xl blur-lg opacity-70"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="AI team collaborating"
                  className="relative rounded-xl shadow-lg w-full h-auto object-cover z-10"
                />
                
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md z-20">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-current text-[#ffc107]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-800 font-medium mt-1">
                    Trusted by 500+ enterprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Engineers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured AI Engineers</h2>
            <Button 
              className="hidden md:flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground text-[#009898] border-[#009898] hover:bg-[#009898]/10"
              asChild
            >
              <Link to="/contact">
                Contact About Engineers <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineers.filter(engineer => engineer.featured).map(engineer => (
              <div key={engineer.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <div className="h-48 bg-[#009898]/10 flex items-center justify-center">
                    <img 
                      src={engineer.photo} 
                      alt={engineer.name} 
                      className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150?text=AI+Engineer";
                      }}
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-[#88bf42] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{engineer.name}</h3>
                  <p className="text-[#009898] font-medium mb-3">{engineer.title}</p>
                  
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{engineer.experience} experience</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {engineer.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-[#009898]/10 text-[#009898] px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Calendar className="h-4 w-4 mr-2 text-[#88bf42]" />
                    {engineer.availability}
                  </div>
                  
                  <Button
                    className="w-full bg-[#009898] hover:bg-[#007b7b] text-white"
                    asChild
                  >
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact About This Engineer
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Button 
              className="inline-flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground text-[#009898] border-[#009898] hover:bg-[#009898]/10"
              asChild
            >
              <Link to="/contact">
                Contact About Engineers <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* All Engineers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Available AI Engineers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEngineers.filter(engineer => !engineer.featured).map(engineer => (
              <div key={engineer.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start">
                    <img 
                      src={engineer.photo} 
                      alt={engineer.name} 
                      className="h-16 w-16 rounded-full object-cover mr-4 border border-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/64?text=AI+Engineer";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{engineer.name}</h3>
                      <p className="text-[#009898] text-sm font-medium">{engineer.title}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Briefcase className="h-3 w-3 mr-1" />
                        <span>{engineer.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {engineer.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {engineer.skills.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          +{engineer.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-[#88bf42]" />
                        {engineer.availability}
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-[#009898] hover:bg-[#007b7b] text-white text-xs h-9 rounded-md px-3"
                      asChild
                    >
                      <Link to="/contact">
                        <Mail className="h-3 w-3 mr-1" />
                        Contact About This Engineer
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-[#009898] hover:bg-[#007b7b] text-white"
              asChild
            >
              <Link to="/contact">Request Engineer Information</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Hire Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#88bf42]/10 text-[#88bf42] rounded-full text-sm font-medium mb-4">
              WHY CHOOSE OUR ENGINEERS
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Specialized AI Expertise for Your Business
            </h2>
            <p className="text-lg text-gray-600">
              Our AI engineers bring specialized knowledge and proven experience to help you 
              implement cutting-edge artificial intelligence solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-[#009898]/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-[#009898]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Excellence</h3>
              <p className="text-gray-600">
                Rigorously vetted engineers with proven expertise in modern AI frameworks and methodologies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-[#88bf42]/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#88bf42]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Deployment</h3>
              <p className="text-gray-600">
                Engineers ready to start quickly, helping you accelerate your AI initiatives and roadmap.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-[#009898]/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-[#009898]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Domain Knowledge</h3>
              <p className="text-gray-600">
                Specialists with industry-specific experience across finance, healthcare, retail and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-[#88bf42]/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-[#88bf42]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Track record of delivering successful AI projects with measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Talent Solutions Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've streamlined the process of matching you with the perfect AI engineers for your project requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative">
              <div className="w-12 h-12 rounded-full bg-[#10b4b7]/10 flex items-center justify-center text-[#10b4b7] font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Define Requirements</h3>
              <p className="text-gray-600">
                Tell us about your project, technical requirements, and timeline. We'll help you refine exactly what you need.
              </p>
              <div className="absolute top-0 right-4 h-full pointer-events-none hidden md:block">
                <ArrowRight className="w-6 h-6 text-[#10b4b7] absolute top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative">
              <div className="w-12 h-12 rounded-full bg-[#10b4b7]/10 flex items-center justify-center text-[#10b4b7] font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Match with Engineers</h3>
              <p className="text-gray-600">
                We'll match you with pre-vetted AI engineers with the exact skills and experience your project needs.
              </p>
              <div className="absolute top-0 right-4 h-full pointer-events-none hidden md:block">
                <ArrowRight className="w-6 h-6 text-[#10b4b7] absolute top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#10b4b7]/10 flex items-center justify-center text-[#10b4b7] font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Working</h3>
              <p className="text-gray-600">
                Begin collaborating with your AI engineers. We handle contracts, payments, and project management.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button
              className="bg-black hover:bg-white hover:text-black text-white px-8 py-3 text-lg rounded-lg shadow-md"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              asChild
            >
              <Link to="/services">
                <span>Explore AI Services</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#88bf42]/10 text-[#88bf42] text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2 fill-current" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have accelerated their AI initiatives with our engineering talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Client"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">John Henderson</h3>
                    <p className="text-sm text-gray-500">CTO, TechVision Inc.</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-current text-[#ffc107]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The AI engineer we hired through Thor Signia was exceptional. They integrated seamlessly with our team and delivered a computer vision system that increased our manufacturing efficiency by 35%."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#10b4b7] font-medium">Computer Vision Project</span>
                <span className="text-gray-500">3 months ago</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Client"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Sarah Williams</h3>
                    <p className="text-sm text-gray-500">VP of Product, HealthTech Solutions</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-current text-[#ffc107]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Working with the NLP engineers from Thor Signia transformed our patient communication system. We implemented a medical chatbot that reduced administrative tasks by 45%."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#10b4b7] font-medium">NLP Healthcare Project</span>
                <span className="text-gray-500">1 month ago</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Client"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Michael Chen</h3>
                    <p className="text-sm text-gray-500">Director of AI, RetailNext</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-current text-[#ffc107]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Thor Signia's AI infrastructure specialist helped us scale our recommendation engine to handle 10x the traffic without increasing latency. Impressive expertise and results."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#10b4b7] font-medium">ML Infrastructure Project</span>
                <span className="text-gray-500">2 months ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#10b4b7]/10 to-[#88bf42]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Accelerate Your AI Initiatives?
              </h2>
              <p className="text-lg text-gray-600">
                Get matched with the perfect AI engineers for your specific project requirements
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#10b4b7]/10 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#10b4b7]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Engineers</h3>
                  <p className="text-sm text-gray-600">Pre-vetted AI specialists</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#88bf42]/10 flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-[#88bf42]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Matching</h3>
                  <p className="text-sm text-gray-600">Start in as little as 48 hours</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#10b4b7]/10 flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-[#10b4b7]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Risk-Free</h3>
                  <p className="text-sm text-gray-600">100% satisfaction guarantee</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                className="bg-[#10b4b7] hover:bg-[#0d9396] text-white px-8 py-3 text-lg rounded-lg shadow-md"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                asChild
              >
                <Link to="/services">
                  <span>Explore AI Services</span>
                </Link>
              </Button>
              
              <Button
                className="bg-[#88bf42] hover:bg-[#78a639] text-white px-8 py-3 text-lg rounded-lg shadow-md"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                asChild
              >
                <Link to="/contact">
                  <span>Contact Us</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AIEngineers; 