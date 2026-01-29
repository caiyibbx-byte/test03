
import React, { useState } from 'react';
import { 
  Users, Award, FileText, CheckCircle, ChevronRight, BrainCircuit, 
  RotateCw, Wand2, Download, Save, MessageSquare
} from 'lucide-react';

const BidWorkspaceView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const nextStep = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(step + 1);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      {/* Workflow Steps */}
      <div className="flex items-center justify-between bg-white px-8 py-4 rounded-xl border border-slate-200 shadow-sm">
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
              {step > s.id ? <CheckCircle size={18} /> : s.id}
            </div>
            <span className={`ml-2 text-sm font-medium ${step >= s.id ? 'text-slate-900' : 'text-slate-400'}`}>
              {s.label}
            </span>
            {s.id < 4 && <ChevronRight className="mx-6 text-slate-300" size={16} />}
          </div>
        ))}
      </div>

      {/* Workspace Area */}
      <div className="flex-1 flex space-x-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {step === 1 && (
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <BrainCircuit className="text-blue-600 mr-2" size={24} />
                    项目负责人与团队建议
                  </h3>
                  <p className="text-slate-500">已深度解析招标文件，基于人员资质与过往业绩相关度给出以下匹配：</p>
                </div>
                <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
                  <RotateCw size={14} className="mr-1" /> 重新匹配
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-blue-500 bg-blue-50/50 p-6 rounded-xl relative">
                  <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">推荐负责人</div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">张</div>
                    <div>
                      <p className="font-bold text-lg">张工 (高级项目经理)</p>
                      <p className="text-sm text-blue-600">匹配得分: 98/100</p>
                    </div>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2 mb-6">
                    <li className="flex items-start"><CheckCircle size={14} className="mt-0.5 mr-2 text-green-500" /> 拥有“220kV变电站”相关项目成功经验 5 次</li>
                    <li className="flex items-start"><CheckCircle size={14} className="mt-0.5 mr-2 text-green-500" /> 目前负载 30%，可全力投入本项目</li>
                    <li className="flex items-start"><CheckCircle size={14} className="mt-0.5 mr-2 text-green-500" /> 持有 PMP 及 高级职称，满足强制条款</li>
                  </ul>
                  <button className="w-full py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium">
                    确认此负责人
                  </button>
                </div>

                <div className="border border-slate-200 p-6 rounded-xl group hover:border-blue-300 transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xl font-bold mr-4">李</div>
                    <div>
                      <p className="font-bold text-lg">李工 (副总工)</p>
                      <p className="text-sm text-slate-500">匹配得分: 85/100</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">经验极丰富，但当前正在负责“苏通大桥维护”项目，建议作为技术支撑而非项目负责人。</p>
                  <button className="w-full py-2 border border-slate-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all font-medium">
                    手动指派此人
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-slate-700">技术建议书.docx</span>
                  <div className="flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Wand2 size={12} className="mr-1" /> AI 正在优化段落
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600"><Save size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-blue-600"><Download size={20} /></button>
                </div>
              </div>
              <div className="flex-1 p-10 overflow-y-auto font-serif text-slate-800 leading-relaxed bg-slate-50">
                <div className="max-w-2xl mx-auto bg-white p-12 shadow-sm border border-slate-100 rounded min-h-full">
                  <h1 className="text-2xl font-bold text-center mb-12">技术响应建议书</h1>
                  <section className="mb-8">
                    <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4">第一章 项目背景与理解</h2>
                    <p className="mb-4">根据招标文件[SGCC-2024-001]的要求，本项目旨在针对XX供电局下辖变电站进行自动化系统全面升级。我司深度理解电网公司对于电网运行安全性、可靠性的极高要求...</p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded text-sm text-amber-800 italic flex">
                      <MessageSquare size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                      此处已结合招标文件第12页“核心诉求”部分进行了针对性改写。
                    </div>
                  </section>
                  <section className="mb-8">
                    <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4">第二章 技术方案架构</h2>
                    <p>我方建议采用“三层三网”架构，完全符合IEC 61850标准，并在以下几个关键节点进行创新提升：</p>
                    <ul className="list-disc ml-6 mt-4 space-y-2">
                      <li>智能辅助监控与生产系统的全深度融合...</li>
                      <li>基于5G/光纤双备份的通讯冗余方案...</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button 
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              上一步
            </button>
            <button 
              onClick={nextStep}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center transition-all"
            >
              {isGenerating ? <RotateCw className="animate-spin mr-2" size={18} /> : '下一步'}
            </button>
          </div>
        </div>

        {/* AI Co-pilot / Context */}
        <div className="w-80 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center">
            <Wand2 size={18} className="text-blue-400 mr-2" />
            <span className="font-bold">智能投标助手</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-slate-400 mb-2 font-semibold">关键风险预警</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                  招标文件要求提供“省部级以上科技进步奖”，目前库中匹配项仅1个。
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 mr-2"></div>
                  距离开标仅剩 12 天，文书编撰进度需加快。
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-900/50">
              <p className="text-blue-400 mb-2 font-semibold">建议干预</p>
              <p className="text-slate-300">是否需要我为您从人员库中挑选具备“电力系统及其自动化”硕士学位的辅助工程师？</p>
              <div className="mt-3 flex space-x-2">
                <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-500">确定</button>
                <button className="px-2 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600">忽略</button>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                placeholder="在此输入指令..." 
                className="w-full bg-slate-800 border-none rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1.5 text-blue-400"><MessageSquare size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidWorkspaceView;
