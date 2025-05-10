import { Mic, Waves, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoiceAgentDemo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
      {/* Demo header */}
      <div className="bg-gradient-to-r from-[#10b4b7] to-[#1c9f1e] text-white p-4 rounded-t-xl">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="relative">
              <Mic className="w-6 h-6 animate-pulse" />
              <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Voice Agent Demo</h3>
        </div>
      </div>
      
      {/* Demo content */}
      <div className="p-6">
        <div className="flex flex-col h-full">
          {/* Agent avatar */}
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#10b4b7]/20 to-[#9ac857]/20 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-[#10b4b7]" />
              </div>
            </div>
          </div>
          
          {/* Agent name */}
          <div className="text-center mb-6">
            <h4 className="font-semibold text-[#1c9f1e]">Thor AI Assistant</h4>
            <p className="text-sm text-gray-500">Conversational Voice Interface</p>
          </div>
          
          {/* Waveform */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center h-24">
            <Waves className="w-full h-12 text-[#10b4b7]" />
          </div>
          
          {/* Chat exchange */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="bg-[#10b4b7]/10 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-gray-700">How can I help you today?</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-[#9ac857]/10 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-gray-700">I'd like to learn about your voice agent solutions.</p>
              </div>
            </div>
          </div>
          
          {/* Try voice agent button */}
          <div className="mt-auto">
            <Button className="w-full bg-gradient-to-r from-[#10b4b7] to-[#1c9f1e] text-white">
              <Mic className="w-5 h-5 mr-2" />
              <span>Try Voice Assistant</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentDemo;
