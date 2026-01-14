import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Zap,
  ChevronRight,
} from "lucide-react";

export const ResumePage = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("salesforce");

  const skillCategories = {
    salesforce: {
      title: "Salesforce Core",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      skills: [
        "Apex (Triggers, Batch, Queueable)",
        "Lightning Web Components (LWC)",
        "Visualforce",
        "SOQL/SOSL",
        "Flows",
        "Security (Sharing Rules, Profiles)",
      ],
    },
    integration: {
      title: "Integration",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      skills: [
        "REST/SOAP APIs",
        "Connected Apps",
        "OAuth 2.0",
        "Platform Events",
        "Named Credentials",
      ],
    },
    devops: {
      title: "DevOps & Tools",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      skills: [
        "Azure DevOps",
        "GitHub Actions",
        "SFDX CLI",
        "Copado",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
      ],
    },
    ai: {
      title: "AI & Emerging Tech",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      skills: [
        "Generative AI (AgentForce)",
        "Prompt Engineering",
        "AI Integration",
        "MLOps (Learning)",
      ],
    },
    programming: {
      title: "Programming",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      skills: ["Java", "JavaScript", "React.js", "Node.js", "SQL"],
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white py-8 px-2"
      style={{ fontFamily: "monospace" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* <div className="backdrop-blur-md rounded-md p-12 shadow-2xl bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 border border-blue-200/30"> */}

        <div className="text-center mb-12">
          <h1
            className="text-black text-5xl font-bold from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
            style={{ fontFamily: "math" }}
          >
            RESUME
          </h1>
          <div className="h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50/60 to-indigo-50/60 border border-blue-200/50 hover:border-blue-300/70">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-1 tracking-tight text-blue-900">
                  RUSHIKESH
                </h1>
                <h1 className="text-4xl font-bold mb-3 text-blue-900 via-purple-500 to-pink-500 bg-clip-text">
                  KALE
                </h1>
                <p className="text-lg font-light text-purple-700">
                  Senior Salesforce Developer
                </p>
                <p className="text-sm text-purple-600">& Team Lead</p>
              </div>

              <div className="space-y-3 border-t pt-6 border-blue-200/50">
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                  <MapPin size={18} className="text-blue-500 flex-shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                  <Phone size={18} className="text-green-500 flex-shrink-0" />
                  <span>+91-7972391051</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                  <Mail size={18} className="text-red-500 flex-shrink-0" />
                  <span className="break-all">rushikeshkale7287@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                  <Linkedin size={18} className="text-blue-500 flex-shrink-0" />
                  <span className="break-all text-xs">
                    linkedin.com/in/rushikesh-kale-3a962a382
                  </span>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50/60 to-pink-50/60 border border-purple-200/50 hover:border-purple-300/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <Zap className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-purple-900">About</h2>
              </div>
              <p className="leading-relaxed text-sm text-gray-700">
                Senior Salesforce Developer and Team Lead with{" "}
                <span className="text-blue-600 font-semibold">3+ years</span>{" "}
                building scalable enterprise solutions. Expert in integrations,
                Apex, LWC, and DevOps. Passionate about{" "}
                <span className="text-purple-600 font-semibold">
                  AI-driven architecture
                </span>{" "}
                and MLOps.
              </p>
            </div>

            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50/60 to-cyan-50/60 border border-green-200/50 hover:border-green-300/70">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-br from-green-500 to-cyan-500 rounded-lg">
                  <Code className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-green-900">Skills</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {Object.entries(skillCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSkillCategory(key)}
                    className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-200 transform ${
                      activeSkillCategory === key
                        ? `${category.color} text-white shadow-lg scale-105`
                        : "backdrop-blur-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              <div className="backdrop-blur-sm p-5 rounded-xl min-h-40 bg-gradient-to-br from-green-100/40 to-cyan-100/40 border border-green-200/50">
                <h3 className="text-sm font-bold mb-3 text-green-900">
                  {skillCategories[activeSkillCategory].title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategories[activeSkillCategory].skills.map(
                    (skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400 transition-colors"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-indigo-200/50 hover:border-indigo-300/70">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-indigo-900">
                  Education
                </h2>
              </div>
              <div className="space-y-3">
                <div className="backdrop-blur-sm p-4 rounded-lg hover:shadow-lg transition-all bg-gradient-to-r from-indigo-100/40 to-blue-100/40 border border-indigo-200/50 hover:border-indigo-300/70">
                  <h3 className="font-bold text-sm text-indigo-900">
                    PG Diploma in Advanced Computing
                  </h3>
                  <p className="text-xs text-gray-600">
                    C-DAC, Pune • Mar 2022 – Sep 2022
                  </p>
                </div>
                <div className="backdrop-blur-sm p-4 rounded-lg hover:shadow-lg transition-all bg-gradient-to-r from-indigo-100/40 to-blue-100/40 border border-indigo-200/50 hover:border-indigo-300/70">
                  <h3 className="font-bold text-sm text-indigo-900">
                    Bachelor of Engineering (Mechanical)
                  </h3>
                  <p className="text-xs text-gray-600">
                    Savitribai Phule Pune University • Aug 2017 – Apr 2021
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50/60 to-red-50/60 border border-orange-200/50 hover:border-orange-300/70">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-orange-900">
                  Experience
                </h2>
              </div>

              <div className="space-y-6">
                <div className="backdrop-blur-sm p-5 rounded-xl hover:shadow-lg transition-all bg-gradient-to-br from-blue-100/40 to-cyan-100/40 border border-blue-200/50 hover:border-blue-300/70">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-blue-900">
                      Senior Salesforce Developer
                    </h3>
                    <p className="font-semibold text-sm text-blue-600">
                      BAJAJ FINSERV
                    </p>
                    <p className="text-xs text-gray-600">
                      Pune/Bengaluru, India
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 border border-blue-400 text-blue-700">
                      Nov 2024 – Present
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-blue-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Leadership:</strong> Mentoring 2+ developers,
                        conducting reviews
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-blue-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>GenAI:</strong> Leading AgentForce POCs
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-blue-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Architecture:</strong> POS 2.0 technical owner
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-blue-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Development:</strong> Bulkified Apex & dynamic
                        LWC
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="backdrop-blur-sm p-5 rounded-xl hover:shadow-lg transition-all bg-gradient-to-br from-purple-100/40 to-pink-100/40 border border-purple-200/50 hover:border-purple-300/70">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-purple-900">
                      Salesforce Developer
                    </h3>
                    <p className="font-semibold text-sm text-purple-600">
                      BAJAJ FINSERV
                    </p>
                    <p className="text-xs text-gray-600">
                      Pune/Bengaluru, India
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 border border-purple-400 text-purple-700">
                      May 2023 – Oct 2024
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-purple-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>DevOps:</strong> Azure to GitHub migration
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-purple-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Integration:</strong> REST APIs & OAuth 2.0
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-purple-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Delivery:</strong> End-to-end solutions
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="backdrop-blur-sm p-5 rounded-xl hover:shadow-lg transition-all bg-gradient-to-br from-green-100/40 to-emerald-100/40 border border-green-200/50 hover:border-green-300/70">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-green-900">
                      Software Engineer
                    </h3>
                    <p className="font-semibold text-sm text-green-600">
                      BAJAJ FINSERV
                    </p>
                    <p className="text-xs text-gray-600">
                      Pune/Bengaluru, India
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-200 border border-green-400 text-green-700">
                      Nov 2022 – Apr 2023
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-green-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Core:</strong> Flows & Apex automation
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-green-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Security:</strong> OWD, Roles, Permission Sets
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        className="text-green-500 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>
                        <strong>Growth:</strong> Full-stack to Salesforce
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-md p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50/60 to-orange-50/60 border border-yellow-200/50 hover:border-yellow-300/70">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                  <Award className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-yellow-900">
                  Certifications
                </h2>
              </div>
              <div className="space-y-2">
                {[
                  "Salesforce Certified Platform Developer I",
                  "Salesforce Certified Administrator",
                  "Salesforce Certified AI Associate",
                  "Copado Extension Builder",
                  "Mastering GenAI",
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-lg hover:shadow-lg transition-all backdrop-blur-sm bg-gradient-to-r from-yellow-100/40 to-orange-100/40 border border-yellow-200/50 hover:border-yellow-300/70"
                  >
                    <Award
                      className="text-orange-500 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
