import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Award, FileText, CircleCheck, ChevronRight, BrainCircuit, 
  RefreshCw, WandSparkles, Download, Save, MessageSquare, ExternalLink, 
  ChevronDown, ChevronUp, UserPlus, Trash2, AlertCircle, RefreshCcw,
  Search, X, ListFilter, ArrowUpDown, Plus, Paperclip, TriangleAlert,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List,
  Heading1, Heading2, Type, Eraser, Sparkles, FileSearch, Check,
  Printer, Share2, ShieldCheck, FileType, ZoomIn, ZoomOut, FileCheck
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

interface ExperienceItem {
  id: string;
  projectName: string;
  participants: string[];
  type: string;
  priority: 'Level 1' | 'Level 2' | 'Level 3';
  evidenceStatus: 'linked' | 'pending';
  matchedKeywords: string[];
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
  }
];

const mockExperiences: ExperienceItem[] = [
  { id: 'exp-1', projectName: '220kV平潮变电站自动化全面改造工程', participants: ['张工', '李晓峰'], type: '变电自动化', priority: 'Level 1', evidenceStatus: 'linked', matchedKeywords: ['220kV', '自动化', '改造'] },
  { id: 'exp-2', projectName: '国网江苏电力2023年二次系统安全加固项目', participants: ['张工', '王志刚'], type: '电力安全', priority: 'Level 1', evidenceStatus: 'linked', matchedKeywords: ['国网江苏', '安全加固'] },
  { id: 'exp-3', projectName: '苏州工业园区智慧电网一期示范项目', participants: ['陈思羽'], type: '智能电网', priority: 'Level 2', evidenceStatus: 'linked', matchedKeywords: ['智慧电网'] },
];

const BidWorkspaceView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [managerSelectionOpen, setManagerSelectionOpen] = useState(false);
  const [managerExpanded, setManagerExpanded] = useState(false);
  const [manager, setManager] = useState<Manager>(mockAvailableManagers[0]);
  const [clientType] = useState<'SGCC' | 'CSG'>('SGCC'); 

  // 编辑器状态
  const [activeOutline, setActiveOutline] = useState('01');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const [fixedMembers, setFixedMembers] = useState<TeamMember[]>([
    { id: 'm1', name: '李晓峰', role: '技术负责人', title: '高级工程师', certs: 4, years: 12 },
    { id: 'm2', name: '王志刚', role: '安全主管', title: '注册安全工程师', certs: 3, years: 8 },
  ]);

  const [altMembers, setAltMembers] = useState<TeamMember[]>([
    { id: 'a1', name: '赵强', role: '技术负责人', title: '教授级高工', certs: 6, years: 20, reason: '资质证书更契合项目高要求' },
  ]);

  const [selectedExps, setSelectedExps] = useState<string[]>(mockExperiences.slice(0, 3).map(e => e.id));

  const totalTeamSize = useMemo(() => 1 + fixedMembers.length, [fixedMembers]);
  const limit = clientType === 'SGCC' ? 15 : 20;
  const isOverLimit = totalTeamSize > limit;

  // 业绩规则
  const minExp = 5;
  const isExpCountValid = selectedExps.length >= minExp;

  const docOutline = [
    { id: '01', title: '1. 项目背景与需求分析' },
    { id: '02', title: '2. 拟派团队资质与分工' },
    { id: '03', title: '3. 企业相关业绩陈述' },
    { id: '04', title: '4. 核心技术方案 (220kV)' },
    { id: '05', title: '5. 施工组织与工期保障' },
  ];

  const nextStep = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(step + 1);
    }, step === 3 ? 2000 : 1200); // Step 3 到 4 模拟较长的“排版引擎”工作时间
  };

  const handleAiPolish = () => {
    setIsAiProcessing(true);
    setTimeout(() => setIsAiProcessing(false), 2000);
  };

  const replaceMember = (alt: TeamMember, index: number) => {
    const newFixed = [...fixedMembers];
    const oldMember = newFixed[index];
    newFixed[index] = { ...alt, reason: undefined };
    setFixedMembers(newFixed);
    setAltMembers(prev => [...prev.filter(a => a.id !== alt.id), { ...oldMember, reason: '原匹配人员' }]);
  };

  const toggleExp = (id: string) => {
    setSelectedExps(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      {/* 步骤条 */}
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
              {step > s.id ? <CircleCheck size={18} /> : s.id}
            </div>
            <span className={`ml-2 text-sm font-medium ${step >= s.id ? 'text-slate-900' : 'text-slate-400'}`}>
              {s.label}
            </span>
            {s.id < 4 && <ChevronRight className="mx-6 text-slate-300" size={16} />}
          </div>
        ))}
      </div>

      <div className="flex-1 flex space-x-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* 第一阶段：团队匹配 */}
          {step === 1 && (
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
               <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center text-slate-900">
                    <BrainCircuit className="text-blue-600 mr-2" size={24} />
                    第一阶段：团队智能匹配与配置
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">AI 已根据技术标要求自动筛选最优资质人员。</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border flex items-center space-x-3 ${isOverLimit ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                  <span className="text-sm font-bold">{totalTeamSize} / {limit} 人</span>
                  {isOverLimit && <AlertCircle size={18} className="animate-pulse" />}
                </div>
              </div>
              <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">拟派项目负责人</h4>
                  <button onClick={() => setManagerSelectionOpen(true)} className="text-blue-600 text-xs font-bold">更换负责人</button>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-lg">{manager.name[0]}</div>
                  <div>
                    <h5 className="text-lg font-bold text-slate-900">{manager.name} <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded">匹配度 {manager.score}%</span></h5>
                    <p className="text-sm text-slate-500">{manager.role} · {manager.certs[0]}</p>
                  </div>
                </div>
              </section>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h4 className="text-xs font-bold text-slate-400 uppercase">固定成员 ({fixedMembers.length})</h4>
                   {fixedMembers.map(m => (
                     <div key={m.id} className="p-3 bg-white border border-slate-100 rounded-lg flex justify-between items-center hover:border-blue-200">
                       <span className="text-sm font-bold">{m.name}</span>
                       <span className="text-xs text-slate-400">{m.role}</span>
                     </div>
                   ))}
                </div>
                <div className="space-y-4">
                   <h4 className="text-xs font-bold text-slate-400 uppercase">AI 优化建议</h4>
                   {altMembers.map(m => (
                     <div key={m.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg group">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-amber-900">{m.name}</span>
                         <button onClick={() => replaceMember(m, 0)} className="text-[10px] font-bold text-amber-600 opacity-0 group-hover:opacity-100">立即替换</button>
                       </div>
                       <p className="text-[10px] text-amber-600 mt-1 italic">理由: {m.reason}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* 第二阶段：业绩筛选 */}
          {step === 2 && (
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
               <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center text-slate-900">
                    <ListFilter className="text-blue-600 mr-2" size={24} />
                    第二阶段：项目业绩智能筛选
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">系统已匹配历史项目，并根据本项目招标文件要求进行自动优先级排序。</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border flex items-center space-x-3 ${!isExpCountValid ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                   <span className="text-sm font-bold">已选: {selectedExps.length} (要求 ≥ {minExp})</span>
                   {!isExpCountValid && <TriangleAlert size={18} className="animate-pulse" />}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 font-bold text-slate-500 text-[10px] uppercase">
                     <tr>
                       <th className="px-6 py-4 w-12 text-center">选择</th>
                       <th className="px-6 py-4">项目名称</th>
                       <th className="px-6 py-4">匹配关键字</th>
                       <th className="px-6 py-4">佐证状态</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {mockExperiences.map(exp => (
                        <tr key={exp.id} className={`hover:bg-slate-50 ${selectedExps.includes(exp.id) ? 'bg-blue-50/20' : ''}`}>
                          <td className="px-6 py-4 text-center">
                            <input type="checkbox" checked={selectedExps.includes(exp.id)} onChange={() => toggleExp(exp.id)} className="rounded text-blue-600" />
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800">{exp.projectName}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              {exp.matchedKeywords.map(k => <span key={k} className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[9px] font-bold rounded">{k}</span>)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`text-[10px] font-bold flex items-center ${exp.evidenceStatus === 'linked' ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {exp.evidenceStatus === 'linked' ? <CircleCheck size={12} className="mr-1"/> : <AlertCircle size={12} className="mr-1"/>}
                                {exp.evidenceStatus === 'linked' ? '已关联' : '待补充'}
                             </span>
                          </td>
                        </tr>
                     ))}
                   </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 第三阶段：文书编撰 */}
          {step === 3 && (
            <div className="flex-1 flex overflow-hidden">
              <div className="w-64 border-r border-slate-100 bg-slate-50/50 flex flex-col shrink-0">
                <div className="p-4 border-b border-slate-100 bg-white">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <ListFilter size={14} className="mr-2" /> 文档结构大纲
                  </h4>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {docOutline.map((item) => (
                    <button key={item.id} onClick={() => setActiveOutline(item.id)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${activeOutline === item.id ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-600 hover:bg-slate-200'}`}>
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-slate-100/50 overflow-hidden relative">
                <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 space-x-1 shrink-0 z-10 sticky top-0 shadow-sm">
                  <div className="flex items-center space-x-0.5 border-r border-slate-200 pr-2 mr-2">
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Bold size={16}/></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Italic size={16}/></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Underline size={16}/></button>
                  </div>
                  <button onClick={handleAiPolish} disabled={isAiProcessing} className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 ml-2 hover:bg-blue-100 transition-colors">
                     {isAiProcessing ? <RefreshCw size={14} className="mr-1.5 animate-spin" /> : <Sparkles size={14} className="mr-1.5" />}
                     AI 段落润色
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-12 flex justify-center custom-scrollbar">
                  <div className="w-[820px] bg-white min-h-[1160px] shadow-2xl border border-slate-200 p-20 focus:outline-none relative">
                    <article className="prose prose-slate max-w-none font-serif text-slate-900 leading-[1.8]">
                      {activeOutline === '01' && (
                        <div className="animate-in fade-in duration-500">
                          <h1 className="text-3xl font-bold text-center mb-12 border-b-2 border-slate-900 pb-6 uppercase">技术响应建议书</h1>
                          <h2 className="text-xl font-bold mb-4">第一章 项目背景与需求深度分析</h2>
                          <p className="mb-6 indent-8 text-justify italic border-l-4 border-slate-100 pl-4">针对本项目[SGCC-2024-X]，本公司通过深度研读招标文件，充分认识到XX供电局在变电站自动化升级过程中的核心诉求。本项目承载着区域核心供电负荷，对稳定性有极高要求...</p>
                        </div>
                      )}
                      {activeOutline === '02' && (
                        <div className="animate-in slide-in-from-left-4 duration-500">
                          <h2 className="text-xl font-bold mb-4">第二章 拟派团队资质与分工</h2>
                          <p className="mb-6 indent-8">为确保本项目高质量交付，我司特别组建了以“{manager.name}”为核心的项目组。该团队成员平均电网经验超过8年...</p>
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 第四阶段：生成预览 (High Fidelity Preview) */}
          {step === 4 && (
            <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative">
              {/* 预览控制栏 */}
              <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-6 justify-between text-white shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="flex items-center bg-slate-700 rounded-lg p-1">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-1.5 hover:bg-slate-600 rounded"><ZoomOut size={16}/></button>
                      <span className="px-3 text-xs font-bold w-12 text-center">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-1.5 hover:bg-slate-600 rounded"><ZoomIn size={16}/></button>
                   </div>
                   <div className="h-4 w-px bg-slate-700"></div>
                   <span className="text-xs text-slate-400">总计 48 页 · 约 25,430 字</span>
                </div>
                <div className="flex items-center space-x-3">
                   <button className="flex items-center px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded-lg border border-slate-600 transition-colors">
                      <Share2 size={14} className="mr-2" /> 协作分享
                   </button>
                   <button className="flex items-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-lg shadow-lg shadow-blue-900/20 transition-all">
                      <Download size={14} className="mr-2" /> 打包导出文件
                   </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* 页面滚动区 */}
                <div className="flex-1 overflow-y-auto p-12 space-y-12 flex flex-col items-center custom-scrollbar-dark scroll-smooth bg-slate-900/50">
                   {/* 第一页 - 封面 */}
                   <div className="bg-white shadow-2xl origin-top transition-transform duration-300" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: `${1160 * (zoomLevel/100)}px`, padding: '80px' }}>
                      <div className="h-full border-[8px] border-double border-slate-800 p-12 flex flex-col items-center text-center">
                         <div className="w-24 h-24 mb-12 opacity-80 grayscale">
                            <ShieldCheck size={96} strokeWidth={1} />
                         </div>
                         <h1 className="text-5xl font-serif font-black mb-8 tracking-widest text-slate-900">投标文件</h1>
                         <div className="w-32 h-1 bg-slate-900 mb-12"></div>
                         <div className="space-y-4 text-xl font-bold text-slate-700 mb-auto">
                            <p>项目名称：XX 供电局 2024 年变电站综合自动化系统改造</p>
                            <p>招标编号：SGCC-POWER-2024-001X</p>
                            <p>标包名称：标包 1 - 自动化设备及集成服务</p>
                         </div>
                         <div className="space-y-2 text-lg text-slate-500 font-medium">
                            <p>投标人：江苏 GridBid 电力技术有限公司 (盖章)</p>
                            <p>日期：2024 年 10 月 24 日</p>
                         </div>
                      </div>
                   </div>

                   {/* 第二页 - 正文 */}
                   <div className="bg-white shadow-2xl relative" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: `${1160 * (zoomLevel/100)}px`, padding: '80px' }}>
                      <div className="absolute top-10 right-10 text-[10px] text-slate-300 uppercase tracking-widest">Confidential · GridBid AI</div>
                      <article className="prose prose-slate max-w-none font-serif text-slate-900 leading-[1.8]">
                        <h2 className="text-xl font-bold mb-8 text-center border-b pb-4">第一章 项目背景与需求深度分析</h2>
                        <p className="mb-6 indent-8">针对本项目，我司通过深度研读招标文件，充分认识到XX供电局在变电站自动化升级中的核心诉求。本项目承载着区域核心供电负荷，对稳定性有极高要求。在技术架构设计上，我们采用了符合 DL/T 860 标准的全建模体系...</p>
                        <p className="mb-6 indent-8">在后续的施工组织中，我司承诺将投入具备丰富改造经验的团队，确保在停电窗口期内保质保量完成任务...</p>
                      </article>
                      {/* 模拟电子签章 */}
                      <div className="absolute bottom-32 right-32 select-none pointer-events-none opacity-80 group">
                         <div className="relative w-40 h-40 flex items-center justify-center border-4 border-red-500 rounded-full text-red-500 font-bold text-sm transform -rotate-12 border-dashed">
                            <div className="text-center">
                               <p className="mb-1">江苏 GridBid</p>
                               <p className="mb-1 text-xs">电子投标文件专用</p>
                               <p className="text-[8px]">VALIDATED BY AI-CORE</p>
                            </div>
                         </div>
                         <div className="absolute -bottom-4 -right-4 w-20 h-10 border-2 border-red-600 bg-red-50/10 flex items-center justify-center text-red-600 font-bold text-[10px] rotate-6">
                            法人: 张XX
                         </div>
                      </div>
                   </div>
                </div>

                {/* 预览侧边报告栏 */}
                <div className="w-80 border-l border-slate-700 bg-slate-800 flex flex-col shrink-0">
                   <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <FileCheck size={14} className="mr-2" /> AI 文书终审报告
                      </h4>
                   </div>
                   <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar-dark">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-xs font-bold uppercase">技术得分预测</span>
                            <span className="text-blue-400 text-lg font-bold">96.5</span>
                         </div>
                         <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[96.5%]"></div>
                         </div>
                         <p className="text-[10px] text-slate-500 mt-2">基于同类项目 500+ 中标样本比对计算</p>
                      </div>

                      <div className="space-y-4">
                         <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">扫描详情</h5>
                         {[
                           { label: '严禁词命中', value: '0个', status: 'success' },
                           { label: '必要项覆盖', value: '100%', status: 'success' },
                           { label: '图表规范性', value: '优秀', status: 'success' },
                           { label: '引用标准效力', value: '现行有效', status: 'success' },
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center bg-slate-700/30 p-2 rounded">
                              <span className="text-xs text-slate-300">{item.label}</span>
                              <span className={`text-xs font-bold ${item.status === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>{item.value}</span>
                           </div>
                         ))}
                      </div>

                      <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-900/50">
                         <div className="flex items-start">
                            <TriangleAlert size={14} className="text-blue-400 mt-0.5 mr-2" />
                            <p className="text-[10px] text-blue-300 leading-relaxed">
                               检测到电子签章有效期覆盖本项目开标日。投标文件已根据《电力行业电子招投标规范》进行脱敏加密。
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* 底部导航区 */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
            <button onClick={() => setStep(Math.max(1, step - 1))} className="px-6 py-2 text-slate-600 font-medium hover:text-slate-900">上一步</button>
            <div className="flex space-x-3">
              {step === 4 ? (
                <>
                  <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold flex items-center border border-slate-200 hover:bg-white">
                    <Printer size={18} className="mr-2" /> 打印文档
                  </button>
                  <button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center shadow-lg shadow-blue-200">
                    <FileType size={18} className="mr-2" /> 正式发布归档
                  </button>
                </>
              ) : (
                <>
                  {step === 3 && <button className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold flex items-center shadow-md"><Save size={18} className="mr-2" /> 保存草稿</button>}
                  <button 
                    onClick={nextStep}
                    className={`px-8 py-2 rounded-lg font-bold flex items-center shadow-md transition-all ${
                      (!isExpCountValid && step === 2) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isGenerating ? <RefreshCw className="animate-spin mr-2" size={18} /> : (step === 3 ? '生成并查看预览' : '确认并下一步')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 侧边智能助手 (Step 4 下自动收缩或显示汇总) */}
        {step < 4 && (
          <div className="w-80 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-800 flex items-center">
              <WandSparkles size={18} className="text-blue-400 mr-2" />
              <span className="font-bold">智能投标助手</span>
            </div>
            <div className="flex-1 p-4 space-y-6">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-xs font-bold mb-3 uppercase tracking-widest">章节质量建议</p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start"><div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>当前正在编写“项目背景”，AI 已检索到 3 个同类成功案例。</li>
                  <li className="flex items-start"><div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 mr-2"></div>团队成员资质已通过自动核验。</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900/80">
              <div className="relative">
                <input type="text" placeholder="向助手提问..." className="w-full bg-slate-800 rounded-lg px-3 py-2 text-[10px] text-white focus:ring-1 focus:ring-blue-500 outline-none" />
                <button className="absolute right-2 top-1.5 text-blue-400 hover:text-blue-300 transition-colors"><MessageSquare size={14} /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 负责人选择模态框 */}
      {managerSelectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">选择拟派负责人</h3>
              <X className="cursor-pointer text-slate-400" onClick={() => setManagerSelectionOpen(false)} />
            </div>
            <div className="space-y-4">
              {mockAvailableManagers.map(m => (
                <div key={m.id} onClick={() => {setManager(m); setManagerSelectionOpen(false);}} className="p-4 border border-slate-100 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all">
                  <p className="font-bold text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.role} · {m.tags.join('/')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar-dark::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: #1e293b; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;