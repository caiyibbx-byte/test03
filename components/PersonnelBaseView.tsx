
import React, { useState, useRef } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  X, 
  Save, 
  Edit3, 
  Trash2, 
  Upload, 
  BadgeCheck, 
  GraduationCap, 
  UserCheck,
  ChevronRight,
  FileUp,
  Image as ImageIcon,
  School,
  FileDown,
  Download
} from 'lucide-react';
import { Personnel } from '../types';

const initialPersonnel: Personnel[] = [
  {
    id: 's-huang',
    name: '黄石亮',
    age: 40,
    education: '本科',
    title: '高级顾问',
    proposedPosition: '咨询顾问',
    years: 17,
    similarYears: 15,
    school: '中山大学',
    major: '计算机科学与技术',
    gradDate: '2013',
    currentLoad: 0.6,
    educations: [
      { level: '本科', school: '中山大学', major: '计算机科学与技术', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=Graduation+Certificate', degreeCertUrl: 'https://placehold.co/800x600?text=Degree+Certificate' }
    ],
    certs: [
      { name: 'PMP证书（项目管理咨询师）', level: '高级', authority: 'PMI', number: 'PMP-123456', validity: '2027-12', fileUrl: 'https://placehold.co/600x800?text=PMP+Cert' },
      { name: 'CMC证书（国际管理咨询师）', level: '国际级', authority: 'ICMCI', number: 'CMC-9988', validity: '2026-10', fileUrl: 'https://placehold.co/600x800?text=CMC+Cert' }
    ],
    projects: [
      { time: '2022 年', projectName: '南方电网数字电网集团通信信息科技有限公司2022-2023 年科技创新与成果转化管理咨询', role: '项目负责人', client: '南方电网', contact: '游 XX', phone: '156-0230-7721', serviceType: '管理咨询', workCertUrl: 'https://placehold.co/600x800?text=Project+Proof+1' }
    ]
  },
  {
    id: 's-zhang-wei',
    name: '张维国',
    age: 45,
    education: '博士',
    title: '教授级高级工程师',
    proposedPosition: '技术负责人/总监',
    years: 22,
    similarYears: 18,
    school: '清华大学',
    major: '电力系统及其自动化',
    gradDate: '2008',
    currentLoad: 0.4,
    educations: [
      { level: '博士', school: '清华大学', major: '电力系统及其自动化', gradDate: '2008', gradCertUrl: 'https://placehold.co/800x600?text=Tsinghua+PhD+Grad' },
      { level: '硕士', school: '浙江大学', major: '电气工程', gradDate: '2005' }
    ],
    certs: [
      { name: '注册电气工程师（发输变电）', level: '执业资格', authority: '人社部', number: 'DG-2015-001', validity: '2028-06', fileUrl: 'https://placehold.co/600x800?text=Electrical+Engineer+Cert' },
      { name: '特高压技术应用专家认证', level: '特级', authority: '国家电网', number: 'SG-UHV-99', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=UHV+Expert+Cert' }
    ],
    projects: [
      { time: '2020-2022', projectName: '±800kV特高压换流站智能化运维集成系统研发', role: '项目总监', client: '国家电网', contact: '王主任', phone: '010-6678XXX', serviceType: '研发', workCertUrl: 'https://placehold.co/600x800?text=UHV+Project+Proof' }
    ]
  },
  {
    id: 's-li-ming',
    name: '李明',
    age: 38,
    education: '硕士',
    title: '高级架构师',
    proposedPosition: '系统架构负责人',
    years: 15,
    similarYears: 12,
    school: '西安交通大学',
    major: '软件工程',
    gradDate: '2012',
    currentLoad: 0.3,
    educations: [
      { level: '硕士', school: '西安交通大学', major: '软件工程', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=XJTU+Master+Grad' }
    ],
    certs: [
      { name: 'AWS 解决方案架构师认证', level: '专家级', authority: 'Amazon', number: 'AWS-SA-123', validity: '2025-10', fileUrl: 'https://placehold.co/600x800?text=AWS+Arch+Cert' },
      { name: '软考系统分析师', level: '高级', authority: '工信部', number: 'SA-2018-99', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=System+Analyst+Cert' }
    ],
    projects: [
      { time: '2023 年', projectName: '国网新源控股数字化审计平台二期建设', role: '首席架构师', client: '国网新源', contact: '李工', phone: '138-1122-XXXX', serviceType: '软件开发', workCertUrl: 'https://placehold.co/600x800?text=Digital+Audit+Proof' }
    ]
  },
  {
    id: 's-wang-fang',
    name: '王芳',
    age: 34,
    education: '本科',
    title: '注册造价工程师',
    proposedPosition: '商务/造价经理',
    years: 12,
    similarYears: 10,
    school: '华北电力大学',
    major: '工程造价',
    gradDate: '2012',
    currentLoad: 0.5,
    educations: [
      { level: '本科', school: '华北电力大学', major: '工程造价', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=NCEPU+Grad' }
    ],
    certs: [
      { name: '一级造价工程师（土建/安装）', level: '执业资格', authority: '住建部', number: 'ZJ-120033', validity: '2026-12', fileUrl: 'https://placehold.co/600x800?text=Cost+Engineer+Cert' }
    ],
    projects: [
      { time: '2021-2023', projectName: '蒙东电力220kV输变电工程全过程造价咨询', role: '商务总负责人', client: '内蒙古电力', contact: '赵科长', phone: '0471-XXX-XXXX', serviceType: '咨询服务', workCertUrl: 'https://placehold.co/600x800?text=Cost+Consulting+Proof' }
    ]
  },
  {
    id: 's-zhao-chen',
    name: '赵晨',
    age: 41,
    education: '本科',
    title: '高级安全评价师',
    proposedPosition: '安全质量管理负责人',
    years: 18,
    similarYears: 16,
    school: '武汉大学',
    major: '安全工程',
    gradDate: '2006',
    currentLoad: 0.2,
    educations: [
      { level: '本科', school: '武汉大学', major: '安全工程', gradDate: '2006' }
    ],
    certs: [
      { name: '注册安全工程师', level: '执业资格', authority: '应急管理部', number: 'AQ-2012-045', validity: '2027-01', fileUrl: 'https://placehold.co/600x800?text=Safety+Officer+Cert' },
      { name: 'HSE管理体系内审员证书', level: '中级', authority: '体系认证中心', number: 'HSE-8822', validity: '2025-12' }
    ],
    projects: [
      { time: '2022 年', projectName: '国网江苏电力配电网带电作业安全风险评估项目', role: '安全总监', client: '江苏电力', contact: '孙处长', phone: '135-XXXX-0987', serviceType: '安全技术', workCertUrl: 'https://placehold.co/600x800?text=Safety+Project+Proof' }
    ]
  },
  {
    id: 's-liu-yang',
    name: '刘洋',
    age: 31,
    education: '本科',
    title: '中级工程师',
    proposedPosition: '现场实施组长',
    years: 8,
    similarYears: 6,
    school: '电子科技大学',
    major: '通信工程',
    gradDate: '2016',
    currentLoad: 0.8,
    educations: [
      { level: '本科', school: '电子科技大学', major: '通信工程', gradDate: '2016', gradCertUrl: 'https://placehold.co/800x600?text=UESTC+Grad' }
    ],
    certs: [
      { name: '通信工程师（交换技术）', level: '中级', authority: '工信部', number: 'TX-2019-033', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=Comm+Engineer+Cert' },
      { name: '高空作业证', level: '操作证', authority: '安监局', number: 'GK-9911', validity: '2025-05' }
    ],
    projects: [
      { time: '2024 年', projectName: '海南供电局输电线路视频监控终端覆盖项目', role: '实施组长', client: '海南电网', contact: '林经理', phone: '133-XXXX-1122', serviceType: '工程实施', workCertUrl: 'https://placehold.co/600x800?text=Field+Project+Proof' }
    ]
  }
];

const PersonnelBaseView: React.FC = () => {
  const [personnelList, setPersonnelList] = useState<Personnel[]>(initialPersonnel);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState<Personnel | null>(null);
  const [formData, setFormData] = useState<Partial<Personnel>>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const dynamicFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadContext, setUploadContext] = useState<{type: 'cert' | 'work' | 'edu_grad' | 'edu_degree', index: number} | null>(null);

  const handleEdit = (p: Personnel) => {
    setFormData({ ...p });
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: `s-${Date.now()}`,
      name: '',
      age: 0,
      education: '',
      title: '',
      proposedPosition: '',
      years: 0,
      similarYears: 0,
      school: '',
      major: '',
      gradDate: '',
      educations: [],
      certs: [],
      projects: [],
      currentLoad: 0
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return alert("请输入姓名");
    const person = formData as Personnel;
    setPersonnelList(prev => {
      const exists = prev.find(p => p.id === person.id);
      if (exists) return prev.map(p => p.id === person.id ? person : p);
      return [person, ...prev];
    });
    setIsEditModalOpen(false);
  };

  const handleFileUploadTrigger = (type: 'cert' | 'work' | 'edu_grad' | 'edu_degree', index: number) => {
    setUploadContext({ type, index });
    if (dynamicFileInputRef.current) {
      dynamicFileInputRef.current.value = '';
      dynamicFileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadContext) {
      const url = URL.createObjectURL(file);
      if (uploadContext.type === 'cert') {
        const newCerts = [...(formData.certs || [])];
        newCerts[uploadContext.index] = { ...newCerts[uploadContext.index], fileUrl: url };
        setFormData({ ...formData, certs: newCerts });
      } else if (uploadContext.type === 'work') {
        const newProjects = [...(formData.projects || [])];
        newProjects[uploadContext.index] = { ...newProjects[uploadContext.index], workCertUrl: url };
        setFormData({ ...formData, projects: newProjects });
      } else if (uploadContext.type === 'edu_grad') {
        const newEdus = [...(formData.educations || [])];
        newEdus[uploadContext.index] = { ...newEdus[uploadContext.index], gradCertUrl: url };
        setFormData({ ...formData, educations: newEdus });
      } else if (uploadContext.type === 'edu_degree') {
        const newEdus = [...(formData.educations || [])];
        newEdus[uploadContext.index] = { ...newEdus[uploadContext.index], degreeCertUrl: url };
        setFormData({ ...formData, educations: newEdus });
      }
    }
  };

  const deleteCertFile = (index: number) => {
    const newCerts = [...(formData.certs || [])];
    newCerts[index] = { ...newCerts[index], fileUrl: undefined };
    setFormData({ ...formData, certs: newCerts });
  };

  const deleteWorkFile = (index: number) => {
    const newProjects = [...(formData.projects || [])];
    newProjects[index] = { ...newProjects[index], workCertUrl: undefined };
    setFormData({ ...formData, projects: newProjects });
  };

  const deleteEduFile = (index: number, type: 'grad' | 'degree') => {
    const newEdus = [...(formData.educations || [])];
    if (type === 'grad') newEdus[index].gradCertUrl = undefined;
    else newEdus[index].degreeCertUrl = undefined;
    setFormData({ ...formData, educations: newEdus });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      <input type="file" ref={dynamicFileInputRef} className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />

      {/* A4 导出预览遮罩层 */}
      {showDocPreview && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <div className="px-4 text-white/50 text-[10px] font-black uppercase tracking-widest border-r border-white/10 mr-2">Personnel Profile Preview</div>
              <button className="flex items-center px-8 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg">
                <Download size={14} className="mr-2" /> 导出 Word 归档
              </button>
              <button onClick={() => setShowDocPreview(null)} className="p-2.5 bg-white/10 text-white rounded-xl hover:bg-red-500 transition-all"><X size={20}/></button>
           </div>
           
           <div className="relative bg-white shadow-2xl text-left font-serif p-[20mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
              <h2 className="text-xl font-black text-center mb-8 tracking-wider">{showDocPreview.name}个人简历及相关证书</h2>
              
              <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] leading-[1.6]">
                 <tbody>
                    <tr>
                       <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">姓 名</td>
                       <td className="border border-black p-2 text-center w-[120px]">{showDocPreview.name}</td>
                       <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">年 龄</td>
                       <td className="border border-black p-2 text-center w-[80px]">{showDocPreview.age}</td>
                       <td className="border border-black p-2 bg-slate-50 w-[120px] font-bold text-center">执业资格证书<br/>(或岗位证书) 名称</td>
                       <td className="border border-black p-2 align-top text-xs">
                          {showDocPreview.certs.map((c, i) => <div key={i}>{c.name}</div>)}
                       </td>
                    </tr>
                    <tr>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">职 称</td>
                       <td className="border border-black p-2 text-center">{showDocPreview.title}</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">学 历</td>
                       <td className="border border-black p-2 text-center">{showDocPreview.education}</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">拟在本项目任职</td>
                       <td className="border border-black p-2 text-center font-bold">{showDocPreview.proposedPosition}</td>
                    </tr>
                    <tr>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">工作年限</td>
                       <td className="border border-black p-2 text-center" colSpan={1}>{showDocPreview.years}</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center" colSpan={2}>从事类似工作年限</td>
                       <td className="border border-black p-2 text-center font-bold" colSpan={2}>{showDocPreview.similarYears}</td>
                    </tr>
                    <tr>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">毕业学校</td>
                       <td className="border border-black p-3 text-center" colSpan={5}>
                          {showDocPreview.gradDate}年毕业于{showDocPreview.school}{showDocPreview.major}专业
                       </td>
                    </tr>
                    <tr>
                       <td className="border border-black p-2 bg-slate-100 font-bold text-center" colSpan={6}>主要工作经历</td>
                    </tr>
                    <tr>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">时 间</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center" colSpan={3}>参加过的类似项目</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">担任职务</td>
                       <td className="border border-black p-2 bg-slate-50 font-bold text-center">委托人及联系电话</td>
                    </tr>
                    {showDocPreview.projects.map((proj, idx) => (
                      <tr key={idx}>
                         <td className="border border-black p-2 text-center text-xs">{proj.time}</td>
                         <td className="border border-black p-2 text-xs leading-relaxed" colSpan={3}>{proj.projectName}</td>
                         <td className="border border-black p-2 text-center text-xs font-bold">{proj.role}</td>
                         <td className="border border-black p-2 text-center text-[9pt]">
                            <div>{proj.contact}</div>
                            <div className="font-mono mt-1 text-slate-500">{proj.phone}</div>
                         </td>
                      </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 8 - showDocPreview.projects.length) }).map((_, i) => (
                      <tr key={`empty-${i}`} className="h-10">
                        <td className="border border-black p-2"></td>
                        <td className="border border-black p-2" colSpan={3}></td>
                        <td className="border border-black p-2"></td>
                        <td className="border border-black p-2"></td>
                      </tr>
                    ))}
                 </tbody>
              </table>
              <div className="mt-auto pt-8 flex justify-between items-center opacity-40 italic">
                 <span className="text-[8pt] font-sans">GridBid AI 资质管理系统 · 档案 ID: {showDocPreview.id}</span>
                 <span className="text-[8pt] font-sans">第 1 页</span>
              </div>
           </div>

           {showDocPreview.educations.some(e => e.gradCertUrl || e.degreeCertUrl) && (
             <div className="relative bg-white shadow-2xl p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件一：学历及学位证书扫描件</h3>
                <div className="space-y-12">
                   {showDocPreview.educations.map((edu, i) => (
                     <div key={i} className="space-y-6">
                        <p className="text-sm font-bold text-slate-600 bg-slate-100 p-2 rounded">层次：{edu.level}（{edu.school}）</p>
                        <div className="grid grid-cols-2 gap-8">
                           {edu.gradCertUrl && (
                             <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-slate-400">学历证书 (毕业证)</p>
                                <img src={edu.gradCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" alt="grad cert" />
                             </div>
                           )}
                           {edu.degreeCertUrl && (
                             <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-slate-400">学位证书</p>
                                <img src={edu.degreeCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" alt="degree cert" />
                             </div>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {showDocPreview.certs.some(c => c.fileUrl) && (
             <div className="relative bg-white shadow-2xl p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件二：执业资格及岗位证书</h3>
                <div className="grid grid-cols-2 gap-10">
                   {showDocPreview.certs.filter(c => c.fileUrl).map((cert, i) => (
                     <div key={i} className="space-y-4">
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                           <p className="text-xs font-bold text-slate-800">{cert.name}</p>
                           <p className="text-[10px] text-slate-400 font-mono mt-1">编号: {cert.number}</p>
                        </div>
                        <img src={cert.fileUrl} className="w-full border border-slate-100 shadow-sm rounded-xl" alt="cert file" />
                     </div>
                   ))}
                </div>
             </div>
           )}

           {showDocPreview.projects.some(p => p.workCertUrl) && (
             <div className="relative bg-white shadow-2xl p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
                <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件三：主要项目工作经历证明文件</h3>
                <div className="space-y-16">
                   {showDocPreview.projects.filter(p => p.workCertUrl).map((proj, i) => (
                     <div key={i} className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-6">
                           <p className="text-sm font-bold text-slate-800">{proj.projectName}</p>
                           <p className="text-xs text-slate-400 mt-1 italic">对应经历周期：{proj.time}</p>
                        </div>
                        <div className="flex justify-center">
                           <img src={proj.workCertUrl} className="max-w-[70%] border border-slate-200 shadow-xl rounded-xl" alt="work proof" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           <div className="h-24 shrink-0" />
        </div>
      )}

      {/* 核心编辑模态框 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[94vh] border border-white/20 text-left">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg"><UserCheck size={20} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">主要人员资历档案编辑</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1 italic">Person Qualification Registry</p>
                  </div>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X size={24}/></button>
             </div>

             <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar-main bg-white">
                <section>
                   <div className="flex items-center space-x-2 mb-4">
                      <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">核心个人档案</h4>
                   </div>
                   <div className="grid grid-cols-6 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-4 py-3 border-b border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">姓名</div>
                      <div className="px-4 py-3 border-b border-r border-slate-200">
                        <input className="w-full bg-transparent outline-none font-bold text-slate-900" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="输入姓名" />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-b border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">年龄</div>
                      <div className="px-4 py-3 border-b border-r border-slate-200">
                        <input type="number" className="w-full bg-transparent outline-none font-bold text-slate-900" value={formData.age || ''} onChange={e => setFormData({...formData, age: parseInt(e.target.value) || 0})} />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">职称</div>
                      <div className="px-4 py-3 border-b border-slate-200">
                        <input className="w-full bg-transparent outline-none font-bold text-slate-900" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="例如：高级顾问" />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">最高学历</div>
                      <div className="px-4 py-3 border-r border-slate-200">
                        <input className="w-full bg-transparent outline-none font-bold text-slate-900" value={formData.education || ''} onChange={e => setFormData({...formData, education: e.target.value})} placeholder="例如：本科" />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">类似工龄</div>
                      <div className="px-4 py-3 border-r border-slate-200">
                        <input type="number" className="w-full bg-transparent outline-none font-black text-emerald-600" value={formData.similarYears || ''} onChange={e => setFormData({...formData, similarYears: parseInt(e.target.value) || 0})} />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">总工龄</div>
                      <div className="px-4 py-3">
                        <input type="number" className="w-full bg-transparent outline-none font-bold text-slate-900" value={formData.years || ''} onChange={e => setFormData({...formData, years: parseInt(e.target.value) || 0})} />
                      </div>
                      <div className="bg-slate-50 px-4 py-3 border-t border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center col-span-1 italic">拟任职项目岗位</div>
                      <div className="px-4 py-3 border-t border-slate-200 col-span-5">
                        <input className="w-full bg-transparent outline-none font-black text-indigo-600 text-sm" value={formData.proposedPosition || ''} onChange={e => setFormData({...formData, proposedPosition: e.target.value})} placeholder="例如：咨询顾问" />
                      </div>
                   </div>
                </section>

                <section>
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                         <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                         <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic flex items-center">学历及学位证书管理</h4>
                      </div>
                      <button onClick={() => setFormData({...formData, educations: [...(formData.educations || []), { level: '本科', school: '', major: '', gradDate: '' }]})} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"><Plus size={14} className="mr-2" /> 新增学历层次</button>
                   </div>
                   <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50/20">
                      <table className="w-full text-left table-fixed border-collapse">
                         <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr className="divide-x divide-slate-200">
                               <th className="px-6 py-4 w-[120px] text-center">学历层次</th>
                               <th className="px-4 py-4 w-[200px]">毕业院校</th>
                               <th className="px-4 py-4 w-[180px]">专业</th>
                               <th className="px-4 py-4 w-[100px] text-center">毕业年份</th>
                               <th className="px-4 py-4 text-center">学历证书 (毕业证)</th>
                               <th className="px-4 py-4 text-center">学位证书</th>
                               <th className="px-4 py-4 w-[80px] text-center">操作</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {formData.educations?.map((edu, idx) => (
                              <tr key={idx} className="divide-x divide-slate-200 hover:bg-white transition-colors group/row">
                                 <td className="px-2 py-4">
                                    <select className="w-full bg-transparent outline-none text-center text-xs font-black text-slate-800" value={edu.level} onChange={e => { const n = [...formData.educations!]; n[idx].level = e.target.value; setFormData({...formData, educations: n})}}>
                                       <option value="本科">本科</option><option value="硕士">硕士</option><option value="博士">博士</option>
                                    </select>
                                 </td>
                                 <td className="px-4 py-4"><input className="w-full bg-transparent outline-none text-xs font-bold text-slate-700 focus:bg-white px-2 py-1 rounded" value={edu.school} onChange={e => { const n = [...formData.educations!]; n[idx].school = e.target.value; setFormData({...formData, educations: n})}} placeholder="毕业学校" /></td>
                                 <td className="px-4 py-4"><input className="w-full bg-transparent outline-none text-xs font-bold text-slate-700 focus:bg-white px-2 py-1 rounded" value={edu.major} onChange={e => { const n = [...formData.educations!]; n[idx].major = e.target.value; setFormData({...formData, educations: n})}} placeholder="专业" /></td>
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs text-slate-500 focus:bg-white py-1 rounded" value={edu.gradDate} onChange={e => { const n = [...formData.educations!]; n[idx].gradDate = e.target.value; setFormData({...formData, educations: n})}} placeholder="2013" /></td>
                                 <td className="px-4 py-4">
                                    <div className="flex items-center justify-center space-x-2">
                                       {edu.gradCertUrl ? (
                                         <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl group/file cursor-pointer hover:bg-blue-100 transition-all" onClick={() => window.open(edu.gradCertUrl)}>
                                            <School size={14} className="text-blue-500"/><span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">毕业证</span>
                                            <button onClick={(e) => { e.stopPropagation(); deleteEduFile(idx, 'grad'); }} className="text-slate-300 hover:text-red-500 transition-colors pl-1"><X size={12} strokeWidth={3}/></button>
                                         </div>
                                       ) : <button onClick={() => handleFileUploadTrigger('edu_grad', idx)} className="flex items-center px-4 py-2 bg-slate-100 border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"><FileUp size={14} className="mr-1.5" /> 上传</button>}
                                    </div>
                                 </td>
                                 <td className="px-4 py-4">
                                    <div className="flex items-center justify-center space-x-2">
                                       {edu.degreeCertUrl ? (
                                         <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl group/file cursor-pointer hover:bg-emerald-100 transition-all" onClick={() => window.open(edu.degreeCertUrl)}>
                                            <GraduationCap size={14} className="text-emerald-500"/><span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">学位证</span>
                                            <button onClick={(e) => { e.stopPropagation(); deleteEduFile(idx, 'degree'); }} className="text-slate-300 hover:text-red-500 transition-colors pl-1"><X size={12} strokeWidth={3}/></button>
                                         </div>
                                       ) : <button onClick={() => handleFileUploadTrigger('edu_degree', idx)} className="flex items-center px-4 py-2 bg-slate-100 border-2 border-dashed border-slate-200 text-slate-400 hover:border-emerald-400 hover:text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"><FileUp size={14} className="mr-1.5" /> 上传</button>}
                                    </div>
                                 </td>
                                 <td className="px-2 py-4 text-center"><button onClick={() => setFormData({...formData, educations: formData.educations?.filter((_, i) => i !== idx)})} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/row:opacity-100"><Trash2 size={16}/></button></td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </section>

                <section>
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                         <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
                         <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic flex items-center">执业资格证书清单</h4>
                      </div>
                      <button onClick={() => setFormData({...formData, certs: [...(formData.certs || []), { name: '', level: '', authority: '', number: '', validity: '' }]})} className="flex items-center px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"><Plus size={14} className="mr-2" /> 新增证书项</button>
                   </div>
                   <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50/20">
                      <table className="w-full text-left table-fixed border-collapse">
                         <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr className="divide-x divide-slate-200">
                               <th className="px-6 py-4 w-[280px]">证书全称</th>
                               <th className="px-4 py-4 w-[120px] text-center">等级/性质</th>
                               <th className="px-4 py-4 w-[180px] text-center">证书编号</th>
                               <th className="px-4 py-4 w-[120px] text-center">有效期</th>
                               <th className="px-4 py-4 text-center">扫描件附件</th>
                               <th className="px-4 py-4 w-[80px] text-center">操作</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {formData.certs?.map((cert, idx) => (
                              <tr key={idx} className="divide-x divide-slate-200 hover:bg-white transition-colors group/row">
                                 <td className="px-4 py-4"><input className="w-full bg-transparent outline-none text-xs font-black text-slate-800 focus:bg-white px-2 py-1 rounded" value={cert.name} onChange={e => { const n = [...formData.certs!]; n[idx].name = e.target.value; setFormData({...formData, certs: n})}} placeholder="如：PMP项目管理证书" /></td>
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs text-slate-600 font-bold focus:bg-white py-1 rounded" value={cert.level} onChange={e => { const n = [...formData.certs!]; n[idx].level = e.target.value; setFormData({...formData, certs: n})}} placeholder="高级" /></td>
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs font-mono text-slate-500 focus:bg-white py-1 rounded" value={cert.number} onChange={e => { const n = [...formData.certs!]; n[idx].number = e.target.value; setFormData({...formData, certs: n})}} placeholder="编号" /></td>
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs text-slate-500 focus:bg-white py-1 rounded" value={cert.validity} onChange={e => { const n = [...formData.certs!]; n[idx].validity = e.target.value; setFormData({...formData, certs: n})}} placeholder="2027-12" /></td>
                                 <td className="px-4 py-4">
                                    <div className="flex items-center justify-center space-x-2">
                                       {cert.fileUrl ? (
                                         <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl group/file cursor-pointer hover:bg-blue-100 transition-all" onClick={() => window.open(cert.fileUrl)}>
                                            <ImageIcon size={14} className="text-blue-500"/><span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">查看扫描件</span>
                                            <button onClick={(e) => { e.stopPropagation(); deleteCertFile(idx); }} className="text-slate-300 hover:text-red-500 transition-colors pl-1"><X size={12} strokeWidth={3}/></button>
                                         </div>
                                       ) : <button onClick={() => handleFileUploadTrigger('cert', idx)} className="flex items-center px-4 py-2 bg-slate-100 border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-400 hover:text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"><FileUp size={14} className="mr-2" /> 上传</button>}
                                    </div>
                                 </td>
                                 <td className="px-2 py-4 text-center"><button onClick={() => setFormData({...formData, certs: formData.certs?.filter((_, i) => i !== idx)})} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/row:opacity-100"><Trash2 size={16}/></button></td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </section>

                <section>
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic flex items-center">主要工作经历及项目证明</h4>
                      </div>
                      <button onClick={() => setFormData({...formData, projects: [...(formData.projects || []), { time: '', projectName: '', role: '', client: '', contact: '', phone: '', serviceType: '' }]})} className="flex items-center px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"><Plus size={14} className="mr-2" /> 追加项目行</button>
                   </div>
                   <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50/20">
                      <table className="w-full text-left table-fixed border-collapse">
                         <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr className="divide-x divide-slate-200">
                               <th className="px-4 py-4 w-[110px] text-center">时 间</th>
                               <th className="px-6 py-4">参加过的类似项目名称</th>
                               <th className="px-4 py-4 w-[130px] text-center">担任职务</th>
                               <th className="px-4 py-4 w-[180px] text-center">委托方及联系方式</th>
                               <th className="px-4 py-4 w-[160px] text-center">证明文件</th>
                               <th className="px-4 py-4 w-[70px] text-center">操作</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {formData.projects?.map((proj, idx) => (
                              <tr key={idx} className="divide-x divide-slate-200 hover:bg-white transition-colors group/prow">
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs font-bold text-slate-600 focus:bg-white py-1 rounded" value={proj.time} onChange={e => { const n = [...formData.projects!]; n[idx].time = e.target.value; setFormData({...formData, projects: n})}} placeholder="2024年" /></td>
                                 <td className="px-4 py-4"><textarea className="w-full bg-transparent outline-none text-xs leading-relaxed font-bold text-slate-800 resize-none min-h-[60px] focus:bg-white p-2 rounded" value={proj.projectName} onChange={e => { const n = [...formData.projects!]; n[idx].projectName = e.target.value; setFormData({...formData, projects: n})}} placeholder="项目全称" /></td>
                                 <td className="px-2 py-4"><input className="w-full bg-transparent outline-none text-center text-xs font-black text-slate-900 italic focus:bg-white py-1 rounded" value={proj.role} onChange={e => { const n = [...formData.projects!]; n[idx].role = e.target.value; setFormData({...formData, projects: n})}} placeholder="负责人" /></td>
                                 <td className="px-2 py-4"><div className="space-y-1 text-center"><input className="w-full bg-transparent outline-none text-center text-xs font-bold text-slate-800 focus:bg-white rounded" value={proj.contact} onChange={e => { const n = [...formData.projects!]; n[idx].contact = e.target.value; setFormData({...formData, projects: n})}} placeholder="联系人" /><input className="w-full bg-transparent outline-none text-center text-[10px] font-mono font-black text-slate-400 focus:bg-white rounded" value={proj.phone} onChange={e => { const n = [...formData.projects!]; n[idx].phone = e.target.value; setFormData({...formData, projects: n})}} placeholder="电话" /></div></td>
                                 <td className="px-2 py-4">
                                    <div className="flex items-center justify-center">
                                       {proj.workCertUrl ? (
                                         <div className="flex items-center space-x-2 p-2 bg-emerald-50 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-100 transition-all" onClick={() => window.open(proj.workCertUrl)}>
                                           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">业绩证明</span>
                                           <button onClick={(e) => { e.stopPropagation(); deleteWorkFile(idx); }} className="text-emerald-300 hover:text-red-500"><X size={12} strokeWidth={3}/></button>
                                         </div>
                                       ) : <button onClick={() => handleFileUploadTrigger('work', idx)} className="p-2.5 text-slate-300 hover:text-indigo-600 bg-slate-50 rounded-xl transition-all border border-slate-100" title="上传证明"><Plus size={18} /></button>}
                                    </div>
                                 </td>
                                 <td className="px-2 py-4 text-center"><button onClick={() => setFormData({...formData, projects: formData.projects?.filter((_, i) => i !== idx)})} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/prow:opacity-100"><Trash2 size={16}/></button></td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </section>
             </div>

             <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end space-x-4 shrink-0">
                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">取消编辑</button>
                <button onClick={handleSave} className="px-12 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all flex items-center"><Save size={18} className="mr-3" /> 保存并同步库</button>
             </div>
          </div>
        </div>
      )}

      {/* 头部布局 */}
      <div className="flex justify-between items-center text-left">
        <div className="flex items-center space-x-4">
           <div className={`p-3 text-white rounded-2xl shadow-xl bg-indigo-600 shadow-indigo-100`}>
             <Users size={24} />
           </div>
           <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">人员资质库</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic italic">Grid Expert Registry & Bidder Credentials Management</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border-2 border-slate-100 text-slate-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm">
            <Upload size={16} className="mr-2 text-indigo-600" /> 批量导入简历
          </button>
          <button onClick={openAddModal} className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center">
            <Plus size={16} className="mr-2" /> 新增主要人员
          </button>
        </div>
      </div>

      {/* 列表页检索栏 */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px] text-left">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-3xl">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input type="text" placeholder="快速检索姓名、证书、院校、专业或职称..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-white outline-none font-bold text-sm shadow-inner focus:border-indigo-600 transition-all" />
            </div>
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center active:scale-95"><Search size={18} className="mr-3" /> 开始检索人员</button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar-main">
          <table className="w-full text-left table-fixed border-collapse" style={{ width: '2800px' }}>
            <thead className="text-[10px] font-black text-white uppercase tracking-[0.15em] bg-slate-900 sticky top-0 z-20">
              <tr className="divide-x divide-white/5">
                <th className="px-6 py-8 w-[180px] sticky left-0 bg-slate-900 shadow-xl text-indigo-400 text-center">姓名 (拟任职)</th>
                <th className="px-6 py-8 w-[100px] text-center">年龄</th>
                <th className="px-6 py-8 w-[120px] text-center">最高学历</th>
                <th className="px-6 py-8 w-[180px]">技术职称</th>
                <th className="px-6 py-8 w-[320px]">院校及专业 (毕业年份)</th>
                <th className="px-6 py-8 w-[120px] text-center">总工龄</th>
                <th className="px-6 py-8 w-[150px] text-center text-emerald-400">类似工龄</th>
                <th className="px-6 py-8 w-[500px]">证书凭证状态 (Certificates)</th>
                <th className="px-6 py-8 w-[500px]">最近主要工作经历摘要 (Project History)</th>
                <th className="px-6 py-8 w-[180px] text-right sticky right-0 bg-slate-900 shadow-xl">档案操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {personnelList.filter(p => !searchQuery || p.name.includes(searchQuery)).map(p => (
                <tr key={p.id} className="hover:bg-indigo-50/50 transition-all group cursor-pointer text-[12px]" onClick={() => handleEdit(p)}>
                  <td className="px-6 py-6 font-black text-slate-800 sticky left-0 bg-white group-hover:bg-indigo-50/50 border-r border-slate-50 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">{p.name[0]}</div>
                      <div className="text-left">
                        <span className="block text-sm leading-none">{p.name}</span>
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter italic mt-1.5 block">{p.proposedPosition || '待定岗'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-600 text-center">{p.age}</td>
                  <td className="px-6 py-6 font-black text-indigo-600 text-center uppercase italic">{p.education}</td>
                  <td className="px-6 py-6 font-bold text-slate-700">{p.title}</td>
                  <td className="px-6 py-6"><div className="text-slate-600 italic"><p className="font-black text-slate-800 leading-none">{p.school}</p><p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter truncate">{p.major} ({p.gradDate}年毕)</p></div></td>
                  <td className="px-6 py-6 font-black text-slate-900 text-center">{p.years}年</td>
                  <td className="px-6 py-6 font-black text-emerald-600 text-center text-sm">{p.similarYears}年</td>
                  <td className="px-6 py-6"><div className="flex flex-wrap gap-1.5">{p.certs.map((c, i) => <span key={i} className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter flex items-center transition-all ${c.fileUrl ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400 border border-slate-200'}`} title={c.name}>{c.fileUrl && <ImageIcon size={8} className="mr-1" />}{c.name.split('（')[0].split('(')[0]}</span>)}{p.certs.length === 0 && <span className="text-slate-300 italic">暂未关联证书</span>}</div></td>
                  <td className="px-6 py-6"><div className="text-slate-500 italic truncate max-w-[480px]">{p.projects[0]?.projectName || '暂无项目记录'}</div></td>
                  <td className="px-6 py-6 text-right sticky right-0 bg-white group-hover:bg-indigo-50/50 border-l border-slate-50">
                    <div className="flex items-center justify-end space-x-2 opacity-40 group-hover:opacity-100 transition-all">
                       <button onClick={(e) => { e.stopPropagation(); setShowDocPreview(p); }} className="p-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm" title="导出预览"><FileDown size={16}/></button>
                       <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }} className="p-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm"><Edit3 size={16}/></button>
                       <button onClick={(e) => { e.stopPropagation(); if(confirm('确认删除人员档案？')) setPersonnelList(prev => prev.filter(i => i.id !== p.id)); }} className="p-2.5 bg-slate-100 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-main::-webkit-scrollbar { height: 10px; width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 12px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default PersonnelBaseView;
