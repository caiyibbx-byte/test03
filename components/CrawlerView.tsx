
import React, { useState, useEffect } from 'react';
import { 
  Download, 
  RefreshCcw, 
  Eye, 
  FileText, 
  CircleCheckBig, 
  AlertCircle, 
  PlusCircle, 
  CircleCheck,
  TriangleAlert,
  X,
  Search as SearchIcon,
  WifiOff
} from 'lucide-react';
import { Tender, SystemLog } from '../types';

const mockTenders: Tender[] = [
  { id: '1', title: '国家电网2024年变电站自动化设备第一次招标', category: '变电类', publishDate: '2024-10-20', deadline: '2024-11-05', status: 'analyzed', budget: '1,200万元' },
  { id: '2', title: '国网江苏电力2024年通信终端运维服务采购', category: '信通类', publishDate: '2024-10-21', deadline: '2024-11-10', status: 'new', budget: '450万元' },
  { id: '3', title: '某地区供电局高压电缆改造EPC工程', category: '线路类', publishDate: '2024-10-22', deadline: '2024-11-15', status: 'processed', budget: '2,800万元' },
  { id: '4', title: '2024年特高压直流换流站巡检机器人采购项目', category: '智能设备', publishDate: '2024-10-23', deadline: '2024-11-20', status: 'new', budget: '800万元' },
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

  const startCrawl = (forceError = false) => {
    setIsCrawling(true);
    setCrawlError(null);
    
    setTimeout(() => {
      const shouldFail = forceError || Math.random() > 0.4; // 增加失败几率以便测试
      
      if (shouldFail) {
        const error = { message: "南网公共服务平台接口响应超时 (Timeout 5000ms)", code: "ERR_TIMEOUT_002" };
        setCrawlError(error);
        setShowToast(true);
        
        // 关键：向全局日志系统写入错误
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'error',
          category: 'crawler',
          operator: 'System_Scheduler',
          action: '同步失败',
          details: `数据源同步中断: 南方电网电子商务平台 (${error.code}) - 自动触发报警`,
          ip: '10.0.8.24'
        });
      } else {
        setCrawlError(null);
        // 成功时也可以记录日志
        onAddLog({
          timestamp: new Date().toLocaleString(),
          level: 'info',
          category: 'crawler',
          operator: 'System_Scheduler',
          action: '同步成功',
          details: '成功同步 4 条最新的招标信息',
          ip: '10.0.8.24'
        });
      }
      setIsCrawling(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 relative">
      {/* 失败提醒 Toast */}
      {showToast && crawlError && (
        <div className="fixed top-20 right-8 z-[100] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-white border-l-4 border-red-500 shadow-2xl rounded-xl p-4 flex items-start space-x-4 min-w-[360px]">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
              <TriangleAlert size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">抓取同步异常</h4>
              <p className="text-xs text-slate-500 mt-1">{crawlError.message}</p>
              <div className="flex space-x-3 mt-3">
                <button 
                  onClick={() => startCrawl(false)}
                  className="text-[10px] font-bold text-red-600 hover:text-red-700 underline"
                >
                  立即重试
                </button>
                <button 
                  onClick={() => setShowToast(false)}
                  className="text-[10px] font-bold text-slate-400"
                >
                  忽略
                </button>
              </div>
            </div>
            <button onClick={() => setShowToast(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">招标抓取与解析</h2>
          <p className="text-slate-500">自动同步国网、南网等门户招标信息，深度解析招标文件。</p>
        </div>
        <div className="flex space-x-3">
          {crawlError && (
             <div className="flex items-center px-3 py-1 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs animate-pulse">
                <WifiOff size={14} className="mr-2" />
                最近同步失败: {crawlError.code}
             </div>
          )}
          <button 
            onClick={() => startCrawl()}
            disabled={isCrawling}
            className={`${
              crawlError ? 'bg-red-600 hover:bg-red-700 shadow-red-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
            } text-white px-5 py-2.5 rounded-xl flex items-center transition-all disabled:opacity-50 shadow-lg font-bold text-sm`}
          >
            <RefreshCcw size={18} className={`mr-2 ${isCrawling ? 'animate-spin' : ''}`} />
            {isCrawling ? '正在抓取同步...' : crawlError ? '重新尝试同步' : '立即同步数据'}
          </button>
        </div>
      </div>

      {/* 状态异常看板 (仅在有错误时显示) */}
      {crawlError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
               <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-red-900">数据源接入中断</h3>
              <p className="text-sm text-red-700/80">检测到与“南方电网电子商务平台”的通信链路异常，系统已自动计入系统日志并触发二级重试机制。</p>
            </div>
          </div>
          <button 
            onClick={() => startCrawl(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-200"
          >
            诊断连接并重试
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索项目名称、分类或编号..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>全部状态</option>
            <option>新发现</option>
            <option>已解析</option>
            <option>已处理</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="text-sm font-semibold text-slate-600 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">项目信息</th>
                <th className="px-6 py-4">分类/预算</th>
                <th className="px-6 py-4">时间节点</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTenders.map((tender) => {
                const isInPlan = plannedIds.includes(tender.id);
                return (
                  <tr key={tender.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800 line-clamp-1">{tender.title}</p>
                      <p className="text-xs text-slate-400 mt-1">项目编号: SGCC-2024-{tender.id}00X</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 mb-1">{tender.category}</span>
                      <p className="text-sm font-medium text-slate-700">{tender.budget}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500">发布: {tender.publishDate}</p>
                      <p className="text-xs text-red-500 font-medium mt-1">截止: {tender.deadline}</p>
                    </td>
                    <td className="px-6 py-4">
                      {tender.status === 'new' && (
                        <span className="flex items-center text-blue-600 text-xs font-medium">
                          <AlertCircle size={14} className="mr-1" /> 待解析
                        </span>
                      )}
                      {tender.status === 'analyzed' && (
                        <span className="flex items-center text-emerald-600 text-xs font-medium">
                          <CircleCheckBig size={14} className="mr-1" /> 已解析
                        </span>
                      )}
                      {tender.status === 'processed' && (
                        <span className="flex items-center text-slate-500 text-xs font-medium">
                          <FileText size={14} className="mr-1" /> 已建档
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => onTogglePlan(tender)}
                          className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            isInPlan 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                              : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                          }`}
                        >
                          {isInPlan ? <CircleCheck size={14} className="mr-1.5" /> : <PlusCircle size={14} className="mr-1.5" />}
                          {isInPlan ? '已入计划' : '加入投标计划'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrawlerView;
