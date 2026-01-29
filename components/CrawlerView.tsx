
import React, { useState } from 'react';
import { Download, RefreshCcw, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tender } from '../types';

const mockTenders: Tender[] = [
  { id: '1', title: '国家电网2024年变电站自动化设备第一次招标', category: '变电类', publishDate: '2024-10-20', deadline: '2024-11-05', status: 'analyzed', budget: '1,200万元' },
  { id: '2', title: '国网江苏电力2024年通信终端运维服务采购', category: '信通类', publishDate: '2024-10-21', deadline: '2024-11-10', status: 'new', budget: '450万元' },
  { id: '3', title: '某地区供电局高压电缆改造EPC工程', category: '线路类', publishDate: '2024-10-22', deadline: '2024-11-15', status: 'processed', budget: '2,800万元' },
  { id: '4', title: '2024年特高压直流换流站巡检机器人采购项目', category: '智能设备', publishDate: '2024-10-23', deadline: '2024-11-20', status: 'new', budget: '800万元' },
];

const CrawlerView: React.FC = () => {
  const [isCrawling, setIsCrawling] = useState(false);

  const startCrawl = () => {
    setIsCrawling(true);
    setTimeout(() => setIsCrawling(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">招标抓取与解析</h2>
          <p className="text-slate-500">自动同步国网、南网等门户招标信息，深度解析招标文件。</p>
        </div>
        <button 
          onClick={startCrawl}
          disabled={isCrawling}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all disabled:opacity-50"
        >
          <RefreshCcw size={18} className={`mr-2 ${isCrawling ? 'animate-spin' : ''}`} />
          {isCrawling ? '正在抓取同步...' : '立即同步数据'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
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

        <table className="w-full text-left">
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
            {mockTenders.map((tender) => (
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
                      <CheckCircle2 size={14} className="mr-1" /> 已解析
                    </span>
                  )}
                  {tender.status === 'processed' && (
                    <span className="flex items-center text-slate-500 text-xs font-medium">
                      <FileText size={14} className="mr-1" /> 已建档
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="解析报告">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="下载附件">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Search = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

export default CrawlerView;
