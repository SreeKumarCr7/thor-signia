import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { config } from '@/config/env';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Brain,
  Cpu,
  Globe,
  ArrowRight
} from 'lucide-react';

// Use API URL from config
const API_URL = config.apiUrl;

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for reaching out. Our team will contact you shortly.",
          variant: "success",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does Thor Signia's AI technology benefit enterprise businesses?",
      answer: "Our AI technology delivers measurable ROI through increased operational efficiency (average 40% improvement), enhanced decision-making with predictive analytics, and personalized customer experiences. Our enterprise clients typically see cost reductions of 25-30% in areas where our AI solutions are implemented."
    },
    {
      question: "What industries can benefit from your AI solutions?",
      answer: "Our AI solutions are especially effective for financial services, healthcare, manufacturing, retail, and technology sectors. Each implementation is customized with industry-specific models and integration protocols, ensuring optimal performance for your unique business requirements."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Most implementations are completed within 2-6 weeks, depending on complexity and scope. Our phased deployment approach includes discovery (1 week), model training and customization (1-2 weeks), integration (1-2 weeks), and thorough testing/optimization (1 week), ensuring minimal business disruption."
    },
    {
      question: "What ongoing support do you offer after implementation?",
      answer: "We provide comprehensive enterprise support including 24/7 technical assistance, dedicated solution specialists, regular performance reviews, and continuous model improvements. Our support packages include training for your team, monthly optimization reports, and priority access to new AI capabilities."
    },
    {
      question: "How do you handle data security and compliance?",
      answer: "Security is foundational to our AI architecture. We implement end-to-end encryption, role-based access controls, and data residency options. All systems are compliant with GDPR, HIPAA, and industry-specific regulations. We maintain SOC 2 Type II certification and regular security audits."
    },
    {
      question: "Can your AI solutions integrate with our existing systems?",
      answer: "Absolutely. Our solutions feature enterprise-grade API endpoints, pre-built connectors for major platforms (Salesforce, SAP, Oracle, Microsoft), custom webhook support, and SSO integration capabilities. Our architecture is designed for seamless integration with minimal disruption to your existing workflows."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/data-grid.png')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#009898]/5 to-[#88bf42]/5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#009898]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#88bf42]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 safe-area-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 mb-8 sm:mb-10 rounded-full bg-[#009898]/10 text-[#009898] text-sm font-medium border border-[#009898]/30 header-badge">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Let's Start a Conversation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#009898] to-[#88bf42] px-1 sm:px-0">
              Get in Touch with Thor Signia
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 mx-auto max-w-3xl px-1 sm:px-0">
              We're here to answer your questions and discuss how our AI solutions can transform your business operations
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
              <a href="#contact-form" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#009898] text-white font-medium hover:bg-[#007a7a] transition-colors duration-300">
                Contact Us Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#faq" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white text-[#009898] border border-[#009898] font-medium hover:bg-[#009898]/5 transition-colors duration-300">
                View FAQs
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave Divider - fixed for mobile and smoother curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden wave-divider">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-8 md:h-12 text-white">
            <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
      
      {/* Main Contact Section with Card Layout */}
      <section id="contact-form" className="py-12 md:py-16 lg:py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Contact Information Card */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full">
                  <div className="h-2 bg-gradient-to-r from-[#009898] to-[#88bf42]"></div>
                  <div className="p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                      Contact Information
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="mt-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#009898]/20 to-[#88bf42]/20 rounded-2xl flex items-center justify-center shadow-sm">
                            <MapPin className="text-[#009898] w-6 h-6" />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Location</h3>
                          <p className="text-gray-600 leading-relaxed">
                            945, 1st Floor, 5th Main Rd,<br />
                            Sector 7, HSR Layout,<br />
                            Bengaluru, Karnataka 560102
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#009898]/20 to-[#88bf42]/20 rounded-2xl flex items-center justify-center shadow-sm">
                            <Phone className="text-[#009898] w-6 h-6" />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                          <p className="text-gray-600 leading-relaxed">+91 90080 97780</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#009898]/20 to-[#88bf42]/20 rounded-2xl flex items-center justify-center shadow-sm">
                            <Mail className="text-[#009898] w-6 h-6" />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                          <p className="text-gray-600 leading-relaxed">info@thorsignia.in</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Trust badges */}
                    <div className="mt-10 pt-8 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Why Choose Thor Signia</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                          <div className="p-2 bg-[#009898]/10 rounded-full mr-3">
                            <Brain className="w-5 h-5 text-[#009898]" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Advanced AI</span>
                        </div>
                        <div className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                          <div className="p-2 bg-[#009898]/10 rounded-full mr-3">
                            <Clock className="w-5 h-5 text-[#009898]" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Fast Deployment</span>
                        </div>
                        <div className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                          <div className="p-2 bg-[#009898]/10 rounded-full mr-3">
                            <ShieldCheck className="w-5 h-5 text-[#009898]" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Enterprise Security</span>
                        </div>
                        <div className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                          <div className="p-2 bg-[#009898]/10 rounded-full mr-3">
                            <Globe className="w-5 h-5 text-[#009898]" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Global Support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full">
                  <div className="h-2 bg-gradient-to-r from-[#88bf42] to-[#009898]"></div>
                  <div className="p-8 md:p-10">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-600">
                        Fill out the form below and our team will get back to you promptly
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-[#009898]">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full bg-gray-50 border-gray-200 focus:border-[#009898] focus:ring-[#009898] rounded-lg text-gray-800 placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-[#009898]">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full bg-gray-50 border-gray-200 focus:border-[#009898] focus:ring-[#009898] rounded-lg text-gray-800 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your phone number"
                            className="w-full bg-gray-50 border-gray-200 focus:border-[#009898] focus:ring-[#009898] rounded-lg text-gray-800 placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company Name <span className="text-[#009898]">*</span>
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company"
                            required
                            className="w-full bg-gray-50 border-gray-200 focus:border-[#009898] focus:ring-[#009898] rounded-lg text-gray-800 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          How can we help? <span className="text-[#009898]">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or inquiry..."
                          required
                          className="w-full min-h-[120px] bg-gray-50 border-gray-200 focus:border-[#009898] focus:ring-[#009898] rounded-lg text-gray-800 placeholder:text-gray-400"
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy"
                            type="checkbox"
                            required
                            className="w-4 h-4 bg-gray-50 text-[#009898] border-gray-300 rounded focus:ring-[#009898]"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="privacy" className="text-sm text-gray-600">
                            I agree to Thor Signia's Privacy Policy and consent to being contacted about my inquiry.
                          </label>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#009898] to-[#88bf42] hover:from-[#008080] hover:to-[#78af32] text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="h-5 w-5 mr-2 text-white" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Modern Design */}
      <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/data-grid.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#009898]/20 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#88bf42]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#009898]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-[#009898]/10 text-[#009898] border border-[#009898]/30">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#009898] to-[#88bf42]">
                Common Questions About Our AI Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to the most frequently asked questions about Thor Signia's enterprise AI solutions
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-white border ${openFaq === index ? 'border-[#009898]' : 'border-gray-200'} rounded-2xl overflow-hidden shadow-lg transition-all duration-300`}
                >
                  <button
                    className={`flex items-center justify-between w-full p-6 text-left focus:outline-none ${openFaq === index ? 'bg-gradient-to-r from-[#009898]/5 to-[#88bf42]/5' : 'bg-white'}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center pr-4">
                      {index % 2 === 0 ? 
                        <div className="w-12 h-12 rounded-xl bg-[#009898]/10 flex items-center justify-center mr-4">
                          <Brain className="w-5 h-5 text-[#009898]" />
                        </div> : 
                        <div className="w-12 h-12 rounded-xl bg-[#88bf42]/10 flex items-center justify-center mr-4">
                          <Cpu className="w-5 h-5 text-[#88bf42]" />
                        </div>
                      }
                      <span className={`font-semibold ${openFaq === index ? 'text-[#009898]' : 'text-gray-900'} text-lg`}>{faq.question}</span>
                    </div>
                    <div className={`ml-2 flex-shrink-0 w-10 h-10 rounded-xl ${openFaq === index ? 'bg-[#009898]/10' : 'bg-gray-100'} flex items-center justify-center transition-all duration-300`}>
                      {openFaq === index ? 
                        <ChevronUp className={`w-5 h-5 ${openFaq === index ? 'text-[#009898]' : 'text-gray-400'}`} /> : 
                        <ChevronDown className={`w-5 h-5 ${openFaq === index ? 'text-[#009898]' : 'text-gray-400'}`} />
                      }
                    </div>
                  </button>
                  <div 
                    id={`faq-answer-${index}`}
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                      openFaq === index ? 'pb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-gray-600 border-t border-gray-100 pt-6 prose prose-lg max-w-none pl-16">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
