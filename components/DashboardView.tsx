
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, FileCheck, Users, Search } from 'lucide-react';

const data = [
  { name: '1月', 招标数: 400, 投标数: 240 },
  { name: '2月', 招标数: 300, 投标数: 139 },
  { name: '3月', 招标数: 200, 投标数: 980 },
  { name: '4月', 招标数: 278, 投标数: 390 },
  { name: '5月', 招标数: 189, 投标数: 480 },
  { name: '6月', 招标数: 239, 投标数: 380 },
];

const pieData = [
  { name: '变电类', value: 400 },
  { name: '线路类', value: 300 },
  { name: '信通类', value: 300 },
  { name: '综合类', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '今日爬取任务', value: '1,284', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '智能分析次数', value: '456', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '文书生成量', value: '89', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '库内可用专家', value: '12', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center hover:shadow-md transition-all text-left">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mr-4 shadow-inner`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-left">
          <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-blue-600" /> 招标趋势与投标转化
          </h3>
          <div className="h-80 text-left">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="招标数" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="投标数" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-left">
          <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight mb-6">项目类型分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4 text-left">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-bold text-slate-600 text-left">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="italic">{d.name}</span>
                </div>
                <span className="font-mono text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
