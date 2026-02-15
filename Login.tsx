
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { CheckCircle2, Loader2, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
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

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const dummyUser: User = {
        name: 'Will Smith',
        email: email || 'customer@example.in',
        address: 'Park Street, Kolkata, West Bengal',
        orders: []
      };
      setIsLoading(false);
      setIsSuccess(true);
      
      sessionStorage.setItem('force_skeleton', 'true');
      
      setTimeout(() => {
        onLogin(dummyUser);
        navigate('/');
      }, 1200);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 min-h-[80vh] flex flex-col justify-center">
      {isSuccess && (
        <div className="fixed inset-0 z-[1000] bg-[#ff5221] flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
           <div className="animate-success">
             <CheckCircle2 size={100} strokeWidth={1} />
           </div>
           <h2 className="text-3xl font-black italic tracking-tighter mt-6">Welcome Back!</h2>
           <p className="text-white/70 font-bold uppercase text-[10px] tracking-widest mt-2">Personalizing your experience...</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 sm:p-10 border border-gray-50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-6 shadow-inner">
             <span className="text-2xl font-black text-[#ff5221] italic tracking-tighter">SS</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Sign In</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Access your ShopSwift account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
            <AlertCircle size={18} />
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#ff5221] focus:ring-4 focus:ring-orange-50 text-gray-900 font-medium text-sm transition-all shadow-sm placeholder-gray-300" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@example.com"
              required
            />
          </div>
          <div>
            <div className="flex justify-between mb-2 ml-1">
               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
               <button type="button" className="text-[10px] text-[#ff5221] font-black uppercase tracking-widest hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#ff5221] focus:ring-4 focus:ring-orange-50 text-gray-900 font-medium text-sm transition-all shadow-sm placeholder-gray-300" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff5221] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff5221] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Or Continue With</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <GoogleIcon />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-sm">
            <AppleIcon />
            <span className="text-[10px] font-black uppercase tracking-widest">Apple</span>
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500 font-medium">
            New to ShopSwift? <Link to="/signup" className="text-[#ff5221] font-black hover:underline uppercase tracking-tighter">Create Account</Link>
          </p>
        </div>
      </div>
      
      <p className="text-center text-[9px] text-gray-300 font-black uppercase tracking-widest mt-8 px-8 leading-relaxed">
        By continuing, you agree to ShopSwift's Terms of Use and Privacy Policy.
      </p>
    </div>
  );
};

export default Login;
