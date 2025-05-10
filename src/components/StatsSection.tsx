import React from 'react';
import { Award, Users, Briefcase, BarChart } from 'lucide-react';

const statsData = [
  {
    title: "Client Satisfaction",
    value: "98%",
    icon: Award,
    description: "Based on client feedback and industry surveys",
    color: "#009898",
  },
  {
    title: "Projects Delivered",
    value: "500+",
    icon: Briefcase,
    description: "Successfully implemented enterprise AI solutions",
    color: "#88bf42",
  },
  {
    title: "Expert AI Engineers",
    value: "40+",
    icon: Users,
    description: "Dedicated AI specialists with advanced degrees",
    color: "#009898",
  },
  {
    title: "ROI Increase",
    value: "65%",
    icon: BarChart,
    description: "Average client ROI within first year of implementation",
    color: "#88bf42",
  },
];

const StatsSection = () => {
  return (
    <section id="stats-section" className="py-20 bg-white relative overflow-hidden">      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Impact of Thor Signia</h2>
          <p className="text-lg text-gray-600">Our powerful AI solutions deliver measurable results that transform how businesses operate</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div style={{ backgroundColor: stat.color }} className="p-6 text-white group-hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-4xl font-bold">{stat.value}</span>
                  <span className="text-white opacity-80">
                    {stat.icon === Award && <Award className="w-8 h-8" />}
                    {stat.icon === Users && <Users className="w-8 h-8" />}
                    {stat.icon === Briefcase && <Briefcase className="w-8 h-8" />}
                    {stat.icon === BarChart && <BarChart className="w-8 h-8" />}
                  </span>
                </div>
                <h3 className="text-lg font-medium mt-2">{stat.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
