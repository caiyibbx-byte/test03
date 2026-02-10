
import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Fingerprint, 
  Lock, 
  User, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StaffUser } from '../types';

interface LoginViewProps {
  onLogin: (user: StaffUser) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dept: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模拟身份核验逻辑
    setTimeout(() => {
      let user: StaffUser;

      // 演示账号自动匹配逻辑
      const staffId = formData.id.toLowerCase();
      if (staffId === 'gt4') {
        user = {
          id: 'gt4',
          name: '孙经理',
          dept: '商务部',
          roleId: 'r2',
          status: 'active',
          lastLogin: new Date().toLocaleString()
        };
      } else if (staffId === 'm2') {
        user = {
          id: 'm2',
          name: '李专家',
          dept: '技术中心',
          roleId: 'r3',
          status: 'active',
          lastLogin: new Date().toLocaleString()
        };
      } else if (staffId === 'admin-001') {
        user = {
          id: 'ADMIN-001',
          name: '系统管理员',
          dept: '数字化指挥中心',
          roleId: 'r1',
          status: 'active',
          lastLogin: new Date().toLocaleString()
        };
      } else {
        // 普通登录/注册逻辑
        user = {
          id: formData.id || 'S-888',
          name: formData.name || '访问用户',
          dept: formData.dept || '临时部门',
          roleId: 'r2',
          status: 'active',
          lastLogin: new Date().toLocaleString()
        };
      }

      onLogin(user);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#020617] overflow-hidden font-sans">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative w-full max-w-[1100px] flex bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        
        {/* 左侧：品牌展示区 */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-16 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-xl">
                <Zap size={28} fill="currentColor" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">GridBid AI</h1>
            </div>
            <h2 className="text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">
              智能投标<br />
              驱动电网未来
            </h2>
            <p className="mt-8 text-blue-100/70 text-lg font-medium max-w-sm leading-relaxed text-left">
              基于 GridGPT 核心推理引擎，为电网企业提供全生命周期的投标协同与数字化支撑。
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-6">
              <div className="flex flex-col text-left">
                <span className="text-white text-2xl font-black">2.4k+</span>
                <span className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest">Active Nodes</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col text-left">
                <span className="text-white text-2xl font-black">99.9%</span>
                <span className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest">SLA Uptime</span>
              </div>
            </div>
            <div className="mt-10 flex items-center space-x-2 text-emerald-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">国网/南网安全合规认证系统</span>
            </div>
          </div>
        </div>

        {/* 右侧：登录/注册表单区 */}
        <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center bg-slate-900/40 text-left">
          <div className="mb-12">
            <h3 className="text-3xl font-black text-white tracking-tight uppercase italic mb-2">
              {mode === 'login' ? '员工身份验证' : '新员工工号注册'}
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              {mode === 'login' ? '请使用您的企业工号凭证登录系统 (测试孙经理请用 gt4)' : '完成企业信息核验后开启 AI 办公体验'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="relative group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">企业员工工号 (Staff ID)</label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                  <input 
                    required
                    autoFocus
                    value={formData.id}
                    onChange={e => setFormData({...formData, id: e.target.value})}
                    placeholder="输入工号，如: gt4" 
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-mono font-bold"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">真实姓名</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input 
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="姓名" 
                          className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">所属部门</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input 
                          required
                          value={formData.dept}
                          onChange={e => setFormData({...formData, dept: e.target.value})}
                          placeholder="部门" 
                          className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="relative group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">认证口令 (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                  <input 
                    required
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 transition-all flex items-center justify-center group active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? '开启智慧投标大厅' : '完成注册并登录'}
                  <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-slate-400 hover:text-white text-xs font-bold transition-colors"
            >
              {mode === 'login' ? '没有账号？申请新工号注册' : '已有账号？直接返回登录'}
            </button>
            
            <div className="mt-10 flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 grayscale opacity-30">
                 <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center"><Fingerprint size={14} className="text-white"/></div>
                 <span className="text-[9px] font-black text-white uppercase tracking-tighter">Biometric Ready</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center space-x-1.5 grayscale opacity-30">
                 <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center"><ShieldCheck size={14} className="text-white"/></div>
                 <span className="text-[9px] font-black text-white uppercase tracking-tighter">L3 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部版权 */}
      <div className="fixed bottom-8 left-0 w-full text-center pointer-events-none">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
          Powered by GridGPT Engine & bull; System Vers v2.5.4
        </p>
      </div>

      <style>{`
        .grid-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default LoginView;
