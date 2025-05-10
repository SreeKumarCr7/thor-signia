import React, { useEffect } from 'react'; // Import useEffect
import { useParams, Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
// import { Metadata } from '@/types'; // Metadata is not used in the current code, can be removed if not needed for other purposes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BlogPostProps {}

// Sample blog post data - in a real app, this would come from an API
const blogPostsData: { [key: string]: { title: string; content: string; date: string; author: string; readTime: string; category: string } } = {
  "1": {
    title: "The Future of AI in Enterprise",
    content: `Artificial intelligence is revolutionizing how businesses operate, make decisions, and interact with customers. This transformation is not just about automation; it's about augmenting human capabilities and creating new possibilities for innovation and growth.

    Organizations are increasingly leveraging AI to:
    • Enhance customer experiences through personalized interactions
    • Optimize operations with predictive maintenance and resource allocation
    • Drive innovation in product development and service delivery
    • Improve decision-making with data-driven insights

    The impact of AI extends beyond operational efficiencies. It's reshaping organizational structures, creating new roles, and demanding new skills from the workforce. As we move forward, the successful integration of AI will become a key differentiator for enterprise success.`,
    date: "March 15, 2024",
    author: "John Smith",
    readTime: "5 min read",
    category: "AI Technology"
  },
  "2": {
    title: "Implementing Voice AI Solutions",
    content: `Voice AI technology has evolved significantly, offering businesses new ways to engage with customers and streamline operations. The implementation of voice AI solutions requires careful planning and consideration of various factors.

    Key considerations for voice AI implementation:
    • Natural Language Processing capabilities
    • Multi-language support
    • Integration with existing systems
    • Privacy and security measures
    • User experience design

    Successful voice AI implementation can lead to improved customer satisfaction, reduced operational costs, and increased efficiency in service delivery.`,
    date: "March 12, 2024",
    author: "Sarah Johnson",
    readTime: "7 min read",
    category: "Voice AI"
  },
  "3": {
    title: "Chatbots: The Next Generation",
    content: `The latest generation of chatbots represents a significant leap forward in artificial intelligence and natural language processing. These advanced systems are capable of understanding context, maintaining conversation history, and providing more natural, human-like interactions.

    Key advancements in chatbot technology:
    • Contextual understanding and memory
    • Emotional intelligence and sentiment analysis
    • Multi-turn conversation capabilities
    • Integration with business systems
    • Learning from interactions

    These improvements are making chatbots an increasingly valuable tool for businesses looking to enhance their customer service capabilities while maintaining efficiency.`,
    date: "March 10, 2024",
    author: "Mike Wilson",
    readTime: "6 min read",
    category: "Chatbots"
  },
  "4": {
    title: "AI-Driven Data Analytics: Unlocking Business Insights",
    content: `Modern businesses are drowning in data but starving for insights. AI-driven analytics is changing this paradigm by automatically discovering patterns and generating actionable recommendations.

    Key benefits of AI analytics:
    • Real-time data processing and analysis
    • Predictive modeling and forecasting
    • Anomaly detection and risk assessment
    • Automated report generation
    • Personalized dashboards and visualizations

    By leveraging AI in data analytics, organizations can make faster, more informed decisions and stay ahead of market trends.`,
    date: "March 8, 2024",
    author: "Emily Chen",
    readTime: "8 min read",
    category: "Data Analytics"
  },
  "5": {
    title: "Securing AI Systems: Best Practices and Protocols",
    content: `As AI systems become more integral to business operations, ensuring their security becomes paramount. Organizations must implement robust security measures to protect both the AI systems and the data they process.

    Essential security considerations:
    • Data encryption and access control
    • Model integrity protection
    • Input validation and sanitization
    • Monitoring and audit trails
    • Regular security assessments

    A comprehensive security strategy is crucial for maintaining trust and compliance in AI implementations.`,
    date: "March 5, 2024",
    author: "David Kumar",
    readTime: "9 min read",
    category: "Security"
  },
  "6": {
    title: "The ROI of Enterprise AI Implementation",
    content: `Measuring the return on investment (ROI) of AI implementations requires a comprehensive understanding of both direct and indirect benefits. Organizations need to consider multiple factors when evaluating AI investments.

    Key ROI metrics to consider:
    • Cost reduction and efficiency gains
    • Revenue growth and new opportunities
    • Customer satisfaction improvements
    • Employee productivity enhancement
    • Market competitiveness

    Understanding these metrics helps organizations justify AI investments and optimize their deployment strategies.`,
    date: "March 3, 2024",
    author: "Rachel Martinez",
    readTime: "7 min read",
    category: "Business Strategy"
  }
};

const BlogPost = (props: BlogPostProps) => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPostsData[id] : null;

  // useEffect to update the document title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Your Blog Name`; // Set title based on post title
    } else {
      document.title = "Post Not Found | Your Blog Name"; // Set a default if post is not found
    }

    // Optional cleanup function: Reset title when component unmounts or ID changes
    // (Less critical here as usually a new page replaces this, but good practice)
    // return () => {
    //   document.title = "Your Blog Name"; // Or your site's default title
    // };

  }, [post]); // Dependency array: re-run effect when 'post' changes (which happens when 'id' changes)


  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 sm:pt-38 md:pt-40 pb-16 bg-gradient-to-br from-[#009898]/10 to-[#2c3037]/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#009898]/10 rounded-br-full opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#2c3037]/10 rounded-tl-full opacity-40 z-0"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Fade triggerOnce direction="up" delay={50}>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#009898]/10 text-[#009898] text-sm font-medium mt-2">
                {post.category}
              </div>
            </Fade>

            <Fade triggerOnce direction="up" delay={150}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009898] to-[#2c3037]">
                  {post.title}
                </span>
              </h1>
            </Fade>

            <Fade triggerOnce direction="up" delay={250}>
              <div className="flex items-center justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Fade>
          <article className="max-w-3xl mx-auto">
            <div className="prose lg:prose-xl">
              {/* Split content by paragraphs */}
              {post.content.split('\n\n').map((paragraph, index) => {
                // Handle bullet points if needed, or keep simple paragraphs
                const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line);
                if (lines.every(line => line.startsWith('•'))) {
                   return (
                     <ul key={index} className="list-disc list-inside mb-4">
                       {lines.map((line, liIndex) => (
                         <li key={liIndex}>{line.substring(1).trim()}</li>
                       ))}
                     </ul>
                   );
                }
                return (
                   <p key={index} className="mb-4">
                     {lines.join(' ')} {/* Join lines back for a single paragraph */}
                   </p>
                );
              })}
            </div>
            
            {/* Back to Blog button */}
            <div className="mt-10 text-center">
              <Link to="/blog">
                <Button className="bg-[#88bf42] hover:bg-[#009898] text-white transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Button>
              </Link>
            </div>
          </article>
        </Fade>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost; 