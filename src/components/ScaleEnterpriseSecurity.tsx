import React from 'react';
import { ShieldCheck, Lock, Server, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScaleEnterpriseSecurityProps {
  onOpenDemo: (topic: string) => void;
}

export const ScaleEnterpriseSecurity: React.FC<ScaleEnterpriseSecurityProps> = ({ onOpenDemo }) => {
  const certifications = [
    { title: 'SOC 2 Type II', desc: 'Annual rigorous third-party audits of security, availability, and confidentiality.' },
    { title: 'ISO / IEC 27001', desc: 'Certified information security management systems governing all customer data.' },
    { title: 'FedRAMP High Ready', desc: 'Authorized infrastructure ready for the highest impact level government workloads.' },
    { title: 'HIPAA Compliant', desc: 'Business Associate Agreements (BAAs) and secure ePHI processing controls.' },
    { title: 'ITAR & Export Controlled', desc: 'US citizens only on dedicated US sovereign air-gapped enclaves.' },
    { title: 'GDPR & Privacy Shield', desc: 'Comprehensive data subject rights and zero unapproved data retention.' }
  ];

  return (
    <section id="enterprise" className="py-16 lg:py-24 bg-[#F5EEDD] border-t border-[#84B3CE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#84B3CE] bg-[#84B3CE]/15 text-[#16587B] text-xs font-bold tracking-widest uppercase mb-3">
            <span>ENTERPRISE COMPLIANCE & SECURITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16587B] tracking-tight">
            Security at Every Layer
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#16587B]/85">
            Your proprietary models and data are safeguarded with defense-grade enclaves, strict zero-data-retention policies, and industry-leading compliance.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#16587B] text-[#F5EEDD] p-6 rounded-xl border border-[#84B3CE]/50 shadow-md">
            <div className="p-2.5 rounded bg-[#0D3B53] text-[#84B3CE] w-fit mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Zero Data Retention (ZDR)</h3>
            <p className="text-xs text-[#F5EEDD]/80 leading-relaxed">
              We never use your proprietary data or customer interactions to train public models. Contractually guaranteed and technically enforced via ephemeral sandbox execution.
            </p>
          </div>

          <div className="bg-[#16587B] text-[#F5EEDD] p-6 rounded-xl border border-[#84B3CE]/50 shadow-md">
            <div className="p-2.5 rounded bg-[#0D3B53] text-[#84B3CE] w-fit mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Air-Gapped & VPC Deployment</h3>
            <p className="text-xs text-[#F5EEDD]/80 leading-relaxed">
              Deploy in your dedicated AWS, Azure, or GCP virtual private cloud (VPC), on-premise hardware, or disconnected classified defense networks.
            </p>
          </div>

          <div className="bg-[#16587B] text-[#F5EEDD] p-6 rounded-xl border border-[#84B3CE]/50 shadow-md">
            <div className="p-2.5 rounded bg-[#0D3B53] text-[#84B3CE] w-fit mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Vetted Security Clearances</h3>
            <p className="text-xs text-[#F5EEDD]/80 leading-relaxed">
              Human annotators and technical engineers undergo background checks, with dedicated TS/SCI cleared personnel for defense and sensitive IP programs.
            </p>
          </div>

        </div>

        {/* Certifications Grid */}
        <div className="border border-[#84B3CE]/60 rounded-xl bg-[#F5EEDD] p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#16587B]/70 mb-4 text-center">
            INDEPENDENT CERTIFICATIONS & COMPLIANCE FRAMEWORKS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded border border-[#84B3CE]/50 bg-[#84B3CE]/10">
                <div className="flex items-center gap-2 font-bold text-sm text-[#16587B] mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#16587B]" />
                  <span>{cert.title}</span>
                </div>
                <p className="text-xs text-[#16587B]/80 leading-snug">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenDemo('Security Whitepaper & Compliance Package')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#16587B] hover:underline cursor-pointer"
            >
              <span>Download Enterprise Security Whitepaper & SOC 2 Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
