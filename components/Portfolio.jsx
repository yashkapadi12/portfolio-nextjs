"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "yash_kapadi" },
  { prompt: true, text: "cat role.txt" },
  { prompt: false, text: "DevOps Engineer — cloud infra, CI/CD, automation" },
  { prompt: true, text: "help" },
  { prompt: false, text: "Available commands: about, skills, experience, contact, clear. (Click here and type, Tab for autocomplete!)" },
];

const experience = [
  {
    role: "DevOps Engineer",
    org: "GTCSYS",
    time: "May 2026 — Present",
    status: "running",
    bullets: [
      "Manage and maintain production EC2 instances, monitoring performance and resource utilization to ensure consistent uptime.",
      "Containerize applications using Docker to standardize environments across development and production.",
      "Maintain and troubleshoot Jenkins CI/CD pipelines, supporting reliable and repeatable build and deployment workflows.",
      "Monitor server health and respond to infrastructure issues to minimize downtime and support smooth release cycles.",
      "Collaborate with development teams to coordinate deployments and resolve environment-related issues.",
    ],
  },
  {
    role: "Jr. DevOps Engineer",
    org: "WebeLight Solutions",
    time: "Dec 2025 — Feb 2026",
    status: "passed",
    bullets: [
      "Designed and provisioned complete production infrastructure on AWS using Terraform, including VPC, EC2, RDS, IAM roles, Route53, and security groups.",
      "Implemented Infrastructure as Code (IaC) best practices with reusable Terraform modules and remote state management.",
      "Automated deployment workflows using Jenkins CI/CD pipelines, reducing manual deployment effort and improving release consistency.",
      "Built automation workflows using n8n to integrate alerts, notifications, and internal operational tasks.",
      "Developed Bash scripts for server provisioning, log rotation, backup automation, and health monitoring.",
      "Managed Dockerized applications and supported production deployments with minimal downtime.",
      "Monitored and troubleshot Linux-based production servers to maintain high availability and system reliability.",
    ],
  },
  {
    role: "DevOps Intern",
    org: "WebeLight Solutions",
    time: "Jun 2025 — Nov 2025",
    status: "passed",
    bullets: [
      "Developed and maintained CI/CD pipelines using Jenkins to automate build, test, and deployment processes, shortening overall deployment time.",
      "Implemented Infrastructure as Code using Terraform to provision and manage AWS resources (EC2, VPC), standardizing environment setup.",
      "Containerized applications using Docker, improving environment consistency across development and staging servers.",
      "Assisted in configuring and monitoring AWS services including S3 for storage, ECS for container orchestration, and CloudFront for content delivery.",
      "Applied Linux administration skills to troubleshoot system issues, monitor performance, and manage server configurations.",
    ],
  },
  {
    role: "Software Developer",
    org: "Saltriver Infosystem",
    time: "Apr 2024 — Jun 2024",
    status: "passed",
    bullets: [
      "Developed and maintained automated testing scripts using Python and Selenium for an HPCL project, reducing manual testing effort and improving release stability.",
      "Conducted data analysis on application performance logs and user metrics to identify bottlenecks and inform development decisions.",
    ],
  },
  {
    role: "Software Developer",
    org: "Esurgent Private Limited",
    time: "Oct 2022 — Mar 2024",
    status: "passed",
    bullets: [
      "Led front-end development of the Somico client portal using ReactJS, building responsive UI components that improved usability and page load performance.",
      "Engineered and optimized backend RESTful APIs for the Somico project using Java and Spring, improving API response times and reliability.",
    ],
  },
];

const STAGE_LOGS = [
  [
    "[Esurgent-API-Build] mvn clean package",
    "[Esurgent-API-Build] Compiling 24 Java controllers...",
    "[Esurgent-API-Build] REST APIs mapping loaded successfully.",
    "[Esurgent-API-Build] Spring Boot app bundled -> SomicoPortal-1.2.0.jar",
    "SUCCESS: Build complete."
  ],
  [
    "[Saltriver-QA-Test] pytest HPCL_portal_tests.py",
    "[Saltriver-QA-Test] Launching headless Chrome driver via Selenium...",
    "[Saltriver-QA-Test] Asserting login panel responsive: OK",
    "[Saltriver-QA-Test] Asserting billing endpoints integration: OK",
    "[Saltriver-QA-Test] All 32 automated tests PASSED.",
    "SUCCESS: Testing complete."
  ],
  [
    "[Jenkins-CI] Triggering hook from git commit...",
    "[Docker-Build] docker build -t webelight/app:intern-v1 .",
    "[Docker-Build] Step 1/8: FROM node:18-alpine",
    "[Docker-Build] Step 5/8: RUN npm run build",
    "[Docker-Build] Container image pushed to AWS ECR successfully.",
    "SUCCESS: Containerized deployment ready."
  ],
  [
    "[Terraform-IaC] terraform init && terraform apply -auto-approve",
    "[Terraform-IaC] Initializing AWS provider plug-in...",
    "[Terraform-IaC] Planning resource changes: +7 to add, 0 to alter",
    "[Terraform-IaC] Creating VPC (10.0.0.0/16)...",
    "[Terraform-IaC] Provisioning EC2 nodes & RDS DB Instance...",
    "[Terraform-IaC] Apply complete! Resources: 7 created.",
    "SUCCESS: Infrastructure provisioned."
  ],
  [
    "[Production-Ops] ssh admin@production-ec2-node1",
    "[Production-Ops] Pulling Docker image from ECR repository...",
    "[Production-Ops] Restarting application container...",
    "[Production-Ops] Checking system health metrics (Uptime: 100%)...",
    "[Production-Ops] Nginx reverse proxy routing configured.",
    "SUCCESS: Deployment successful! Yash's portfolio status: OPERATIONAL."
  ]
];

const stack = [
  {
    title: "Cloud & infrastructure",
    items: ["AWS EC2", "ECS", "S3", "CloudFront", "RDS", "VPC", "IAM", "Route53", "Docker", "Terraform"],
  },
  { title: "CI/CD & automation", items: ["Jenkins", "n8n", "Bash Scripting"] },
  { title: "Operating systems", items: ["Linux (Ubuntu)"] },
  { title: "Programming & development", items: ["Java", "Python", "ReactJS", "Spring"] },
];

const stats = [
  ["1+", "Yrs in DevOps"],
  ["5", "Roles shipped"],
  ["10+", "AWS services used"],
  ["3", "Tools in progress"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Terminal() {
  const [bootIndex, setBootIndex] = useState(0);
  const [bootLines, setBootLines] = useState([]);
  const [currentBootText, setCurrentBootText] = useState("");
  const [interactiveLines, setInteractiveLines] = useState([]);
  const [inputText, setInputText] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bootLines, currentBootText, interactiveLines, inputText]);

  useEffect(() => {
    if (bootIndex >= TERMINAL_LINES.length) return;
    const currentLine = TERMINAL_LINES[bootIndex];
    
    if (currentLine.prompt) {
      if (currentBootText.length < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCurrentBootText(currentLine.text.slice(0, currentBootText.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setBootLines((prev) => [...prev, currentLine]);
          setCurrentBootText("");
          setBootIndex((prev) => prev + 1);
        }, 200);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setBootLines((prev) => [...prev, currentLine]);
        setBootIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [bootIndex, currentBootText]);

  const isBooting = bootIndex < TERMINAL_LINES.length;

  const handleTerminalClick = () => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = inputText.trim();
      const lowerCmd = cmd.toLowerCase();
      if (!cmd) {
        setInteractiveLines((prev) => [...prev, { prompt: true, text: "" }]);
        setInputText("");
        return;
      }

      const newHistory = [...commandHistory, inputText];
      setCommandHistory(newHistory);
      setHistoryPointer(newHistory.length);

      let response = [];
      if (lowerCmd === "clear") {
        setInteractiveLines([]);
        setInputText("");
        return;
      } else if (lowerCmd === "help") {
        response = [
          "Available commands:",
          "  about       - Brief background biography of Yash Kapadi",
          "  skills      - Technical skillset and toolchains",
          "  experience  - View timeline and check logs",
          "  contact     - Reach out information",
          "  clear       - Clear terminal history"
        ];
      } else if (lowerCmd === "about") {
        response = [
          "Yash Kapadi is a Junior DevOps Engineer based in Gujarat, India.",
          "Experienced in deploying high-availability services, configuring EC2 instances,",
          "automating build systems, and implementing Infrastructure as Code via Terraform.",
          "Passionate about scripting, monitoring server health, and containerization (Docker)."
        ];
      } else if (lowerCmd === "skills") {
        response = [
          "Cloud Infrastructure: AWS (EC2, ECS, S3, RDS, VPC, Route53), Terraform, Docker",
          "Pipelines & Automation: Jenkins, n8n, Bash scripting",
          "Operating Systems:     Linux (Ubuntu)",
          "Development Stack:     Java, Python, ReactJS, Spring Boot"
        ];
      } else if (lowerCmd === "experience") {
        response = [
          "Experience summary:",
          "  • DevOps Engineer at GTCSYS (May 2026 - Present)",
          "  • Jr. DevOps Engineer at WebeLight Solutions (Dec 2025 - Feb 2026)",
          "  • DevOps Intern at WebeLight Solutions (Jun 2025 - Nov 2025)",
          "  • Software Developer at Saltriver & Esurgent (2022 - 2024)",
          "💡 Pro-tip: Scroll down to section 01 and run the interactive CI/CD build animation!"
        ];
      } else if (lowerCmd === "contact") {
        response = [
          "Contact details:",
          "  • Email:    yashkapadi74909@outlook.com",
          "  • Phone:    +91 7490947294",
          "  • LinkedIn: linkedin.com/in/yashkapadi6",
          "  • GitHub:   github.com/yashkapadi12"
        ];
      } else if (lowerCmd.startsWith("sudo")) {
        response = [
          "🔒 guest is not in the sudoers file. This incident will be reported.",
          "⚠️ Unauthorized superuser execution blocked."
        ];
      } else {
        response = [`bash: command not found: ${cmd}. Type 'help' to see active commands.`];
      }

      setInteractiveLines((prev) => [
        ...prev,
        { prompt: true, text: inputText },
        ...response.map((r) => ({ prompt: false, text: r })),
      ]);
      setInputText("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newPointer = Math.max(0, historyPointer - 1);
        setHistoryPointer(newPointer);
        setInputText(commandHistory[newPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newPointer = historyPointer + 1;
      if (newPointer < commandHistory.length) {
        setHistoryPointer(newPointer);
        setInputText(commandHistory[newPointer]);
      } else {
        setHistoryPointer(commandHistory.length);
        setInputText("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmd = inputText.trim().toLowerCase();
      if (!cmd) return;
      const commands = ["about", "skills", "experience", "contact", "clear", "help"];
      const matches = commands.filter((c) => c.startsWith(cmd));
      if (matches.length === 1) {
        setInputText(matches[0]);
      } else if (matches.length > 1) {
        setInteractiveLines((prev) => [
          ...prev,
          { prompt: true, text: inputText },
          { prompt: false, text: matches.join("   ") },
        ]);
      }
    }
  };

  return (
    <div className={`terminal ${isFocused ? "focused" : ""}`} onClick={handleTerminalClick}>
      <div className="terminal-head">
        <span className="tdot r" />
        <span className="tdot y" />
        <span className="tdot g" />
        <span className="terminal-title">guest@yashkapadi: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {bootLines.map((l, i) => (
          <p key={i} className={l.prompt ? "tline" : "out"}>
            {l.prompt && <span className="prompt">$ </span>}
            {l.text}
          </p>
        ))}
        {isBooting && (
          <p className="tline">
            <span className="prompt">$ </span>
            {currentBootText}
            <span className="cursor" />
          </p>
        )}
        {!isBooting && (
          <>
            {interactiveLines.map((l, i) => (
              <p key={i} className={l.prompt ? "tline" : "out"}>
                {l.prompt && <span className="prompt">$ </span>}
                {l.text}
              </p>
            ))}
            <div className="terminal-input-wrapper">
              <span className="prompt">$ </span>
              <span className="typed-text">{inputText}</span>
              <span className="cursor" />
              <input
                ref={inputRef}
                type="text"
                className="terminal-input-hidden"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionHead({ tag, title }) {
  return (
    <div className="section-head">
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      <div className="rule" />
    </div>
  );
}

const TELEMETRY_DATA = {
  route53: {
    title: "Route53 DNS Resolution",
    status: "HEALTHY",
    metrics: [
      { name: "Latency", value: "14ms" },
      { name: "Availability", value: "100.0%" },
      { name: "Health Checks", value: "4 / 4 passed" }
    ],
    desc: "Global DNS routing with active latency-based health checks and automatic failovers."
  },
  cloudfront: {
    title: "CloudFront CDN Edge",
    status: "ACTIVE",
    metrics: [
      { name: "Cache Hit Rate", value: "94.6%" },
      { name: "Edge Location", value: "Mumbai (BOM)" },
      { name: "SSL/TLS Version", value: "TLS v1.3" }
    ],
    desc: "Content delivery network caching static portfolio assets and providing edge security."
  },
  vpc: {
    title: "AWS VPC Network",
    status: "ISOLATED",
    metrics: [
      { name: "IP Range", value: "10.0.0.0/16" },
      { name: "Subnets", value: "4 (2 Pub, 2 Priv)" },
      { name: "Gateways", value: "IGW & NAT Gateways" }
    ],
    desc: "Isolated virtual private network spanning multiple availability zones with strict routing tables."
  },
  alb: {
    title: "Application Load Balancer",
    status: "ROUTING",
    metrics: [
      { name: "Active Conns", value: "128 / sec" },
      { name: "Avg Response", value: "2.4ms" },
      { name: "Target Groups", value: "ECS-Web-TG" }
    ],
    desc: "Distributes incoming HTTP/HTTPS traffic to the Docker container instances in the private subnet."
  },
  ecs: {
    title: "ECS Containers (Docker)",
    status: "RUNNING",
    metrics: [
      { name: "Container Tasks", value: "4 running" },
      { name: "Avg CPU Usage", value: "11.4%" },
      { name: "Avg Memory", value: "18.2%" }
    ],
    desc: "Orchestrated Docker container groups hosting Spring Boot and React applications."
  },
  rds: {
    title: "RDS PostgreSQL Database",
    status: "SYNCHRONIZED",
    metrics: [
      { name: "Multi-AZ Sync", value: "Active" },
      { name: "Storage Util", value: "14.2%" },
      { name: "Connections", value: "24 active" }
    ],
    desc: "Fully managed relational database cluster with automatic daily backups and encrypted storage."
  },
  s3: {
    title: "S3 Static Asset Bucket",
    status: "MOUNTED",
    metrics: [
      { name: "Bucket Size", value: "12.4 MB" },
      { name: "Objects", value: "46 files" },
      { name: "Versioning", value: "Enabled" }
    ],
    desc: "Object storage acting as the CDN origin for fast global distribution of media assets."
  }
};

const DEFAULT_TELEMETRY = {
  title: "Cloud Infrastructure Overview",
  status: "OPERATIONAL",
  metrics: [
    { name: "Global Status", value: "Healthy" },
    { name: "Network Security", value: "Compliant" },
    { name: "Total Cost/mo", value: "$4.12 (estimated)" }
  ],
  desc: "Hover over any architectural node in the topology diagram to stream real-time metrics and system parameters."
};

export default function Portfolio() {
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Load avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("devops_portfolio_avatar");
    if (savedAvatar) {
      setAvatarPhoto(savedAvatar);
    }
  }, []);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setAvatarPhoto(base64String);
        try {
          localStorage.setItem("devops_portfolio_avatar", base64String);
        } catch (error) {
          console.warn("localStorage quota exceeded or writing failed:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatarPhoto = (e) => {
    e.stopPropagation();
    setAvatarPhoto(null);
    localStorage.removeItem("devops_portfolio_avatar");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [activeJobIndex, setActiveJobIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pipelineStatus, setPipelineStatus] = useState("idle"); // "idle", "running", "success"
  const [cpuLoad, setCpuLoad] = useState(22);
  const [ramLoad, setRamLoad] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * (26 - 16 + 1) + 16));
      setRamLoad(Math.floor(Math.random() * (44 - 40 + 1) + 40));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [currentStage, setCurrentStage] = useState(-1);
  const [logs, setLogs] = useState(["$ select a stage or trigger a build to inspect logs..."]);
  const logTerminalEndRef = useRef(null);

  // Auto scroll logs
  useEffect(() => {
    if (logTerminalEndRef.current) {
      logTerminalEndRef.current.scrollTop = logTerminalEndRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulation script execution
  const runSimulation = () => {
    if (pipelineStatus === "running") return;
    setPipelineStatus("running");
    setCurrentStage(0);
    setLogs(["$ git-ci trigger --pipeline=devops-portfolio-deploy"]);
    setActiveJobIndex(4); // Select Esurgent first
  };

  useEffect(() => {
    if (pipelineStatus !== "running") return;
    if (currentStage < 0 || currentStage >= 5) {
      if (currentStage >= 5) {
        setPipelineStatus("success");
        setLogs((prev) => [
          ...prev,
          "-------------------------------------------",
          "🎉 PIPELINE EXECUTION SUCCESSFUL",
          "✨ Production deployed successfully to AWS EC2 & ECS",
          "✨ Domain yashgkapadi.icu is active and running",
          "-------------------------------------------"
        ]);
        setActiveJobIndex(0); // Select current job at the end
      }
      return;
    }

    const stageMap = [4, 3, 2, 1, 0];
    setActiveJobIndex(stageMap[currentStage]);

    const stageLines = STAGE_LOGS[currentStage];
    let lineIdx = 0;
    
    const interval = setInterval(() => {
      if (lineIdx < stageLines.length) {
        const nextLine = stageLines[lineIdx];
        setLogs((prev) => [...prev, nextLine]);
        lineIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStage((prev) => prev + 1);
        }, 500);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [pipelineStatus, currentStage]);

  return (
    <div className="page">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span className="dot" /> yash@devops:~$ status — operational
          </div>
          <nav className="topbar-nav">
            {["experience", "stack", "education", "contact"].map((s) => (
              <a key={s} href={`#${s}`}>
                {s}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="wrap">
        <section className="hero">
          <Terminal />

          <motion.div
            className="hero-id"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 1.3 }}
          >
            <div className="avatar-container">
              <div className="avatar-glow-ring" />
              <div 
                className="avatar" 
                onClick={handleAvatarClick}
                title={avatarPhoto ? "Click to change photo" : "Click to upload photo"}
              >
                {avatarPhoto ? (
                  <img src={avatarPhoto} alt="Yash Kapadi" className="avatar-img" />
                ) : (
                  <span className="avatar-initials">YK</span>
                )}
                
                <div className="avatar-overlay">
                  <span className="avatar-overlay-text">
                    {avatarPhoto ? "Change" : "Upload"}
                  </span>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: "none" }} 
                />
              </div>

              {avatarPhoto && (
                <button 
                  className="avatar-remove-btn" 
                  onClick={removeAvatarPhoto}
                  title="Remove photo"
                >
                  ✕
                </button>
              )}
            </div>
            <div>
              <h1 className="hero-name">Yash Kapadi</h1>
              <div className="hero-role">Jr. DevOps Engineer</div>
            </div>
          </motion.div>

          <motion.p
            className="hero-tagline"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 1.45 }}
          >
            I build and run the infrastructure underneath other people&apos;s releases —
            provisioning cloud environments with Terraform, keeping Jenkins pipelines green,
            and containerizing everything in between.
          </motion.p>

          <motion.div
            className="hero-links"
            initial="hidden"
            animate="show"
            variants={stagger}
            transition={{ delayChildren: 1.55 }}
          >
            {[
              ["✉ yashkapadi74909@outlook.com", "mailto:yashkapadi74909@outlook.com"],
              ["☎ +91 7490947294", "tel:+917490947294"],
              ["in/yashkapadi6", "https://www.linkedin.com/in/yashkapadi6"],
              ["github.com/yashkapadi12", "https://github.com/yashkapadi12"],
            ].map(([label, href]) => (
              <motion.a
                key={label}
                className="pill"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -2, borderColor: "var(--pass-dim)" }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="status-strip"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            {[
              { label: "Cluster CPU Load", val: `${cpuLoad}%`, percent: cpuLoad, color: "var(--amber)" },
              { label: "Memory allocation", val: `${ramLoad}%`, percent: ramLoad, color: "var(--purple)" },
              { label: "Service Uptime", val: "99.99%", percent: 100, color: "var(--pass)" },
              { label: "CI/CD Build Success", val: "100%", percent: 100, color: "var(--blue)" }
            ].map((dial) => (
              <motion.div className="status-cell" key={dial.label} variants={fadeUp}>
                <div className="status-cell-inner">
                  <div className="dial-container">
                    <svg width="40" height="40" viewBox="0 0 36 36" className="dial-svg">
                      <path
                        className="dial-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--line)"
                        strokeWidth="3.5"
                      />
                      <path
                        className="dial-fg"
                        strokeDasharray={`${dial.percent}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={dial.color}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                    </svg>
                    <div className="dial-value">{dial.val}</div>
                  </div>
                  <div className="status-label">{dial.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="experience">
          <div className="pipeline-section-header">
            <SectionHead tag="01 · pipeline" title="Experience" />
            <button
              className={`pipeline-trigger-btn ${pipelineStatus}`}
              onClick={runSimulation}
              disabled={pipelineStatus === "running"}
            >
              {pipelineStatus === "idle" && "Trigger Pipeline Build"}
              {pipelineStatus === "running" && "Executing Build..."}
              {pipelineStatus === "success" && "Re-run Pipeline"}
            </button>
          </div>

          <div className="pipeline-board">
            <div className="pipeline-stages-row">
              {[
                { idx: 0, label: "01. DEV", sub: "Esurgent", jobIdx: 4 },
                { idx: 1, label: "02. QA", sub: "Saltriver", jobIdx: 3 },
                { idx: 2, label: "03. BUILD", sub: "WebeLight Intern", jobIdx: 2 },
                { idx: 3, label: "04. IAC", sub: "WebeLight Jr.", jobIdx: 1 },
                { idx: 4, label: "05. DEPLOY", sub: "GTCSYS", jobIdx: 0 }
              ].map((stage, sIdx) => {
                const isActive = currentStage === sIdx;
                const isPassed = currentStage > sIdx || pipelineStatus === "success";
                const isSelected = activeJobIndex === stage.jobIdx;

                return (
                  <div key={stage.idx} className="pipeline-stage-container">
                    <div
                      className={`pipeline-stage-block ${isActive ? "active" : ""} ${isPassed ? "passed" : ""} ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        if (pipelineStatus !== "running") {
                          setActiveJobIndex(stage.jobIdx);
                        }
                      }}
                    >
                      <div className="pipeline-stage-status-dot" />
                      <div className="pipeline-stage-label">{stage.label}</div>
                      <div className="pipeline-stage-sub">{stage.sub}</div>
                    </div>
                    {sIdx < 4 && (
                      <div className={`pipeline-connector-line ${isPassed ? "passed" : ""} ${isActive ? "active" : ""}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pipeline-dashboard-grid">
              <div className="pipeline-job-spec-card">
                <div className="pipeline-spec-header">
                  <div>
                    <h3 className="pipeline-spec-role">{experience[activeJobIndex].role}</h3>
                    <div className="pipeline-spec-org">— {experience[activeJobIndex].org}</div>
                  </div>
                  <span className={`badge ${experience[activeJobIndex].status === "running" ? "building" : ""}`}>
                    {experience[activeJobIndex].status}
                  </span>
                </div>
                <div className="pipeline-spec-time">{experience[activeJobIndex].time}</div>
                <ul className="pipeline-spec-bullets">
                  {experience[activeJobIndex].bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="pipeline-console-terminal">
                <div className="pipeline-console-header">
                  <span className="tdot r" />
                  <span className="tdot y" />
                  <span className="tdot g" />
                  <span className="pipeline-console-title">jenkins_agent_01@yashkapadi: ~</span>
                </div>
                <div className="pipeline-console-body" ref={logTerminalEndRef}>
                  {logs.map((logLine, idx) => (
                    <div key={idx} className={`console-line ${logLine?.startsWith("SUCCESS") ? "success" : (logLine?.startsWith("🎉") || logLine?.startsWith("✨")) ? "highlight" : ""}`}>
                      {logLine}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack">
          <SectionHead tag="02 · dependencies" title="Stack" />
          <div className="stack-board-layout">
            <div className="stack-list-panel">
              {stack.map((group) => (
                <div className="stack-category-card" key={group.title}>
                  <div className="stack-category-title">{group.title}</div>
                  <div className="chip-row">
                    {group.items.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="stack-topology-panel">
              <div className="topology-title-bar">
                <span>Infrastructure Map (Live traffic simulation)</span>
              </div>
              <div className="topology-map-container">
                <svg viewBox="0 0 500 240" className="topology-svg">
                  <rect x="180" y="20" width="310" height="200" rx="10" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="6,4" />
                  <text x="192" y="38" fontSize="10" fill="var(--text-faint)" fontFamily="var(--mono)" fontWeight="700">AWS VPC</text>

                  {/* Connection Paths */}
                  <path d="M 45 120 L 100 120" stroke="var(--line)" strokeWidth="2" fill="none" />
                  <path d="M 45 120 L 100 120" stroke="var(--blue)" strokeWidth="2" fill="none" className="traffic-line" />

                  <path d="M 140 120 L 195 120" stroke="var(--line)" strokeWidth="2" fill="none" />
                  <path d="M 140 120 L 195 120" stroke="var(--pass)" strokeWidth="2" fill="none" className="traffic-line" />

                  <path d="M 235 120 C 265 120, 275 75, 305 75" stroke="var(--line)" strokeWidth="2" fill="none" />
                  <path d="M 235 120 C 265 120, 275 75, 305 75" stroke="var(--purple)" strokeWidth="2" fill="none" className="traffic-line" />

                  <path d="M 235 120 C 265 120, 275 165, 305 165" stroke="var(--line)" strokeWidth="2" fill="none" />
                  <path d="M 235 120 C 265 120, 275 165, 305 165" stroke="var(--purple)" strokeWidth="2" fill="none" className="traffic-line" />

                  <path d="M 345 75 L 410 75" stroke="var(--line)" strokeWidth="2" fill="none" />
                  <path d="M 345 75 L 410 75" stroke="var(--amber)" strokeWidth="2" fill="none" className="traffic-line" />

                  {/* Client */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("cloudfront")} onMouseLeave={() => setHoveredNode(null)}>
                    <rect x="10" y="95" width="35" height="50" rx="6" fill="var(--bg-card)" stroke="var(--line)" strokeWidth="1.5" />
                    <text x="27" y="120" fontSize="16" textAnchor="middle">💻</text>
                    <text x="27" y="137" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">Client</text>
                  </g>

                  {/* Route53 */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("route53")} onMouseLeave={() => setHoveredNode(null)}>
                    <circle cx="120" cy="120" r="20" fill="var(--bg-card)" stroke="var(--blue)" strokeWidth="1.5" />
                    <text x="120" y="124" fontSize="12" textAnchor="middle">🌐</text>
                    <text x="120" y="150" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">Route53</text>
                  </g>

                  {/* ALB */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("alb")} onMouseLeave={() => setHoveredNode(null)}>
                    <rect x="195" y="95" width="40" height="50" rx="6" fill="var(--bg-card)" stroke="var(--purple)" strokeWidth="1.5" />
                    <text x="215" y="120" fontSize="15" textAnchor="middle">🔀</text>
                    <text x="215" y="137" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">ALB</text>
                  </g>

                  {/* ECS */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("ecs")} onMouseLeave={() => setHoveredNode(null)}>
                    <rect x="305" y="50" width="40" height="50" rx="6" fill="var(--bg-card)" stroke="var(--amber)" strokeWidth="1.5" />
                    <text x="325" y="75" fontSize="14" textAnchor="middle">🐳</text>
                    <text x="325" y="92" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">ECS</text>
                  </g>

                  {/* S3 */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("s3")} onMouseLeave={() => setHoveredNode(null)}>
                    <rect x="305" y="140" width="40" height="50" rx="6" fill="var(--bg-card)" stroke="var(--blue)" strokeWidth="1.5" />
                    <text x="325" y="165" fontSize="14" textAnchor="middle">🪣</text>
                    <text x="325" y="182" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">S3</text>
                  </g>

                  {/* RDS */}
                  <g className="topo-node" onMouseEnter={() => setHoveredNode("rds")} onMouseLeave={() => setHoveredNode(null)}>
                    <rect x="410" y="50" width="40" height="50" rx="6" fill="var(--bg-card)" stroke="var(--pass)" strokeWidth="1.5" />
                    <text x="430" y="75" fontSize="14" textAnchor="middle">💾</text>
                    <text x="430" y="92" fontSize="8" fill="var(--text-dim)" textAnchor="middle" fontFamily="var(--mono)">RDS DB</text>
                  </g>
                </svg>
              </div>

              {/* Telemetry output */}
              <div className="telemetry-panel">
                <div className="telemetry-header">
                  <div className="telemetry-title">
                    {hoveredNode ? TELEMETRY_DATA[hoveredNode].title : DEFAULT_TELEMETRY.title}
                  </div>
                  <span className={`telemetry-status ${hoveredNode ? TELEMETRY_DATA[hoveredNode].status : DEFAULT_TELEMETRY.status}`}>
                    {hoveredNode ? TELEMETRY_DATA[hoveredNode].status : DEFAULT_TELEMETRY.status}
                  </span>
                </div>
                <div className="telemetry-desc">
                  {hoveredNode ? TELEMETRY_DATA[hoveredNode].desc : DEFAULT_TELEMETRY.desc}
                </div>
                <div className="telemetry-metrics-grid">
                  {(hoveredNode ? TELEMETRY_DATA[hoveredNode].metrics : DEFAULT_TELEMETRY.metrics).map((metric) => (
                    <div key={metric.name} className="telemetry-metric-cell">
                      <div className="metric-label">{metric.name}</div>
                      <div className="metric-value">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="building-box"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: 24 }}
          >
            <span className="spinner" />
            <div className="building-text">
              <strong>Currently building:</strong> Kubernetes, Prometheus, and Grafana —
              leveling up from server-level monitoring to full cluster observability.
            </div>
          </motion.div>
        </section>

        <section id="education">
          <SectionHead tag="03 · source" title="Education" />
          <motion.div
            className="edu-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="edu-name">Bachelor of Computer Application (BCA)</div>
              <div className="edu-org">L.J. University</div>
            </div>
            <div className="edu-time">Aug 2018 — May 2022</div>
          </motion.div>
        </section>
      </div>

      <footer id="contact">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-title">Let&apos;s ship something</h2>
            <p className="contact-sub">
              Open to DevOps and infrastructure roles. The fastest way to reach me is email or
              LinkedIn.
            </p>
            <div className="contact-terminal">
              <span className="prompt">$</span> curl -s yash.dev/contact
              <br />
              <span className="out" style={{ display: "block", marginTop: 6 }}>
                → email: yashkapadi74909@outlook.com
                <br />
                → phone: +91 7490947294
                <br />
                → whatsapp: wa.me/917490947294
                <br />
                → linkedin: linkedin.com/in/yashkapadi6
                <br />
                → github: github.com/yashkapadi12
              </span>
            </div>
            <div className="contact-links">
              <a className="pill" href="mailto:yashkapadi74909@outlook.com">
                Email me
              </a>
              <a
                className="pill"
                href="https://wa.me/917490947294"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="pill"
                href="https://www.linkedin.com/in/yashkapadi6"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="pill"
                href="https://github.com/yashkapadi12"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="foot-note">// build passing — last deployed Jul 2026</div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
