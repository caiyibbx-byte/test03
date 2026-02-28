
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
  const [subPackageSearch, setSubPackageSearch] = useState('');

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
          <div className="relative w-full max-w-[95vw] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
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
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                    {selectedTender.title}
                    <span className="ml-3 text-xs font-bold text-slate-400">共 {selectedTender.subPackages?.length || 0} 个标包</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={14} />
                  <input 
                    type="text" 
                    placeholder="搜索标包内容..." 
                    value={subPackageSearch}
                    onChange={(e) => setSubPackageSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                  />
                </div>
                <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest italic">
                  <Info size={14} className="mr-2" /> Excel 视图模式已开启
                </div>
                <button onClick={() => setSelectedTender(null)} className="p-3 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-0 custom-scrollbar-main bg-slate-50">
              {selectedTender.subPackages && selectedTender.subPackages.length > 0 ? (
                <div className="min-w-max">
                  <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="sticky top-0 z-30 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="sticky left-0 z-40 bg-slate-100 w-16 px-4 py-4 border-b border-r border-slate-200 text-center">序号</th>
                        <th className="sticky left-16 z-40 bg-slate-100 w-40 px-4 py-4 border-b border-r border-slate-200">操作</th>
                        <th className="w-48 px-4 py-4 border-b border-r border-slate-200">分标编号</th>
                        <th className="w-60 px-4 py-4 border-b border-r border-slate-200">分标名称</th>
                        <th className="w-24 px-4 py-4 border-b border-r border-slate-200">包号</th>
                        <th className="w-64 px-4 py-4 border-b border-r border-slate-200">包名称</th>
                        <th className="w-96 px-4 py-4 border-b border-r border-slate-200">招标范围</th>
                        <th className="w-80 px-4 py-4 border-b border-r border-slate-200">资质要求</th>
                        <th className="w-80 px-4 py-4 border-b border-r border-slate-200">业绩要求</th>
                        <th className="w-80 px-4 py-4 border-b border-r border-slate-200">人员要求</th>
                        <th className="w-32 px-4 py-4 border-b border-r border-slate-200">工期</th>
                        <th className="w-48 px-4 py-4 border-b border-r border-slate-200">实施地点</th>
                        <th className="w-32 px-4 py-4 border-b border-r border-slate-200">最高限价(万)</th>
                        <th className="w-32 px-4 py-4 border-b border-r border-slate-200">预计金额(万)</th>
                        <th className="w-40 px-4 py-4 border-b border-slate-200">报价方式</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {selectedTender.subPackages
                        .filter(pkg => {
                          const s = subPackageSearch.toLowerCase();
                          return pkg.lotName.toLowerCase().includes(s) || 
                                 pkg.subBidName.toLowerCase().includes(s) ||
                                 pkg.scope.toLowerCase().includes(s);
                        })
                        .map((pkg, idx) => {
                          const isPlanned = plannedIds.includes(`${selectedTender.id}_lot_${pkg.id}`);
                          return (
                            <tr key={pkg.id} className={`group transition-colors ${isPlanned ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                              <td className="sticky left-0 z-20 bg-inherit px-4 py-4 border-r border-b border-slate-100 text-center font-mono text-xs font-bold text-slate-400">{pkg.index}</td>
                              <td className="sticky left-16 z-20 bg-inherit px-4 py-4 border-r border-b border-slate-100">
                                <button 
                                  onClick={() => handleToggleLot(selectedTender, pkg)}
                                  className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${
                                    isPlanned ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600'
                                  }`}
                                >
                                  {isPlanned ? <CircleCheck size={12} className="mr-1.5" /> : <Plus size={12} className="mr-1.5" />}
                                  {isPlanned ? '已加入' : '投标此包'}
                                </button>
                              </td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-600 italic">{pkg.subBidNumber}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-800">{pkg.subBidName}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-black text-blue-600">{pkg.lotNumber}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-black text-slate-900">{pkg.lotName}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-w-none">{pkg.scope}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{pkg.qualifications}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{pkg.experience}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{pkg.personnel}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-700">{pkg.duration}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-700">{pkg.location}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-sm font-black text-slate-900">{pkg.maxPrice}</td>
                              <td className="px-4 py-4 border-r border-b border-slate-100 text-sm font-black text-blue-600">{pkg.estAmount}</td>
                              <td className="px-4 py-4 border-b border-slate-100 text-xs font-bold text-slate-500 italic">{pkg.quoteMethod}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
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
