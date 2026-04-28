"use client";

import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { teamPulse } from "@/lib/seed-data";

const DEPT_COLORS: Record<string, string> = {
  CEO: "bg-brand-navy text-white",
  Research: "bg-blue-100 text-blue-800",
  Commercial: "bg-emerald-100 text-emerald-800",
  Finance: "bg-amber-100 text-amber-800",
  Regulatory: "bg-purple-100 text-purple-800",
  Communications: "bg-pink-100 text-pink-800",
};

const STATUS_DOT: Record<string, string> = {
  working: "bg-emerald-500",
  "in-meeting": "bg-amber-500",
  offline: "bg-gray-400",
};

const TEAM_PROFILES: Record<string, { title: string; dept: string; linkedin?: string; expertise?: string }> = {
  sultan: { title: "Founder & CEO", dept: "CEO", linkedin: "https://sa.linkedin.com/in/sultan-alhayyani-b6646167", expertise: "PhD Biochemistry (Monash). 52 publications, 721 citations. Cancer biology, immunology, nanotechnology." },
  faisal: { title: "Scientific Director", dept: "Research", linkedin: "https://www.linkedin.com/in/faisal-alzahrani-phd-700107118/", expertise: "Prof. Molecular Biology (KAU). 1,815 citations. Cancer stem cells, iPSC, exosomes. INSEBT platform leader." },
  ahmed: { title: "Head of Biocontrol Unit", dept: "Research", expertise: "Biocontrol R&D, nanocomposite applications." },
  mohammed: { title: "Senior Research Scientist", dept: "Research", expertise: "AI platform, bioreactor DD, research operations." },
  abdulrahman: { title: "Business Development Director", dept: "Commercial", linkedin: "https://www.linkedin.com/in/abdulrahman-alalmaee-2a16a3124/" },
  ishteaq: { title: "Finance Director", dept: "Finance", linkedin: "https://www.linkedin.com/in/ishteaqmustaque/" },
  fayez: { title: "Regulatory Affairs Director", dept: "Regulatory", linkedin: "https://www.linkedin.com/in/drfayezalshehrigenetics/", expertise: "Genetics. Pure Academy leader." },
  ammar: { title: "Head of Brand", dept: "Communications", linkedin: "https://www.linkedin.com/in/ammar-alshehri/" },
};

export default function TeamPage() {
  return (
    <AppShell active="/team">
      <MobileNav />
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy">Team Operations</h1>
          <p className="text-sm text-text-muted mt-1">{teamPulse.length} active members</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamPulse.map((member) => {
            const profile = TEAM_PROFILES[member.memberId];
            return (
              <div key={member.memberId} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-brand-navy">{member.name}</h3>
                    <p className="text-xs text-text-muted">{profile?.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${STATUS_DOT[member.status]}`} />
                    <span className="text-[10px] text-text-muted capitalize">{member.status.replace("-", " ")}</span>
                  </div>
                </div>

                {profile?.dept && (
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium mb-3 ${DEPT_COLORS[profile.dept] || "bg-gray-100 text-gray-600"}`}>
                    {profile.dept}
                  </span>
                )}

                {profile?.expertise && (
                  <p className="text-xs text-text-secondary mb-3 leading-relaxed">{profile.expertise}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-xs text-text-muted">
                    Open tasks: <span className="font-semibold text-text-primary">{member.openTasks}</span>
                  </div>
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-navy hover:underline">
                      LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
