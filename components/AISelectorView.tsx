import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  Settings, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  PlusCircle, 
  CircleCheck, 
  Target, 
  Layers, 
  Building2, 
  Coins, 
  Search,
  Zap,
  RefreshCw,
  Clock,
  MapPin,
  CalendarDays,
  Eye,
  X,
  ShieldCheck,
  FileText,
  Info,
  ExternalLink
} from 'lucide-react';

interface AISelectorViewProps {
  plannedIds: string[];
  onTogglePlan: (item: any) => void;
}

const AISelectorView: React.FC<AISelectorViewProps> = ({ plannedIds, onTogglePlan }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '你好！我是您的投标策略助手。今日已完成全网 2,481 条招标公告的深度扫描。根据您的“高压、信通、500万+”偏好，我已在左侧为您列出了 5 个极高匹配度的分包建议。您需要我对某个特定分包进行准入条件的二次复核吗？' }
  ]);
  const [input, setInput] = useState('');
  const [detailLot, setDetailLot] = useState<any | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', text: '正在基于您的最新指令优化筛选逻辑... 已锁定“华东区域”且具备“二级及以上资质”的要求。左侧列表已实时更新匹配得分。建议您优先关注 [特高压扩建-包2] 的利润空间。' }]);
    }, 1000);
  };

  // 模拟深度分析后的招标项目数据
  const tenderPool = [
    { 
      id: 'ai-t1', 
      title: '特高压自动化系统扩建项目', 
      purchaser: '国网总部', 
      deadline: '2024-11-25 10:00',
      location: '北京开标中心',
      summary: '本项目旨在对国家电网特高压直流输电系统进行全面的自动化升级，包括监控中心扩容及端对端保护协议更新。',
      match: 95, 
      tag: '极高匹配',
      lots: [
        { id: 'l1', name: '包1：监控系统集成', budget: '800万', requirement: '需具备电力系统自动化一级资质，近三年有500kV以上同类业绩。' },
        { id: 'l2', name: '包2：保护装置采购', budget: '700万', requirement: '需满足最新国产化替代要求，提供相关芯片自主可控证明。' }
      ]
    },
    { 
      id: 'ai-t2', 
      title: '苏通大桥跨江塔基维护', 
      purchaser: '国网江苏', 
      deadline: '2024-11-15 14:00',
      location: '南京市鼓楼区南京饭店',
      summary: '苏通大桥跨江段属于重点巡检区域，本次采购涉及水下塔基加固及无人机实时监控服务。',
      match: 82, 
      tag: '高匹配',
      lots: [
        { id: 'l1', name: '整包：全面巡检服务', budget: '450万', requirement: '具备特殊高空作业许可及无人机集群飞行资质。' }
      ]
    },
    { 
      id: 'ai-t3', 
      title: '2024年配网自动化终端协议采购', 
      purchaser: '国网浙江', 
      deadline: '2024-11-20 09:30',
      location: '浙江招标大厅 (线上)',
      summary: '推进浙江全省配网数字化转型，采购符合 IEC 61850 标准的新型智能终端。',
      match: 88, 
      tag: '高度吻合',
      lots: [
        { id: 'lot-a', name: '包A：DTU/FTU 终端', budget: '1200万', requirement: '支持一二次融合技术，具备国网入网检测报告。' },
        { id: 'lot-b', name: '包B：故障指示器', budget: '500万', requirement: '具备低功耗窄带物联网通讯能力。' }
      ]
    }
  ];

  // 展平分包以便按行显示
  const lotRows = useMemo(() => {
    const rows: any[] = [];
    tenderPool.forEach(tender => {
      tender.lots.forEach(lot => {
        rows.push({
          tenderId: tender.id,
          tenderTitle: tender.title,
          purchaser: tender.purchaser,
          deadline: tender.deadline,
          location: tender.location,
          summary: tender.summary,
          match: tender.match,
          tag: tender.tag,
          lotId: lot.id,
          lotName: lot.name,
          budget: lot.budget,
          requirement: lot.requirement,
          combinedId: `${tender.id}_lot_${lot.id}`
        });
      });
    });
    return rows;
  }, [tenderPool]);

  const handleLotToggle = (row: any) => {
    const payload = {
      id: row.combinedId,
      title: row.tenderTitle,
      purchaser: row.purchaser,
      lotName: row.lotName,
      budget: row.budget,
      openingTime: row.deadline,
      openingLocation: row.location,
      status: 'analyzed',
      priority: 'medium',
      source: 'ai'
    };
    onTogglePlan(payload);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] space-x-6 text-left relative">
      {/* 详细情况模态框 */}
      {detailLot && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setDetailLot(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black shadow-xl shrink-0">
                  <span className="text-[10px] uppercase opacity-50 tracking-tighter">Match</span>
                  <span className="text-xl">{detailLot.match}%</span>
                </div>
                <div>
                   <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-black uppercase tracking-widest rounded">{detailLot.tag}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{detailLot.tenderId}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic mt-1 leading-tight">{detailLot.lotName}</h3>
                   <p className="text-sm font-bold text-slate-400 mt-1 italic">{detailLot.tenderTitle}</p>
                </div>
              </div>
              <button onClick={() => setDetailLot(null)} className="p-3 hover:bg-white rounded-full transition-colors shadow-sm"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar-main">
               <section>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center italic">
                    <Info size={16} className="mr-2 text-blue-500" /> 项目基础背景
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                    {detailLot.summary || '暂无详细背景介绍。'}
                  </p>
               </section>

               <div className="grid grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center italic">
                      <Clock size={16} className="mr-2 text-blue-500" /> 时间与地点
                    </h4>
                    <div className="space-y-3 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                       <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-400">投标截止</span>
                          <span className="font-black text-red-500">{detailLot.deadline}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-400">开标地点</span>
                          <span className="font-black text-slate-700">{detailLot.location}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-50">
                          <span className="font-bold text-slate-400">发布日期</span>
                          <span className="font-black text-slate-700">2024-10-25</span>
                       </div>
                    </div>
                  </section>
                  <section>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center italic">
                      <ShieldCheck size={16} className="mr-2 text-emerald-500" /> 分包技术准入要求
                    </h4>
                    <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl space-y-4">
                       <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                         {detailLot.requirement}
                       </p>
                       <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase italic">
                          <Zap size={14} className="mr-2" /> AI 评估：我司资质完全契合
                       </div>
                    </div>
                  </section>
               </div>
            </div>

            <div className="p-8 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
              <button className="flex items-center text-xs font-black text-blue-600 uppercase tracking-widest italic group">
                <ExternalLink size={16} className="mr-2 group-hover:scale-110 transition-transform" /> 查看原招标文件
              </button>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setDetailLot(null)}
                  className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={() => { handleLotToggle(detailLot); setDetailLot(null); }}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center"
                >
                  <PlusCircle size={16} className="mr-2" /> 加入投标计划
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 左侧：今日建议候选 */}
      <div className="flex-1 flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
               <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">今日建议候选 (Lot Recommendations)</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 italic">Real-time matching based on GridGPT 4.0 reasoning</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest italic animate-pulse">
               AI Logic Refreshing...
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar-main">
          {lotRows.map((row) => {
            const isInPlan = plannedIds.includes(row.combinedId);
            return (
              <div 
                key={row.combinedId} 
                className={`p-6 rounded-[28px] border-2 transition-all flex flex-col space-y-4 group ${
                  isInPlan 
                    ? 'border-emerald-500 bg-emerald-50/30 shadow-inner' 
                    : 'border-slate-50 bg-white hover:border-blue-200 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6 text-left min-w-0">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg shrink-0 transition-transform group-hover:scale-105 ${
                      isInPlan ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-900 text-white shadow-slate-100'
                    }`}>
                      <span className="text-[10px] uppercase opacity-50 tracking-tighter">Match</span>
                      <span className="text-xl">{row.match}%</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                          row.match > 90 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {row.tag}
                        </span>
                        <p className="text-[11px] font-bold text-slate-400 uppercase italic truncate">{row.tenderTitle}</p>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 truncate italic leading-none">{row.lotName}</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => setDetailLot(row)}
                      className="px-5 py-3.5 bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center shadow-sm border border-slate-100"
                    >
                      <Eye size={16} className="mr-2" /> 查看详情
                    </button>
                    <button 
                      onClick={() => handleLotToggle(row)}
                      className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center shadow-lg active:scale-95 ${
                        isInPlan 
                          ? 'bg-emerald-500 text-white shadow-emerald-100' 
                          : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'
                      }`}
                    >
                      {isInPlan ? (
                        <><CircleCheck size={16} className="mr-2" /> 已在计划</>
                      ) : (
                        <><PlusCircle size={16} className="mr-2" /> 加入计划</>
                      )}
                    </button>
                  </div>
                </div>

                {/* 详细元数据行 */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-100/50">
                   <div className="flex items-center text-left">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mr-3 shrink-0"><Building2 size={14}/></div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Purchaser</p>
                        <p className="text-[11px] font-bold text-slate-700 truncate">{row.purchaser}</p>
                      </div>
                   </div>
                   <div className="flex items-center text-left">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mr-3 shrink-0"><CalendarDays size={14}/></div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Deadline</p>
                        <p className="text-[11px] font-bold text-blue-600 truncate">{row.deadline}</p>
                      </div>
                   </div>
                   <div className="flex items-center text-left col-span-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mr-3 shrink-0"><MapPin size={14}/></div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Location</p>
                        <p className="text-[11px] font-bold text-slate-700 truncate">{row.location}</p>
                      </div>
                   </div>
                   <div className="flex items-center text-left">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-3 shrink-0"><Coins size={14}/></div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">Budget Est.</p>
                        <p className="text-[11px] font-black text-slate-900 truncate">{row.budget}</p>
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 右侧：智能体对话与规则配置 */}
      <div className="w-[450px] flex flex-col space-y-6">
        <div className="flex-1 flex flex-col bg-slate-950 rounded-[32px] border border-white/5 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
          
          <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-900/40 backdrop-blur-md shrink-0">
            <div className="flex items-center text-blue-400 font-black italic uppercase tracking-widest text-xs">
              <Bot size={18} className="mr-2" />
              <span>GridGPT 策略大脑 (Strategy Hub)</span>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5"><Settings size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar-dark text-left">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-900/20 font-medium' 
                    : 'bg-white/5 text-slate-100 rounded-tl-none border border-white/5 italic font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/60 border-t border-white/5 shrink-0">
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-2xl p-1.5 focus-within:border-blue-500/50 transition-all">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="在此输入新的筛选维度..." 
                className="flex-1 bg-transparent border-none outline-none text-white text-xs px-3 font-medium placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 p-2.5 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-90"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm text-left shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center italic">
              <Filter size={16} className="text-slate-400 mr-2" />
              当前活跃策略 (Active Rules)
            </h3>
            <span className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 transition-colors cursor-pointer"><Settings size={14} /></span>
          </div>
          <div className="space-y-2">
            {[
              '区域限制: 江苏、浙江、安徽 (核心)',
              '预算下限: 5,000,000 CNY',
              '资质偏好: 甲级设计 / CMMI3',
              '排除关键词: 房屋修缮, 绿化维护',
            ].map((rule, i) => (
              <div key={i} className="flex items-center text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100 uppercase italic tracking-tighter">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-200"></div>
                {rule}
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200">
            深度调整筛选模型 (Tune Model)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISelectorView;