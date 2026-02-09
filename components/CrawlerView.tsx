
import React, { useState } from 'react';
import { 
  Download, 
  RefreshCcw, 
  Eye, 
  PlusCircle, 
  CircleCheck, 
  TriangleAlert, 
  X, 
  Search as SearchIcon, 
  WifiOff, 
  MapPin, 
  Clock, 
  Building2, 
  Layers, 
  ExternalLink, 
  ChevronRight, 
  Info, 
  Plus,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  Award,
  Users2,
  CalendarDays,
  Coins,
  FileText
} from 'lucide-react';
import { Tender, SystemLog, SubPackage } from '../types';

const mockTenders: Tender[] = [
  { 
    id: '1', 
    projectId: 'KFFKJ202601',
    title: '国网客服中心2026年第一次服务竞争性谈判框架采购', 
    category: '信通类', 
    type: '服务',
    publishDate: '2024-10-24', 
    deadline: '2026-02-10 16:00:00', 
    openingTime: '2026-03-09 09:00:00',
    openingLocation: '远程线上开标',
    purchaser: '国家电网有限公司客户服务中心',
    status: '正在采购', 
    budget: '框架采购',
    subPackages: [
      { 
        id: '1-1', 
        index: 1,
        subBidNumber: 'KFFKJ202601-01',
        subBidName: '呼叫中心运维分标',
        lotNumber: '包1',
        lotName: '业务支撑系统运维服务',
        scope: '负责国网客服中心北方园区业务支撑系统的日常巡检、故障排查、系统优化及重大节日保障。',
        qualifications: '具备ITSS三级及以上资质；具备高新技术企业证书。',
        experience: '近三年至少具有2个省级及以上电力公司呼叫中心运维类业绩。',
        personnel: '项目经理需具备PMP认证，技术团队不少于10人且具备相关技术认证。',
        duration: '365日历天',
        location: '天津市东丽区国网客服中心北方园区',
        maxPrice: '220.00',
        estAmount: '200.00',
        quoteMethod: '总价报折扣'
      },
      { 
        id: '1-2', 
        index: 2,
        subBidNumber: 'KFFKJ202601-02',
        subBidName: '软件辅助开发分标',
        lotNumber: '包2',
        lotName: '呼叫中心座席辅助软件开发',
        scope: '开发座席侧自动化辅助脚本，集成语义分析引擎，提升首接负责率。',
        qualifications: '具备CMMI3及以上资质；具备软件企业证书。',
        experience: '近三年具有类似座席辅助软件或AI集成开发业绩。',
        personnel: '核心开发人员需具备5年以上Java或Python开发经验。',
        duration: '180日历天',
        location: '远程开发+现场实施',
        maxPrice: '160.00',
        estAmount: '150.00',
        quoteMethod: '总价报固定单价'
      }
    ]
  },
  { 
    id: '2', 
    projectId: 'SGCC-JZ-2024-05',
    title: '国网江苏电力2024年通信终端运维服务采购项目', 
    category: '信通类', 
    type: '服务',
    publishDate: '2024-10-21', 
    deadline: '2024-11-10 10:00:00', 
    openingTime: '2024-11-11 14:00:00',
    openingLocation: '江苏省南京市鼓楼区南京饭店',
    purchaser: '国网江苏省电力有限公司',
    status: '正在采购', 
    budget: '450万元',
    subPackages: [
      { 
        id: '2-1', 
        index: 1,
        subBidNumber: 'JS-2024-COMM-01',
        subBidName: '苏南运维分标',
        lotNumber: '包1',
        lotName: '苏南地区终端维护',
        scope: '南京、苏州、无锡等地区的通信终端日常维护与备品备件管理。',
        qualifications: '通信工程施工总承包三级及以上资质。',
        experience: '具有地市级电力公司通信专业运维经验。',
        personnel: '驻场工程师不少于5名，需持电工证上岗。',
        duration: '12个月',
        location: '苏南各市供电公司',
        maxPrice: '260.00',
        estAmount: '250.00',
        quoteMethod: '年费总价承包'
      }
    ]
  }
];

interface CrawlerViewProps {
  plannedIds: string[];
  onTogglePlan: (tender: any) => void;
  onAddLog: (log: Omit<SystemLog, 'id'>) => void;
}

const CrawlerView: React.FC<CrawlerViewProps> = ({ plannedIds, onTogglePlan, onAddLog }) => {
  const [isCrawling, setIsCrawling] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  const startCrawl = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setIsCrawling(false);
      onAddLog({
        timestamp: new Date().toLocaleString(),
        level: 'info',
        category: 'crawler',
        operator: 'System',
        action: '同步成功',
        details: '同步最新招标信息成功',
        ip: '10.0.8.24'
      });
    }, 1500);
  };

  const handleToggleLot = (tender: Tender, pkg: SubPackage) => {
    const lotId = `${tender.id}_lot_${pkg.id}`;
    const taskPayload = {
      ...tender,
      id: lotId,
      lotName: pkg.lotName
    };
    onTogglePlan(taskPayload);
  };

  return (
    <div className="space-y-6 relative h-full">
      {/* 分包详情侧边栏 - 重新设计 */}
      {selectedTender && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTender(null)} />
          <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md sticky top-0 z-10 text-left">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                  <Layers size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg uppercase tracking-widest">{selectedTender.projectId}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{selectedTender.type}项目</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">{selectedTender.title}</h3>
                </div>
              </div>
              <button onClick={() => setSelectedTender(null)} className="p-3 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar-main bg-slate-50/30">
              {selectedTender.subPackages && selectedTender.subPackages.length > 0 ? (
                selectedTender.subPackages.map((pkg, idx) => {
                  const isPlanned = plannedIds.includes(`${selectedTender.id}_lot_${pkg.id}`);
                  return (
                    <div key={pkg.id} className={`bg-white rounded-[32px] border-2 transition-all overflow-hidden flex flex-col shadow-sm ${
                      isPlanned ? 'border-blue-600 shadow-xl shadow-blue-50' : 'border-slate-100 hover:border-blue-200'
                    }`}>
                      {/* 包头 */}
                      <div className={`px-8 py-5 flex items-center justify-between ${isPlanned ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                        <div className="flex items-center space-x-4">
                          <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg">{pkg.index}</span>
                          <div className="text-left">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Sub-Package Entity</p>
                            <h4 className="text-lg font-black tracking-tight">{pkg.lotNumber}：{pkg.lotName}</h4>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleToggleLot(selectedTender, pkg)}
                          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${
                            isPlanned ? 'bg-white text-blue-600 shadow-lg' : 'bg-blue-600 text-white hover:bg-blue-500'
                          }`}
                        >
                          {isPlanned ? <><CircleCheck size={14} className="mr-2" /> 已加入计划</> : <><Plus size={14} className="mr-2" /> 投标此包</>}
                        </button>
                      </div>

                      {/* 包详细字段网格 */}
                      <div className="p-8 space-y-8 text-left">
                        {/* 基础编号区 */}
                        <div className="grid grid-cols-2 gap-8 border-b border-slate-50 pb-8">
                           <div className="space-y-1.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><ClipboardList size={12} className="mr-1.5" /> 分标编号</p>
                              <p className="text-sm font-bold text-slate-800 italic">{pkg.subBidNumber}</p>
                           </div>
                           <div className="space-y-1.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><FileText size={12} className="mr-1.5" /> 分标名称</p>
                              <p className="text-sm font-bold text-slate-800 italic">{pkg.subBidName}</p>
                           </div>
                        </div>

                        {/* 概况大字段 */}
                        <div className="space-y-3">
                           <p className="text-[10px] font-black text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full uppercase tracking-widest italic">项目概况与招标范围</p>
                           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                             <p className="text-sm text-slate-600 leading-relaxed font-medium">{pkg.scope}</p>
                           </div>
                        </div>

                        {/* 三大要求核心区 */}
                        <div className="grid grid-cols-1 gap-6">
                           <div className="flex space-x-6 items-start">
                              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100"><ShieldCheck size={20} /></div>
                              <div className="flex-1 pt-1">
                                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1.5 italic">资质要求 (Qualifications)</p>
                                 <p className="text-xs text-slate-500 leading-relaxed font-medium">{pkg.qualifications}</p>
                              </div>
                           </div>
                           <div className="flex space-x-6 items-start">
                              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-100"><Award size={20} /></div>
                              <div className="flex-1 pt-1">
                                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1.5 italic">业绩要求 (Experiences)</p>
                                 <p className="text-xs text-slate-500 leading-relaxed font-medium">{pkg.experience}</p>
                              </div>
                           </div>
                           <div className="flex space-x-6 items-start">
                              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 border border-purple-100"><Users2 size={20} /></div>
                              <div className="flex-1 pt-1">
                                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1.5 italic">人员要求 (Personnel)</p>
                                 <p className="text-xs text-slate-500 leading-relaxed font-medium">{pkg.personnel}</p>
                              </div>
                           </div>
                        </div>

                        {/* 实施与工期 */}
                        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                           <div className="space-y-1.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><CalendarDays size={12} className="mr-1.5" /> 工期 / 服务期</p>
                              <p className="text-sm font-bold text-slate-800">{pkg.duration}</p>
                           </div>
                           <div className="space-y-1.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><MapPin size={12} className="mr-1.5" /> 实施地点</p>
                              <p className="text-sm font-bold text-slate-800">{pkg.location}</p>
                           </div>
                        </div>

                        {/* 金额与报价 - 强弱对比 */}
                        <div className="grid grid-cols-3 gap-6 pt-8 mt-2">
                           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1.5 italic">最高限价</p>
                              <div className="flex items-baseline space-x-1">
                                 <span className="text-lg font-black text-slate-900">{pkg.maxPrice}</span>
                                 <span className="text-[9px] font-bold text-slate-400">万元</span>
                              </div>
                           </div>
                           <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                              <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter mb-1.5 italic">预计采购金额</p>
                              <div className="flex items-baseline space-x-1">
                                 <span className="text-lg font-black text-blue-700">{pkg.estAmount}</span>
                                 <span className="text-[9px] font-bold text-blue-400">万元</span>
                              </div>
                           </div>
                           <div className="bg-slate-900 p-4 rounded-2xl shadow-inner">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1.5 italic">报价方式</p>
                              <p className="text-xs font-black text-white italic truncate">{pkg.quoteMethod}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-20 italic">
                  <WifiOff size={64} strokeWidth={1} />
                  <p className="text-sm font-black uppercase tracking-[0.4em] mt-6">No Sub-packages Analyzed</p>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-white sticky bottom-0 z-10 flex space-x-4">
              <button className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200 shadow-inner">
                <ArrowUpRight size={18} className="mr-3 opacity-50" /> 导出本页解析结果
              </button>
              <button className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center hover:bg-black transition-all shadow-2xl shadow-slate-200 group">
                <Download size={18} className="mr-3 group-hover:translate-y-0.5 transition-transform" /> 下载原始招标文件全量包 (.zip)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-left">
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100">
             <SearchIcon size={24} />
           </div>
           <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">招标抓取与深度解析</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">Automated synchronization with grid portal & lot granularity analysis</p>
          </div>
        </div>
        <button 
          onClick={startCrawl}
          disabled={isCrawling}
          className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl flex items-center transition-all disabled:opacity-50 shadow-2xl shadow-slate-200 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black active:scale-95"
        >
          <RefreshCcw size={18} className={`mr-3 ${isCrawling ? 'animate-spin' : ''}`} />
          {isCrawling ? '同步中' : '全网同步'}
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[600px]">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex-1 max-w-md relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input type="text" placeholder="快速定位采购项目..." className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-slate-100 bg-white focus:outline-none focus:border-blue-600 transition-all font-bold text-sm" />
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                API Engine Online
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">状态 / 编号</th>
                <th className="px-10 py-6">采购项目名称</th>
                <th className="px-10 py-6">时间节点</th>
                <th className="px-10 py-6 text-right">操作控制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-left">
              {mockTenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                       <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase bg-blue-100 text-blue-700 w-fit mb-3 italic tracking-widest">{tender.status}</span>
                       <p className="text-xs font-mono font-black text-slate-300 uppercase tracking-tighter">{tender.projectId}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 max-w-lg">
                    <div className="space-y-1.5">
                      <p className="font-black text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors italic truncate">{tender.title}</p>
                      <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">
                         <span className="flex items-center"><Building2 size={12} className="mr-1.5" /> {tender.purchaser}</span>
                         <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                         <span className="flex items-center"><Layers size={12} className="mr-1.5" /> {tender.subPackages?.length || 0} 个分包已析出</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-2">
                       <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          <Clock size={12} className="mr-2 opacity-30" /> 截止: <span className="ml-2 text-slate-600">{tender.deadline}</span>
                       </div>
                       <div className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                          <ExternalLink size={12} className="mr-2 opacity-50" /> 开启: <span className="ml-2">{tender.openingTime}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => setSelectedTender(tender)} 
                      className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                    >
                      查看分包清单 <ChevronRight size={14} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrawlerView;
