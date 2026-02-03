
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
  Info
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
  onTogglePlan: (tender: Tender) => void;
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
        const error = { message: "南网公共服务平台接口响应超时 (Timeout 5000ms)", code: "ERR_TIMEOUT_002" };
        setCrawlError(error);
        setShowToast(true);
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'error',
          category: 'crawler',
          operator: 'System_Scheduler',
          action: '同步失败',
          details: `数据源同步中断: 南方电网电子商务平台 (${error.code})`,
          ip: '10.0.8.24'
        });
      } else {
        setCrawlError(null);
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'info',
          category: 'crawler',
          operator: 'System_Scheduler',
          action: '同步成功',
          details: '成功同步最新的招标信息',
          ip: '10.0.8.24'
        });
      }
      setIsCrawling(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 relative h-full">
      {/* 详情抽屉 (Detail Drawer) */}
      {selectedTender && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTender(null)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest">{selectedTender.projectId}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedTender.title}</h3>
              </div>
              <button onClick={() => setSelectedTender(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* 基本概况 */}
              <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                  <Info size={14} className="mr-2" /> 项目概况
                </h4>
                <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
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

              {/* 分包信息 */}
              <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                  <Layers size={14} className="mr-2" /> 分包详情 (Lots)
                </h4>
                {selectedTender.subPackages && selectedTender.subPackages.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTender.subPackages.map(pkg => (
                      <div key={pkg.id} className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-bold text-slate-800">{pkg.name}</p>
                          <span className="text-xs font-bold text-blue-600">{pkg.budget}</span>
                        </div>
                        {pkg.requirement && (
                          <p className="text-xs text-slate-500 bg-slate-100 p-2 rounded mt-2 border-l-2 border-slate-300">
                            资格要求：{pkg.requirement}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-400">该项目无具体分包信息或尚未发布</p>
                  </div>
                )}
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white flex space-x-4">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                <Download size={18} className="mr-2" /> 下载整套招标文件
              </button>
              <button 
                onClick={() => onTogglePlan(selectedTender)}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center transition-all ${
                  plannedIds.includes(selectedTender.id) 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {plannedIds.includes(selectedTender.id) ? <CircleCheck size={18} className="mr-2" /> : <PlusCircle size={18} className="mr-2" />}
                {plannedIds.includes(selectedTender.id) ? '已在投标计划中' : '加入投标计划'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 失败提醒 Toast */}
      {showToast && crawlError && (
        <div className="fixed top-20 right-8 z-[120] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-white border-l-4 border-red-500 shadow-2xl rounded-xl p-4 flex items-start space-x-4 min-w-[360px]">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
              <TriangleAlert size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">同步任务异常</h4>
              <p className="text-xs text-slate-500 mt-1">{crawlError.message}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-slate-300 hover:text-slate-500">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">招标抓取与深度解析</h2>
          <p className="text-slate-500">自动实时同步国家电网、南方电网及关联省公司招标门户。</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => startCrawl()}
            disabled={isCrawling}
            className={`${
              crawlError ? 'bg-red-600' : 'bg-blue-600'
            } text-white px-5 py-2.5 rounded-xl flex items-center transition-all disabled:opacity-50 shadow-lg font-bold text-sm`}
          >
            <RefreshCcw size={18} className={`mr-2 ${isCrawling ? 'animate-spin' : ''}`} />
            {isCrawling ? '正在同步数据...' : '立即同步数据'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索项目名称、编号或采购人..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="flex space-x-2">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">所有类型</button>
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 text-blue-600 border-blue-100 bg-blue-50/30">正在采购</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">状态/编号</th>
                <th className="px-6 py-4">采购项目名称/类型</th>
                <th className="px-6 py-4">关键时间节点</th>
                <th className="px-6 py-4">采购人/地点</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 mb-2">
                      {tender.status}
                    </span>
                    <p className="text-[11px] font-mono text-slate-400 font-bold">{tender.projectId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 max-w-md">
                      {tender.title}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 font-bold">{tender.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                       <div className="flex items-center text-[11px] text-slate-500">
                         <span className="w-16">文件截止:</span>
                         <span className="font-medium text-slate-700">{tender.deadline}</span>
                       </div>
                       <div className="flex items-center text-[11px] text-slate-500">
                         <span className="w-16">开启时间:</span>
                         <span className="font-bold text-blue-600">{tender.openingTime}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                       <div className="flex items-center text-[11px] text-slate-500">
                         <Building2 size={12} className="mr-1.5 shrink-0" />
                         <span className="truncate max-w-[180px]">{tender.purchaser}</span>
                       </div>
                       <div className="flex items-center text-[11px] text-slate-500">
                         <MapPin size={12} className="mr-1.5 shrink-0" />
                         <span className="truncate max-w-[180px]">{tender.openingLocation}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setSelectedTender(tender)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-100 flex items-center"
                      >
                        查看分包/详情 <ChevronRight size={14} className="ml-1" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="外部原始链接"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
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
