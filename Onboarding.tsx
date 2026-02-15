
import React, { useState } from 'react';
import { ChevronRight, ShoppingBag, Truck, ShieldCheck, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Welcome to ShopSwift",
    description: "India's fastest growing marketplace with over 10 million products curated just for you.",
    icon: <ShoppingBag size={64} className="text-white" />,
    color: "bg-[#ff5221]"
  },
  {
    title: "Swift Delivery",
    description: "Get your orders delivered within 24 hours with ShopSwift Express in select cities.",
    icon: <Truck size={64} className="text-white" />,
    color: "bg-[#2874f0]"
  },
  {
    title: "Secure & Trusted",
    description: "100% PCI-DSS compliant payments and a 7-day no-questions-asked return policy.",
    icon: <ShieldCheck size={64} className="text-white" />,
    color: "bg-[#1a1a3a]"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col transition-colors duration-500 ${steps[currentStep].color}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="mb-12 animate-in zoom-in-50 duration-500">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl">
            {steps[currentStep].icon}
          </div>
        </div>
        
        <h1 className="text-4xl font-black italic tracking-tighter mb-4 animate-in slide-in-from-bottom-4 duration-500">
          {steps[currentStep].title}
        </h1>
        <p className="text-lg opacity-80 max-w-sm font-medium leading-relaxed animate-in slide-in-from-bottom-6 duration-500">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="p-8 pb-12 flex flex-col gap-6 bg-white/5 backdrop-blur-md">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
            />
          ))}
        </div>

        <button 
          onClick={nextStep}
          className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        {currentStep < steps.length - 1 && (
          <button 
            onClick={onComplete}
            className="text-white/60 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
