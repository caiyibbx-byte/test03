import React, { useState, useMemo, useRef } from 'react';
import { 
  Users, Award, FileText, ChevronRight, BrainCircuit, 
  RefreshCw, Download, Save, 
  Search, X, Sparkles, Check,
  BadgeCheck, Zap, Layers,
  UserPlus, CheckCircle2,
  Plus, DatabaseZap,
  Bot, GraduationCap,
  Scale,
  FileDown,
  Trash2,
  ShieldCheck,
  Briefcase,
  Trophy,
  BookOpen,
  Image as ImageIcon,
  School,
  FileImage,
  Lock,
  Eye,
  ShieldAlert,
  CalendarDays,
  Coins,
  Building2,
  MapPin,
  ClipboardList,
  Info,
  ExternalLink,
  Target,
  History,
  FileCheck2,
  UserSearch,
  Type,
  List,
  ListOrdered,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  MessageSquarePlus,
  Paperclip,
  Send,
  Wand2,
  FileUp,
  FileStack,
  Medal,
  Activity,
  UserCheck
} from 'lucide-react';
import { BiddingTask, StaffUser, Personnel, ProjectExperience } from '../types';

interface BidWorkspaceViewProps {
  currentTask?: BiddingTask;
  currentUser: StaffUser | null;
}

interface TaskStatus {
  id: 'team' | 'exp' | 'content';
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  icon: any;
  color: string;
}

// --------------------------------------------------------------------------------
// 深度预览组件：项目业绩全案 (A4 Batch) - 这里的结构完全对齐“项目业绩库”
// --------------------------------------------------------------------------------
const ProjectFullDocumentMerged: React.FC<{ project: ProjectExperience }> = ({ project }) => (
  <div className="flex flex-col items-center space-y-12 mb-32 animate-in fade-in duration-700">
    {/* 第一页：基本情况表 */}
    <div className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border-2 border-slate-900 rounded text-[10px] font-black text-slate-900 italic uppercase">Experience Assets Registry</div>
      <h2 className="text-xl font-bold text-center mb-10 underline underline-offset-[12px] decoration-slate-900">项目基本情况表</h2>
      <table className="w-full border-collapse border border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr><td className="border border-black p-3 bg-slate-50 w-[140px] font-bold text-center">项目名称</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.projectName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目所在地</td><td className="border border-black p-3" colSpan={3}>{project.location}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人名称</td><td className="border border-black p-3" colSpan={3}>{project.clientName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人地址</td><td className="border border-black p-3" colSpan={3}>{project.clientAddress}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人电话</td><td className="border border-black p-3" colSpan={3}>{project.contact} / {project.phone}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">合同价格</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.amount} 万元</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">开工日期</td><td className="border border-black p-3" colSpan={3}>{project.signingDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">竣工日期</td><td className="border border-black p-3" colSpan={3}>{project.endDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[100px]">承担的工作</td><td className="border border-black p-3 align-top italic" colSpan={3}>{project.leaderExperience}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">工程质量</td><td className="border border-black p-3" colSpan={3}>{project.quality}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目负责人</td><td className="border border-black p-3" colSpan={3}>{project.leader}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[180px]">项目描述</td><td className="border border-black p-3 text-justify align-top font-sans text-[9pt] leading-relaxed" colSpan={3}>{project.content}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">其他说明</td><td className="border border-black p-3 italic text-slate-500" colSpan={3}>{project.remarks}</td></tr>
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40">
        <span className="text-[9pt] font-sans">GridBid AI 业绩管理系统</span>
        <span className="text-[9pt] font-sans italic">Profile Page</span>
      </div>
    </div>

    {/* 附件页：项目合同扫描件 */}
    {project.contractScanUrls?.map((url, i) => (
      <div key={`contract-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8 italic">附件一：项目合同扫描件 ({i + 1}/{project.contractScanUrls?.length})</h3>
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <img src={url} alt="contract" className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm" />
        </div>
        <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
          <span className="text-[9pt] font-sans italic">支撑资料：合同原件扫描第 {i + 1} 页</span>
          <span className="text-[9pt] font-sans">Project Evidence</span>
        </div>
      </div>
    ))}

    {/* 附件页：结算发票凭证 */}
    {project.invoiceUrls?.map((url, i) => (
      <div key={`invoice-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8 italic">附件二：结算发票凭证 ({i + 1}/{project.invoiceUrls?.length})</h3>
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <img src={url} alt="invoice" className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm" />
        </div>
        <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
          <span className="text-[9pt] font-sans italic">支撑资料：财务结算凭证第 {i + 1} 页</span>
          <span className="text-[9pt] font-sans">Financial Evidence</span>
        </div>
      </div>
    ))}

    {/* 附件页：发票查验截图 */}
    {project.invoiceVerifyUrls?.map((url, i) => (
      <div key={`verify-${i}`} className="relative bg-white shadow-2xl text-left font-serif p-[25mm] transition-all flex flex-col mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8 italic">附件三：发票查验截图 ({i + 1}/{project.invoiceVerifyUrls?.length})</h3>
        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <img src={url} alt="verify" className="max-w-full max-h-full object-contain border border-slate-100 shadow-sm" />
        </div>
        <div className="mt-8 pt-4 flex justify-between items-center opacity-40 border-t border-slate-50">
          <span className="text-[9pt] font-sans italic">支撑资料：税务系统查验结果第 {i + 1} 页</span>
          <span className="text-[9pt] font-sans">Compliance Verification</span>
        </div>
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 深度预览组件：人员资历全案 (A4 Batch) - 这里的结构完全对齐人员资质库
// --------------------------------------------------------------------------------
const PersonnelFullDocumentMerged: React.FC<{ person: Personnel }> = ({ person }) => (
  <div className="flex flex-col items-center space-y-12 mb-32 animate-in fade-in duration-700">
    {/* 第一页：个人简历表 */}
    <div className="relative bg-white shadow-2xl text-left font-serif p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border-2 border-indigo-900 rounded text-[10px] font-black text-indigo-900 italic uppercase">Credentials Registry Form</div>
      <h2 className="text-xl font-black text-center mb-8 tracking-wider italic uppercase underline underline-offset-[12px] decoration-indigo-900">拟任本项目主要人员简历表</h2>
      <table className="w-full border-collapse border-[1.5px] border-black text-[10pt] leading-[1.7]">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">姓 名</td>
            <td className="border border-black p-2 text-center w-[120px] font-bold">{person.name}</td>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">年 龄</td>
            <td className="border border-black p-2 text-center w-[80px]">{person.age}</td>
            <td className="border border-black p-2 bg-slate-50 w-[130px] font-bold text-center italic leading-tight">执业资格/岗位证书</td>
            <td className="border border-black p-2 align-top text-[9pt] italic">
              {person.certs.map((c, i) => <div key={i}>● {c.name}</div>)}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">职 称</td>
            <td className="border border-black p-2 text-center">{person.title}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">学 历</td>
            <td className="border border-black p-2 text-center">{person.education}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic leading-tight">拟在本项目任职</td>
            <td className="border border-black p-2 text-center font-black text-indigo-700 uppercase italic">{person.proposedPosition}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">总工龄</td>
            <td className="border border-black p-2 text-center font-bold">{person.years} 年</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic" colSpan={2}>从事类似工作年限</td>
            <td className="border border-black p-2 text-center font-black text-emerald-700" colSpan={2}>{person.similarYears} 年</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">毕业学校</td>
            <td className="border border-black p-3 text-center" colSpan={5}>
              {person.gradDate} 年毕业于 <span className="font-bold underline">{person.school}</span> {person.major} 专业
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-200 font-black text-center uppercase tracking-widest" colSpan={6}>主 要 工 作 经 历 (近三年代表性项目)</td>
          </tr>
          <tr className="bg-slate-50 text-[9pt] font-bold">
            <td className="border border-black p-2 text-center italic">时 间</td>
            <td className="border border-black p-2 text-center italic" colSpan={3}>参加过的类似项目名称</td>
            <td className="border border-black p-2 text-center italic">担任职务</td>
            <td className="border border-black p-2 text-center italic">发包方及联系方式</td>
          </tr>
          {person.projects.map((proj, idx) => (
            <tr key={idx}>
              <td className="border border-black p-2 text-center text-[9pt] font-mono">{proj.time}</td>
              <td className="border border-black p-2 text-[9pt] leading-relaxed italic" colSpan={3}>{proj.projectName}</td>
              <td className="border border-black p-2 text-center text-[9pt] font-bold">{proj.role}</td>
              <td className="border border-black p-2 text-center text-[8pt]">
                <div className="font-bold">{proj.client}</div>
                <div className="text-slate-500 mt-1">{proj.contact} ({proj.phone})</div>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 10 - person.projects.length) }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black p-2"></td><td className="border border-black p-2" colSpan={3}></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 italic">
        <span className="text-[8pt] font-sans">GridBid AI 核心人才资历管理系统</span>
        <span className="text-[8pt] font-sans">Page 1: Personnel Profile</span>
      </div>
    </div>

    {/* 附件页：学历证书 */}
    {person.educations.some(e => e.gradCertUrl || e.degreeCertUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-black border-l-4 border-indigo-900 pl-4 mb-10 italic uppercase">Annex I: Education & Degree Certificates</h3>
        <div className="space-y-12">
          {person.educations.map((edu, i) => (
            <div key={i} className="space-y-6">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm">学历层次：{edu.level}（{edu.school} / {edu.major}）</div>
              <div className="grid grid-cols-2 gap-10">
                {edu.gradCertUrl && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">毕业证书扫描件</p>
                    <div className="border border-slate-100 shadow-xl rounded-2xl overflow-hidden p-4 bg-slate-50/30">
                      <img src={edu.gradCertUrl} className="w-full object-contain" alt="grad cert" />
                    </div>
                  </div>
                )}
                {edu.degreeCertUrl && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">学位证书扫描件</p>
                    <div className="border border-slate-100 shadow-xl rounded-2xl overflow-hidden p-4 bg-slate-50/30">
                      <img src={edu.degreeCertUrl} className="w-full object-contain" alt="degree cert" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* 附件页：执业证书 */}
    {person.certs.some(c => c.fileUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-black border-l-4 border-indigo-900 pl-4 mb-10 italic uppercase">Annex II: Professional Qualification Certificates</h3>
        <div className="grid grid-cols-2 gap-10">
          {person.certs.filter(c => c.fileUrl).map((cert, i) => (
            <div key={i} className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                 <p className="text-xs font-black text-slate-900 italic">{cert.name}</p>
                 <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase">Certificate No: {cert.number}</p>
              </div>
              <div className="border border-slate-100 shadow-xl rounded-2xl overflow-hidden p-4 bg-slate-50/30">
                 <img src={cert.fileUrl} className="w-full object-contain" alt="cert file" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* 附件页：业绩证明 */}
    {person.projects.some(p => p.workCertUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-black border-l-4 border-indigo-900 pl-4 mb-10 italic uppercase">Annex III: Project Experience Verification Documents</h3>
        <div className="space-y-16">
          {person.projects.filter(p => p.workCertUrl).map((proj, i) => (
            <div key={i} className="space-y-6">
              <div className="border-l-8 border-indigo-600 pl-6 py-2">
                 <p className="text-base font-black text-slate-900 italic tracking-tight">{proj.projectName}</p>
                 <p className="text-xs font-bold text-indigo-500 mt-2 italic uppercase">Evidence for Period: {proj.time}</p>
              </div>
              <div className="flex justify-center">
                 <img src={proj.workCertUrl} className="max-w-[75%] border border-slate-200 shadow-2xl rounded-3xl" alt="work proof" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// --------------------------------------------------------------------------------
// 人员深度详情模态框：完全对齐资质库字段
// --------------------------------------------------------------------------------
const PersonnelDetailModal: React.FC<{ person: Personnel; onClose: () => void }> = ({ person, onClose }) => {
  const Section = ({ icon: Icon, title, children }: any) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <Icon size={16} className="text-indigo-400" />
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, color = "text-slate-300" }: any) => (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</p>
      <p className={`font-bold ${color}`}>{value || '--'}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/20 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500 text-left">
        <div className="px-10 py-8 border-b border-white/5 flex items-start justify-between bg-white/5 shrink-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 shrink-0">
              <UserCheck size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-500/30">ID: {person.id}</span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-lg uppercase tracking-widest">当前负载: {person.currentLoad * 100}%</span>
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{person.name} <span className="text-slate-500 text-lg ml-2 font-medium not-italic">/ {person.title}</span></h3>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-dark">
          <Section icon={ClipboardList} title="基本信息与职业履历 (Identity)">
             <InfoItem label="年龄" value={`${person.age} 岁`} />
             <InfoItem label="拟任岗位" value={person.proposedPosition} color="text-indigo-400" />
             <InfoItem label="总工龄" value={`${person.years} 年`} />
             <InfoItem label="类似工作年限" value={`${person.similarYears} 年`} color="text-emerald-400" />
          </Section>

          <Section icon={School} title="教育背景 (Education)">
             {person.educations.map((edu, i) => (
               <div key={i} className="col-span-2 grid grid-cols-3 gap-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                 <InfoItem label="学校" value={edu.school} />
                 <InfoItem label="专业" value={edu.major} />
                 <InfoItem label="毕业年份" value={edu.gradDate} />
               </div>
             ))}
          </Section>

          <Section icon={Medal} title="执业资格与岗位证书 (Certificates)">
             <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.certs.map((cert, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{cert.authority} 颁发</p>
                      <p className="font-bold text-white text-sm">{cert.name}</p>
                      <p className="text-[9px] font-mono text-slate-400 mt-1">NO: {cert.number}</p>
                    </div>
                  </div>
                ))}
             </div>
          </Section>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
              <ImageIcon size={16} className="text-emerald-400" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">全量档案图档附件 (Evidence Scans)</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {person.educations.map((edu, i) => edu.gradCertUrl && (
                <div key={`edu-${i}`} className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase text-center">学历证书 #{i+1}</p>
                  <div className="aspect-[3/4] bg-black/40 rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in">
                    <img src={edu.gradCertUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="grad cert" />
                  </div>
                </div>
              ))}
              {person.certs.map((cert, i) => cert.fileUrl && (
                <div key={`cert-${i}`} className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase text-center">执业资格证 #{i+1}</p>
                  <div className="aspect-[3/4] bg-black/40 rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in">
                    <img src={cert.fileUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="cert" />
                  </div>
                </div>
              ))}
              {person.projects.map((proj, i) => proj.workCertUrl && (
                <div key={`proj-${i}`} className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase text-center">业绩证明 #{i+1}</p>
                  <div className="aspect-[3/4] bg-black/40 rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in">
                    <img src={proj.workCertUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="project proof" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 border-t border-white/5 flex justify-end shrink-0">
          <button onClick={onClose} className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">关闭人员档案</button>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// 深度详情模态框：项目业绩详情
// --------------------------------------------------------------------------------
const ProjectDetailModal: React.FC<{ project: ProjectExperience; onClose: () => void }> = ({ project, onClose }) => {
  const Section = ({ icon: Icon, title, children }: any) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <Icon size={16} className="text-blue-400" />
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, color = "text-slate-300" }: any) => (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</p>
      <p className={`font-bold ${color}`}>{value || '--'}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/20 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500 text-left">
        <div className="px-10 py-8 border-b border-white/5 flex items-start justify-between bg-white/5 shrink-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 shrink-0">
              <Trophy size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-500/30">ID: {project.id}</span>
                <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-widest">{project.projectType}</span>
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">{project.projectName}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-dark">
          <Section icon={ClipboardList} title="档案目录与身份 (Registry)">
             <InfoItem label="签订年份" value={project.contractYear} />
             <InfoItem label="合同金额" value={`${project.amount} 万元`} color="text-emerald-400" />
             <InfoItem label="验收质量" value={project.quality} color="text-amber-400" />
             <InfoItem label="当前状态" value={project.contractStatus} />
          </Section>
          <Section icon={Building2} title="发包单位与实施地 (Entity)">
             <InfoItem label="建设单位 (发包人)" value={project.clientName} />
             <InfoItem label="发包人地址" value={project.clientAddress} />
             <InfoItem label="联系人 / 电话" value={`${project.contact} (${project.phone})`} />
             <InfoItem label="实施所在地" value={project.location} />
          </Section>
          <Section icon={CalendarDays} title="时间维度 (Timeline)">
             <InfoItem label="合同签订时间" value={project.signingDate} />
             <InfoItem label="竣工验收时间" value={project.endDate} />
          </Section>
          <Section icon={UserPlus} title="执行团队 (Team)">
             <InfoItem label="项目负责人" value={project.leader} />
             <div className="col-span-1 md:col-span-2 space-y-1.5 mt-2">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">负责人具体承担工作</p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 italic text-sm text-slate-300 leading-relaxed">{project.leaderExperience}</div>
             </div>
             <InfoItem label="团队成员构成" value={project.members} />
             <div className="col-span-1 md:col-span-2 space-y-1.5 mt-2">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">项目整体描述</p>
                <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-sm text-slate-300 leading-relaxed">{project.content}</div>
             </div>
          </Section>
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
              <ImageIcon size={16} className="text-emerald-400" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">全量原始图档凭证 (Evidences)</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.contractScanUrls?.map((url, i) => (
                <div key={`c-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">合同扫描件 #{i+1}</p>
                   <div className="aspect-[3/4] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="contract" />
                   </div>
                </div>
              ))}
              {project.invoiceUrls?.map((url, i) => (
                <div key={`i-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">结算发票凭证</p>
                   <div className="aspect-[4/3] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="invoice" />
                   </div>
                </div>
              ))}
              {project.invoiceVerifyUrls?.map((url, i) => (
                <div key={`v-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">税务查验截图</p>
                   <div className="aspect-[4/3] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="verify" />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 bg-white/5 border-t border-white/5 flex justify-end shrink-0">
          <button onClick={onClose} className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">关闭预览</button>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// 主工作空间组件
// --------------------------------------------------------------------------------
const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser }) => {
  // 全量数据库快照
  const fullPersonnelPool: Personnel[] = [
    { id: 's-huang', name: '黄石亮', age: 40, education: '本科', title: '高级顾问', proposedPosition: '咨询顾问', years: 17, similarYears: 15, school: '中山大学', major: '计算机科学与技术', gradDate: '2013', currentLoad: 0.6, educations: [{ level: '本科', school: '中山大学', major: '计算机科学与技术', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=Graduation+Certificate', degreeCertUrl: 'https://placehold.co/800x600?text=Degree+Certificate' }], certs: [{ name: 'PMP证书', level: '高级', authority: 'PMI', number: 'PMP-123', validity: '2027', fileUrl: 'https://placehold.co/600x800?text=PMP+Cert' }], projects: [{ time: '2022', projectName: '南网科技创新管理咨询', serviceType: '管理咨询', role: '负责人', client: '南网', contact: '游XX', phone: '156...', workCertUrl: 'https://placehold.co/600x800?text=Project+Proof' }] },
    { id: 's-zhang-wei', name: '张维国', age: 45, education: '博士', title: '教授级高工', proposedPosition: '技术总监', years: 22, similarYears: 18, school: '清华大学', major: '电力系统自动化', gradDate: '2008', currentLoad: 0.4, educations: [{ level: '博士', school: '清华大学', major: '电力系统自动化', gradDate: '2008', gradCertUrl: 'https://placehold.co/800x600?text=Tsinghua+PhD+Grad' }], certs: [{ name: '注册电气工程师', level: '执业资格', authority: '人社部', number: 'DG-001', validity: '2028', fileUrl: 'https://placehold.co/600x800?text=EE+Cert' }], projects: [{ time: '2021', projectName: '±800kV特高压运维系统', serviceType: '运维', role: '总监', client: '国网', contact: '王主任', phone: '010...', workCertUrl: 'https://placehold.co/600x800?text=UHV+Project+Proof' }] },
    { id: 's-li-ming', name: '李明', age: 38, education: '硕士', title: '高级架构师', proposedPosition: '架构负责人', years: 15, similarYears: 12, school: '西安交通大学', major: '软件工程', gradDate: '2012', currentLoad: 0.3, educations: [{ level: '硕士', school: '西安交大', major: '软件工程', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=XJTU+Master+Grad' }], certs: [{ name: 'AWS 架构师', level: '专家', authority: 'Amazon', number: 'AWS-123', validity: '2025', fileUrl: 'https://placehold.co/600x800?text=AWS+Arch+Cert' }], projects: [{ time: '2023', projectName: '数字化审计平台', serviceType: '软件研发', role: '首席架构', client: '国网新源', contact: '李工', phone: '138...', workCertUrl: 'https://placehold.co/600x800?text=Digital+Audit+Proof' }] },
    { id: 's-wang-fang', name: '王芳', age: 34, education: '本科', title: '注册造价师', proposedPosition: '造价经理', years: 12, similarYears: 10, school: '华北电力大学', major: '工程造造价', gradDate: '2012', currentLoad: 0.5, educations: [{ level: '本科', school: '华北电力', major: '工程造价', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=NCEPU+Grad' }], certs: [{ name: '一级造价工程师', level: '执业资格', authority: '住建部', number: 'ZJ-120', validity: '2026', fileUrl: 'https://placehold.co/600x800?text=Cost+Engineer+Cert' }], projects: [{ time: '2022', projectName: '蒙东电力造价咨询', serviceType: '造价咨询', role: '负责人', client: '内蒙古电力', contact: '赵科', phone: '0471...', workCertUrl: 'https://placehold.co/600x800?text=Cost+Consulting+Proof' }] },
    { id: 's-zhao-chen', name: '赵晨', age: 41, education: '本科', title: '高级安评师', proposedPosition: '安质负责人', years: 18, similarYears: 16, school: '武汉大学', major: '安全工程', gradDate: '2006', currentLoad: 0.2, educations: [{ level: '本科', school: '武汉大学', major: '安全工程', gradDate: '2006' }], certs: [{ name: '注册安全工程师', level: '执业资格', authority: '应急部', number: 'AQ-045', validity: '2027', fileUrl: 'https://placehold.co/600x800?text=Safety+Officer+Cert' }], projects: [{ time: '2022', projectName: '江苏电力安全评价', serviceType: '安全评估', role: '总监', client: '江苏电力', contact: '孙处', phone: '135...', workCertUrl: 'https://placehold.co/600x800?text=Safety+Project+Proof' }] },
    { id: 's-liu-yang', name: '刘洋', age: 31, education: '本科', title: '中级工程师', proposedPosition: '实施组长', years: 8, similarYears: 6, school: '电子科技大学', major: '通信工程', gradDate: '2016', currentLoad: 0.8, educations: [{ level: '本科', school: '电子科大', major: '通信工程', gradDate: '2016', gradCertUrl: 'https://placehold.co/800x600?text=UESTC+Grad' }], certs: [{ name: '通信工程师', level: '中级', authority: '工信部', number: 'TX-033', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=Comm+Engineer+Cert' }], projects: [{ time: '2024', projectName: '海南输电视频覆盖', serviceType: '工程实施', role: '组长', client: '海南电网', contact: '林经理', phone: '133...', workCertUrl: 'https://placehold.co/600x800?text=Field+Project+Proof' }] }
  ];

  const fullProjectPool: ProjectExperience[] = [
    { id: 'p1', contractYear: '2021', index: 1, projectType: '营销服务类', projectName: '海口供电局2021年客服满意度及优化营商环境宣传项目', keywords: ['营商环境', '满意度'], amount: '61.0', signingDate: '2021-10', endDate: '2021-12', clientName: '海口供电局', clientAddress: '海南省海口市海甸岛五西路', location: '海南省海口市', quality: '优', leader: '黄石亮', leaderExperience: '项目总负责，统筹创意策划与成片交付，对接供电局营销部。', content: '设计24节气海报、编制10期优化营商环境故事漫画、拍摄主题微电影及电力人宣传片。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P1'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P1'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P1'], contractStatus: '已完成', extendedKeywords: [], members: '策划组、摄影组', memberExperience: '', phone: '186-XXXX-6460', contact: '张主任', remarks: '' },
    { id: 'p2', contractYear: '2022', index: 2, projectType: '变电站工程类', projectName: '广州供电局220kV天河站数字化改造EPC总承包项目', keywords: ['变电站', '数字化改造'], amount: '1280.5', signingDate: '2022-03', endDate: '2022-12', clientName: '广州供电局', clientAddress: '广州市天河区华穗路', location: '广东省广州市', quality: '优', leader: '王志强', leaderExperience: 'EPC项目经理，全盘协调设计、采购及施工进度，攻克不停电改造技术难题。', content: '对天河变电站全站二次设备数字化升级，涵盖保护监控系统、智能辅助监控系统安装调试。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P2'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P2'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P2'], contractStatus: '已完成', extendedKeywords: [], members: '二次保护组、通信调试组', memberExperience: '', phone: '139-XXXX-XXXX', contact: '陈经理', remarks: '' },
    { id: 'p3', contractYear: '2023', index: 3, projectType: '技术服务类', projectName: '深圳供电局2023年输电线路无人机巡检算法外包服务', keywords: ['无人机', 'AI巡检'], amount: '185.0', signingDate: '2023-01', endDate: '2023-12', clientName: '深圳供电局', clientAddress: '深圳市罗湖区深南东路', location: '广东省深圳市', quality: '合格', leader: '刘思源', leaderExperience: '技术负责人，主持深度学习模型训练与部署，实现识别准确率由80%提升至92%。', content: '针对输电鸟巢、销钉脱落、绝缘子破损的AI自动识别模型开发，并提供年度巡检数据处理。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P3'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P3'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P3'], contractStatus: '履行中', extendedKeywords: [], members: '算法小组', memberExperience: '', phone: '137-XXXX-XXXX', contact: '林主管', remarks: '' },
    { id: 'p4', contractYear: '2020', index: 4, projectType: '营销服务类', projectName: '海南电网三亚供电局2020年智慧营业厅建设及运营项目', keywords: ['智慧营业厅', '办电终端'], amount: '320.0', signingDate: '2020-05', endDate: '2020-11', clientName: '三亚供电局', clientAddress: '三亚市吉阳区迎宾路', location: '海南省三亚市', quality: '优', leader: '吴海洋', leaderExperience: '项目总监，负责空间设计审核、硬件集成管理及交互流程优化，获评南网年度示范。', content: '对三亚核心营业厅数字化改造，部署智能导览机器人、VR互动区及全自助办电终端。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P4'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P4'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P4'], contractStatus: '已完成', extendedKeywords: [], members: '设计室、集成部', memberExperience: '', phone: '189-XXXX-XXXX', contact: '赵科长', remarks: '' },
    { id: 'p5', contractYear: '2021', index: 5, projectType: '技术服务类', projectName: '海南电网公司电力调度中心网络安全态势感知运维', keywords: ['网络安全', '态派感知'], amount: '145.0', signingDate: '2021-06', endDate: '2022-06', clientName: '海南电网', clientAddress: '海口市海府路', location: '海南省海口市', quality: '优', leader: '李明伟', leaderExperience: '安全运维总长，建立主动防御体系，圆满完成重大保电期间的网络安全保障任务。', content: '提供7x24小时网络安全监控、漏洞扫描、基线核查及应急演练，保障调度大楼内网资产安全。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P5'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P5'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P5'], contractStatus: '已完成', extendedKeywords: [], members: 'SOC团队', memberExperience: '', phone: '150-XXXX-XXXX', contact: '孙工', remarks: '' }
  ];

  // 状态管理
  const [phase, setPhase] = useState<'hub' | 'task' | 'team_preview' | 'exp_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<ProjectExperience[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [expAiRecommendations, setExpAiRecommendations] = useState<any[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // 详情查看状态
  const [viewDetailProject, setViewDetailProject] = useState<ProjectExperience | null>(null);
  const [viewDetailPersonnel, setViewDetailPersonnel] = useState<Personnel | null>(null);

  // 技术方案编撰状态
  const [draftContent, setDraftContent] = useState<string>(`# 技术响应方案预览\n\n## 第一章：项目整体思路\n针对本项目，我们将采用模块化设计理念...\n\n## 第二章：关键技术路线\n基于 GridGPT 核心引擎，实现电网数据的深度挖掘...`);
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: '您好！我是您的技术标编撰助理。您可以要求我生成特定章节、优化措辞或根据招标文件要求进行合规性对齐。' }
  ]);
  const [referenceDocs, setReferenceDocs] = useState<{ name: string, type: string }[]>([
    { name: '企业标准化技术模板_v2.pdf', type: 'PDF' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  const handleExpAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setExpAiRecommendations([
        { project: fullProjectPool[2], reason: '该项目包含“无人机AI巡检”与本项目高度语义重合。', matchScore: 98 },
        { project: fullProjectPool[4], reason: '态势感知运维业绩可有力证明我司在电网生产数字化系统稳定性保障方面的实力。', matchScore: 91 }
      ]);
      setIsAiRecommending(false);
    }, 1500);
  };

  const handleTeamAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiRecommendations([
        { person: fullPersonnelPool[1], reason: '清华博士，具备18年特高压研发背景，完美覆盖招标文件中的高级架构师需求。', matchScore: 99 },
        { person: fullPersonnelPool[2], reason: '高级架构师，曾主导同类型数字化审计平台研发，技术适配性极佳。', matchScore: 95 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  const handleAiChatSend = () => {
    if (!aiChatInput.trim()) return;
    const newMsgs = [...aiChatMessages, { role: 'user', text: aiChatInput } as const];
    setAiChatMessages(newMsgs);
    setAiChatInput('');
    setIsAiRecommending(true);
    setTimeout(() => {
      const assistantMsg = { 
        role: 'assistant' as const, 
        text: `已根据您的要求“${aiChatInput}”对技术路线进行了优化。主要增加了对南网数字电网规范的响应，并补全了第三章的分布式架构细节。` 
      };
      setAiChatMessages([...newMsgs, assistantMsg]);
      setIsAiRecommending(false);
    }, 1200);
  };

  const handleUploadRefDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fix: Explicitly cast the result of Array.from to File[] to avoid 'unknown' type inference
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      const newDocs = files.map(file => ({
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
      }));
      setReferenceDocs(prev => [...prev, ...newDocs]);
    }
  };

  const toggleProject = (p: ProjectExperience) => setSelectedProjects(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);
  const togglePerson = (p: Personnel) => setSelectedPersonnel(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);

  const handleStartTask = (taskId: 'team' | 'exp' | 'content') => {
    setActiveTaskId(taskId);
    setPhase('task');
    setTasks(prev => prev.map(t => t.id === taskId && t.status === 'pending' ? { ...t, status: 'processing', progress: 30 } : t));
  };

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));
    setPhase('hub');
    setActiveTaskId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 text-left">
      {/* 全屏详情模态框挂载 */}
      {viewDetailProject && <ProjectDetailModal project={viewDetailProject} onClose={() => setViewDetailProject(null)} />}
      {viewDetailPersonnel && <PersonnelDetailModal person={viewDetailPersonnel} onClose={() => setViewDetailPersonnel(null)} />}

      <header className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg"><Layers size={24} /></div>
          <div><h3 className="text-sm font-black text-slate-900 uppercase italic leading-none">Bidding Authoring Workshop V3.1</h3><p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest italic">Intelligent collaborative workspace</p></div>
        </div>
        {phase !== 'hub' && <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors"><Trash2 size={18} className="mr-2" /> 退出环节</button>}
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in duration-700">
             {tasks.map(task => (
               <div key={task.id} className={`relative h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 'border-slate-50 shadow-sm'}`}>
                  <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 ${task.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'}`}><task.icon size={48} /></div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8"><div className={`h-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div></div>
                  <button onClick={() => handleStartTask(task.id)} className="px-12 py-4 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">{task.status === 'completed' ? '重新校阅' : '进入环节'}</button>
               </div>
             ))}
          </div>
        )}

        {/* 成员拟定环节 - 对齐人员资质库 */}
        {phase === 'task' && activeTaskId === 'team' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-indigo-600 shadow-indigo-100"><Users size={24}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">拟定团队成员名单</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Consistent profile tracking with asset registry</p></div>
                </div>
                <div className="flex space-x-4">
                  {selectedPersonnel.length > 0 && <button onClick={() => setPhase('team_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">生成资历全案预览 ({selectedPersonnel.length} 人)</button>}
                  <button onClick={() => markTaskCompleted('team')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"><CheckCircle2 size={18} className="mr-3 inline" /> 确认锁定项目团队</button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main bg-white">
                <div className="grid grid-cols-5 gap-12">
                   <div className="col-span-3 space-y-12">
                      <section>
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center italic"><Bot size={28} className="text-blue-600 mr-4" /><h4 className="text-sm font-black text-slate-900 uppercase">GridGPT 成员匹配引擎</h4></div>
                            <button onClick={handleTeamAiRecommend} disabled={isAiRecommending} className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl disabled:opacity-50">
                               {isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}启动专家画像匹配
                            </button>
                         </div>
                         <div className="space-y-6">
                            {aiRecommendations.map((rec, idx) => {
                              const p = rec.person;
                              const isSelected = selectedPersonnel.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className="p-8 rounded-[48px] border-2 border-indigo-50 bg-indigo-50/20 flex flex-col relative overflow-hidden group animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                                   <div className="absolute top-0 right-0 px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-black uppercase rounded-bl-[32px] italic tracking-[0.2em] shadow-lg flex items-center">
                                      <Zap size={12} className="mr-2 text-amber-300 animate-pulse" /> 专家画像匹配度 {rec.matchScore}%
                                   </div>
                                   <div className="flex items-center space-x-6 mb-8 text-left">
                                      <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center shrink-0 border border-indigo-100 font-black text-3xl text-indigo-600 group-hover:scale-110 transition-transform">{p.name[0]}</div>
                                      <div className="flex-1 min-w-0">
                                         <p className="text-2xl font-black text-slate-900 italic tracking-tighter leading-tight mb-2 truncate">{p.name}</p>
                                         <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[9px] font-black rounded uppercase italic">拟任：{p.proposedPosition}</span>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-black rounded uppercase italic">总工龄：{p.years}年</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase italic">{p.education} · {p.title}</span>
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase italic">院校：{p.school}</span>
                                         </div>
                                      </div>
                                   </div>
                                   <div className="bg-white/80 p-5 rounded-3xl border border-indigo-100 mb-8">
                                      <p className="text-[10px] text-indigo-700 font-bold italic leading-relaxed"><Sparkles size={14} className="inline mr-2" />推荐逻辑：{rec.reason}</p>
                                   </div>
                                   <div className="flex space-x-3">
                                      <button onClick={() => setViewDetailPersonnel(p)} className="flex-1 py-4 bg-slate-50 text-slate-500 hover:bg-white hover:text-indigo-600 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center"><Eye size={16} className="mr-2"/>查看库内档案与原始图档</button>
                                      <button onClick={() => togglePerson(p)} className={`flex-[1.5] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all ${isSelected ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{isSelected ? '已进入候选团队' : '指派至项目'}</button>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>

                      <section>
                         <div className="flex items-center space-x-4 mb-8"><div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-100"><Search size={20} /></div><h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">全库手动检索与指派</h4></div>
                         <div className="relative mb-8"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} /><input value={staffSearchQuery} onChange={e => setStaffSearchQuery(e.target.value)} placeholder="检索专家姓名、执业证书、专业、院校、职称..." className="w-full pl-12 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none rounded-[28px] font-bold text-lg shadow-inner focus:bg-white transition-all" /></div>
                         <div className="space-y-4 max-h-[600px] overflow-y-auto p-2 custom-scrollbar-main">
                            {fullPersonnelPool.filter(p => !staffSearchQuery || p.name.includes(staffSearchQuery) || p.school.includes(staffSearchQuery) || p.title.includes(staffSearchQuery)).map(p => {
                              const isSelected = selectedPersonnel.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className={`p-6 rounded-[32px] border-2 transition-all flex flex-col group ${isSelected ? 'border-indigo-600 bg-indigo-50/20 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-white'}`}>
                                   <div className="flex justify-between items-start mb-6">
                                      <div className="flex items-center space-x-5">
                                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-md transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>{p.name[0]}</div>
                                         <div className="text-left">
                                            <p className="text-lg font-black text-slate-900 italic leading-none mb-1.5">{p.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.title} · {p.years}年经验</p>
                                         </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                         <button onClick={() => setViewDetailPersonnel(p)} className="p-3 bg-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all" title="查看档案详情"><Info size={18}/></button>
                                         <button onClick={() => togglePerson(p)} className={`p-3 rounded-xl transition-all shadow-sm ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50'}`}>{isSelected ? <Check size={18} strokeWidth={4}/> : <Plus size={18}/>}</button>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-4 gap-6 pt-6 border-t border-slate-50 text-left">
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">毕业院校</span><span className="text-[11px] font-black text-slate-700 italic truncate block">{p.school}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">学历/专业</span><span className="text-[11px] font-black text-indigo-600 block">{p.education}/{p.major}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">当前任务负载</span><span className="text-[11px] font-black text-slate-700 block">{p.currentLoad * 100}%</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">总/类工龄</span><span className="text-[11px] font-black text-emerald-600 block">{p.years}/{p.similarYears}年</span></div>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>
                   </div>

                   <div className="col-span-2">
                      <div className="bg-slate-950 p-8 rounded-[56px] min-h-[600px] flex flex-col shadow-2xl border border-white/10 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent pointer-events-none" />
                         <div className="flex items-center justify-between mb-10 relative z-10 text-white"><div className="flex items-center space-x-3 italic"><UserPlus size={20} className="text-indigo-400" /><h4 className="text-sm font-black uppercase tracking-tighter">选定项目实施团队</h4></div><span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-indigo-400 border border-white/10 italic">{selectedPersonnel.length} 人</span></div>
                         <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 relative z-10">
                            {selectedPersonnel.map((p, idx) => (
                              <div key={p.id} className="p-5 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all animate-in slide-in-from-right">
                                 <div className="flex items-center space-x-4 min-w-0 flex-1"><div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg shrink-0">{idx + 1}</div><div className="text-left min-w-0"><p className="text-sm font-black text-white italic truncate">{p.name}</p><p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic">{p.proposedPosition}</p></div></div>
                                 <button onClick={() => togglePerson(p)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 业绩遴选环节 - 对齐“项目业绩库”预览表格 */}
        {phase === 'task' && activeTaskId === 'exp' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-emerald-600 shadow-emerald-100"><Briefcase size={24}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">筛选支撑项目业绩</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic italic">Strategic matching of corporate performance assets</p></div>
                </div>
                <div className="flex space-x-4">
                  {selectedProjects.length > 0 && <button onClick={() => setPhase('exp_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">生成并预览业绩支撑全案 ({selectedProjects.length})</button>}
                  <button onClick={() => markTaskCompleted('exp')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"><CheckCircle2 size={18} className="mr-3 inline" /> 提交锁定业绩</button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main bg-white">
                <div className="grid grid-cols-5 gap-12">
                   <div className="col-span-3 space-y-12">
                      <section>
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center italic"><Bot size={28} className="text-blue-600 mr-4" /><h4 className="text-sm font-black text-slate-900 uppercase">GridGPT 业绩匹配引擎推荐</h4></div>
                            <button onClick={handleExpAiRecommend} disabled={isAiRecommending} className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl disabled:opacity-50">
                               {isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}启动智能契合度分析
                            </button>
                         </div>
                         <div className="space-y-6">
                            {expAiRecommendations.map((rec, idx) => {
                              const p = rec.project;
                              const isSelected = selectedProjects.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className="p-8 rounded-[48px] border-2 border-blue-50 bg-blue-50/20 flex flex-col relative overflow-hidden group animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                                   <div className="absolute top-0 right-0 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-[32px] italic tracking-[0.2em] shadow-lg flex items-center">
                                      <Zap size={12} className="mr-2 text-amber-300 animate-pulse" /> 语义契合度 {rec.matchScore}%
                                   </div>
                                   <div className="flex items-start space-x-6 mb-8 text-left">
                                      <div className="w-16 h-16 rounded-[24px] bg-white shadow-xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform"><Trophy size={28} className="text-blue-600" /></div>
                                      <div className="flex-1 min-w-0">
                                         <p className="text-xl font-black text-slate-900 italic tracking-tighter leading-tight mb-2 pr-20 truncate">{p.projectName}</p>
                                         <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase italic">年份：{p.contractYear}</span>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-black rounded uppercase italic">金额：{p.amount}W</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase italic">{p.projectType}</span>
                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-black rounded uppercase italic">质量：{p.quality}</span>
                                         </div>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-8 mb-8">
                                      <div className="space-y-2">
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center"><Target size={12} className="mr-1.5" /> 核心实施内容</p>
                                         <p className="text-xs text-slate-600 leading-relaxed font-medium italic line-clamp-3">{p.content}</p>
                                      </div>
                                      <div className="space-y-2">
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center"><UserSearch size={12} className="mr-1.5" /> 负责人岗位职责</p>
                                         <p className="text-xs text-slate-600 leading-relaxed font-medium italic line-clamp-3">{p.leaderExperience}</p>
                                      </div>
                                   </div>
                                   <div className="bg-white/80 p-5 rounded-3xl border border-blue-100 mb-8">
                                      <p className="text-[10px] text-blue-700 font-bold italic leading-relaxed"><Sparkles size={14} className="inline mr-2" />推荐逻辑：{rec.reason}</p>
                                   </div>
                                   <div className="flex space-x-3">
                                      <button onClick={() => setViewDetailProject(p)} className="flex-1 py-4 bg-slate-50 text-slate-500 hover:bg-white hover:text-blue-600 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center"><Eye size={16} className="mr-2"/>查看库内完整档案及图档</button>
                                      <button onClick={() => toggleProject(p)} className={`flex-[1.5] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all ${selectedProjects.find(i => i.id === p.id) ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{isSelected ? '已加入标书业绩池' : '引用此项目至标书'}</button>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>

                      <section>
                         <div className="flex items-center space-x-4 mb-8"><div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-100"><Search size={20} /></div><h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">全业绩资产库手动精选</h4></div>
                         <div className="relative mb-8"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} /><input value={projectSearchQuery} onChange={e => setProjectSearchQuery(e.target.value)} placeholder="搜索项目全称、发包人、负责人或关键字..." className="w-full pl-12 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-600 outline-none rounded-[28px] font-bold text-lg shadow-inner focus:bg-white transition-all" /></div>
                         <div className="space-y-4 max-h-[600px] overflow-y-auto p-2 custom-scrollbar-main">
                            {fullProjectPool.filter(p => !projectSearchQuery || p.projectName.includes(projectSearchQuery) || p.clientName.includes(projectSearchQuery)).map(p => {
                              const isSelected = selectedProjects.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className={`p-6 rounded-[32px] border-2 transition-all flex flex-col group ${isSelected ? 'border-emerald-600 bg-emerald-50/20 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-white'}`}>
                                   <div className="flex justify-between items-start mb-6">
                                      <div className="text-left pr-10">
                                         <p className="text-lg font-black text-slate-900 italic leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{p.projectName}</p>
                                         <div className="flex flex-wrap gap-2">{p.keywords.map((k, i) => <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-black rounded uppercase italic">{k}</span>)}</div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                         <button onClick={() => setViewDetailProject(p)} className="p-3 bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all" title="查看详情"><Info size={18}/></button>
                                         <button onClick={() => toggleProject(p)} className={`p-3 rounded-xl transition-all ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'}`}>{isSelected ? <Check size={18} strokeWidth={4}/> : <Plus size={18}/>}</button>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-4 gap-6 pt-6 border-t border-slate-50 text-left">
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">发包人 (单位)</span><span className="text-[11px] font-black text-slate-700 italic truncate block">{p.clientName}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">项目总额</span><span className="text-[11px] font-black text-emerald-600 block">{p.amount}W</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">负责人</span><span className="text-[11px] font-black text-slate-700 block">{p.leader}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">执行周期</span><span className="text-[11px] font-black text-slate-400 block">{p.contractYear}</span></div>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>
                   </div>

                   <div className="col-span-2">
                      <div className="bg-slate-950 p-8 rounded-[56px] min-h-[800px] flex flex-col shadow-2xl border border-white/10 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
                         <div className="flex items-center justify-between mb-10 relative z-10 text-white"><div className="flex items-center space-x-3 italic"><DatabaseZap size={20} className="text-emerald-400" /><h4 className="text-sm font-black uppercase tracking-tighter">标书支撑业绩池</h4></div><span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-emerald-400 border border-white/10 italic">已选 {selectedProjects.length} 项</span></div>
                         <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 relative z-10">
                            {selectedProjects.map((p, idx) => (
                              <div key={p.id} className="p-5 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all">
                                 <div className="flex items-center space-x-4 min-w-0 flex-1"><div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg shrink-0">{idx + 1}</div><div className="text-left min-w-0"><p className="text-sm font-black text-white italic truncate">{p.projectName}</p></div></div>
                                 <button onClick={() => toggleProject(p)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 技术方案编撰环节 - 保持 */}
        {phase === 'task' && activeTaskId === 'content' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-purple-600 shadow-purple-100"><FileText size={24}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">技术方案深度编撰</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Merging AI intelligence with professional drafting</p></div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex bg-white rounded-2xl border border-slate-200 p-1 shadow-sm mr-4">
                    {referenceDocs.slice(0, 2).map((doc, idx) => (
                      <div key={idx} className="flex items-center px-3 py-1.5 space-x-2 border-r border-slate-100 last:border-r-0">
                        <Paperclip size={12} className="text-slate-400" />
                        <span className="text-[9px] font-black text-slate-600 truncate max-w-[100px]">{doc.name}</span>
                      </div>
                    ))}
                    {referenceDocs.length > 2 && (
                      <div className="flex items-center px-3 py-1.5 text-[9px] font-black text-slate-400 border-r border-slate-100 italic">
                        +{referenceDocs.length - 2} items
                      </div>
                    )}
                    <button onClick={() => fileInputRef.current?.click()} className="px-4 py-1.5 text-[9px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 rounded-xl flex items-center transition-all">
                      <FileUp size={12} className="mr-1.5" /> 上传参考件
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleUploadRefDoc} multiple />
                  </div>
                  <button onClick={() => markTaskCompleted('content')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"><CheckCircle2 size={18} className="mr-3 inline" /> 完成并归档</button>
                </div>
             </div>

             <div className="flex-1 flex overflow-hidden">
                <div className="flex-[3] flex flex-col border-r border-slate-100 bg-white relative">
                   <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center space-x-4 overflow-x-auto shrink-0">
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Heading1 size={18}/></button><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Heading2 size={18}/></button></div>
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg bg-slate-100 text-slate-900"><Bold size={18}/></button><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Italic size={18}/></button></div>
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><List size={18}/></button><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><ListOrdered size={18}/></button></div>
                      <button className="ml-auto px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">全屏编排</button>
                   </div>
                   <div className="flex-1 p-16 overflow-y-auto custom-scrollbar-main font-serif bg-white selection:bg-blue-100">
                      <div className="max-w-[800px] mx-auto min-h-full">
                        <textarea className="w-full h-full min-h-[600px] text-xl leading-relaxed text-slate-800 bg-transparent border-none outline-none resize-none font-serif tracking-tight" value={draftContent} onChange={(e) => setDraftContent(e.target.value)} />
                      </div>
                   </div>
                   <div className="px-8 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest italic shrink-0">
                      <div className="flex items-center space-x-6"><span><Layers size={14} className="mr-2 inline"/> 字数统计: {draftContent.length} 字</span><span><RefreshCw size={14} className="mr-2 inline"/> 最后保存: 1分钟前</span></div>
                      <div className="flex items-center text-emerald-500"><ShieldCheck size={14} className="mr-1.5" /> 已通过本地合规性自检</div>
                   </div>
                </div>

                <div className="flex-[1.5] flex flex-col bg-slate-950 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none" />
                   <div className="px-8 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3 text-white"><div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/20"><Bot size={20} /></div><div><h4 className="text-xs font-black uppercase italic tracking-widest">GridGPT 文档助理</h4><p className="text-[8px] text-slate-500 font-bold uppercase mt-0.5 tracking-tighter">Powered by Technical Bid Engine</p></div></div>
                      <button className="p-2.5 bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all border border-white/5"><History size={16}/></button>
                   </div>
                   <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-dark relative z-10">
                      {aiChatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}>
                           <div className={`max-w-[85%] p-5 rounded-3xl text-[11px] leading-relaxed shadow-2xl relative ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none font-bold' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>
                             {msg.text}
                             {msg.role === 'assistant' && i !== 0 && (
                               <div className="mt-4 pt-4 border-t border-white/5 flex space-x-2">
                                  <button onClick={() => setDraftContent(draftContent + '\n\n' + '/* 新增生成内容片段 */\n' + msg.text)} className="flex-1 py-2 bg-white/10 hover:bg-purple-500 hover:text-white text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">插入编辑器</button>
                                  <button className="p-2 bg-white/5 text-slate-500 hover:text-white rounded-lg"><RefreshCw size={12}/></button>
                               </div>
                             )}
                           </div>
                        </div>
                      ))}
                      {isAiRecommending && <div className="flex justify-start animate-pulse"><div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none"><Wand2 size={20} className="text-purple-400 animate-spin" /></div></div>}
                   </div>
                   <div className="p-8 bg-slate-900/80 border-t border-white/5 relative z-10">
                      <div className="flex flex-col space-y-4">
                         <div className="flex flex-wrap gap-2 mb-2"><button onClick={() => setAiChatInput('请生成本项目第一章“整体实施思路”')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">生成整体思路</button><button onClick={() => setAiChatInput('对比招标文件，检查合规性')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">合规自检</button></div>
                         <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-purple-500/50 transition-all"><textarea value={aiChatInput} onChange={e => setAiChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAiChatSend())} placeholder="在此向 GridGPT 发送编撰指令..." className="flex-1 bg-transparent border-none outline-none text-white text-xs px-3 font-medium placeholder:text-slate-700 resize-none h-12 py-2" /><button onClick={handleAiChatSend} className="bg-purple-600 p-3 text-white rounded-xl hover:bg-purple-500 shadow-xl transition-all"><Send size={18} /></button></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 预览环节：业绩篇 - 深度对齐“项目业绩库” A4 Batch 预览 */}
        {phase === 'exp_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">放大</button>
                   </div>
                   <span className="text-xs font-bold text-emerald-400 flex items-center uppercase tracking-widest"><BadgeCheck size={18} className="mr-3" /> 标书支撑业绩全案合并预览 (Batch Export Preview)</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回修改</button>
                  <button className="flex items-center px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-emerald-900/40 transition-all"><FileDown size={18} className="mr-3" /> 导出合并业绩包 (.docx)</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth">
                  <div className="origin-top transition-all space-y-24" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedProjects.map((project) => <ProjectFullDocumentMerged key={project.id} project={project} />)}
                  </div>
              </div>
          </div>
        )}

        {/* 预览环节：人员篇 - 保持 */}
        {phase === 'team_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">放大</button>
                   </div>
                   <span className="text-xs font-bold text-indigo-400 flex items-center uppercase tracking-widest"><ShieldCheck size={18} className="mr-3" /> 团队成员资历全案批量预览 (Batch Merged Documents)</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回修改</button>
                  <button className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-indigo-900/40 transition-all"><FileDown size={18} className="mr-3" /> 导出资历全案包</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth">
                  <div className="origin-top transition-all space-y-24" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedPersonnel.map((person) => <PersonnelFullDocumentMerged key={person.id} person={person} />)}
                  </div>
              </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; }
        .custom-scrollbar-main::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;