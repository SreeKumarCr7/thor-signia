import { MessageCircle, MessageSquare, Globe, Database, LineChart, Settings } from "lucide-react";

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  company: string;
  logo: string;
  category: string;
  imageUrl: string;
  coverImage: string;
  summary: string;
  roi: string;
  timeframe: string;
  teamSize: string;
  keyMetric: string;
  accentColor: string;
  challenge: string[];
  strategy: string[];
  execution: string[];
  results: string[];
  servicesUsed: {
    name: string;
    icon: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    image: string;
  };
  relatedCaseStudies: number[];
}

const caseStudiesData: CaseStudy[] = [
  {
    id: 1,
    slug: "sgf-fab-ai-quality-control",
    title: "AI-Powered Quality Control System",
    company: "SGF FAB Industries",
    logo: "https://www.sgffab.com/",
    category: "Manufacturing",
    imageUrl: "https://images.unsplash.com/photo-1581093804475-577d77e21bf9?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1581093804475-577d77e21bf9?q=80&w=1770&auto=format&fit=crop",
    summary: "Developed a custom computer vision system for quality control in industrial fabrication, resulting in significant reduction in production defects and improved operational efficiency.",
    roi: "285%",
    timeframe: "8 months",
    teamSize: "7 engineers",
    keyMetric: "73% fewer defects",
    accentColor: "#009898",
    challenge: [
      "SGF FAB Industries, a leading manufacturer of material handling equipment and industrial fabrication solutions, was facing challenges with quality control in their production processes. Their manual inspection methods were time-consuming, inconsistent, and unable to keep pace with increasing production demands.",
      "The company was experiencing a defect rate of approximately 8.5%, resulting in significant material waste, rework costs, and occasional customer complaints. With their focus on quality and safety being central to their brand identity, SGF FAB needed a solution that could maintain their high standards while improving operational efficiency."
    ],
    strategy: [
      "Thor Signia proposed a custom AI-powered computer vision system designed specifically for industrial fabrication quality control. The strategy focused on creating a comprehensive solution that could detect defects in real-time during the manufacturing process.",
      "Our approach included: 1) High-resolution camera systems installed at key inspection points throughout the production line, 2) Custom computer vision AI models trained specifically on SGF FAB's product specifications and potential defect types, 3) Real-time analysis capabilities with immediate alerts for quality issues, and 4) A comprehensive dashboard for quality management teams to monitor trends and identify process improvement opportunities."
    ],
    execution: [
      "Implementation began with a detailed analysis of SGF FAB's production processes and the creation of a comprehensive defect database. We collected thousands of sample images of both defective and non-defective products to train the AI models.",
      "The Thor Signia team deployed specialized industrial cameras at strategic points in the production line, connected to edge computing devices for real-time image processing. The system was designed to operate in the challenging factory environment, with robust protection against dust, vibration, and variable lighting conditions.",
      "We worked closely with SGF FAB's quality control and production teams to refine the detection algorithms and establish appropriate alert thresholds. The system was deployed in phases, starting with the most critical inspection points and gradually expanding to cover the entire production process."
    ],
    results: [
      "Defect detection rate improved from 82% with manual inspection to 99.3% with the AI system",
      "Overall defect rate reduced from 8.5% to 2.3% (73% reduction)",
      "Quality control efficiency improved by 62%, allowing staff to focus on process improvement rather than routine inspection",
      "Material waste reduced by 58%, resulting in significant cost savings",
      "Production throughput increased by 27% due to faster inspection processes",
      "Customer complaints related to quality issues decreased by 84%"
    ],
    servicesUsed: [
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      }
    ],
    testimonial: {
      quote: "Thor Signia's AI quality control system has transformed our production processes. The precision and consistency of the defect detection have significantly improved our product quality while reducing waste and operational costs. Their team took the time to understand our specific manufacturing challenges and delivered a solution perfectly tailored to our needs.",
      author: "Rajesh Kumar",
      position: "Operations Director",
      company: "SGF FAB Industries",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    relatedCaseStudies: [4, 5, 6]
  },
  {
    id: 2,
    slug: "doctor-dreams-ai-voice-assistant",
    title: "AI Voice Agents for Medical Education",
    company: "Doctor Dreams",
    logo: "https://www.doctordreams.in/",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1770&auto=format&fit=crop",
    summary: "Implemented AI voice agents for student inquiries about medical education abroad, reducing response time and improving student satisfaction.",
    roi: "215%",
    timeframe: "6 months",
    teamSize: "5 engineers",
    keyMetric: "65% faster response",
    accentColor: "#009898",
    challenge: [
      "Doctor Dreams, India's leading consultancy for medical education abroad, was struggling to efficiently handle the high volume of student inquiries about international medical programs. Their team was receiving over 500 inquiries daily during peak admission seasons, resulting in delayed responses and potential missed opportunities.",
      "Students often had similar questions about admission requirements, university rankings, curriculum details, and visa processes, but each inquiry required personalized attention. The consultancy needed a solution that could provide immediate, accurate responses to common questions while maintaining the personalized approach that was central to their service quality."
    ],
    strategy: [
      "Thor Signia proposed an AI voice agent system specifically trained on international medical education data. The strategy focused on creating a solution that could handle routine inquiries while seamlessly escalating complex cases to human consultants.",
      "Our approach included: 1) A specialized AI voice agent with extensive knowledge of medical programs across various countries, 2) Natural language processing capabilities to understand student inquiries even when expressed in regional dialects or with medical terminology variations, 3) Integration with Doctor Dreams' database of university information and admission requirements, and 4) A smooth handoff protocol for transferring conversations to human consultants when necessary."
    ],
    execution: [
      "Implementation began with comprehensive training of the AI system on Doctor Dreams' extensive database of medical education information. We created detailed knowledge bases covering programs in Russia, Belarus, Georgia, China, Bangladesh, Philippines, Bosnia, Nepal, and Serbia.",
      "The Thor Signia team developed natural language understanding models that could accurately interpret student inquiries about specific medical programs, admission requirements, and application processes. The system was designed to recognize when questions required human expertise and seamlessly transfer the conversation to the appropriate consultant.",
      "We worked closely with Doctor Dreams' counseling team to refine the AI's responses and ensure they aligned with the company's guidance approach. The system was deployed gradually, starting with handling basic informational queries and expanding to more complex conversations as accuracy improved."
    ],
    results: [
      "Response time to initial student inquiries reduced from an average of 4.5 hours to under 10 minutes (65% improvement)",
      "Consultant productivity increased by 42% as they focused on complex counseling rather than routine information sharing",
      "Student satisfaction ratings improved by 28% due to faster response times and consistent information quality",
      "System successfully handled 76% of initial inquiries without requiring human intervention",
      "Lead conversion rate increased by 34% due to improved response times and follow-up consistency",
      "Expanded service hours to 24/7 availability for international student inquiries"
    ],
    servicesUsed: [
      {
        name: "Conversational Voice Interfaces",
        icon: "MessageCircle"
      }
    ],
    testimonial: {
      quote: "The AI voice assistant from Thor Signia has revolutionized how we handle student inquiries. It provides immediate, accurate information about our medical programs abroad, allowing our counselors to focus on providing in-depth guidance. The system's ability to understand various accents and dialects has been particularly impressive, making it accessible to students from all regions of India.",
      author: "Dr. Mubarak",
      position: "CEO",
      company: "Doctor Dreams",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1770&auto=format&fit=crop"
    },
    relatedCaseStudies: [1, 3, 6]
  },
  {
    id: 3,
    slug: "anthill-iq-smart-workspace",
    title: "AI Chatbot for Workspace Management",
    company: "Anthill IQ",
    logo: "https://www.anthilliq.com/",
    category: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1770&auto=format&fit=crop",
    summary: "Implemented smart chat interface for workspace inquiries and bookings, enabling immediate responses to potential clients and improving space utilization rates.",
    roi: "196%",
    timeframe: "5 months",
    teamSize: "4 engineers",
    keyMetric: "42% higher conversion",
    accentColor: "#009898",
    challenge: [
      "Anthill IQ, a premium co-working and office space provider in Bangalore, was experiencing challenges in managing workspace inquiries and bookings efficiently. Their team was handling numerous daily inquiries about space availability, pricing, amenities, and booking procedures, often resulting in delayed responses during peak hours.",
      "The company needed to provide immediate information to potential clients, many of whom were making decisions about workspace solutions under tight timeframes. Additionally, Anthill IQ wanted to optimize their space utilization by improving the booking process and providing better visibility into availability across their various workspace options."
    ],
    strategy: [
      "Thor Signia proposed a smart chat interface specifically designed for workspace management. The strategy centered on creating an AI assistant that could provide immediate, accurate information about Anthill IQ's offerings while facilitating seamless booking processes.",
      "Our approach included: 1) An AI chatbot with comprehensive knowledge of Anthill IQ's workspace options, amenities, and pricing, 2) Integration with their booking and management system for real-time availability information, 3) Virtual tour capabilities to showcase spaces to potential clients, and 4) Automated follow-up sequences to nurture leads and encourage conversions."
    ],
    execution: [
      "Implementation began with detailed mapping of Anthill IQ's workspace inventory, including private offices, dedicated desks, meeting rooms, event spaces, and training rooms. We created a comprehensive knowledge base covering all aspects of their offerings.",
      "The Thor Signia team developed integration with Anthill IQ's booking system to enable real-time availability checks and reservation capabilities directly through the chat interface. The system was designed to collect necessary information from clients and facilitate seamless bookings without requiring staff intervention.",
      "We implemented the chat interface across multiple channels, including Anthill IQ's website, mobile app, and social media platforms, ensuring consistent experience regardless of how potential clients made contact. The system was refined through continuous feedback from both staff and clients."
    ],
    results: [
      "Response time to workspace inquiries reduced from an average of 3.2 hours to immediate (70% improvement)",
      "Booking conversion rate increased by 42% due to immediate information availability and streamlined process",
      "Staff time spent on routine inquiries reduced by 68%, allowing focus on client relationships and space management",
      "Space utilization improved by 23% through optimized booking management and availability visibility",
      "After-hours booking capabilities resulted in 28% of new reservations occurring outside business hours",
      "Client satisfaction ratings increased by 36% due to improved service responsiveness"
    ],
    servicesUsed: [
      {
        name: "Smart Chat Interfaces",
        icon: "MessageSquare"
      }
    ],
    testimonial: {
      quote: "The AI chatbot has transformed how we manage workspace inquiries and bookings. It provides immediate assistance to potential clients, answers their questions accurately, and guides them through the booking process seamlessly. The system's ability to handle inquiries 24/7 has significantly improved our conversion rates and client satisfaction. Thor Signia delivered exactly what our business needed.",
      author: "Priya Sharma",
      position: "Operations Director",
      company: "Anthill IQ",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    relatedCaseStudies: [1, 2, 5]
  },
  {
    id: 4,
    slug: "financial-services-ai-transformation",
    title: "AI-Powered Customer Service Revolution",
    company: "Global Financial Group",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1780&auto=format&fit=crop",
    category: "Financial Services",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1742&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1770&auto=format&fit=crop",
    summary: "Transformed customer service operations using AI agents, reducing call center costs by 42% while improving satisfaction scores by 23%.",
    roi: "285%",
    timeframe: "9 months",
    teamSize: "8 engineers",
    keyMetric: "42% cost reduction",
    accentColor: "#10b4b7",
    challenge: [
      "Global Financial Group (GFG) was facing increasing customer service demands across their retail banking, credit card, and investment divisions. Their legacy call center operation was struggling with: 1) Average wait times exceeding 18 minutes, 2) First-call resolution rates below 65%, 3) CSAT scores declining for three consecutive quarters, and 4) Rising operational costs in their customer service centers across three continents.",
      "Additionally, the company's reliance on outsourced call centers created inconsistent customer experiences and knowledge gaps when handling complex financial inquiries. With customer retention directly tied to service quality, GFG needed a transformative solution that could scale globally while significantly reducing costs."
    ],
    strategy: [
      "Our approach began with a comprehensive analysis of GFG's customer service data, identifying key interaction patterns, common inquiries, and pain points in the current process. We designed a multi-phase implementation strategy to ensure minimal disruption to existing operations.",
      "We proposed an intelligent AI agent solution with three key components: 1) A conversational AI system with specific training in financial services terminology and regulations, 2) A seamless handoff protocol between AI and human agents for complex cases, and 3) An analytics dashboard providing real-time insights on customer interactions and service quality metrics.",
      "Most importantly, we developed a custom voice personality that matched GFG's brand identity, ensuring that customer interactions maintained the company's professional yet approachable tone across all touchpoints."
    ],
    execution: [
      "Implementation began with a data integration phase, connecting the AI system to GFG's customer information database, knowledge base, and transaction systems. We created secure API connections to allow the AI to access customer accounts while maintaining strict compliance with financial regulations.",
      "The Thor Signia team deployed the AI voice agents in a phased approach: 1) First handling simple inquiries like balance checks and transaction histories, 2) Expanding to account management functions and product information, and 3) Finally managing complex cases including dispute resolution and financial planning assistance.",
      "Throughout the process, our team continuously refined the system based on performance data, customer feedback, and changing business requirements. We conducted bi-weekly training sessions with GFG's customer service team to ensure smooth collaboration between human and AI agents."
    ],
    results: [
      "42% reduction in overall customer service operational costs",
      "Average call wait time decreased from 18 minutes to under 60 seconds",
      "First-call resolution rate improved from 65% to 92%",
      "Customer satisfaction scores increased by 23% within six months",
      "AI system successfully handled 78% of all customer inquiries without human intervention",
      "Service capacity expanded to 24/7 coverage across all global markets"
    ],
    servicesUsed: [
      {
        name: "Conversational Voice Interfaces",
        icon: "MessageCircle"
      },
      {
        name: "Smart Chat Interfaces",
        icon: "MessageSquare"
      },
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      }
    ],
    testimonial: {
      quote: "Thor Signia's AI solution transformed how we connect with customers. Not only did we see dramatic cost savings, but the improvement in satisfaction scores has directly impacted our retention rates. The technology is impressive, but what really set them apart was their understanding of the financial services industry and regulatory requirements.",
      author: "Sarah Johnson",
      position: "Chief Customer Officer",
      company: "Global Financial Group",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    relatedCaseStudies: [3, 4, 6]
  },
  {
    id: 5,
    slug: "retail-personalization-engine",
    title: "AI-Driven Retail Personalization Engine",
    company: "Metro Fashion",
    logo: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1830&auto=format&fit=crop",
    category: "Retail & E-commerce",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1815&auto=format&fit=crop",
    summary: "Developed a hyper-personalization engine for a major fashion retailer, increasing conversion rates by 154% and customer lifetime value by 68%.",
    roi: "312%",
    timeframe: "7 months",
    teamSize: "6 engineers",
    keyMetric: "154% conversion increase",
    accentColor: "#1c9f1e",
    challenge: [
      "Metro Fashion, a multinational clothing retailer with over 500 physical stores and a growing e-commerce presence, was struggling to compete with digital-native fashion brands. Their existing recommendation system was based on basic purchase history and performed poorly compared to competitors' solutions.",
      "The company faced declining online conversion rates (hovering at 1.8%, well below industry average), high cart abandonment rates (78%), and difficulty creating personalized experiences across their omnichannel presence. Additionally, their marketing team lacked the data infrastructure to effectively segment customers and tailor communications."
    ],
    strategy: [
      "Our team proposed a comprehensive AI personalization engine that would operate across Metro Fashion's digital and physical touchpoints. The strategy centered on building a unified customer data platform that would aggregate information from website interactions, in-store purchases, mobile app usage, and marketing engagement.",
      "We designed a three-part solution: 1) A real-time personalization system for product recommendations, content curation, and pricing optimization, 2) A predictive analytics platform to identify emerging customer preferences and trend forecasting, and 3) An omnichannel orchestration layer to deliver consistent experiences across web, mobile, email, and in-store interactions.",
      "The technical architecture leveraged our proprietary AI models specifically trained on fashion retail data, with custom extensions to accommodate Metro Fashion's unique product taxonomy and customer segments."
    ],
    execution: [
      "Implementation began with building a unified data lake consolidating customer interaction data from disparate systems, followed by creating a real-time processing pipeline for immediate personalization decisions.",
      "We deployed an initial version focused on product recommendations on the website and mobile app, then expanded to include personalized email campaigns, retargeting advertisements, and in-store associate tablets for clienteling.",
      "The Thor Signia team worked closely with Metro Fashion's merchandising department to incorporate their domain expertise into the AI models, ensuring that recommendations maintained brand aesthetic while maximizing relevance. This included weekly feedback sessions and continuous model refinement."
    ],
    results: [
      "Online conversion rate increased from 1.8% to 4.6% (154% improvement)",
      "Average order value grew by 37% across all channels",
      "Customer lifetime value increased by 68% for customers exposed to the personalization engine",
      "Email marketing revenue jumped 83% due to personalized content and timing",
      "In-store sales associated with digital touchpoints increased by 42%",
      "Return rates decreased by 28% due to better product-customer matching"
    ],
    servicesUsed: [
      {
        name: "AI-Driven Lead Funnels",
        icon: "LineChart"
      },
      {
        name: "Omnichannel Engagement",
        icon: "Database"
      },
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      }
    ],
    testimonial: {
      quote: "Thor Signia's personalization engine completely transformed our customer experience and business results. Their team took the time to understand our unique challenges as a fashion retailer and built a solution that works seamlessly across our digital and physical channels. The ROI has been remarkable - we've seen improvements in every key metric we track.",
      author: "Miguel Rodriguez",
      position: "Chief Digital Officer",
      company: "Metro Fashion",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    relatedCaseStudies: [1, 5, 6]
  },
  {
    id: 6,
    slug: "healthcare-voice-assistant",
    title: "Healthcare AI Voice Assistant",
    company: "National Health Network",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1770&auto=format&fit=crop",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1780&auto=format&fit=crop",
    summary: "Implemented an AI voice assistant for a healthcare network, handling patient inquiries, appointment scheduling, and medication reminders with 97% accuracy.",
    roi: "192%",
    timeframe: "12 months",
    teamSize: "10 engineers",
    keyMetric: "89% patient satisfaction",
    accentColor: "#10b4b7",
    challenge: [
      "National Health Network (NHN), a healthcare system with 12 hospitals and over 200 clinics, was facing severe administrative challenges. Their call centers were overwhelmed, with patients experiencing long wait times for basic services like appointment scheduling, prescription refills, and billing inquiries.",
      "Healthcare staff were spending approximately 30% of their time on routine administrative tasks rather than patient care. Additionally, the system was struggling with missed appointments (18% no-show rate) and medication adherence issues among chronically ill patients, directly impacting health outcomes and operational efficiency."
    ],
    strategy: [
      "Thor Signia proposed a specialized healthcare AI voice assistant designed to handle patient interactions while maintaining strict HIPAA compliance and medical data security. The strategy centered on creating a system that would feel natural and empathetic to patients while efficiently managing high-volume administrative functions.",
      "Our approach included: 1) A HIPAA-compliant voice interface system with secure authentication protocols, 2) Integration with NHN's existing electronic health record (EHR) and scheduling systems, 3) A proactive outreach component for appointment reminders and preventive care notifications, and 4) Analytics dashboards for administrative staff to monitor system performance and patient engagement.",
      "The solution was designed to work across multiple channels including phone calls, a mobile app, and smart speakers, providing patients with flexibility in how they interacted with their healthcare providers."
    ],
    execution: [
      "Implementation began with a careful security architecture design phase to ensure all patient data was protected in accordance with healthcare regulations. We created a secure integration layer between the AI system and NHN's clinical and administrative databases.",
      "The voice assistant was trained on medical terminology, common patient inquiries, and healthcare workflows specific to NHN's operations. We incorporated natural language understanding capabilities to accurately interpret patient needs even when expressed in non-medical terms.",
      "Thor Signia worked closely with NHN's clinical and administrative teams to refine the system, conducting extensive testing with both staff and selected patient groups. The deployment followed a measured approach, starting with appointment scheduling and gradually expanding to medication management and billing support."
    ],
    results: [
      "Administrative staff time spent on routine tasks reduced by 62%",
      "Patient call wait times decreased from an average of 14 minutes to under 45 seconds",
      "Appointment no-show rates reduced from 18% to 7.5% through automated reminders",
      "Patient satisfaction with administrative interactions improved by 38 percentage points",
      "Medication adherence rates increased by 23% for patients using reminder services",
      "System successfully handled 82% of all patient administrative inquiries without human intervention"
    ],
    servicesUsed: [
      {
        name: "Conversational Voice Interfaces",
        icon: "MessageCircle"
      },
      {
        name: "Smart Chat Interfaces",
        icon: "MessageSquare"
      },
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      }
    ],
    testimonial: {
      quote: "The AI assistant has transformed how we interact with patients and manage our daily operations. Our staff can now focus on delivering quality care instead of routine administrative tasks. Patients appreciate the immediate response times and the system's ability to understand their needs. The impact on our operational efficiency and patient satisfaction has exceeded our expectations.",
      author: "Dr. James Chen",
      position: "Chief Medical Officer",
      company: "National Health Network",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1770&auto=format&fit=crop"
    },
    relatedCaseStudies: [1, 4, 6]
  },
  {
    id: 7,
    slug: "manufacturing-predictive-maintenance",
    title: "AI-Powered Predictive Maintenance",
    company: "Global Manufacturing Corp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1774&auto=format&fit=crop",
    category: "Manufacturing",
    imageUrl: "https://images.unsplash.com/photo-1581093804475-577d77e21bf9?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1562204199-2798fa7dc0c6?q=80&w=1778&auto=format&fit=crop",
    summary: "Developed a predictive maintenance system that reduced equipment downtime by 78% and maintenance costs by $4.3M annually across 8 manufacturing facilities.",
    roi: "347%",
    timeframe: "10 months",
    teamSize: "9 engineers",
    keyMetric: "78% reduced downtime",
    accentColor: "#9ac857",
    challenge: [
      "Global Manufacturing Corp (GMC), a major industrial equipment manufacturer with facilities across North America and Europe, was experiencing significant operational challenges due to unplanned equipment downtime. Their traditional preventive maintenance approach was inefficient, resulting in approximately 1,200 hours of production downtime annually per facility.",
      "This downtime was costing the company an estimated $18.5M annually across their eight primary manufacturing facilities. Additionally, maintenance costs were increasing year-over-year as equipment aged, and quality control issues were arising from inconsistent machine performance. GMC needed a solution that could predict failures before they occurred and optimize maintenance scheduling."
    ],
    strategy: [
      "Thor Signia proposed an AI-powered predictive maintenance system that would leverage GMC's existing sensor infrastructure while adding critical IoT components where needed. Our strategy focused on creating a comprehensive system that could identify patterns preceding equipment failure across diverse machinery types.",
      "The approach included: 1) A sensor data integration platform to consolidate information from disparate equipment types and manufacturers, 2) Advanced AI models trained specifically on industrial equipment patterns, 3) A maintenance optimization algorithm to schedule interventions with minimal production impact, and 4) Mobile interfaces for maintenance teams to receive real-time alerts and guidance.",
      "The solution was designed to operate in GMC's challenging factory environments, with robust edge computing capabilities for real-time analysis even in areas with limited connectivity."
    ],
    execution: [
      "Implementation began with a thorough assessment of GMC's existing sensor infrastructure and the installation of additional IoT sensors on critical equipment. We created secure data pipelines to capture and process over 500 distinct data points across all machinery.",
      "The Thor Signia team deployed edge computing devices throughout the facilities to enable real-time analysis, with a central cloud platform for comprehensive pattern recognition and machine learning model training. This hybrid architecture ensured both immediate response capabilities and continuous system improvement.",
      "We worked closely with GMC's maintenance teams to incorporate their expertise into the AI models and develop intuitive interfaces for the mobile applications. The system was deployed gradually, starting with the most critical equipment and expanding to cover all production machinery."
    ],
    results: [
      "Unplanned downtime reduced by 78% across all facilities, from 1,200 to 264 hours annually per facility",
      "Annual maintenance cost savings of $4.3M through optimized scheduling and reduced emergency repairs",
      "Equipment lifespan extended by an average of 23% through early intervention and optimized operation",
      "Product quality improvements resulting in a 14% reduction in defect rates",
      "Maintenance labor efficiency increased by 41% through better scheduling and prioritization",
      "Spare parts inventory reduced by 26% due to more accurate failure prediction and needs assessment"
    ],
    servicesUsed: [
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      },
      {
        name: "Omnichannel Engagement",
        icon: "Database"
      }
    ],
    testimonial: {
      quote: "The impact of Thor Signia's predictive maintenance system has been transformative for our operations. We've gone from reactive firefighting to a proactive, data-driven approach that has dramatically reduced our downtime and maintenance costs. Their team's understanding of both AI technology and manufacturing processes made them the ideal partner for this critical initiative.",
      author: "Robert Williams",
      position: "VP of Operations",
      company: "Global Manufacturing Corp",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop"
    },
    relatedCaseStudies: [3, 5, 6]
  },
  {
    id: 8,
    slug: "logistics-optimization-ai",
    title: "Logistics Route Optimization AI",
    company: "InterContinental Shipping",
    logo: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1770&auto=format&fit=crop",
    category: "Logistics & Transportation",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1591841341847-67df5f0f3961?q=80&w=1770&auto=format&fit=crop",
    summary: "Created a route optimization AI for a global shipping company, reducing fuel consumption by 28% and delivery times by 31% while handling 22% more shipments.",
    roi: "263%",
    timeframe: "8 months",
    teamSize: "7 engineers",
    keyMetric: "28% fuel reduction",
    accentColor: "#10b4b7",
    challenge: [
      "InterContinental Shipping (ICS), a global logistics provider managing over 5,000 vehicles across 35 countries, was facing increasing pressure from rising fuel costs, environmental regulations, and customer demands for faster delivery times. Their legacy route planning system relied heavily on dispatcher experience and static routes that couldn't adapt to changing conditions.",
      "This approach was resulting in fuel inefficiencies, delivery delays during peak periods, and underutilization of their fleet capacity. Additionally, the company lacked visibility into real-time route performance, making it difficult to identify and address operational inefficiencies."
    ],
    strategy: [
      "Thor Signia designed a comprehensive AI-powered logistics optimization platform tailored to ICS's global operation. Our strategy centered on creating a dynamic system that could adapt routes in real-time based on multiple variables including traffic conditions, weather, delivery priorities, and vehicle capacity.",
      "The proposed solution included: 1) A core optimization engine using advanced machine learning algorithms to calculate optimal routes across the entire fleet, 2) Real-time adaptation capabilities to adjust routes as conditions change throughout the day, 3) Driver mobile applications with turn-by-turn navigation and delivery management, and 4) A management dashboard providing comprehensive visibility into fleet performance and optimization opportunities.",
      "The platform was designed to integrate with ICS's existing order management and warehouse systems while providing a framework for future expansion into additional optimization areas."
    ],
    execution: [
      "Implementation began with data integration across ICS's diverse systems and the creation of a unified data model for global operations. We established connections to external data sources including traffic systems, weather services, and road condition databases across all operating regions.",
      "The Thor Signia team deployed the core optimization engine in phases, starting with regional pilots and expanding to global coverage. We developed specialized AI models for different types of deliveries (urban, long-haul, specialized cargo) to ensure optimal results across ICS's diverse operations.",
      "We worked closely with dispatchers and drivers to refine the system interfaces and ensure that the AI recommendations were actionable and beneficial in real-world conditions. The full system was rolled out over six months, with continuous improvements based on performance data and user feedback."
    ],
    results: [
      "Fuel consumption reduced by 28% across the entire fleet through optimized routing",
      "Average delivery times decreased by 31% while handling 22% more shipments",
      "Vehicle utilization improved by 34%, reducing the need for fleet expansion",
      "Driver overtime hours reduced by 41% through more efficient route planning",
      "Customer satisfaction scores increased by 27% due to improved delivery reliability",
      "CO₂ emissions reduced by an estimated 42,000 metric tons annually, supporting ICS's sustainability goals"
    ],
    servicesUsed: [
      {
        name: "Tailored AI Architectures",
        icon: "Settings"
      },
      {
        name: "Omnichannel Engagement",
        icon: "Database"
      },
      {
        name: "AI-Driven Lead Funnels",
        icon: "LineChart"
      }
    ],
    testimonial: {
      quote: "Thor Signia's logistics optimization platform has revolutionized our operations on a global scale. The system's ability to dynamically adapt routes in real-time across different countries and conditions has delivered efficiency improvements we didn't think were possible. Beyond the impressive fuel and time savings, we've been able to grow our business substantially without adding vehicles to our fleet.",
      author: "Maria Gonzalez",
      position: "Global Logistics Director",
      company: "InterContinental Shipping",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    relatedCaseStudies: [2, 4, 6]
  },
  {
    id: 9,
    slug: "ai-customer-acquisition-platform",
    title: "AI Customer Acquisition Platform",
    company: "TechSphere Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1774&auto=format&fit=crop",
    category: "SaaS / Technology",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1770&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1825&auto=format&fit=crop",
    summary: "Built an AI-powered customer acquisition platform for a B2B SaaS company, resulting in 215% more qualified leads and 72% lower acquisition costs.",
    roi: "418%",
    timeframe: "6 months",
    teamSize: "5 engineers",
    keyMetric: "215% more leads",
    accentColor: "#9ac857",
    challenge: [
      "TechSphere Solutions, a rapidly growing B2B software provider, was struggling with inefficient customer acquisition processes despite increasing their marketing budget. Their sales team was spending excessive time on prospects with low conversion potential, while marketing campaigns were generating high volumes of unqualified leads.",
      "The company's customer acquisition costs had risen by 47% year-over-year, while conversion rates from initial contact to closed deal had fallen to just 2.3%. TechSphere needed a solution that could identify high-potential prospects, engage them through personalized outreach, and optimize the entire sales funnel."
    ],
    strategy: [
      "Thor Signia designed an AI-powered customer acquisition platform specifically tailored to TechSphere's B2B sales context. Our strategy focused on creating an end-to-end system that would transform each stage of the acquisition process from initial targeting through closed deals.",
      "The proposed solution included: 1) A prospect identification system using machine learning to identify companies with high purchase intent, 2) Automated multi-channel outreach with personalized messaging based on prospect attributes, 3) Engagement scoring algorithms to prioritize sales team efforts on the most promising leads, and 4) Continuous optimization through closed-loop performance analysis.",
      "The platform was designed to integrate with TechSphere's existing CRM and marketing automation systems while providing enhanced capabilities through AI-powered decision making and content generation."
    ],
    execution: [
      "Implementation began with developing custom machine learning models trained on TechSphere's historical customer data, industry databases, and web behavior signals. We created lookalike models to identify prospects with characteristics similar to their most successful existing customers.",
      "The Thor Signia team built automated engagement sequences across email, social, advertising, and direct outreach channels. These sequences adapted dynamically based on prospect responses and engagement patterns, creating personalized journeys at scale.",
      "We developed intuitive interfaces for the sales team that highlighted the highest-priority prospects and provided actionable insights for each conversation. The system continuously learned from successful and unsuccessful interactions, refining its targeting and engagement strategies over time."
    ],
    results: [
      "Qualified leads increased by 215% while marketing spend remained constant",
      "Customer acquisition costs reduced by 72% through improved targeting efficiency",
      "Conversion rate from initial contact to closed deal improved from 2.3% to 8.7%",
      "Sales cycle duration decreased by 41% due to better prospect qualification",
      "Sales team productivity increased by 68% through AI-powered prioritization",
      "Customer retention rates improved by 18% due to better initial fit identification"
    ],
    servicesUsed: [
      {
        name: "AI-Driven Lead Funnels",
        icon: "LineChart"
      },
      {
        name: "Autonomous Social Management",
        icon: "Globe"
      },
      {
        name: "Smart Chat Interfaces",
        icon: "MessageSquare"
      }
    ],
    testimonial: {
      quote: "Thor Signia's customer acquisition platform has completely transformed our go-to-market approach. We're not just generating more leads - we're connecting with the right prospects at the right time with the right message. Our sales team is now focused on high-potential opportunities rather than sorting through unqualified leads. The ROI has been phenomenal, both in terms of new business and operational efficiency.",
      author: "David Park",
      position: "Chief Revenue Officer",
      company: "TechSphere Solutions",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop"
    },
    relatedCaseStudies: [1, 2, 5]
  }
];

export default caseStudiesData; 