import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm the Thor Signia AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "";
      
      // Simple response logic based on keywords
      const lowerCaseInput = input.toLowerCase();
      if (lowerCaseInput.includes("pricing") || lowerCaseInput.includes("cost") || lowerCaseInput.includes("price")) {
        botResponse = "Our services are custom-tailored to your business needs. I'd be happy to connect you with our solutions team who can provide pricing details based on your specific requirements.";
      } else if (lowerCaseInput.includes("demo") || lowerCaseInput.includes("try")) {
        botResponse = "I'd be happy to arrange a demo for you! Please let me know what specific services you're interested in, and I can set up a personalized demonstration.";
      } else if (lowerCaseInput.includes("integration") || lowerCaseInput.includes("setup")) {
        botResponse = "Our systems integrate seamlessly with most major business platforms. The typical setup process takes 2-4 weeks depending on complexity, and our team handles the technical details.";
      } else if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi") || lowerCaseInput.includes("hey")) {
        botResponse = "Hello! How can I help you learn more about our AI solutions today?";
      } else {
        botResponse = "Thank you for your interest in Thor Signia's AI solutions. Our team specializes in creating custom AI implementations for enterprises. Would you like to know more about a specific service or schedule a consultation?";
      }
      
      const botMessage: Message = {
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-[#009898] to-[#88bf42] p-4 text-white">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          <h3 className="font-semibold">Thor Signia Chat Assistant</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[360px]">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                message.isBot 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-[#009898] text-white'
              }`}
            >
              <div className="flex items-start mb-1">
                {message.isBot ? (
                  <Bot className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                ) : (
                  <User className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                )}
                <p>{message.text}</p>
              </div>
              <p className="text-xs opacity-70 text-right">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-[#009898] hover:bg-[#88bf42] transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          This is a demo. Try asking about our services, pricing, or integration.
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;
