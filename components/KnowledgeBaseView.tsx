
import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  X, 
  Save, 
  UserCheck, 
  Edit3, 
  Trash2, 
  FileDown, 
  Download,
  Image as ImageIcon, 
  Building2, 
  ImagePlus, 
  Files, 
  Tag,
  Users2,
  ClipboardList,
  Coins,
  History,
  Upload,
  FileImage,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ProjectExperience } from '../types';

interface KnowledgeBaseViewProps {
  mode: 'projects' | 'personnel';
}

const initialProjects: ProjectExperience[] = [
  { 
    id: 'p1', 
    contractYear: '2021',
    index: 43,
    projectType: '6. 营销服务类',
    projectName: '海口供电局2021年客服满意度及优化营商环境宣传项目', 
    keywords: ['营商环境', '满意度'],
    extendedKeywords: ['宣传推广', '海报设计', '微电影'],
    content: '设计24节气及节日热点品宣海报；编制10期优化营商环境系列故事漫画；拍摄主题微电影、电力人宣传片；组织开展座谈会等。',
    signingDate: '2021-10',
    endDate: '2021-12',
    amount: '61.0',
    clientName: '海南电网有限责任公司海口供电局',
    clientAddress: '海南省海口市海甸岛五西路',
    contact: '张XX',
    phone: '186-0893-6460',
    remarks: '无明细（可按需填写）',
    location: '海南省海口市',
    contractStatus: '已完成',
    quality: '优',
    leader: '黄石亮',
    leaderExperience: '项目总负责，负责对接供电局营销部，统筹创意策划与成片交付，确保营商环境宣传任务按时保质完成。',
    members: '策划组(3人)、设计组(2人)、摄影团队',
    memberExperience: '负责24节气海报视觉设计、营商环境漫画脚本编写及现场拍摄协调。',
    contractScanUrls: [],
    invoiceUrls: [],
    invoiceVerifyUrls: []
  },
  { 
    id: 'p2', 
    contractYear: '2022',
    index: 44,
    projectType: '2. 变电站工程类',
    projectName: '广州供电局220kV天河站数字化改造EPC总承包项目', 
    keywords: ['变电站', '数字化改造'],
    extendedKeywords: ['EPC', '天河站', '自动化升级'],
    content: '负责天河变电站全站二次设备数字化升级，涵盖保护监控系统、智能辅助监控系统安装调试。',
    signingDate: '2022-03',
    endDate: '2022-12',
    amount: '1280.5',
    clientName: '广东电网有限责任公司广州供电局',
    clientAddress: '广州市天河区华穗路',
    contact: '陈经理',
    phone: '139-0221-XXXX',
    remarks: '大型EPC技改项目',
    location: '广东省广州市',
    contractStatus: '已完成',
    quality: '优',
    leader: '王志强',
    leaderExperience: '担任EPC项目经理，协调设计、采购及施工进度，成功解决旧站带电施工风险，实现全站数字化投运。',
    members: '工程部、技术支持中心、现场施工队',
    memberExperience: '负责二次接线工艺规范制定及智能终端配置参数核对。',
    contractScanUrls: [],
    invoiceUrls: [],
    invoiceVerifyUrls: []
  },
  { 
    id: 'p3', 
    contractYear: '2023',
    index: 45,
    projectType: '1. 技术服务类',
    projectName: '深圳供电局2023年输电线路无人机巡检算法外包服务', 
    keywords: ['无人机', 'AI巡检'],
    extendedKeywords: ['缺陷识别', '深度学习', '图像处理'],
    content: '开发针对输电线路典型缺陷（如鸟巢、销钉脱落、绝缘子破损）的AI自动识别模型，并提供年度巡检数据处理。',
    signingDate: '2023-01',
    endDate: '2023-12',
    amount: '185.0',
    clientName: '深圳供电局有限公司',
    clientAddress: '深圳市罗湖区深南东路',
    contact: '林主管',
    phone: '137-XXXX-XXXX',
    remarks: '纯算法研发类服务',
    location: '广东省深圳市',
    contractStatus: '履行中',
    quality: '合格',
    leader: '刘思源',
    leaderExperience: '技术负责人，主持深度学习模型训练与部署，实现识别准确率由80%提升至92%。',
    members: '算法研究小组(5人)、数据标注团队',
    memberExperience: '负责样本数据预处理及边缘计算侧的模型适配优化。',
    contractScanUrls: [],
    invoiceUrls: [],
    invoiceVerifyUrls: []
  },
  { 
    id: 'p4', 
    contractYear: '2020',
    index: 46,
    projectType: '6. 营销服务类',
    projectName: '海南电网三亚供电局2020年智慧营业厅建设及运营项目', 
    keywords: ['智慧营业厅', '办电终端'],
    extendedKeywords: ['三亚', '品牌升级', '自助服务'],
    content: '对三亚市区核心营业厅进行数字化改造，部署智能导览机器人、VR互动体验区及全自助办电业务终端。',
    signingDate: '2020-05',
    endDate: '2020-11',
    amount: '320.0',
    clientName: '海南电网有限责任公司三亚供电局',
    clientAddress: '三亚市吉阳区迎宾路',
    contact: '赵科长',
    phone: '189-XXXX-XXXX',
    remarks: '涉及软硬件集成及装修',
    location: '海南省三亚市',
    contractStatus: '已完成',
    quality: '优',
    leader: '吴海洋',
    leaderExperience: '项目总监，负责空间设计方案审核及智能化硬件集成的全过程管理，获评南网年度示范营业厅。',
    members: '设计室、集成部、三方运营公司',
    memberExperience: '负责交互流程设计及后台管理系统开发对接。',
    contractScanUrls: [],
    invoiceUrls: [],
    invoiceVerifyUrls: []
  },
  { 
    id: 'p5', 
    contractYear: '2021',
    index: 47,
    projectType: '1. 技术服务类',
    projectName: '海南电网公司电力调度中心网络安全态势感知运维', 
    keywords: ['网络安全', '态势感知'],
    extendedKeywords: ['等级保护', '调度安全', '实时审计'],
    content: '提供7x24小时网络安全监控、漏洞扫描、基线核查及应急演练服务，保障调度大楼内网资产安全。',
    signingDate: '2021-06',
    endDate: '2022-06',
    amount: '145.0',
    clientName: '海南电网有限责任公司',
    clientAddress: '海口市海府路',
    contact: '孙工',
    phone: '150-XXXX-XXXX',
    remarks: '年度长协服务',
    location: '海南省海口市',
    contractStatus: '已完成',
    quality: '优',
    leader: '李明伟',
    leaderExperience: '安全运维总长，负责建立主动防御体系，圆满完成建党百年重大会议保电安全保障任务。',
    members: 'SOC团队(8人)、红蓝对抗小组',
    memberExperience: '负责安全审计策略编写及边界防火墙漏洞修复建议。',
    contractScanUrls: [],
    invoiceUrls: [],
    invoiceVerifyUrls: []
  }
];

const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ mode }) => {
  const [projects, setProjects] = useState<ProjectExperience[]>(initialProjects);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState<ProjectExperience | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<ProjectExperience>>({});

  const fileInputRefs = {
    contract: useRef<HTMLInputElement>(null),
    invoice: useRef<HTMLInputElement>(null),
    verify: useRef<HTMLInputElement>(null),
    import: useRef<HTMLInputElement>(null),
  };

  const handleEdit = (p: ProjectExperience) => {
    setProjectForm({ ...p });
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setProjectForm({
      id: `p-${Date.now()}`,
      contractYear: new Date().getFullYear().toString(),
      index: projects.length + 1,
      projectType: '1. 技术服务类',
      contractStatus: '履行中',
      quality: '合格',
      projectName: '',
      location: '',
      clientName: '',
      clientAddress: '',
      contact: '',
      phone: '',
      amount: '',
      signingDate: '',
      endDate: '',
      leaderExperience: '',
      leader: '',
      members: '',
      memberExperience: '',
      content: '',
      remarks: '',
      keywords: [],
      extendedKeywords: [],
      contractScanUrls: [],
      invoiceUrls: [],
      invoiceVerifyUrls: []
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!projectForm.projectName) return alert("请输入项目名称");
    const fullProject = projectForm as ProjectExperience;
    setProjects(prev => {
      const exists = prev.find(p => p.id === fullProject.id);
      if (exists) return prev.map(p => p.id === fullProject.id ? fullProject : p);
      return [fullProject, ...prev];
    });
    setIsEditModalOpen(false);
  };

  const handleBatchImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`已选择导入文件: ${file.name}。系统正在解析 Excel 数据并同步至业绩库...`);
    }
  };

  const handleMultiFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'contractScanUrls' | 'invoiceUrls' | 'invoiceVerifyUrls') => {
    const files = Array.from(e.target.files || []);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm(prev => ({
          ...prev,
          [field]: [...(prev[field] || []), reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const SectionHeader = ({ icon: Icon, title, sub }: any) => (
    <div className="flex items-center space-x-3 border-b border-slate-100 pb-3 mb-6">
      <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Icon size={18} /></div>
      <div>
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{sub}</p>
      </div>
    </div>
  );

  const MultipleFileUploadArea = ({ label, field, urls = [], inputRef }: any) => (
    <div className="space-y-4 flex-1 text-left min-w-[300px]">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
      <div className="grid grid-cols-3 gap-4">
        {urls.map((url: string, idx: number) => (
          <div key={idx} className="relative aspect-[4/3] rounded-2xl border border-slate-100 overflow-hidden shadow-sm group">
            <img src={url} className="w-full h-full object-cover" alt="attachment" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button onClick={() => setProjectForm(prev => ({ ...prev, [field]: prev[field]?.filter((_: any, i: number) => i !== idx) }))} className="p-2 bg-white text-red-600 rounded-lg shadow-lg"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
        <div onClick={() => inputRef.current?.click()} className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 transition-all">
          <ImagePlus size={24} className="text-slate-300 mb-2" />
          <span className="text-[9px] font-black text-slate-400">追加图片</span>
        </div>
      </div>
      <input type="file" ref={inputRef} className="hidden" accept="image/*" multiple onChange={(e) => handleMultiFileUpload(e, field)} />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      
      {/* 编辑模态框 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center p-6 text-left">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative w-full max-w-7xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[94vh] border border-white/20">
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl"><Edit3 size={24} /></div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">项目业绩档案编辑</h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
             </div>

             <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-main bg-white">
                <section>
                  <SectionHeader icon={ClipboardList} title="档案编目与核心属性" sub="Registry & Identity" />
                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">签订合同年份</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.contractYear || ''} onChange={e => setProjectForm({...projectForm, contractYear: e.target.value})} placeholder="如：2021" />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">项目类型</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.projectType || ''} onChange={e => setProjectForm({...projectForm, projectType: e.target.value})} placeholder="如：6. 营销服务类" />
                    </div>
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-blue-600 italic">项目名称 (严格全称)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-blue-50/30 border-2 border-blue-100 focus:border-blue-600 outline-none font-black text-sm" value={projectForm.projectName || ''} onChange={e => setProjectForm({...projectForm, projectName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">合同情况</label>
                      <select className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm appearance-none" value={projectForm.contractStatus || ''} onChange={e => setProjectForm({...projectForm, contractStatus: e.target.value})}>
                        <option value="已完成">已完成 / 归档</option>
                        <option value="履行中">正在履行 / 运行中</option>
                        <option value="待启动">待启动</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Tag} title="知识图谱与检索语义" sub="Semantic & Keywords" />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">关键字 (逗号分隔)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.keywords?.join(',') || ''} onChange={e => setProjectForm({...projectForm, keywords: e.target.value.split(',')})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">拓展关联词 (AI 内容拓展)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.extendedKeywords?.join(',') || ''} onChange={e => setProjectForm({...projectForm, extendedKeywords: e.target.value.split(',')})} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Building2} title="建设单位与联系方式" sub="Client & Contact Entity" />
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">项目建设单位名称 (发包人)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.clientName || ''} onChange={e => setProjectForm({...projectForm, clientName: e.target.value})} />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">发包人地址</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.clientAddress || ''} onChange={e => setProjectForm({...projectForm, clientAddress: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">联系人</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.contact || ''} onChange={e => setProjectForm({...projectForm, contact: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">联系电话</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.phone || ''} onChange={e => setProjectForm({...projectForm, phone: e.target.value})} />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">项目所在地</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.location || ''} onChange={e => setProjectForm({...projectForm, location: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Coins} title="财务数据与执行周期" sub="Financials & Timeline" />
                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">合同金额 (万元)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-amber-50/50 border-2 border-amber-100 focus:border-amber-600 outline-none font-black text-sm" value={projectForm.amount || ''} onChange={e => setProjectForm({...projectForm, amount: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">合同签订日期 (开工)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.signingDate || ''} onChange={e => setProjectForm({...projectForm, signingDate: e.target.value})} placeholder="如：2021-10" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">项目结束时间 (竣工)</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.endDate || ''} onChange={e => setProjectForm({...projectForm, endDate: e.target.value})} placeholder="如：2021-12" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">工程质量</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.quality || ''} onChange={e => setProjectForm({...projectForm, quality: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Users2} title="执行团队与人员经验" sub="Project Leadership & Team" />
                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">合同项目负责人</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-black text-sm" value={projectForm.leader || ''} onChange={e => setProjectForm({...projectForm, leader: e.target.value})} />
                    </div>
                    <div className="space-y-1.5 col-span-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-emerald-600 italic">负责人经验 (承担的工作)</label>
                      <textarea className="w-full px-5 py-3 rounded-2xl bg-emerald-50/30 border-2 border-emerald-100 focus:border-emerald-600 outline-none font-bold text-sm min-h-[60px]" value={projectForm.leaderExperience || ''} onChange={e => setProjectForm({...projectForm, leaderExperience: e.target.value})} />
                    </div>
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">合同项目成员</label>
                      <input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm" value={projectForm.members || ''} onChange={e => setProjectForm({...projectForm, members: e.target.value})} />
                    </div>
                    <div className="space-y-1.5 col-span-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">项目成员经验</label>
                      <textarea className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm min-h-[60px]" value={projectForm.memberExperience || ''} onChange={e => setProjectForm({...projectForm, memberExperience: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Files} title="项目详述与图档凭证" sub="Description & Evidences" />
                  <div className="grid grid-cols-1 gap-6 mb-10">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-blue-600">项目内容 (AI 内容查找与匹配核心)</label>
                      <textarea className="w-full px-6 py-4 rounded-3xl bg-blue-50/20 border-2 border-blue-50 focus:border-blue-600 outline-none font-bold text-sm min-h-[120px]" value={projectForm.content || ''} onChange={e => setProjectForm({...projectForm, content: e.target.value})} placeholder="详细描述项目实施范围、技术指标、交付成果等..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">备注</label>
                      <textarea className="w-full px-6 py-4 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm min-h-[80px]" value={projectForm.remarks || ''} onChange={e => setProjectForm({...projectForm, remarks: e.target.value})} />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-10 border-t border-slate-50 pt-10">
                    <MultipleFileUploadArea label="项目合同扫描件 (必须)" field="contractScanUrls" urls={projectForm.contractScanUrls} inputRef={fileInputRefs.contract} />
                    <MultipleFileUploadArea label="结算发票图片" field="invoiceUrls" urls={projectForm.invoiceUrls} inputRef={fileInputRefs.invoice} />
                    <MultipleFileUploadArea label="发票查验截图/明细" field="invoiceVerifyUrls" urls={projectForm.invoiceVerifyUrls} inputRef={fileInputRefs.verify} />
                  </div>
                </section>
             </div>

             <div className="p-8 border-t border-slate-100 bg-white flex justify-end space-x-4 shrink-0">
                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">取消</button>
                <button onClick={handleSave} className="px-12 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center">
                  <Save size={18} className="mr-3" /> 保存档案
                </button>
             </div>
          </div>
        </div>
      )}

      {/* A4 导出预览 - 增强自适应与分页控制 */}
      {showDocPreview && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <button className="flex items-center px-8 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Download size={14} className="mr-2" /> 确认导出 Word
              </button>
              <button onClick={() => setShowDocPreview(null)} className="p-2.5 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
           </div>
           
           {/* 第一页：基本情况表 */}
           <div className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
              <h2 className="text-xl font-bold text-center mb-10 underline underline-offset-[12px] decoration-slate-900">项目基本情况表</h2>
              <table className="w-full border-collapse border border-black text-[10.5pt] leading-[1.8]">
                 <tbody>
                    <tr><td className="border border-black p-3 bg-slate-50 w-[140px] font-bold text-center">项目名称</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.projectName}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目所在地</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.location}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人名称</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.clientName}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人地址</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.clientAddress}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人电话</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.contact} / {showDocPreview.phone}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">合同价格</td><td className="border border-black p-3 font-bold" colSpan={3}>{showDocPreview.amount} 万元</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">开工日期</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.signingDate}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">竣工日期</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.endDate}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[100px]">承担的工作</td><td className="border border-black p-3 align-top italic" colSpan={3}>{showDocPreview.leaderExperience}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">工程质量</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.quality}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目负责人</td><td className="border border-black p-3" colSpan={3}>{showDocPreview.leader}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[180px]">项目描述</td><td className="border border-black p-3 text-justify align-top" colSpan={3}>{showDocPreview.content}</td></tr>
                    <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">其他说明</td><td className="border border-black p-3 italic" colSpan={3}>{showDocPreview.remarks}</td></tr>
                 </tbody>
              </table>
              <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40">
                 <span className="text-[9pt] font-sans">GridBid AI 业绩管理系统</span>
                 <span className="text-[9pt] font-sans italic">第 1 页</span>
              </div>
           </div>

           {/* 附件容器 - 自动分页布局 */}
           <div className="w-full flex flex-col items-center">
              {/* 合同扫描件附件 */}
              {showDocPreview.contractScanUrls && showDocPreview.contractScanUrls.length > 0 && (
                showDocPreview.contractScanUrls.map((url, i) => (
                  <div key={`contract-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                    <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8">附件一：项目合同扫描件 ({i + 1}/{showDocPreview.contractScanUrls?.length})</h3>
                    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
                      <img 
                        src={url} 
                        alt="contract" 
                        className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
                       <span className="text-[9pt] font-sans italic">支撑资料：合同原件扫描第 {i + 1} 页</span>
                       <span className="text-[9pt] font-sans">Word Export Simulation</span>
                    </div>
                  </div>
                ))
              )}

              {/* 结算发票附件 */}
              {showDocPreview.invoiceUrls && showDocPreview.invoiceUrls.length > 0 && (
                showDocPreview.invoiceUrls.map((url, i) => (
                  <div key={`invoice-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                    <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8">附件二：结算发票凭证 ({i + 1}/{showDocPreview.invoiceUrls?.length})</h3>
                    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
                      <img 
                        src={url} 
                        alt="invoice" 
                        className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm" 
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
                       <span className="text-[9pt] font-sans italic">支撑资料：财务结算凭证第 {i + 1} 页</span>
                       <span className="text-[9pt] font-sans">Verification Evidence</span>
                    </div>
                  </div>
                ))
              )}

              {/* 发票查验附件 */}
              {showDocPreview.invoiceVerifyUrls && showDocPreview.invoiceVerifyUrls.length > 0 && (
                showDocPreview.invoiceVerifyUrls.map((url, i) => (
                  <div key={`verify-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                    <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8">附件三：发票查验截图 ({i + 1}/{showDocPreview.invoiceVerifyUrls?.length})</h3>
                    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
                      <img 
                        src={url} 
                        alt="verify" 
                        className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
                       <span className="text-[9pt] font-sans italic">支撑资料：税务系统查验结果第 {i + 1} 页</span>
                       <span className="text-[9pt] font-sans">Compliance Verification</span>
                    </div>
                  </div>
                ))
              )}
           </div>
           
           <div className="h-24 shrink-0" />
        </div>
      )}

      {/* 列表头部 */}
      <div className="flex justify-between items-center text-left">
        <div className="flex items-center space-x-4">
           <div className={`p-3 text-white rounded-2xl shadow-xl bg-blue-600`}>
             <Briefcase size={24} />
           </div>
           <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">项目业绩库</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic italic">Grid Project Assets Registry</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <input type="file" ref={fileInputRefs.import} className="hidden" accept=".xlsx,.xls,.json" onChange={handleBatchImport} />
          <button 
            onClick={() => fileInputRefs.import.current?.click()}
            className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm"
          >
            <Upload size={16} className="mr-2 text-blue-600" /> 批量导入
          </button>
          <button onClick={openAddModal} className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center">
            <Plus size={16} className="mr-2" /> 录入新业绩
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px] text-left">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input type="text" placeholder={`搜索项目名称、负责人、关键字或建设单位...`} className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-slate-100 bg-white outline-none font-bold text-sm shadow-inner" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center shadow-lg shadow-blue-100">
               <Search size={16} className="mr-2" /> 开始搜索
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar-main">
          <table className="w-full text-left table-fixed border-collapse" style={{ width: '4080px' }}>
            <thead className="text-[11px] font-black text-white uppercase tracking-[0.15em] bg-slate-900 sticky top-0 z-20">
              <tr className="divide-x divide-white/5">
                <th className="px-6 py-8 w-[80px] sticky left-0 bg-slate-900 shadow-xl text-blue-400 text-center">序号</th>
                <th className="px-6 py-8 w-[120px]">签订年份</th>
                <th className="px-6 py-8 w-[180px]">类型</th>
                <th className="px-6 py-8 w-[500px]">项目全称</th>
                <th className="px-6 py-8 w-[240px]">关键字</th>
                <th className="px-6 py-8 w-[240px]">拓展关联词</th>
                <th className="px-6 py-8 w-[400px]">承担工作</th>
                <th className="px-6 py-8 w-[140px]">金额(W)</th>
                <th className="px-6 py-8 w-[350px]">建设单位</th>
                <th className="px-6 py-8 w-[240px]">联系人/电话</th>
                <th className="px-6 py-8 w-[160px]">签订日期</th>
                <th className="px-6 py-8 w-[160px]">结束时间</th>
                <th className="px-6 py-8 w-[180px]">地点</th>
                <th className="px-6 py-8 w-[140px]">合同情况</th>
                <th className="px-6 py-8 w-[160px]">负责人</th>
                <th className="px-6 py-8 w-[240px]">项目成员</th>
                <th className="px-6 py-8 w-[160px] text-right sticky right-0 bg-slate-900 shadow-xl">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p, index) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-all group cursor-pointer text-[12px]" onClick={() => handleEdit(p)}>
                  <td className="px-6 py-6 font-black text-slate-400 sticky left-0 bg-white group-hover:bg-blue-50/50 border-r border-slate-50 text-center">{index + 1}</td>
                  <td className="px-6 py-6 font-black text-slate-800">{p.contractYear}</td>
                  <td className="px-6 py-6 font-bold text-blue-600 italic">{p.projectType}</td>
                  <td className="px-6 py-6 font-black text-slate-900 leading-relaxed group-hover:text-blue-700">{p.projectName}</td>
                  <td className="px-6 py-6 italic text-slate-400">{p.keywords?.join(', ')}</td>
                  <td className="px-6 py-6 italic text-blue-400">{p.extendedKeywords?.join(', ')}</td>
                  <td className="px-6 py-6 text-slate-500 italic truncate">{p.leaderExperience}</td>
                  <td className="px-6 py-6 font-black text-slate-900 tracking-tighter text-sm">{p.amount}</td>
                  <td className="px-6 py-6 font-bold text-slate-600 italic">{p.clientName}</td>
                  <td className="px-6 py-6 whitespace-nowrap">
                     <p className="font-black text-slate-800">{p.contact}</p>
                     <p className="text-[10px] text-slate-400 font-mono">{p.phone}</p>
                  </td>
                  <td className="px-6 py-6 font-mono text-blue-500 font-bold">{p.signingDate}</td>
                  <td className="px-6 py-6 font-mono text-slate-500 font-bold">{p.endDate}</td>
                  <td className="px-6 py-6 text-slate-600 italic">{p.location}</td>
                  <td className="px-6 py-6 text-xs text-blue-600 font-black">{p.contractStatus}</td>
                  <td className="px-6 py-6 font-black text-slate-900">{p.leader}</td>
                  <td className="px-6 py-6 text-slate-500 truncate italic">{p.members}</td>
                  <td className="px-6 py-6 text-right sticky right-0 bg-white group-hover:bg-blue-50/50 border-l border-slate-50">
                    <div className="flex items-center justify-end space-x-2">
                       <button onClick={(e) => { e.stopPropagation(); setShowDocPreview(p); }} className="p-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all" title="预览导出文档"><FileDown size={16}/></button>
                       <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }} className="p-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all"><Edit3 size={16}/></button>
                       <button onClick={(e) => { e.stopPropagation(); if(confirm('确认删除？')) setProjects(prev => prev.filter(i => i.id !== p.id)); }} className="p-2.5 bg-slate-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        @media print {
          .break-inside-avoid { page-break-inside: avoid; break-inside: avoid; }
        }
        /* 针对预览界面的图片自适应分页优化 */
        .preview-img-container {
           break-inside: avoid;
           page-break-inside: avoid;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBaseView;
