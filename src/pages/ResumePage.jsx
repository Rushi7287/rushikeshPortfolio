// import React from 'react';

// export const AboutPage = ({ isDark }) => {
//   const textClass = isDark ? 'text-gray-100' : 'text-gray-800';

//   return (
//     <div className={`p-6 ${textClass}`}>
//       <h1 className="text-3xl font-bold">About Me</h1>
//       <p className="mt-4">This is the about page of my portfolio.</p>
//       {/* Add more content as needed */}
//     </div>
//   );
// };

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
    <div>
    {/* <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4"> */}
      <div className="max-w-5xl mx-auto">
        {/* PAGE 1 */}
        <div className="bg-white shadow-2xl rounded-lg mb-8 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2 tracking-tight">RUSHIKESH KALE</h1>
              <p className="text-2xl mb-6 font-light">Senior Salesforce Developer & Team Lead</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full">
                  <MapPin size={16} />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full">
                  <Phone size={16} />
                  <span>+91-7972391051</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full">
                  <Mail size={16} />
                  <span>rushikeshkale7287@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full">
                  <Linkedin size={16} />
                  <span>linkedin.com/in/rushikesh-kale-3a962a382</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="p-8 border-b-4 border-gradient-to-r from-blue-500 to-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Professional Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Senior Salesforce Developer and Team Lead with <span className="font-semibold text-blue-600">3+ years of experience</span> building scalable enterprise solutions. 
              Expert in Salesforce Integrations (REST/SOAP), Apex, and LWC, with a strong background in DevOps (CI/CD) and full-stack development. 
              Proven track record of leading migrations (Azure to GitHub) and delivering Generative AI POCs. 
              Passionate about bridging the gap between Salesforce and AI, with a strong drive to specialize in <span className="font-semibold text-purple-600">MLOps and AI-driven architecture</span>.
            </p>
          </div>

          {/* Technical Skills - Interactive */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                <Code className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Technical Skills</h2>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(skillCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveSkillCategory(key)}
                  className={`${activeSkillCategory === key ? category.color + ' text-white shadow-lg scale-105' : 'bg-white text-gray-700 hover:shadow-md'} 
                    px-6 py-3 rounded-full font-semibold transition-all duration-200 transform ${category.hoverColor}`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg min-h-32">
              <h3 className={`text-xl font-bold mb-4 ${skillCategories[activeSkillCategory].color.replace('bg-', 'text-')}`}>
                {skillCategories[activeSkillCategory].title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillCategories[activeSkillCategory].skills.map((skill, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Professional Experience */}
          <div className="p-8 border-b">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Professional Experience</h2>
            </div>

            {/* Current Role */}
            <div className="mb-8 pl-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Senior Salesforce Developer / Team Lead</h3>
                  <p className="text-lg font-semibold text-blue-600">BAJAJ FINSERV</p>
                  <p className="text-gray-600">Pune/Bengaluru, India</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold text-sm">Nov 2024 – Present</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={18} /><span><strong>Team Leadership:</strong> Mentoring a team of 2+ developers, conducting code reviews, and overseeing technical design to ensure code quality and best practices.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={18} /><span><strong>Generative AI Innovation:</strong> Leading POCs and integrations for AgentForce and Generative AI, applying AI concepts to enterprise Salesforce use cases.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={18} /><span><strong>Enterprise Architecture:</strong> Owner of technical design and delivery for key initiatives like POS 2.0, ensuring high scalability and optimization.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={18} /><span><strong>Complex Development:</strong> Building bulkified, asynchronous Apex solutions and dynamic LWC interfaces for high-volume transactions.</span></li>
              </ul>
            </div>

            {/* Salesforce Developer */}
            <div className="mb-8 pl-4 border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Salesforce Developer</h3>
                  <p className="text-lg font-semibold text-purple-600">BAJAJ FINSERV</p>
                  <p className="text-gray-600">Pune/Bengaluru, India</p>
                </div>
                <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full font-semibold text-sm">May 2023 – Oct 2024</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><ChevronRight className="text-purple-500 flex-shrink-0 mt-1" size={18} /><span><strong>DevOps Transformation (Azure to GitHub):</strong> Successfully led the migration of repositories from Azure to GitHub. Built and managed optimized CI/CD pipelines using SFDX CLI and GitHub Actions, streamlining deployment processes.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-purple-500 flex-shrink-0 mt-1" size={18} /><span><strong>Integration Specialist:</strong> Designed secure REST API integrations and connected Salesforce with external Java/Spring Boot systems using OAuth 2.0.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-purple-500 flex-shrink-0 mt-1" size={18} /><span><strong>Solution Delivery:</strong> Delivered end-to-end scalable solutions, handling requirement gathering and technical clarifications directly with stakeholders.</span></li>
              </ul>
            </div>

            {/* Software Engineer */}
            <div className="pl-4 border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Software Engineer</h3>
                  <p className="text-lg font-semibold text-green-600">BAJAJ FINSERV</p>
                  <p className="text-gray-600">Pune/Bengaluru, India</p>
                </div>
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-semibold text-sm">Nov 2022 – Apr 2023</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><ChevronRight className="text-green-500 flex-shrink-0 mt-1" size={18} /><span><strong>Core Customization:</strong> Developed robust automation using Salesforce Flows and fundamentals of Apex/LWC.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-green-500 flex-shrink-0 mt-1" size={18} /><span><strong>Security Implementation:</strong> Configured complex security models including OWD, Role Hierarchies, and Permission Sets to ensure data integrity.</span></li>
                <li className="flex gap-2"><ChevronRight className="text-green-500 flex-shrink-0 mt-1" size={18} /><span><strong>Transition:</strong> Leveraged full-stack background (Java/React) to rapidly master Salesforce architecture and integration patterns.</span></li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="p-8 border-b bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="grid gap-4">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-indigo-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">PG Diploma in Advanced Computing (C-DAC)</h3>
                    <p className="text-gray-600">C-DAC, Pune</p>
                  </div>
                  <span className="text-indigo-600 font-semibold">Mar 2022 – Sep 2022</span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Bachelor of Engineering (Mechanical)</h3>
                    <p className="text-gray-600">Savitribai Phule Pune University</p>
                  </div>
                  <span className="text-purple-600 font-semibold">Aug 2017 – Apr 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                <Award className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Certifications</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Salesforce Certified Platform Developer I (PD1)',
                'Salesforce Certified Administrator',
                'Salesforce Certified AI Associate',
                'Copado Extension Builder',
                'Mastering GenAI'
              ].map((cert, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-400 flex items-center gap-3">
                  <Award className="text-orange-500" size={20} />
                  <span className="text-gray-800 font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
