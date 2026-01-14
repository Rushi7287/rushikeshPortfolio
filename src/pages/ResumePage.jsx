import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Award, Code, Zap, ChevronRight } from 'lucide-react';

export const ResumePage = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState('salesforce');

  const skillCategories = {
    salesforce: {
      title: 'Salesforce Core',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      skills: ['Apex (Triggers, Batch, Queueable)', 'Lightning Web Components (LWC)', 'Visualforce', 'SOQL/SOSL', 'Flows', 'Security (Sharing Rules, Profiles)']
    },
    integration: {
      title: 'Integration',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      skills: ['REST/SOAP APIs', 'Connected Apps', 'OAuth 2.0', 'Platform Events', 'Named Credentials']
    },
    devops: {
      title: 'DevOps & Tools',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      skills: ['Azure DevOps', 'GitHub Actions', 'SFDX CLI', 'Copado', 'Docker', 'Kubernetes', 'CI/CD Pipelines']
    },
    ai: {
      title: 'AI & Emerging Tech',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      skills: ['Generative AI (AgentForce)', 'Prompt Engineering', 'AI Integration', 'MLOps (Learning)']
    },
    programming: {
      title: 'Programming',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      skills: ['Java', 'JavaScript', 'React.js', 'Node.js', 'SQL']
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Main Background Container - Glassmorphic */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-md p-4 shadow-2xl">
          
          {/* Centered Resume Title */}
          <div className="text-center mb-4">
            <h1 className=" text-white text-5xl font-bold from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              Resume
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Split View Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN - Contact & Skills */}
            <div className="space-y-6">
              
              {/* Contact Card - Glassmorphic */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">RUSHIKESH</h1>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">KALE</h1>
                  <p className="text-lg text-purple-200 font-light">Senior Salesforce Developer</p>
                  <p className="text-sm text-purple-300">& Team Lead</p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition-colors">
                    <MapPin size={18} className="text-blue-400 flex-shrink-0" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition-colors">
                    <Phone size={18} className="text-green-400 flex-shrink-0" />
                    <span>+91-7972391051</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition-colors">
                    <Mail size={18} className="text-red-400 flex-shrink-0" />
                    <span className="break-all">rushikeshkale7287@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition-colors">
                    <Linkedin size={18} className="text-blue-300 flex-shrink-0" />
                    <span className="break-all text-xs">linkedin.com/in/rushikesh-kale-3a962a382</span>
                  </div>
                </div>
              </div>

              {/* Professional Summary - Glassmorphic */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                    <Zap className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">About</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Senior Salesforce Developer and Team Lead with <span className="text-blue-300 font-semibold">3+ years</span> building scalable enterprise solutions. 
                  Expert in integrations, Apex, LWC, and DevOps. Passionate about <span className="text-purple-300 font-semibold">AI-driven architecture</span> and MLOps.
                </p>
              </div>

              {/* Skills - Glassmorphic */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                    <Code className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Skills</h2>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(skillCategories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSkillCategory(key)}
                      className={`${activeSkillCategory === key 
                        ? category.color + ' text-white shadow-lg scale-105' 
                        : 'backdrop-blur-sm bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20'
                      } px-4 py-2 rounded-full font-medium text-xs transition-all duration-200 transform`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>

                <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-5 rounded-xl min-h-40">
                  <h3 className="text-sm font-bold mb-3 text-white">
                    {skillCategories[activeSkillCategory].title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategories[activeSkillCategory].skills.map((skill, idx) => (
                      <span key={idx} className="backdrop-blur-sm bg-white/10 border border-white/20 text-gray-200 px-3 py-1 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education - Glassmorphic */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                    <GraduationCap className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Education</h2>
                </div>
                <div className="space-y-3">
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <h3 className="font-bold text-white text-sm">PG Diploma in Advanced Computing</h3>
                    <p className="text-gray-400 text-xs">C-DAC, Pune • Mar 2022 – Sep 2022</p>
                  </div>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <h3 className="font-bold text-white text-sm">Bachelor of Engineering (Mechanical)</h3>
                    <p className="text-gray-400 text-xs">Savitribai Phule Pune University • Aug 2017 – Apr 2021</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Experience at Top */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Experience</h2>
                </div>

                <div className="space-y-6">
                  {/* Current Role */}
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-all">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-white">Senior Salesforce Developer</h3>
                      <p className="text-blue-300 font-semibold text-sm">BAJAJ FINSERV</p>
                      <p className="text-gray-400 text-xs">Pune/Bengaluru, India</p>
                      <span className="inline-block mt-2 bg-blue-500/30 border border-blue-400/50 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">Nov 2024 – Present</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex gap-2"><ChevronRight className="text-blue-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Leadership:</strong> Mentoring 2+ developers, conducting reviews</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-blue-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>GenAI:</strong> Leading AgentForce POCs</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-blue-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Architecture:</strong> POS 2.0 technical owner</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-blue-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Development:</strong> Bulkified Apex & dynamic LWC</span></li>
                    </ul>
                  </div>

                  {/* Salesforce Developer */}
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-all">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-white">Salesforce Developer</h3>
                      <p className="text-purple-300 font-semibold text-sm">BAJAJ FINSERV</p>
                      <p className="text-gray-400 text-xs">Pune/Bengaluru, India</p>
                      <span className="inline-block mt-2 bg-purple-500/30 border border-purple-400/50 text-purple-200 px-3 py-1 rounded-full text-xs font-semibold">May 2023 – Oct 2024</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex gap-2"><ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>DevOps:</strong> Azure to GitHub migration</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Integration:</strong> REST APIs & OAuth 2.0</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-purple-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Delivery:</strong> End-to-end solutions</span></li>
                    </ul>
                  </div>

                  {/* Software Engineer */}
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-all">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-white">Software Engineer</h3>
                      <p className="text-green-300 font-semibold text-sm">BAJAJ FINSERV</p>
                      <p className="text-gray-400 text-xs">Pune/Bengaluru, India</p>
                      <span className="inline-block mt-2 bg-green-500/30 border border-green-400/50 text-green-200 px-3 py-1 rounded-full text-xs font-semibold">Nov 2022 – Apr 2023</span>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex gap-2"><ChevronRight className="text-green-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Core:</strong> Flows & Apex automation</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-green-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Security:</strong> OWD, Roles, Permission Sets</span></li>
                      <li className="flex gap-2"><ChevronRight className="text-green-400 flex-shrink-0 mt-0.5" size={14} /><span><strong>Growth:</strong> Full-stack to Salesforce</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications - Glassmorphic */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-md p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                    <Award className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Certifications</h2>
                </div>
                <div className="space-y-2">
                  {['Salesforce Certified Platform Developer I',
                    'Salesforce Certified Administrator',
                    'Salesforce Certified AI Associate',
                    'Copado Extension Builder',
                    'Mastering GenAI'
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 p-3 rounded-lg hover:bg-white/10 transition-all">
                      <Award className="text-orange-400 flex-shrink-0" size={16} />
                      <span className="text-gray-200 text-xs font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
