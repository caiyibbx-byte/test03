
import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Send, 
  Settings, 
  Target, 
  Building2, 
  Coins, 
  Search,
  Clock,
  X,
  ShieldCheck,
  Eye,
  PlusCircle,
  CircleCheck,
  History,
  Filter,
  Sparkles,
  AlertCircle,
  Zap,
  Layers,
  Award,
  Users2,
  FileText,
  CalendarDays,
  MapPin,
  ClipboardList,
  ToggleRight,
  ToggleLeft,
  Settings2,
  Globe,
  Scale,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Check,
  Layout
} from 'lucide-react';

interface AISelectorViewProps {
  plannedIds: string[];
  onTogglePlan: (item: any) => void;
}

interface RecRule {
  id: string;
  name: string;
  desc: string;
  enabled: boolean;
  type: 'filter' | 'weight';
  icon: any;
}

const ICON_OPTIONS = [
  { name: 'Shield', icon: ShieldCheck },
  { name: 'Globe', icon: Globe },
  { name: 'Coins', icon: Coins },
  { name: 'Scale', icon: Scale },
  { name: 'Target', icon: Target },
  { name: 'Zap', icon: Zap }
];

const AISelectorView: React.FC<AISelectorViewProps> = ({ plannedIds, onTogglePlan }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '您好！我是您的投标策略助手。我已经根据企业资质、历史业绩及人员负载，为您从全网招标中实时筛选并匹配了最优项目。建议优先查看 [特高压自动化扩建-包1]，该项目与您公司的 500kV 业绩匹配度极高。' }
  ]);
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [onlyValid, setOnlyValid] = useState(true);
  const [detailLot, setDetailLot] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'excel'>('excel');

  // 规则引擎状态
  const [rules, setRules] = useState<RecRule[]>([
    { id: 'r1', name: '资质强匹配过滤', desc: '自动剔除我方资质不满足项', enabled: true, type: 'filter', icon: ShieldCheck },
    { id: 'r2', name: '华东/华南地域优先', desc: '提高周边省份项目的推荐权值', enabled: true, type: 'weight', icon: Globe },
    { id: 'r3', name: '金额下限红线', desc: '过滤预计金额低于 100W 的项目', enabled: false, type: 'filter', icon: Coins },
    { id: 'r4', name: '同类业绩深度关联', desc: '基于近三年合同内容进行向量匹配', enabled: true, type: 'weight', icon: Scale },
  ]);

  // 规则编辑器状态
  const [editingRule, setEditingRule] = useState<Partial<RecRule> | null>(null);
  const [showRuleModal, setShowRuleModal] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: input }];
    setMessages(newMsgs);
    setInput('');
    setTimeout(() => {
      setMessages([...newMsgs, { role: 'assistant', text: '策略已更新。已根据您的要求动态调整了规则模型。' }]);
    }, 800);
  };

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleDeleteRule = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确认删除此推荐规则？删除后 AI 将不再执行此维度的预计算。')) {
      setRules(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleOpenRuleModal = (rule?: RecRule) => {
    if (rule) {
      setEditingRule(rule);
    } else {
      setEditingRule({
        id: `r-${Date.now()}`,
        name: '',
        desc: '',
        enabled: true,
        type: 'filter',
        icon: Target
      });
    }
    setShowRuleModal(true);
  };

  const handleSaveRule = () => {
    if (!editingRule?.name || !editingRule?.desc) {
      alert("请完善规则名称与描述");
      return;
    }
    setRules(prev => {
      const exists = prev.find(r => r.id === editingRule.id);
      if (exists) {
        return prev.map(r => r.id === editingRule.id ? (editingRule as RecRule) : r);
      }
      return [...prev, editingRule as RecRule];
    });
    setShowRuleModal(false);
    setEditingRule(null);
  };

  const handleApplyRules = () => {
    setMessages(prev => [...prev, { role: 'assistant', text: '规则引擎重新加载中... 已根据最新规则序列（共 ' + rules.length + ' 项）完成计算逻辑重组。' }]);
  };

  // 模拟数据
  const tenderPool = [
    { 
      id: 'ai-t1', 
      title: '特高压自动化系统扩建及数字化平台升级项目', 
      purchaser: '国家电网有限公司', 
      deadline: '2026-10-25 10:00', 
      match: 98, 
      tag: '极高匹配',
      lots: [{ 
        subBidNumber: 'SG-2026-HQ-01', subBidName: '特高压监控扩建分标', lotNumber: '包1', lotName: '核心监控系统集成', 
        scope: '包含中心端 SCADA 系统扩容及 500kV 以上变电站远动协议对调。',
        qualifications: '具备电力系统自动化一级资质；具备高新技术企业证书。',
        experience: '近三年具有至少 2 个 500kV 及以上同类集成业绩。', personnel: '项目经理需具备高级工程师职称及 10 年以上相关经验。',
        duration: '365 日历天', location: '北京、国家电网总部及指定站点', maxPrice: '900.00', estAmount: '850.00', quoteMethod: '总价报折扣'
      }]
    },
    { 
      id: 'ai-t4', 
      title: '国网雄安新区智慧配电网一期示范工程', 
      purchaser: '国网河北电力', 
      deadline: '2026-11-05 16:00', 
      match: 94, 
      tag: '重点抢标',
      lots: [{ 
        subBidNumber: 'HB-XA-2026-02', subBidName: '智慧配电感知分标', lotNumber: '包2', lotName: '边缘计算网关及二次回路改造', 
        scope: '对雄安新区起步区 10kV 开闭所进行边缘计算网关部署。',
        qualifications: '电子与智能化工程专业承包二级及以上。', experience: '具有智慧城市或智能配网相关实施案例。',
        personnel: '核心成员需具备 Linux 嵌入式开发或运维认证。', duration: '180 日历天', location: '雄安新区起步区', maxPrice: '650.00', estAmount: '620.00', quoteMethod: '总价报固定单价'
      }]
    },
    { 
      id: 'ai-t2', 
      title: '苏通大桥跨江塔基及输电线路维护服务', 
      purchaser: '国网江苏电力', 
      deadline: '2026-06-15 14:00', 
      match: 86, 
      tag: '高匹配',
      lots: [{ 
        subBidNumber: 'JS-ST-2026-01', subBidName: '跨江线路特维分标', lotNumber: '包1', lotName: '全面巡检与水下加固服务', 
        scope: '苏通大桥 500kV 跨江线路塔基全量探伤及基础加固。',
        qualifications: '港口与航道工程施工总承包三级及以上资质。', experience: '具有大型桥梁或跨江塔基维护业绩。',
        personnel: '需配备持证潜水员及特种作业人员不少于 5 人。', duration: '120 日历天', location: '江苏省苏通大桥区域', maxPrice: '500.00', estAmount: '450.00', quoteMethod: '总价报折扣'
      }]
    },
    { 
      id: 'ai-t3', 
      title: '2026年配网不停电作业工具批量租赁项目', 
      purchaser: '国网浙江电力', 
      deadline: '2026-08-20 09:00', 
      match: 81, 
      tag: '建议参与',
      lots: [{ 
        subBidNumber: 'ZJ-RENT-2026-08', subBidName: '绝缘作业车租赁分标', lotNumber: '包1', lotName: '10kV特种作业斗臂车租赁', 
        scope: '租赁 10 台 10kV 带电作业斗臂车，含专职操作手。', qualifications: '具备特种设备经营租赁资质。',
        experience: '近两年具有同类特种车辆租赁服务记录。', personnel: '操作手需持有特种设备操作证。',
        duration: '12 个月', location: '浙江省内各供电局', maxPrice: '150.00', estAmount: '120.00', quoteMethod: '单台月租金报价'
      }]
    }
  ];

  const filteredLots = useMemo(() => {
    const rows: any[] = [];
    const now = new Date();
    tenderPool.forEach(tender => {
      const deadlineDate = new Date(tender.deadline.replace(' ', 'T'));
      const isValid = deadlineDate > now;
      if (onlyValid && !isValid) return;
      tender.lots.forEach(lot => {
        const searchStr = `${tender.title} ${lot.lotName} ${tender.purchaser} ${tender.tag}`.toLowerCase();
        if (keyword && !searchStr.includes(keyword.toLowerCase())) return;
        rows.push({
          ...lot, tenderTitle: tender.title, purchaser: tender.purchaser, deadline: tender.deadline, match: tender.match, tag: tender.tag, isValid, combinedId: `${tender.id}_${lot.lotNumber}`
        });
      });
    });
    return rows.sort((a, b) => b.match - a.match);
  }, [keyword, onlyValid, rules]);

  const handleLotToggle = (row: any) => {
    onTogglePlan({
      id: row.combinedId, title: row.tenderTitle, purchaser: row.purchaser, lotName: row.lotName, budget: `${row.estAmount}万元`, openingTime: row.deadline, status: 'analyzed', priority: 'medium', source: 'ai'
    });
  };

  return (
    <div className="flex h-[calc(100vh-160px)] space-x-6 text-left relative">
      
      {/* 规则编辑模态框 */}
      {showRuleModal && editingRule && (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowRuleModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-white/20">
             <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20"><Settings2 size={24} /></div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">规则配置工作站</h3>
                </div>
                <button onClick={() => setShowRuleModal(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><X size={24}/></button>
             </div>
             
             <div className="p-8 space-y-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">规则显示名称</label>
                   <input 
                     className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" 
                     value={editingRule.name} 
                     onChange={e => setEditingRule({...editingRule, name: e.target.value})}
                     placeholder="例如：特定资质优先" 
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">逻辑详细描述</label>
                   <textarea 
                     className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm h-24 resize-none" 
                     value={editingRule.desc}
                     onChange={e => setEditingRule({...editingRule, desc: e.target.value})}
                     placeholder="简述该规则对 AI 筛选结果的影响逻辑..."
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">规则类型</label>
                      <select 
                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm appearance-none"
                        value={editingRule.type}
                        onChange={e => setEditingRule({...editingRule, type: e.target.value as any})}
                      >
                         <option value="filter">硬性过滤 (Filter)</option>
                         <option value="weight">智能加权 (Weight)</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">视觉图标</label>
                      <div className="flex bg-slate-50 rounded-2xl p-1 gap-1">
                         {ICON_OPTIONS.map(opt => (
                           <button 
                             key={opt.name}
                             onClick={() => setEditingRule({...editingRule, icon: opt.icon})}
                             className={`p-2 rounded-xl transition-all ${editingRule.icon === opt.icon ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-200'}`}
                           >
                             <opt.icon size={16} />
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 border-t border-slate-100 bg-white flex justify-end space-x-3">
                <button onClick={() => setShowRuleModal(false)} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">取消</button>
                <button onClick={handleSaveRule} className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center">
                  <Check size={16} className="mr-2" /> 保存规则策略
                </button>
             </div>
          </div>
        </div>
      )}

      {/* 标包详情弹出窗口 */}
      {detailLot && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6 text-left">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setDetailLot(null)} />
          <div className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                   <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg"><ClipboardList size={24} /></div>
                   <div className="text-left">
                      <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">标包深度解析详情</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 italic">Detailed tender lot analysis</p>
                   </div>
                </div>
                <button onClick={() => setDetailLot(null)} className="p-3 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X size={24} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar-main text-left">
                <section className="grid grid-cols-2 gap-8 border-b border-slate-50 pb-8">
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><Layers size={12} className="mr-1.5" /> 分标编号 / 名称</p>
                      <p className="text-sm font-bold text-slate-900 italic">{detailLot.subBidNumber}</p>
                      <p className="text-xs font-medium text-slate-500">{detailLot.subBidName}</p>
                   </div>
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><Target size={12} className="mr-1.5" /> 包号 / 名称</p>
                      <p className="text-sm font-black text-blue-600 italic">{detailLot.lotNumber}</p>
                      <p className="text-xs font-bold text-slate-700">{detailLot.lotName}</p>
                   </div>
                </section>
                <section className="space-y-3">
                   <p className="text-[10px] font-black text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full uppercase tracking-widest italic">项目概况与招标范围</p>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed font-medium italic">{detailLot.scope}</div>
                </section>
                <section className="grid grid-cols-1 gap-6">
                   {[
                     { label: '资质要求', val: detailLot.qualifications, icon: ShieldCheck, bg: 'bg-emerald-50', text: 'text-emerald-600' },
                     { label: '业绩要求', val: detailLot.experience, icon: Award, bg: 'bg-amber-50', text: 'text-amber-600' },
                     { label: '人员要求', val: detailLot.personnel, icon: Users2, bg: 'bg-purple-50', text: 'text-purple-600' },
                   ].map((item, i) => (
                     <div key={i} className="flex space-x-5 items-start">
                        <div className={`w-10 h-10 ${item.bg} ${item.text} rounded-xl flex items-center justify-center shrink-0 border border-transparent animate-in slide-in-from-left-4 duration-500`}><item.icon size={20} /></div>
                        <div>
                           <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{item.label}</p>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{item.val}</p>
                        </div>
                     </div>
                   ))}
                </section>
                <section className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-8">
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><CalendarDays size={12} className="mr-1.5" /> 工期 / 服务期</p>
                      <p className="text-sm font-bold text-slate-800">{detailLot.duration}</p>
                   </div>
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><MapPin size={12} className="mr-1.5" /> 实施地点</p>
                      <p className="text-sm font-bold text-slate-800">{detailLot.location}</p>
                   </div>
                </section>
                <section className="grid grid-cols-3 gap-6">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">最高限价</p>
                      <div className="flex items-baseline space-x-1"><span className="text-lg font-black text-slate-900">{detailLot.maxPrice}</span><span className="text-[10px] font-bold text-slate-400">万元</span></div>
                   </div>
                   <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1.5 italic">预计采购金额</p>
                      <div className="flex items-baseline space-x-1"><span className="text-lg font-black text-blue-700">{detailLot.estAmount}</span><span className="text-[10px] font-bold text-blue-400">万元</span></div>
                   </div>
                   <div className="bg-slate-900 p-4 rounded-2xl shadow-inner">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 italic">报价方式</p>
                      <p className="text-xs font-black text-white italic truncate">{detailLot.quoteMethod}</p>
                   </div>
                </section>
             </div>
             <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex justify-end space-x-4">
                <button onClick={() => setDetailLot(null)} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">关闭窗口</button>
                <button onClick={() => { handleLotToggle(detailLot); setDetailLot(null); }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 transition-all flex items-center"><PlusCircle size={18} className="mr-2" /> 立即加入投标计划</button>
             </div>
          </div>
        </div>
      )}

      {/* 左侧：AI 推荐引擎 + 人工搜索过滤 */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left">
        <div className="bg-slate-900 px-8 py-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20"><Sparkles size={20} /></div>
              <div>
                <h3 className="text-lg font-black text-white uppercase italic leading-none tracking-tight">AI 智能推荐大厅</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1 opacity-80 italic">Smart Asset Matching & Manual Filtering</p>
              </div>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setViewMode('card')} 
                className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                title="卡片视图"
              >
                <Layout size={16} />
              </button>
              <button 
                onClick={() => setViewMode('excel')} 
                className={`p-2 rounded-lg transition-all ${viewMode === 'excel' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                title="Excel 视图"
              >
                <ClipboardList size={16} />
              </button>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button onClick={() => setOnlyValid(true)} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${onlyValid ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>仅看有效</button>
              <button onClick={() => setOnlyValid(false)} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${!onlyValid ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>全部记录</button>
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input 
              type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="在 AI 推荐的项目中，输入关键字进行人工精细筛选..." 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-bold outline-none focus:border-blue-600 focus:bg-white/10 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-0 custom-scrollbar-main bg-slate-50/20">
          {filteredLots.length > 0 ? (
            viewMode === 'card' ? (
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between px-2 mb-2">
                   <div className="flex items-center space-x-2"><Zap size={14} className="text-amber-500" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-left">GridGPT 已为您找到 {filteredLots.length} 个高价值目标</span></div>
                </div>
                {filteredLots.map(row => {
                  const isInPlan = plannedIds.includes(row.combinedId);
                  return (
                    <div 
                      key={row.combinedId} 
                      className={`p-6 rounded-[32px] border-2 transition-all flex flex-col space-y-4 relative overflow-hidden group ${
                        !row.isValid ? 'bg-slate-50 opacity-60 grayscale border-slate-100' :
                        isInPlan ? 'bg-white border-emerald-500 shadow-xl' : 'bg-white border-white hover:border-blue-300 shadow-sm hover:shadow-lg'
                      }`}
                    >
                      {row.match >= 90 && row.isValid && <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase italic rounded-bl-2xl shadow-sm tracking-widest">AI 重点推荐</div>}
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-6 text-left">
                          <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black shrink-0 shadow-lg ${!row.isValid ? 'bg-slate-300 text-white' : 'bg-slate-900 text-white group-hover:bg-blue-600 transition-colors'}`}>
                            <span className="text-[9px] opacity-50 tracking-tighter">MATCH</span><span className="text-xl">{row.match}%</span>
                          </div>
                          <div className="text-left">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-0.5 text-[9px] font-black rounded-lg uppercase tracking-widest italic border ${row.match >= 90 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>{row.tag}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[300px]">{row.tenderTitle}</span>
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">{row.lotNumber}：{row.lotName}</h4>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => setDetailLot(row)} className="px-5 py-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-100 flex items-center"><Eye size={14} className="mr-2 text-slate-400" /> 项目详情</button>
                          {row.isValid && (
                            <button onClick={() => handleLotToggle(row)} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center ${isInPlan ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'}`}>
                              {isInPlan ? <><CircleCheck size={16} className="mr-2"/> 已加入</> : <><PlusCircle size={16} className="mr-2"/> 加入计划</>}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center pt-5 border-t border-slate-50 space-x-8 text-left">
                        <div className="flex items-center text-slate-500"><Building2 size={14} className="mr-2 text-slate-300" /><span className="text-[11px] font-bold italic">{row.purchaser}</span></div>
                        <div className="flex items-center"><Clock size={14} className={`mr-2 ${row.isValid ? 'text-blue-500' : 'text-slate-300'}`} /><span className={`text-[11px] font-black ${row.isValid ? 'text-blue-600' : 'text-slate-400'}`}>{row.deadline}</span></div>
                        <div className="flex items-center text-slate-900"><Coins size={14} className="mr-2 text-amber-500" /><span className="text-[11px] font-black tracking-tighter">{row.estAmount}万元</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-w-max">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-30 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="sticky left-0 z-40 bg-slate-900 w-20 px-4 py-4 border-r border-slate-800 text-center">匹配度</th>
                      <th className="sticky left-20 z-40 bg-slate-900 w-32 px-4 py-4 border-r border-slate-800">操作</th>
                      <th className="w-40 px-4 py-4 border-r border-slate-800">推荐标签</th>
                      <th className="w-48 px-4 py-4 border-r border-slate-800">分标编号</th>
                      <th className="w-60 px-4 py-4 border-r border-slate-800">分标名称</th>
                      <th className="w-24 px-4 py-4 border-r border-slate-800">包号</th>
                      <th className="w-64 px-4 py-4 border-r border-slate-800">包名称</th>
                      <th className="w-96 px-4 py-4 border-r border-slate-800">招标范围</th>
                      <th className="w-80 px-4 py-4 border-r border-slate-800">资质要求</th>
                      <th className="w-80 px-4 py-4 border-r border-slate-800">业绩要求</th>
                      <th className="w-80 px-4 py-4 border-r border-slate-800">人员要求</th>
                      <th className="w-48 px-4 py-4 border-r border-slate-800">采购单位</th>
                      <th className="w-48 px-4 py-4 border-r border-slate-800">截止时间</th>
                      <th className="w-32 px-4 py-4 border-r border-slate-800">工期</th>
                      <th className="w-48 px-4 py-4 border-r border-slate-800">实施地点</th>
                      <th className="w-32 px-4 py-4 border-r border-slate-800">预计金额(万)</th>
                      <th className="w-32 px-4 py-4">详情</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredLots.map(row => {
                      const isInPlan = plannedIds.includes(row.combinedId);
                      return (
                        <tr key={row.combinedId} className={`group transition-colors ${!row.isValid ? 'opacity-50 grayscale bg-slate-50' : isInPlan ? 'bg-emerald-50/30' : 'hover:bg-slate-50'}`}>
                          <td className="sticky left-0 z-20 bg-inherit px-4 py-4 border-r border-slate-100 text-center">
                            <span className={`text-sm font-black ${row.match >= 90 ? 'text-amber-600' : 'text-blue-600'}`}>{row.match}%</span>
                          </td>
                          <td className="sticky left-20 z-20 bg-inherit px-4 py-4 border-r border-slate-100">
                            {row.isValid && (
                              <button 
                                onClick={() => handleLotToggle(row)}
                                className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${
                                  isInPlan ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-white hover:bg-black'
                                }`}
                              >
                                {isInPlan ? <CircleCheck size={12} className="mr-1.5" /> : <Plus size={12} className="mr-1.5" />}
                                {isInPlan ? '已加入' : '加入计划'}
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-100">
                            <span className={`px-2 py-0.5 text-[9px] font-black rounded-lg uppercase tracking-widest italic border ${row.match >= 90 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>{row.tag}</span>
                          </td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-bold text-slate-600 italic">{row.subBidNumber}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-bold text-slate-800">{row.subBidName}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-black text-blue-600">{row.lotNumber}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-black text-slate-900">{row.lotName}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-[11px] text-slate-500 leading-relaxed max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-w-none">{row.scope}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-[11px] text-slate-500 leading-relaxed">{row.qualifications}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-[11px] text-slate-500 leading-relaxed">{row.experience}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-[11px] text-slate-500 leading-relaxed">{row.personnel}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-bold text-slate-600 italic">{row.purchaser}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-black text-slate-500">{row.deadline}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-bold text-slate-700">{row.duration}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-xs font-bold text-slate-700">{row.location}</td>
                          <td className="px-4 py-4 border-r border-slate-100 text-sm font-black text-slate-900">{row.estAmount}</td>
                          <td className="px-4 py-4">
                            <button onClick={() => setDetailLot(row)} className="p-2 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-slate-300">
              <div className="bg-slate-100 p-8 rounded-[40px] mb-6"><AlertCircle size={64} strokeWidth={1} className="opacity-20" /></div>
              <p className="text-sm font-black uppercase tracking-[0.4em] italic text-slate-400 text-center">当前没有符合条件的 AI 推荐项</p>
              <button onClick={() => {setKeyword(''); setOnlyValid(true);}} className="mt-6 text-xs font-bold text-blue-600 hover:underline flex items-center"><History size={14} className="mr-2" /> 重置所有筛选条件</button>
            </div>
          )}
        </div>
      </div>

      {/* 右侧：AI 策略控制台 */}
      <div className="w-80 flex flex-col space-y-6 text-left shrink-0">
        <div className="flex-[3] min-h-[450px] flex flex-col bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl border border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
          <div className="p-5 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between relative z-10 text-left">
            <div className="flex items-center text-blue-400 font-black italic uppercase tracking-widest text-[10px]"><Bot size={18} className="mr-2" /><span>GridGPT 策略大脑</span></div>
            <Settings size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-left custom-scrollbar-dark relative z-10">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-[11px] leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none font-bold' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-900/80 border-t border-white/5 relative z-10 text-left">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-blue-500/50 transition-all">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="在此输入新的策略要求..." className="flex-1 bg-transparent border-none outline-none text-white text-[11px] px-3 font-medium placeholder:text-slate-700" />
              <button onClick={handleSend} className="bg-blue-600 p-2.5 text-white rounded-xl hover:bg-blue-500 shadow-lg active:scale-90 transition-all"><Send size={14} /></button>
            </div>
          </div>
        </div>

        {/* AI 推荐规则引擎 - 增强 CRUD */}
        <div className="flex-[2] min-h-[300px] bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm text-left flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center italic">
              <Settings2 size={16} className="text-blue-600 mr-2" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">AI 推荐规则引擎</h3>
            </div>
            <button 
              onClick={() => handleOpenRuleModal()}
              className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              title="新增自定义规则"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto custom-scrollbar-main pr-1">
            {rules.map((rule) => (
              <div 
                key={rule.id} 
                className={`p-3 rounded-2xl border transition-all relative group/rule ${rule.enabled ? 'bg-slate-50 border-blue-100 shadow-sm' : 'bg-white border-slate-100 opacity-60'}`}
              >
                {/* 悬浮操作栏 */}
                <div className="absolute top-2 right-10 flex space-x-1 opacity-0 group-hover/rule:opacity-100 transition-opacity z-10">
                   <button onClick={() => handleOpenRuleModal(rule)} className="p-1 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-md shadow-sm"><Edit2 size={10}/></button>
                   <button onClick={(e) => handleDeleteRule(rule.id, e)} className="p-1 bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-md shadow-sm"><Trash2 size={10}/></button>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-xl shrink-0 transition-transform group-hover/rule:scale-110 ${rule.enabled ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <rule.icon size={14} />
                    </div>
                    <div className="text-left pr-6">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{rule.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold leading-tight">{rule.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleRule(rule.id)} className="shrink-0 transition-all active:scale-90 relative z-20">
                    {rule.enabled ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} className="text-slate-200" />}
                  </button>
                </div>
              </div>
            ))}
            {rules.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                 <Layout size={32} className="mx-auto text-slate-100 mb-2" />
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">暂无自定义逻辑</p>
              </div>
            )}
          </div>

          <button onClick={handleApplyRules} className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center group shrink-0">
            <RefreshCw size={14} className="mr-3 group-active:animate-spin" /> 重新计算并应用规则
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-main::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AISelectorView;
