
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Eye, EyeOff, Loader2, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';

interface SignupProps {
  onSignup: (user: User) => void;
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-.548 0-1.711-.616-2.895-.616-1.57 0-3.013.902-3.822 2.312-1.637 2.845-.42 7.041 1.164 9.332.775 1.121 1.691 2.384 2.903 2.384 1.166 0 1.607-.714 3.013-.714 1.403 0 1.801.714 3.036.714 1.258 0 2.053-1.144 2.825-2.265.892-1.303 1.258-2.564 1.281-2.628-.027-.013-2.459-.944-2.485-3.744-.022-2.338 1.908-3.463 1.996-3.52-.109-1.583-1.767-3.264-4.226-3.541-1.127-.128-2.301.616-2.69.616zm2.418-2.288c.518-.627.868-1.503.774-2.378-.752.03-1.663.501-2.203 1.128-.484.557-.908 1.455-.795 2.31.836.064 1.697-.433 2.224-1.06z" />
  </svg>
);

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email is required';
    
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        const newUser: User = {
          name: formData.name,
          email: formData.email,
          address: 'Default Address',
          orders: []
        };
        setIsLoading(false);
        setIsSuccess(true);
        
        sessionStorage.setItem('force_skeleton', 'true');
        
        setTimeout(() => {
          onSignup(newUser);
          navigate('/');
        }, 1500);
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 sm:my-12 bg-white flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden min-h-[650px] relative border border-gray-50">
      {isSuccess && (
        <div className="fixed inset-0 z-[1000] bg-[#2874f0] flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
           <div className="animate-success">
             <CheckCircle2 size={100} strokeWidth={1} />
           </div>
           <h2 className="text-3xl font-black italic tracking-tighter mt-6 text-center">Your Account is Ready!</h2>
           <p className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">Setting up your secure profile...</p>
        </div>
      )}

      {/* Left side: Branding/Visual */}
      <div className="md:w-2/5 bg-gradient-to-br from-[#2874f0] to-[#1e5bbd] p-10 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-black italic tracking-tighter mb-12 block">ShopSwift</Link>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight tracking-tighter italic">Join the<br/>Revolution!</h2>
          <p className="text-sm opacity-80 font-bold uppercase tracking-widest leading-relaxed mt-6">
            Sign up to unlock exclusive member deals, priority shipping, and earn rewards on every purchase.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-center relative z-10">
           <div className="w-40 h-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center relative">
              <UserPlus size={56} className="text-white opacity-40" />
              <div className="absolute -bottom-2 bg-yellow-400 text-black text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">New Member Perk</div>
           </div>
        </div>
        
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 p-8 sm:p-14 flex flex-col justify-center">
        <div className="mb-10">
           <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">Create Account</h3>
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Get started with your free profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className={`w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 outline-none transition-all focus:border-[#2874f0] focus:ring-4 focus:ring-blue-50 font-bold text-gray-900 text-sm placeholder-gray-300 shadow-sm ${errors.name ? 'border-red-500' : ''}`} 
              placeholder="e.g. Rahul Sharma" 
            />
            {errors.name && <p className="text-red-500 text-[10px] font-black uppercase mt-1.5 ml-1">{errors.name}</p>}
          </div>

          <div className="relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className={`w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 outline-none transition-all focus:border-[#2874f0] focus:ring-4 focus:ring-blue-50 font-bold text-gray-900 text-sm placeholder-gray-300 shadow-sm ${errors.email ? 'border-red-500' : ''}`} 
              placeholder="user@example.com" 
            />
            {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-1.5 ml-1">{errors.email}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="relative">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  className={`w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 outline-none transition-all focus:border-[#2874f0] focus:ring-4 focus:ring-blue-50 font-bold text-gray-900 text-sm placeholder-gray-300 shadow-sm ${errors.password ? 'border-red-500' : ''}`} 
                  placeholder="Complexity required" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2874f0]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[9px] font-bold mt-1.5 ml-1 leading-tight">{errors.password}</p>}
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Confirm</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                  className={`w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 outline-none transition-all focus:border-[#2874f0] focus:ring-4 focus:ring-blue-50 font-bold text-gray-900 text-sm placeholder-gray-300 shadow-sm ${errors.confirmPassword ? 'border-red-500' : ''}`} 
                  placeholder="Repeat password" 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2874f0]">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] font-black uppercase mt-1.5 ml-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-[#fb641b] text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#ef5d13] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Join Now <ArrowRight size={18} /></>}
            </button>
            
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Fast Sign Up</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95 group">
                 <GoogleIcon />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-3.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all shadow-sm active:scale-95 group">
                 <AppleIcon />
                 <span className="text-[10px] font-black uppercase tracking-widest">Apple</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center">
           <p className="text-xs font-medium text-gray-500">
             Already a member? <Link to="/login" className="text-[#2874f0] font-black hover:underline uppercase tracking-tighter">Login here</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
