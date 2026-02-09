
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
  Plus
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
      { id: '1-1', name: '包1：业务支撑系统运维服务', budget: '200万/年', requirement: '需具备ITSS三级资质' },
      { id: '1-2', name: '包2：呼叫中心座席辅助软件开发', budget: '150万', requirement: '需具备CMMI3及以上资质' }
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
      { id: '2-1', name: '包1：苏南地区终端维护', budget: '250万' },
      { id: '2-2', name: '包2：苏北地区终端维护', budget: '200万' }
    ]
  },
  { 
    id: '3', 
    projectId: 'CSG-EP-2024-XX',
    title: '南网某地区供电局高压电缆改造EPC工程', 
    category: '线路类', 
    type: '施工',
    publishDate: '2024-10-22', 
    deadline: '2024-11-15 17:00:00', 
    openingTime: '2024-11-16 09:00:00',
    openingLocation: '南网阳光电子商务平台',
    purchaser: '广东电网有限责任公司',
    status: '正在采购', 
    budget: '2,800万元'
  },
];

interface CrawlerViewProps {
  plannedIds: string[];
  onTogglePlan: (tender: any) => void;
  onAddLog: (log: Omit<SystemLog, 'id'>) => void;
}

const CrawlerView: React.FC<CrawlerViewProps> = ({ plannedIds, onTogglePlan, onAddLog }) => {
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlError, setCrawlError] = useState<{ message: string; code: string } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  const startCrawl = (forceError = false) => {
    setIsCrawling(true);
    setCrawlError(null);
    
    setTimeout(() => {
      const shouldFail = forceError || Math.random() > 0.8;
      
      if (shouldFail) {
        const error = { message: "接口响应超时 (Timeout 5000ms)", code: "ERR_TIMEOUT_002" };
        setCrawlError(error);
        setShowToast(true);
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'error',
          category: 'crawler',
          operator: 'System',
          action: '同步失败',
          details: `同步中断 (${error.code})`,
          ip: '10.0.8.24'
        });
      } else {
        setCrawlError(null);
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'info',
          category: 'crawler',
          operator: 'System',
          action: '同步成功',
          details: '同步最新招标信息成功',
          ip: '10.0.8.24'
        });
      }
      setIsCrawling(false);
    }, 1500);
  };

  const handleToggleLot = (tender: Tender, pkg?: SubPackage) => {
    // 构建原子化的分包ID和任务载荷
    const lotId = pkg ? `${tender.id}_lot_${pkg.id}` : tender.id;
    
    const taskPayload = {
      ...tender,
      id: lotId,
      // 保持原始项目Title不变，通过lotName标识分包，便于在计划页展示二级名称
      lotName: pkg?.name || '整包投标'
    };
    
    onTogglePlan(taskPayload);
  };

  return (
    <div className="space-y-6 relative h-full">
      {selectedTender && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTender(null)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-left">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest">{selectedTender.projectId}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedTender.title}</h3>
              </div>
              <button onClick={() => setSelectedTender(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                  <Info size={14} className="mr-2" /> 项目概况
                </h4>
                <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left">
                  <div>
                    <p className="text-xs text-slate-400">采购人</p>
                    <p className="text-sm font-semibold text-slate-800 flex items-center mt-1">
                      <Building2 size={14} className="mr-2 text-slate-400" /> {selectedTender.purchaser}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">采购类型</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{selectedTender.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">开启时间</p>
                    <p className="text-sm font-semibold text-slate-800 flex items-center mt-1">
                      <Clock size={14} className="mr-2 text-slate-400" /> {selectedTender.openingTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">开启地点</p>
                    <p className="text-sm font-semibold text-slate-800 flex items-center mt-1">
                      <MapPin size={14} className="mr-2 text-slate-400" /> {selectedTender.openingLocation}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-4 text-left">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <Layers size={14} className="mr-2" /> 分包详情与指派
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded italic">分包是文书编撰的最小单位</span>
                </div>
                
                {selectedTender.subPackages && selectedTender.subPackages.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTender.subPackages.map(pkg => {
                      const isPlanned = plannedIds.includes(`${selectedTender.id}_lot_${pkg.id}`);
                      return (
                        <div key={pkg.id} className={`border rounded-2xl p-5 transition-all flex items-center justify-between group ${
                          isPlanned ? 'border-emerald-200 bg-emerald-50/30 shadow-inner' : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-md'
                        }`}>
                          <div className="flex-1 text-left pr-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-bold text-slate-800">{pkg.name}</p>
                              {isPlanned && <span className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-tighter"><CircleCheck size={10} className="mr-1" /> 已指派投标</span>}
                            </div>
                            <p className="text-xs text-blue-600 font-bold">{pkg.budget}</p>
                            {pkg.requirement && (
                              <p className="text-[11px] text-slate-500 mt-2 bg-slate-50/80 p-2 rounded-lg border-l-2 border-slate-200">
                                资格要求：{pkg.requirement}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleToggleLot(selectedTender, pkg)}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                              isPlanned 
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                            }`}
                          >
                            {isPlanned ? <CircleCheck size={24} /> : <Plus size={24} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`border rounded-2xl p-6 transition-all flex items-center justify-between ${
                    plannedIds.includes(selectedTender.id) ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-white'
                  }`}>
                    <div className="text-left">
                      <p className="font-bold text-slate-800">本项目为单一整体标包</p>
                      <p className="text-xs text-slate-400 mt-1">未检测到多标包划分，将以整包形式加入投标计划</p>
                      <p className="text-xs text-blue-600 font-bold mt-2">预算：{selectedTender.budget}</p>
                    </div>
                    <button 
                      onClick={() => handleToggleLot(selectedTender)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                        plannedIds.includes(selectedTender.id) 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                      }`}
                    >
                      {plannedIds.includes(selectedTender.id) ? <CircleCheck size={24} /> : <Plus size={24} />}
                    </button>
                  </div>
                )}
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-black transition-all">
                <Download size={18} className="mr-3" /> 下载整套招标文件 (.zip)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-left">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">招标抓取与深度解析</h2>
          <p className="text-slate-500 text-sm">自动同步各省电力公司招标门户，分包颗粒度解析。</p>
        </div>
        <button 
          onClick={() => startCrawl()}
          disabled={isCrawling}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center transition-all disabled:opacity-50 shadow-lg font-bold text-sm"
        >
          <RefreshCcw size={18} className={`mr-2 ${isCrawling ? 'animate-spin' : ''}`} />
          同步数据
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="搜索项目..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">状态/编号</th>
                <th className="px-6 py-4">采购项目名称</th>
                <th className="px-6 py-4">关键时间节点</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-left">
              {mockTenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 mb-2">{tender.status}</span>
                    <p className="text-[11px] font-mono text-slate-400">{tender.projectId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{tender.title}</p>
                    <span className="text-[10px] text-slate-400">{tender.purchaser}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px]">
                       <p className="text-slate-500">截止: {tender.deadline}</p>
                       <p className="font-bold text-blue-600">开启: {tender.openingTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setSelectedTender(tender)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                      分包详情 <ChevronRight size={14} className="ml-1 inline" />
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
