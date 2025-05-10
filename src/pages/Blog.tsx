import { useState, useEffect } from 'react'; // Remove React import, use named exports
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, User, Clock, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom'; // Assuming you might use Link elsewhere or keep it for consistency
// Import animation components
import { Fade, Slide } from 'react-awesome-reveal'; // <-- Import animation components

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of AI in Enterprise',
      excerpt: 'Discover how artificial intelligence is transforming business operations and decision-making processes...',
      date: '2024-03-15',
      author: 'John Smith',
      category: 'AI Technology',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Implementing Voice AI Solutions',
      excerpt: 'A comprehensive guide to integrating voice AI solutions into your customer service strategy...',
      date: '2024-03-12',
      author: 'Sarah Johnson',
      category: 'Voice AI',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Chatbots: The Next Generation',
      excerpt: 'Exploring the latest advancements in chatbot technology and their impact on customer engagement...',
      date: '2024-03-10',
      author: 'Mike Wilson',
      category: 'Chatbots',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'AI-Driven Data Analytics: Unlocking Business Insights',
      excerpt: 'Learn how AI-powered analytics is helping businesses discover patterns and generate actionable recommendations...',
      date: '2024-03-08',
      author: 'Emily Chen',
      category: 'Data Analytics',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Securing AI Systems: Best Practices and Protocols',
      excerpt: 'Discover essential security measures to protect AI systems and the data they process...',
      date: '2024-03-05',
      author: 'David Kumar',
      category: 'Security',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'The ROI of Enterprise AI Implementation',
      excerpt: 'Understanding how to measure and optimize the return on investment for AI implementations...',
      date: '2024-03-03',
      author: 'Rachel Martinez',
      category: 'Business Strategy',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Improved responsive padding */}
      <section className="pt-36 sm:pt-38 md:pt-40 pb-10 sm:pb-12 md:pb-16 bg-gradient-to-br from-[#009898]/10 to-[#2c3037]/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#009898]/10 rounded-br-full opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#2c3037]/10 rounded-tl-full opacity-40 z-0"></div>
        
        <div className="container mx-auto px-5 sm:px-4 md:px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Fade triggerOnce direction="up" delay={50}>
              <div className="inline-block px-3 py-1 mb-4 sm:mb-5 md:mb-6 rounded-full bg-[#009898]/10 text-[#009898] text-sm font-medium mt-2">
                Our Blog
            </div>
            </Fade>
            
            <Fade triggerOnce direction="up" delay={150}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009898] to-[#2c3037]">Updates</span>
            </h1>
            </Fade>
            
            <Fade triggerOnce direction="up" delay={250}>
              <p className="text-lg md:text-xl text-gray-700">
                Stay informed about the latest developments in AI technology
               </p>
             </Fade>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Fade key={post.id} triggerOnce direction="up" cascade>
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 h-full">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-[#009898]">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button
                        variant="outline"
                        className="w-full bg-[#88bf42] hover:bg-[#009898] text-white border-none"
                      >
                        Read Article <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    </Link>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog; 