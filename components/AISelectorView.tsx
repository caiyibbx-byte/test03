
import React, { useState } from 'react';
import { Bot, MessageSquare, Send, Settings, Sparkles, Filter, ChevronRight, PlusCircle, CheckCircle } from 'lucide-react';

interface AISelectorViewProps {
  plannedIds: string[];
  onTogglePlan: (item: any) => void;
}

const AISelectorView: React.FC<AISelectorViewProps> = ({ plannedIds, onTogglePlan }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '你好！我是您的投标策略助手。今天新发现了4个电网招标项目，根据您预设的规则（预算>500万，高压相关，信通类），我已经为您初筛出2个重点候选。您需要详细分析哪个项目？' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', text: '正在重新评估过滤规则... 好的，已将“低压配电类”项目排除，并优先提升“江苏区域”项目的权重。当前候选集已更新，请查看右侧列表。' }]);
    }, 1000);
  };

  const candidates = [
    { id: 'ai-1', title: '特高压自动化系统扩建', match: 95, tag: '极高匹配', budget: '~1500万', category: '智能设备', publishDate: '2024-10-23', deadline: '2024-11-20', status: 'analyzed' as const },
    { id: 'ai-2', title: '苏通大桥跨江塔基维护', match: 82, tag: '高匹配', budget: '~450万', category: '线路类', publishDate: '2024-10-23', deadline: '2024-11-18', status: 'new' as const },
  ];

  return (
    <div className="flex h-[calc(100vh-200px)] space-x-6">
      {/* Rules & Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center text-blue-600 font-semibold">
            <Bot size={20} className="mr-2" />
            <span>策略筛选智能体</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="通过对话调整筛选规则，例如：排除施工类的项目..." 
              className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 p-2 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Set */}
      <div className="w-96 flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <Sparkles size={18} className="text-amber-500 mr-2" />
              今日建议候选
            </h3>
            <span className="text-xs text-slate-400">更新于 09:30</span>
          </div>
          <div className="space-y-3">
            {candidates.map((item, i) => {
              const isInPlan = plannedIds.includes(item.id);
              return (
                <div key={item.id} className="group p-3 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs font-bold text-blue-600">{item.match}%</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{item.title}</p>
                  <div className="mt-2 flex items-center text-xs text-slate-500 justify-between">
                    <span>预算: {item.budget}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  {/* Join Bidding Plan Button */}
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-end">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onTogglePlan(item); }}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isInPlan 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      }`}
                    >
                      {isInPlan ? (
                        <>
                          <CheckCircle size={14} className="mr-1.5" />
                          已入投标计划
                        </>
                      ) : (
                        <>
                          <PlusCircle size={14} className="mr-1.5" />
                          加入投标计划
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 shrink-0">
          <h3 className="font-bold flex items-center mb-4">
            <Filter size={18} className="text-slate-500 mr-2" />
            活跃规则集
          </h3>
          <div className="space-y-2">
            {[
              '区域限制: 江苏、浙江、安徽',
              '预算下限: 500,0000 CNY',
              '关键词排除: 房屋修缮, 绿化维护',
              '团队资质: 甲级设计资质',
            ].map((rule, i) => (
              <div key={i} className="flex items-center text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                {rule}
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            编辑高级规则
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISelectorView;
