
import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Thor Signia's AI solutions have completely transformed our customer service operations. We've seen a 45% reduction in response times and a 32% increase in customer satisfaction scores within just three months.",
    name: "Sarah Johnson",
    position: "CTO",
    company: "Global Tech Solutions",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    quote: "Implementing Thor Signia's lead generation AI has been game-changing for our sales team. We've increased qualified leads by 78% and our conversion rate has improved dramatically. The ROI was evident within the first quarter.",
    name: "Michael Chen",
    position: "VP of Sales",
    company: "Nexus Enterprises",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    quote: "As a rapidly growing e-commerce company, we needed AI solutions that could scale with us. Thor Signia delivered a customized chatbot that handles 75% of our customer inquiries automatically and with incredible accuracy.",
    name: "Emily Rodriguez",
    position: "Director of Customer Experience",
    company: "ShopWave",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    quote: "The level of expertise and innovation at Thor Signia is unmatched. Their AI social media automation platform has saved us countless hours while significantly improving our engagement metrics across all channels.",
    name: "David Wilson",
    position: "Marketing Director",
    company: "Fusion Media Group",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent-100 mix-blend-multiply blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-primary-100 mix-blend-multiply blur-3xl opacity-40 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            CLIENT SUCCESS STORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Discover how our award-winning AI solutions have helped businesses achieve remarkable results
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className="md:w-1/3 flex justify-center">
                        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent-100 shadow-lg">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <svg className="h-10 w-10 text-accent-400 mb-4 opacity-30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-lg md:text-xl text-gray-700 italic mb-6">{testimonial.quote}</p>
                        <div>
                          <p className="font-bold text-primary-700">{testimonial.name}</p>
                          <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                    currentIndex === index ? 'bg-primary-700' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="absolute top-1/2 left-4 md:left-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              onClick={goToPrev}
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              className="absolute top-1/2 right-4 md:right-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
