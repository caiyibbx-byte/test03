
import React, { useState } from 'react';
import { 
  FileSearch, 
  Sparkles, 
  Layers, 
  Settings2, 
  History, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  FileJson,
  Plus,
  Zap,
  Bot,
  RefreshCw,
  Library,
  BookOpenCheck,
  // Added LayoutTemplate import
  LayoutTemplate
} from 'lucide-react';

const TemplateConfigView: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const mockRequirements = [
    { id: 1, title: '技术响应表', detail: '需包含 500kV 变电站自动化协议支持说明', source: '招标文件' },
    { id: 2, title: '施工方案', detail: '需满足《电网建设安全规范 2024 版》', source: '行业规范' },
    { id: 3, title: '企业资质', detail: '必须提供甲级设计资质扫描件', source: '资质要求' }
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">投标文档模板配置</h2>
          <p className="text-slate-500">智能体自动解析招标文件核心要求，融合企业资产与行业规范生成定制模板。</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-slate-50 transition-colors">
            <History size={16} className="mr-2" /> 配置历史
          </button>
          <button 
            onClick={handleStartAnalysis}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            {isAnalyzing ? <RefreshCw size={18} className="mr-2 animate-spin" /> : <Bot size={18} className="mr-2" />}
            智能体启动解析
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input Sources */}
        <div className="space-y-6 lg:col-span-1">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <FileSearch size={16} className="mr-2 text-blue-500" /> 目标招标文件
            </h3>
            <div 
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedDoc ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 bg-slate-50/50'
              }`}
              onClick={() => setSelectedDoc("SGCC-2024-X.pdf")}
            >
              {selectedDoc ? (
                <div className="text-center">
                  <CheckCircle2 size={32} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">{selectedDoc}</p>
                  <p className="text-[10px] text-slate-400 mt-1">已就绪，等待智能体解析</p>
                </div>
              ) : (
                <div className="text-center">
                  <Plus size={32} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">上传/选择招标文件</p>
                  <p className="text-[10px] text-slate-400 mt-1">支持 PDF / Word / ZIP</p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <Layers size={16} className="mr-2 text-emerald-500" /> 关联企业与行业资产
            </h3>
            <div className="space-y-3">
              {[
                { label: '企业历史投标库', icon: Library, count: 12 },
                { label: '自建标准模板', icon: LayoutTemplate, count: 5 },
                { label: '电网行业规范集', icon: BookOpenCheck, count: 3 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <item.icon size={16} className="text-slate-400 group-hover:text-emerald-500 mr-3" />
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Middle & Right Column: Agent Processing & Result */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-1 mr-3">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                      <Zap size={14} className="text-white" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                      <Cpu size={14} className="text-white" />
                   </div>
                </div>
                <h4 className="text-sm font-bold text-white">智能体模板生成引擎</h4>
              </div>
              <div className="flex items-center space-x-2">
                 <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                    Agent Active
                 </span>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto custom-scrollbar-dark">
              {/* Requirement Extraction */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-px bg-slate-800 flex-1"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">招标文件核心需求提取</span>
                  <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mockRequirements.map(req => (
                    <div key={req.id} className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">{req.source}</span>
                        <Zap size={12} className="text-amber-500" />
                      </div>
                      <p className="text-xs font-bold text-slate-100">{req.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{req.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Construction Preview */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-px bg-slate-800 flex-1"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">定制化模板骨架生成预览</span>
                  <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                
                <div className="bg-white/5 border border-slate-700 rounded-2xl p-6 font-mono text-[11px] leading-relaxed">
                  <div className="text-blue-400 mb-2"># 投标文件技术响应部分 (适配项目: {selectedDoc || '未选择'})</div>
                  <div className="text-slate-300 ml-4">## 第一章: 变电站自动化协议支撑 (基于提取需求 #1)</div>
                  <div className="text-slate-500 ml-8 mb-4">/* 已从历史项目 p1, p3 自动迁移 IEC61850 响应方案 */</div>
                  
                  <div className="text-slate-300 ml-4">## 第二章: 施工组织方案 (遵循 {mockRequirements[1].detail})</div>
                  <div className="text-slate-500 ml-8 mb-4">/* 引用《电网建设安全规范 2024》第 4.2 节标准要求 */</div>
                  
                  <div className="text-slate-300 ml-4">## 第三章: 商务及资质文件汇编</div>
                  <div className="text-emerald-400 ml-8 animate-pulse">/* 正在自动匹配企业甲级设计资质扫描件... */</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
              <div className="flex items-center text-[10px] text-slate-500">
                <Sparkles size={12} className="mr-2 text-amber-500" />
                智能体置信度: 94% (模板高度合规)
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all">
                  手动调优结构
                </button>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center">
                  确认并保存模板 <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TemplateConfigView;
