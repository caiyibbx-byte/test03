
import React, { useState } from 'react';
import { 
  Settings, 
  Image, 
  FileJson, 
  Cpu, 
  TriangleAlert, 
  Save, 
  RotateCcw, 
  Play, 
  History, 
  Upload,
  CircleCheckBig,
  ChevronDown
} from 'lucide-react';

const ConfigSection: React.FC<{ title: string; icon: any; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center space-x-2">
      <Icon size={18} className="text-blue-600" />
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InputField: React.FC<{ label: string; description?: string; type?: string; defaultValue?: string; unit?: string }> = ({ label, description, type = "text", defaultValue, unit }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700 block">{label}</label>
    {description && <p className="text-xs text-slate-500 mb-2">{description}</p>}
    <div className="relative">
      <input 
        type={type} 
        defaultValue={defaultValue}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12" 
      />
      {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">{unit}</span>}
    </div>
  </div>
);

const SelectField: React.FC<{ label: string; options: string[]; defaultValue?: string }> = ({ label, options, defaultValue }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700 block">{label}</label>
    <div className="relative">
      <select 
        defaultValue={defaultValue}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
      >
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

const AgentConfigView: React.FC = () => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">智能体运行参数配置</h2>
          <p className="text-slate-500">深度调优招标抓取、解析与文书生成的底层逻辑参数。</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <RotateCcw size={18} className="mr-2" /> 恢复默认
          </button>
          <button className="flex items-center px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Play size={18} className="mr-2" /> 预览生效
          </button>
          <button 
            onClick={handleSave}
            className={`flex items-center px-6 py-2 rounded-lg font-bold transition-all shadow-sm ${
              saveStatus === 'success' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saveStatus === 'saving' ? <RotateCcw size={18} className="mr-2 animate-spin" /> : 
             saveStatus === 'success' ? <CircleCheckBig size={18} className="mr-2" /> : 
             <Save size={18} className="mr-2" />}
            {saveStatus === 'success' ? '保存成功' : '保存配置'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ConfigSection title="基础参数配置" icon={Settings}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="单次解析文件上限" defaultValue="50" unit="个" />
              <InputField label="单个文件大小限制" defaultValue="100" unit="MB" />
              <InputField label="解析超时阈值" defaultValue="300" unit="秒" />
              <InputField label="自动重试次数" defaultValue="3" unit="次" />
              <SelectField label="数据保存时长" options={['3个月', '6个月', '12个月', '永久']} defaultValue="6个月" />
            </div>
          </ConfigSection>

          <ConfigSection title="图片处理配置" icon={Image}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">图片存储根路径</label>
                <div className="flex space-x-2">
                  <input className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" defaultValue="/data/gridbid/assets/images" />
                  <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50">校验路径</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <SelectField label="图片备份频率" options={['每日', '每周', '每月']} defaultValue="每周" />
                <InputField label="图片识别超时阈值" defaultValue="30" unit="秒" />
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="风险预警参数" icon={TriangleAlert}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="废标条款风险阈值" defaultValue="0.75" description="AI评估风险概率超过此值将强提醒" />
              <SelectField label="风险提示触发方式" options={['实时弹窗', '消息中心', '每日摘要', '强交互确认']} defaultValue="实时弹窗" />
            </div>
          </ConfigSection>
        </div>

        <div className="space-y-6">
          <ConfigSection title="MD 文档配置" icon={FileJson}>
            <div className="space-y-4">
              <SelectField label="默认模板选择" options={['通用模板', '电力行业模板', '建筑行业模板', 'IT 服务行业模板']} defaultValue="电力行业模板" />
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center space-y-2 hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
                <Upload size={24} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">上传自定义 Markdown 模板 (.md)</span>
                <span className="text-xs text-slate-400">支持拖拽或点击上传</span>
              </div>
              <InputField label="文档生成超时阈值" defaultValue="60" unit="秒" />
            </div>
          </ConfigSection>

          <ConfigSection title="大模型核心参数" icon={Cpu}>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="核心信息提取阈值" defaultValue="0.85" description="提取置信度低于此值时转人工确认" />
              <SelectField label="行业模型选择" options={['GridGPT-4.0 (电网专版)', 'Universal-Pro-v2', 'Fast-Lite-v3']} defaultValue="GridGPT-4.0 (电网专版)" />
              <InputField label="批量处理并发数" defaultValue="8" unit="路" />
            </div>
          </ConfigSection>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History size={18} className="text-slate-600" />
            <h3 className="font-bold text-slate-800">配置历史记录</h3>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">查看全量审计日志</button>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs font-semibold text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3">版本</th>
              <th className="px-6 py-3">配置人</th>
              <th className="px-6 py-3">时间</th>
              <th className="px-6 py-3">变更内容摘要</th>
              <th className="px-6 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { v: 'v2.4.1', user: '张工 (系统管理员)', time: '2024-10-24 09:30', changes: '优化了电力行业模板，调整识别阈值从0.8至0.85' },
              { v: 'v2.4.0', user: '李工 (架构师)', time: '2024-10-20 14:15', changes: '切换核心模型至 GridGPT-4.0，并发数提升至8' },
              { v: 'v2.3.9', user: '张工 (系统管理员)', time: '2024-10-15 11:00', changes: '更新图片存储根路径为NAS挂载点' },
            ].map((log, i) => (
              <tr key={i} className="text-sm hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{log.v}</td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4 text-slate-500">{log.time}</td>
                <td className="px-6 py-4 text-slate-600 line-clamp-1">{log.changes}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline">查看</button>
                  <button className="text-slate-400 hover:text-red-600">回滚</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentConfigView;
