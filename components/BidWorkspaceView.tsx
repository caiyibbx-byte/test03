import React, { useState, useMemo } from 'react';
import { 
  Users, Award, FileText, CheckCircle, ChevronRight, BrainCircuit, 
  RotateCw, Wand2, Download, Save, MessageSquare, ExternalLink, 
  ChevronDown, ChevronUp, UserPlus, Trash2, AlertCircle, RefreshCcw,
  Search, X
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  certs: number;
  years: number;
  reason?: string;
}

interface Manager {
  id: string;
  name: string;
  role: string;
  score: number;
  tags: string[];
  certs: string[];
  resume: string;
}

const mockAvailableManagers: Manager[] = [
  {
    id: 'm-001',
    name: '张工',
    role: '高级项目经理',
    score: 98,
    tags: ['变电站扩建经验', '高压资质', '江苏区域专家'],
    certs: ['一级建造师', '高级工程师', 'PMP'],
    resume: '深耕电力系统15年，主持过5项国家级重大电网工程，对江苏电网招标文件评分标准有深度研究。'
  },
  {
    id: 'm-002',
    name: '王大伟',
    role: '资深工程主管',
    score: 92,
    tags: ['通信运维专家', '国网一级专家', 'PMP'],
    certs: ['高级工程师', '注册安全工程师'],
    resume: '拥有20年电网通信运维经验，曾多次主导跨省通信主干网改造项目投标工作。'
  },
  {
    id: 'm-003',
    name: '刘芳',
    role: '一级注册建造师',
    score: 89,
    tags: ['线路工程', 'EPC管理', '南网经验'],
    certs: ['一级建造师', '高级工程师'],
    resume: '精通电网EPC总承包管理，在广东、广西等南方电网区域拥有极高的信誉评价。'
  }
];

const BidWorkspaceView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [managerExpanded, setManagerExpanded] = useState(false);
  const [managerSelectionOpen, setManagerSelectionOpen] = useState(false);
  const [clientType, setClientType] = useState<'SGCC' | 'CSG'>('SGCC'); // SGCC = 国网, CSG = 南网

  // Manager state
  const [manager, setManager] = useState<Manager>(mockAvailableManagers[0]);

  const [fixedMembers, setFixedMembers] = useState<TeamMember[]>([
    { id: 'm1', name: '李晓峰', role: '技术负责人', title: '高级工程师', certs: 4, years: 12 },
    { id: 'm2', name: '王志刚', role: '安全主管', title: '注册安全工程师', certs: 3, years: 8 },
    { id: 'm3', name: '陈思羽', role: '造价工程师', title: '中级职称', certs: 2, years: 5 },
  ]);

  const [altMembers, setAltMembers] = useState<TeamMember[]>([
    { id: 'a1', name: '赵强', role: '技术负责人', title: '教授级高工', certs: 6, years: 20, reason: '资质证书更契合项目高要求' },
    { id: 'a2', name: '林静', role: '质量管控', title: '高级工程师', certs: 3, years: 10, reason: '类似项目回访满意度100%' },
  ]);

  const totalTeamSize = useMemo(() => 1 + fixedMembers.length, [fixedMembers]);
  const limit = clientType === 'SGCC' ? 15 : 20;
  const isOverLimit = totalTeamSize > limit;

  const replaceMember = (alt: TeamMember, index: number) => {
    const newFixed = [...fixedMembers];
    const oldMember = newFixed[index];
    const newAlts = [...altMembers];
    
    newFixed[index] = { ...alt, reason: undefined };
    newAlts.push({ ...oldMember, reason: '此前由系统默认推荐' });
    
    setFixedMembers(newFixed);
    setAltMembers(newAlts.filter(a => a.id !== alt.id));
  };

  const nextStep = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(step + 1);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      {/* Workflow Steps */}
      <div className="flex items-center justify-between bg-white px-8 py-4 rounded-xl border border-slate-200 shadow-sm shrink-0">
        {[
          { id: 1, label: '团队匹配' },
          { id: 2, label: '业绩筛选' },
          { id: 3, label: '文书编撰' },
          { id: 4, label: '生成预览' },
        ].map((s) => (
          <div key={s.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= s.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > s.id ? <CheckCircle size={18} /> : s.id}
            </div>
            <span className={`ml-2 text-sm font-medium ${step >= s.id ? 'text-slate-900' : 'text-slate-400'}`}>
              {s.label}
            </span>
            {s.id < 4 && <ChevronRight className="mx-6 text-slate-300" size={16} />}
          </div>
        ))}
      </div>

      {/* Workspace Area */}
      <div className="flex-1 flex space-x-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {step === 1 && (
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <BrainCircuit className="text-blue-600 mr-2" size={24} />
                    第一阶段：团队智能匹配与配置
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">系统已根据招标文件技术规范，自动检索库内最优资质人员。</p>
                </div>
                
                {/* Personnel Limit Indicator */}
                <div className={`px-4 py-2 rounded-lg border flex items-center space-x-3 transition-colors ${
                  isOverLimit ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-100 text-blue-700'
                }`}>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold uppercase opacity-70">团队人数限制</span>
                    <span className="text-sm font-bold">
                      当前: {totalTeamSize} 人 ({clientType === 'SGCC' ? '国网' : '南网'} ≤ {limit}人)
                    </span>
                  </div>
                  {isOverLimit && <AlertCircle size={20} className="animate-pulse" />}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* 1. Manager Area */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                      <Award size={14} className="mr-2" /> 拟派项目负责人 (Key Contact)
                    </h4>
                    <button 
                      onClick={() => setManagerSelectionOpen(true)}
                      className="flex items-center text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <RefreshCcw size={14} className="mr-1.5" />
                      手动从库重新选择
                    </button>
                  </div>
                  
                  <div className={`border-2 rounded-xl transition-all duration-300 ${
                    managerExpanded ? 'border-blue-500 ring-4 ring-blue-50 bg-white' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'
                  }`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-5 shadow-lg shadow-blue-200">
                            {manager.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xl font-bold text-slate-900">{manager.name}</span>
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">匹配度 {manager.score}%</span>
                            </div>
                            <p className="text-slate-500 font-medium">{manager.role}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {manager.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <button 
                            onClick={() => setManagerExpanded(!managerExpanded)}
                            className="flex items-center text-blue-600 text-sm font-bold hover:underline"
                          >
                            {managerExpanded ? <><ChevronUp size={16} className="mr-1"/>收起详情</> : <><ExternalLink size={16} className="mr-1"/>预览简历与证书</>}
                          </button>
                        </div>
                      </div>

                      {managerExpanded && (
                        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase mb-3">个人简介</p>
                              <p className="text-sm text-slate-700 leading-relaxed">{manager.resume}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase mb-3">持有证书清单</p>
                              <div className="space-y-2">
                                {manager.certs.map(cert => (
                                  <div key={cert} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100 group cursor-pointer hover:border-blue-300">
                                    <span className="text-sm font-medium text-slate-700">{cert}</span>
                                    <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-600" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 2. Fixed Members List */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <Users size={14} className="mr-2" /> 固定项目成员列表
                    </h4>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
                          <tr>
                            <th className="px-4 py-3">姓名/角色</th>
                            <th className="px-4 py-3">证书/年限</th>
                            <th className="px-4 py-3 text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {fixedMembers.map((member, i) => (
                            <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-4 py-3">
                                <p className="text-sm font-bold text-slate-800">{member.name}</p>
                                <p className="text-[10px] text-slate-500">{member.role} · {member.title}</p>
                              </td>
                              <td className="px-4 py-3">
                                <p className="text-xs text-slate-700 font-medium">{member.certs}个证书</p>
                                <p className="text-[10px] text-slate-400">{member.years}年工龄</p>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button className="p-1 text-slate-300 hover:text-blue-600 transition-colors" title="查看详情">
                                  <ExternalLink size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* 3. Alternative/Recommendation Area */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <UserPlus size={14} className="mr-2" /> 次选成员建议 (可替换)
                    </h4>
                    <div className="space-y-3">
                      {altMembers.map((alt) => (
                        <div key={alt.id} className="p-4 bg-amber-50/30 border border-amber-100 rounded-xl hover:bg-amber-50 transition-all group">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-800">{alt.name}</span>
                                <span className="text-[10px] font-medium text-slate-500">{alt.role}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5">{alt.title} · {alt.years}年经验</p>
                              <div className="mt-2 flex items-center bg-white/80 border border-amber-100 px-2 py-1 rounded text-[10px] text-amber-700 italic">
                                <Wand2 size={12} className="mr-1.5" />
                                {alt.reason}
                              </div>
                            </div>
                            <button 
                              onClick={() => replaceMember(alt, 0)} // Mock replace first member
                              className="px-3 py-1.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-600 hover:text-white"
                            >
                              立即替换
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-slate-700">技术建议书.docx</span>
                  <div className="flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Wand2 size={12} className="mr-1" /> AI 正在优化段落
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600"><Save size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-blue-600"><Download size={20} /></button>
                </div>
              </div>
              <div className="flex-1 p-10 overflow-y-auto font-serif text-slate-800 leading-relaxed bg-slate-50">
                 <div className="max-w-2xl mx-auto bg-white p-12 shadow-sm border border-slate-100 rounded min-h-full">
                  <h1 className="text-2xl font-bold text-center mb-12">技术响应建议书</h1>
                  <section className="mb-8">
                    <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4">第一章 项目背景与理解</h2>
                    <p className="mb-4">根据招标文件[SGCC-2024-001]的要求，本项目旨在针对XX供电局下辖变电站进行自动化系统全面升级...</p>
                  </section>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
            <div className="flex space-x-3">
              <button 
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
                className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium disabled:opacity-30"
              >
                上一步
              </button>
              {step === 1 && (
                <>
                  <button className="px-4 py-2 text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center text-sm">
                    <RefreshCcw size={16} className="mr-2" /> 重新智能匹配
                  </button>
                  <button className="px-4 py-2 text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center text-sm">
                    <UserPlus size={16} className="mr-2" /> 手动添加成员
                  </button>
                </>
              )}
            </div>
            
            <button 
              onClick={nextStep}
              className={`px-8 py-2 rounded-lg font-bold flex items-center transition-all shadow-md ${
                isOverLimit && step === 1 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGenerating ? <RotateCw className="animate-spin mr-2" size={18} /> : (step === 1 ? '确认团队配置' : '下一步')}
            </button>
          </div>
        </div>

        {/* AI Co-pilot / Context */}
        <div className="w-80 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center">
            <Wand2 size={18} className="text-blue-400 mr-2" />
            <span className="font-bold">智能投标助手</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-slate-400 mb-2 font-semibold">关键风险预警</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                  {isOverLimit ? '团队人数已超标，请精简名单以符合招标规则。' : '当前团队规模符合招标书规定人数限制。'}
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-2"></div>
                  拟派负责人“{manager.name}”在投标日期内有一项在建工程即将验收。
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-900/50">
              <p className="text-blue-400 mb-2 font-semibold">建议干预</p>
              <p className="text-slate-300">根据历史经验，国网江苏电力偏好具有当地运维经验的团队。是否替换安全主管为具备“南京供电局”项目经验的成员？</p>
              <div className="mt-3 flex space-x-2">
                <button className="px-2 py-1 bg-blue-600 text-white text-[10px] rounded hover:bg-blue-500">同意替换</button>
                <button className="px-2 py-1 bg-slate-700 text-white text-[10px] rounded hover:bg-slate-600">忽略</button>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                placeholder="在此输入指令..." 
                className="w-full bg-slate-800 border-none rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1.5 text-blue-400"><MessageSquare size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Selection Modal */}
      {managerSelectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setManagerSelectionOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <UserPlus size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">从人员资产库选择负责人</h3>
              </div>
              <button onClick={() => setManagerSelectionOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 bg-white border-b border-slate-50">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="搜索库内成员、资质关键字、业绩匹配标签..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh] custom-scrollbar">
              {mockAvailableManagers.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => {
                    setManager(m);
                    setManagerSelectionOpen(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                    manager.id === m.id ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-100' : 'border-slate-100 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4 ${
                      manager.id === m.id ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
                    }`}>
                      {m.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{m.name}</span>
                        <span className="text-xs font-bold text-blue-600">{m.score}% 匹配</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{m.role} · {m.certs[0]}等证书</p>
                      <div className="flex flex-wrap gap-1">
                        {m.tags.map(tag => (
                          <span key={tag} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setManagerSelectionOpen(false)}
                className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidWorkspaceView;