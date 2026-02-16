"use client";

import React, { useState } from "react";
import { useUserProgress } from "@/context/UserProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { Award, BookOpen, ChevronRight, Code, Database, Globe, Layers, Layout, Server, Shield, Star, Zap, Brain as BrainCircuit, Divide, ArrowLeft, Hexagon, Terminal, Cpu, Lock, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

// ============================================================================
// 🧠 DATA MAINFRAME
// ============================================================================


// --- TYPES ---
type Course = {
    title: string;
    provider: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Specialized" | "Mastery";
    duration: string;
    rating: string;
    link?: string;
};

type SkillNode = {
    id: string;
    name: string;
    level: number;
    category: string;
    icon: any;
    details: string;
    courses?: Course[];
};

const SKILL_NODES: SkillNode[] = [
    {
        id: "s1", name: "Cloud Architecture", level: 95, category: "Strategic", icon: Globe, details: "Enterprise-grade distributed system design on AWS/GCP.",
        courses: [
            { title: "Google Cloud Professional Architect Guide", provider: "Google Cloud", level: "Advanced", duration: "3 Months", rating: "4.8/5" },
            { title: "Solutions Architect - Professional", provider: "A Cloud Guru", level: "Mastery", duration: "60 Hours", rating: "4.9/5" },
            { title: "Designing Data-Intensive Applications", provider: "O'Reilly (Book)", level: "Advanced", duration: "Self-Paced", rating: "5.0/5" }
        ]
    },
    {
        id: "s2", name: "Distributed Systems", level: 88, category: "Technical", icon: Server, details: "Microservices patterns, event-driven architecture, CAP theorem mastery.",
        courses: [
            { title: "MIT 6.824: Distributed Systems", provider: "MIT OpenCourseWare", level: "Mastery", duration: "1 Semester", rating: "5.0/5" },
            { title: "Microservices Patterns", provider: "Manning (Chris Richardson)", level: "Advanced", duration: "Self-Paced", rating: "4.7/5" },
            { title: "System Design Primer", provider: "GitHub", level: "Intermediate", duration: "Continuous", rating: "4.9/5" }
        ]
    },
    {
        id: "s3", name: "AI Engineering", level: 92, category: "Innovative", icon: BrainCircuit, details: "LLM integration, RAG pipelines, PyTorch model deployment.",
        courses: [
            { title: "Hugging Face Diffusion Models Class", provider: "Hugging Face", level: "Specialized", duration: "4 Weeks", rating: "4.9/5" },
            { title: "Deep Learning Specialization", provider: "DeepLearning.AI", level: "Advanced", duration: "3 Months", rating: "4.9/5" },
            { title: "LLM Bootcamp: Buiding with LLMs", provider: "Full Stack Deep Learning", level: "Advanced", duration: "2 Days", rating: "4.8/5" }
        ]
    },
    {
        id: "s4", name: "Full Stack Dev", level: 98, category: "Technical", icon: Layout, details: "React, Next.js, Node.js, and modern frontend performance tuning.",
        courses: [
            { title: "Advanced React Patterns", provider: "Kent C. Dodds", level: "Mastery", duration: "Self-Paced", rating: "5.0/5" },
            { title: "Next.js Enterprise Course", provider: "Vercel", level: "Advanced", duration: "4 Weeks", rating: "4.8/5" },
            { title: "Total TypeScript", provider: "Matt Pocock", level: "Advanced", duration: "Self-Paced", rating: "4.9/5" }
        ]
    },
    {
        id: "s5", name: "DevSecOps", level: 85, category: "Strategic", icon: Shield, details: "CI/CD pipelines, container security, infrastructure as code.",
        courses: [
            { title: "DevSecOps Fundamentals", provider: "IBM", level: "Intermediate", duration: "6 Weeks", rating: "4.6/5" },
            { title: "Certified Kubernetes Security Specialist", provider: "CNCF", level: "Advanced", duration: "Self-Paced", rating: "4.8/5" }
        ]
    },
    {
        id: "s6", name: "Data Science", level: 80, category: "Analytical", icon: Database, details: "Python data stack (Pandas, NumPy), visualization, and statistical analysis.",
        courses: [
            { title: "IBM Data Science Professional Certificate", provider: "Coursera", level: "Intermediate", duration: "10 Months", rating: "4.6/5" },
            { title: "Python for Data Science and Machine Learning Bootcamp", provider: "Udemy", level: "Intermediate", duration: "25 Hours", rating: "4.6/5" }
        ]
    },
    // NEW SKILLS FROM SKILL GAP
    {
        id: "s7", name: "React.js", level: 96, category: "Technical", icon: Code, details: "Advanced component patterns, state management, and performance hooks.",
        courses: [
            { title: "Epic React", provider: "Kent C. Dodds", level: "Mastery", duration: "Self-Paced", rating: "5.0/5" },
            { title: "React Performance Masterclass", provider: "Aggregated", level: "Advanced", duration: "10 Hours", rating: "4.8/5" }
        ]
    },
    {
        id: "s8", name: "TypeScript", level: 94, category: "Technical", icon: Code, details: "Strict typing, generics, and complex utility types for robust codebases.",
        courses: [
            { title: "Effective TypeScript", provider: "O'Reilly (Book)", level: "Advanced", duration: "Self-Paced", rating: "4.7/5" },
            { title: "Total TypeScript Pro", provider: "Matt Pocock", level: "Mastery", duration: "Self-Paced", rating: "4.9/5" }
        ]
    },
    {
        id: "s9", name: "Next.js 14", level: 90, category: "Technical", icon: Layers, details: "App router, server actions, and edge rendering optimization.",
        courses: [
            { title: "Next.js 14 & React - The Complete Guide", provider: "Udemy (Maximilian)", level: "Advanced", duration: "30 Hours", rating: "4.8/5" },
            { title: "The Next.js Handbook", provider: "FreeCodeCamp", level: "Intermediate", duration: "Self-Paced", rating: "4.7/5" }
        ]
    },
    {
        id: "s10", name: "Node.js", level: 92, category: "Technical", icon: Server, details: "Async runtime, event loop auditing, and scalable API development.",
        courses: [
            { title: "Node.js Design Patterns", provider: "Packt (Book)", level: "Advanced", duration: "Self-Paced", rating: "4.8/5" },
            { title: "NestJS Fundamentals", provider: "NestJS Official", level: "Intermediate", duration: "15 Hours", rating: "4.9/5" }
        ]
    },
    {
        id: "s11", name: "Rust", level: 75, category: "Strategic", icon: Lock, details: "Memory-safe systems programming and WASM compilation targets.",
        courses: [
            { title: "Rust for Rustaceans", provider: "No Starch Press", level: "Mastery", duration: "Self-Paced", rating: "4.9/5" },
            { title: "Crust of Rust", provider: "Jon Gjengset (YouTube)", level: "Advanced", duration: "Continuous", rating: "5.0/5" },
            { title: "The Rust Programming Language", provider: "Online Book", level: "Intermediate", duration: "Self-Paced", rating: "4.8/5" }
        ]
    },
    {
        id: "s12", name: "Go (Golang)", level: 82, category: "Strategic", icon: Terminal, details: "High-concurrency backend services and cloud-native tooling.",
        courses: [
            { title: "Learn Go with Tests", provider: "GitBook", level: "Intermediate", duration: "Self-Paced", rating: "4.8/5" },
            { title: "Go Class: Concurrent Programming", provider: "Matt Holiday", level: "Advanced", duration: "10 Hours", rating: "4.9/5" }
        ]
    },
    {
        id: "s13", name: "Kubernetes", level: 85, category: "Strategic", icon: Globe, details: "Container orchestration, helm charts, and operator pattern implementation.",
        courses: [
            { title: "Kubernetes the Hard Way", provider: "Kelsey Hightower", level: "Mastery", duration: "Self-Paced", rating: "5.0/5" },
            { title: "LFS258: Kubernetes Fundamentals", provider: "Linux Foundation", level: "Advanced", duration: "30 Hours", rating: "4.7/5" },
            { title: "CKA Exam Study Guide", provider: "Killer.sh", level: "Advanced", duration: "Simulated", rating: "4.8/5" }
        ]
    },
    {
        id: "s14", name: "Terraform", level: 88, category: "Strategic", icon: Database, details: "Infrastructure as Code (IaC) for multi-cloud environments.",
        courses: [
            { title: "HashiCorp Certified: Terraform Associate", provider: "HashiCorp / Udemy", level: "Intermediate", duration: "15 Hours", rating: "4.7/5" },
            { title: "Terraform Up & Running", provider: "O'Reilly", level: "Advanced", duration: "Self-Paced", rating: "4.8/5" }
        ]
    },
    {
        id: "s15", name: "LLM Ops", level: 80, category: "Innovative", icon: BrainCircuit, details: "Fine-tuning models, vector database management, and prompt engineering.",
        courses: [
            { title: "LLM Apps with LangChain", provider: "DeepLearning.AI", level: "Advanced", duration: "Short Course", rating: "4.8/5" },
            { title: "Generative AI with LLMs", provider: "Coursera / AWS", level: "Advanced", duration: "3 Weeks", rating: "4.7/5" }
        ]
    },
    {
        id: "s16", name: "Docker", level: 95, category: "Technical", icon: Layers, details: "Containerization best practices and multi-stage build optimization.",
        courses: [
            { title: "Docker Mastery", provider: "Bret Fisher (Udemy)", level: "Intermediate", duration: "20 Hours", rating: "4.8/5" }
        ]
    },

    // --- EXPANDED NEURAL NETWORK: 50+ NEW SKILLS ---

    // LANGUAGES
    { id: "s17", name: "Python", level: 90, category: "Technical", icon: Terminal, details: "Versatile scripting, data science, and backend development." },
    { id: "s18", name: "Java", level: 85, category: "Technical", icon: Code, details: "Enterprise-grade object-oriented programming and JVM tuning." },
    { id: "s19", name: "C++", level: 80, category: "Technical", icon: Cpu, details: "High-performance systems programming and memory management." },
    { id: "s20", name: "C#", level: 82, category: "Technical", icon: Code, details: "Game development (Unity) and .NET enterprise ecosystems." },
    { id: "s21", name: "JavaScript", level: 95, category: "Technical", icon: Code, details: "The language of the web: ES6+, async/await, and DOM manipulation." },
    { id: "s22", name: "Ruby", level: 70, category: "Technical", icon: Code, details: "Developer happiness, Rails framework, and metaprogramming." },
    { id: "s23", name: "Swift", level: 75, category: "Technical", icon: Layout, details: "iOS app development, SwiftUI, and Apple ecosystem." },
    { id: "s24", name: "Kotlin", level: 78, category: "Technical", icon: Layout, details: "Modern Android development and multiplatform mobile apps." },
    { id: "s25", name: "PHP", level: 75, category: "Technical", icon: Server, details: "Server-side scripting powering major content management systems." },

    // FRONTEND ECOSYSTEM
    { id: "s26", name: "Vue.js", level: 80, category: "Technical", icon: Layout, details: "Progressive framework for building user interfaces." },
    { id: "s27", name: "Angular", level: 75, category: "Strategic", icon: Layout, details: "Opinionated platform for scalable web applications." },
    { id: "s28", name: "Svelte", level: 70, category: "Innovative", icon: Zap, details: "Cybernetically enhanced web apps with no virtual DOM." },
    { id: "s29", name: "HTML5", level: 98, category: "Technical", icon: Layout, details: "Semantic structure and modern web accessibility standards." },
    { id: "s30", name: "CSS3", level: 95, category: "Technical", icon: Layout, details: "Flexbox, Grid, Animations, and responsive design systems." },
    { id: "s31", name: "Tailwind CSS", level: 92, category: "Technical", icon: Layout, details: "Utility-first CSS framework for rapid UI development." },
    { id: "s32", name: "Redux", level: 85, category: "Technical", icon: Layers, details: "Predictable state container for complex JavaScript apps." },

    // BACKEND & API
    { id: "s33", name: "Django", level: 85, category: "Technical", icon: Server, details: "High-level Python web framework for rapid design." },
    { id: "s34", name: "Flask", level: 80, category: "Technical", icon: Server, details: "Micro-framework for lightweight Python web services." },
    { id: "s35", name: "Spring Boot", level: 78, category: "Strategic", icon: Server, details: "Stand-alone, production-grade Spring based Applications." },
    { id: "s36", name: "Express.js", level: 90, category: "Technical", icon: Server, details: "Fast, unopinionated, minimalist web framework for Node.js." },
    { id: "s37", name: "GraphQL", level: 82, category: "Technical", icon: Globe, details: "Query language for APIs and runtime for fulfilling queries." },
    { id: "s38", name: "REST API", level: 95, category: "Strategic", icon: Globe, details: "Standard architectural style for distributed hypermedia systems." },

    // DATA & STORAGE
    { id: "s39", name: "PostgreSQL", level: 88, category: "Strategic", icon: Database, details: "Advanced open source relational database with JSON support." },
    { id: "s40", name: "MongoDB", level: 85, category: "Technical", icon: Database, details: "NoSQL document database for modern application development." },
    { id: "s41", name: "Redis", level: 80, category: "Technical", icon: Zap, details: "In-memory data structure store, used as a database, cache, and broker." },
    { id: "s42", name: "MySQL", level: 85, category: "Technical", icon: Database, details: "The world's most popular open source database." },
    { id: "s43", name: "Firebase", level: 88, category: "Technical", icon: Database, details: "Google's mobile platform for creating high-quality apps." },

    // CLOUD & DEVOPS
    { id: "s44", name: "Azure", level: 75, category: "Strategic", icon: Globe, details: "Microsoft's cloud computing service for building and managing applications." },
    { id: "s45", name: "GCP", level: 80, category: "Strategic", icon: Globe, details: "Google Cloud Platform suite of cloud computing services." },
    { id: "s46", name: "Jenkins", level: 70, category: "Strategic", icon: Shield, details: "Open source automation server for CI/CD." },
    { id: "s47", name: "GitHub Actions", level: 85, category: "Technical", icon: Shield, details: "Automate, customize, and execute your software development workflows." },
    { id: "s48", name: "Ansible", level: 65, category: "Strategic", icon: Terminal, details: "Software provisioning, configuration management, and application-deployment." },
    { id: "s49", name: "Linux", level: 85, category: "Technical", icon: Terminal, details: "Open-source operating system kernel fundamentals." },

    // AI & INNOVATION
    { id: "s50", name: "TensorFlow", level: 75, category: "Innovative", icon: BrainCircuit, details: "End-to-end open source platform for machine learning." },
    { id: "s51", name: "Keras", level: 78, category: "Innovative", icon: BrainCircuit, details: "Deep learning API written in Python, running on top of TensorFlow." },
    { id: "s52", name: "Scikit-learn", level: 80, category: "Innovative", icon: BrainCircuit, details: "Simple and efficient tools for predictive data analysis." },
    { id: "s53", name: "OpenCV", level: 70, category: "Innovative", icon: Hexagon, details: "Real-time computer vision library." },
    { id: "s54", name: "NLP", level: 72, category: "Innovative", icon: BrainCircuit, details: "Natural Language Processing algorithms and implementations." },

    // EMERGING & TOOLS
    { id: "s55", name: "Solidity", level: 65, category: "Innovative", icon: Hexagon, details: "Object-oriented, high-level language for implementing smart contracts." },
    { id: "s56", name: "Git", level: 95, category: "Technical", icon: Code, details: "Distributed version control system." },
    { id: "s57", name: "Agile", level: 90, category: "Strategic", icon: Globe, details: "Iterative approach to project management and software development." },
    { id: "s58", name: "Figma", level: 85, category: "Strategic", icon: Layout, details: "Collaborative interface design tool." },
    { id: "s59", name: "Jira", level: 80, category: "Strategic", icon: Layout, details: "Issue tracking and project management tool." },
    { id: "s60", name: "Bash", level: 80, category: "Technical", icon: Terminal, details: "Unix shell and command language." }
];

const CERT_VAULT = [
    {
        id: "c1",
        title: "Google Professional Cloud Architect",
        issuer: "Google Cloud",
        date: "2025",
        badgeColor: "from-blue-500 to-cyan-400",
        id_code: "GCP-PCA-829910",
        skills: ["IAM", "Compute Engine", "GKE"]
    },
    {
        id: "c2",
        title: "Certified Kubernetes Administrator (CKA)",
        issuer: "CNCF",
        date: "2024",
        badgeColor: "from-indigo-500 to-purple-400",
        id_code: "CKA-2201-9921",
        skills: ["Cluster Scheduling", "Logging", "Security"]
    },
    {
        id: "c3",
        title: "AWS Certified Security - Specialty",
        issuer: "Amazon Web Services",
        date: "2024",
        badgeColor: "from-orange-500 to-yellow-400",
        id_code: "AWS-SCS-1120",
        skills: ["KMS", "GuardDuty", "WAF"]
    },

    // --- EXPANDED CERTIFICATE VAULT: 30+ NEW ENTRIES ---

    // CLOUD & DEVOPS
    { id: "c4", title: "AWS Certified Solutions Architect - Professional", issuer: "AWS", date: "2025", badgeColor: "from-orange-600 to-yellow-500", id_code: "AWS-SAP-9921", skills: ["Hybrid Cloud", "Migration", "Cost Opt"] },
    { id: "c5", title: "Microsoft Certified: Azure Solutions Architect Expert", issuer: "Microsoft", date: "2024", badgeColor: "from-blue-600 to-cyan-500", id_code: "MS-AZ-305", skills: ["Azure AD", "CosmosDB", "VNETs"] },
    { id: "c6", title: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", date: "2023", badgeColor: "from-purple-600 to-indigo-500", id_code: "HCP-Terra-002", skills: ["IaC", "Modules", "State Mgmt"] },
    { id: "c7", title: "Certified Kubernetes Application Developer (CKAD)", issuer: "CNCF", date: "2024", badgeColor: "from-blue-500 to-indigo-400", id_code: "CKAD-2210", skills: ["Pod Design", "Services", "Observability"] },
    { id: "c8", title: "Docker Certified Associate", issuer: "Docker", date: "2023", badgeColor: "from-blue-400 to-cyan-300", id_code: "DCA-5501", skills: ["Swarm", "Compose", "Registry"] },
    { id: "c9", title: "Red Hat Certified Engineer (RHCE)", issuer: "Red Hat", date: "2024", badgeColor: "from-red-600 to-red-400", id_code: "RHCE-8821", skills: ["Ansible", "Linux Automation", "Scripting"] },

    // AI & DATA SCIENCE
    { id: "c10", title: "TensorFlow Developer Certificate", issuer: "Google", date: "2024", badgeColor: "from-orange-500 to-red-400", id_code: "TF-DEV-2024", skills: ["CNNs", "NLP", "Time Series"] },
    { id: "c11", title: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "2023", badgeColor: "from-yellow-500 to-orange-400", id_code: "DL-AI-SPEC", skills: ["Neural Networks", "Backprop", "Optimization"] },
    { id: "c12", title: "Databricks Certified Data Engineer Professional", issuer: "Databricks", date: "2025", badgeColor: "from-red-500 to-orange-500", id_code: "DB-DE-PRO", skills: ["Spark", "Delta Lake", "ETL"] },
    { id: "c13", title: "Snowflake SnowPro Core", issuer: "Snowflake", date: "2024", badgeColor: "from-blue-400 to-cyan-200", id_code: "SNOW-CORE-1", skills: ["Data Warehousing", "Scaling", "Security"] },
    { id: "c14", title: "IBM AI Engineering Professional Certificate", issuer: "IBM", date: "2023", badgeColor: "from-blue-700 to-blue-500", id_code: "IBM-AI-ENG", skills: ["Keras", "PyTorch", "Computer Vision"] },

    // SECURITY & CYBERSECURITY
    { id: "c15", title: "CISSP - Certified Information Systems Security Professional", issuer: "ISC2", date: "2025", badgeColor: "from-green-600 to-emerald-400", id_code: "CISSP-99102", skills: ["Risk Mgmt", "Cryptography", "Identity"] },
    { id: "c16", title: "CompTIA Security+", issuer: "CompTIA", date: "2023", badgeColor: "from-red-600 to-red-500", id_code: "SY0-601", skills: ["Threats", "Attacks", "Vulnerabilities"] },
    { id: "c17", title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "2024", badgeColor: "from-green-500 to-lime-400", id_code: "CEH-v12-001", skills: ["Pen Testing", "Scanning", "Enumeration"] },
    { id: "c18", title: "OSCP - Offensive Security Certified Professional", issuer: "OffSec", date: "2025", badgeColor: "from-red-700 to-red-500", id_code: "OSCP-2210", skills: ["Exploitation", "Buffer Overflow", "PrivEsc"] },

    // PROGRAMMING & DEVELOPMENT
    { id: "c19", title: "Oracle Certified Professional: Java SE 17 Developer", issuer: "Oracle", date: "2024", badgeColor: "from-red-500 to-orange-500", id_code: "OCP-JAVA-17", skills: ["Streams", "Lambda", "Concurrency"] },
    { id: "c20", title: "PCEP – Certified Entry-Level Python Programmer", issuer: "Python Institute", date: "2023", badgeColor: "from-yellow-400 to-yellow-200", id_code: "PCEP-30-02", skills: ["Syntax", "Control Flow", "Data Types"] },
    { id: "c21", title: "Meta Front-End Developer Professional Certificate", issuer: "Meta", date: "2024", badgeColor: "from-blue-500 to-blue-300", id_code: "META-FE-DEV", skills: ["React", "UX/UI", "Version Control"] },
    { id: "c22", title: "Google UX Design Professional Certificate", issuer: "Google", date: "2023", badgeColor: "from-purple-500 to-pink-400", id_code: "G-UX-DES", skills: ["Wireframing", "Prototyping", "User Research"] },
    { id: "c23", title: "MongoDB Certified Developer Associate", issuer: "MongoDB", date: "2024", badgeColor: "from-green-500 to-green-300", id_code: "MDB-C100", skills: ["Aggregation", "Indexing", "CRUD"] },

    // AGILE & MANAGEMENT
    { id: "c24", title: "Project Management Professional (PMP)", issuer: "PMI", date: "2025", badgeColor: "from-blue-800 to-blue-600", id_code: "PMP-33102", skills: ["Leadership", "Process", "Business"] },
    { id: "c25", title: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", date: "2023", badgeColor: "from-yellow-500 to-orange-400", id_code: "CSM-9910", skills: ["Scrum", "Servant Leadership", "Facilitation"] },
    { id: "c26", title: "SAFe 6 Agilist", issuer: "Scaled Agile", date: "2024", badgeColor: "from-gray-600 to-gray-400", id_code: "SAFE-6-AG", skills: ["Lean", "Agile Scaling", "DevOps"] },

    // NETWORKING & INFRA
    { id: "c27", title: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", date: "2024", badgeColor: "from-blue-500 to-cyan-500", id_code: "CCNA-200-301", skills: ["Routing", "Switching", "IP Connectivity"] },
    { id: "c28", title: "Juniper Networks Certified Associate (JNCIA-Junos)", issuer: "Juniper", date: "2023", badgeColor: "from-green-600 to-green-400", id_code: "JNCIA-Junos", skills: ["Junos OS", "Routing Policy", "Firewall Filters"] },

    // SPECIALIZED / NICHE
    { id: "c29", title: "Chainlink Developer Expert", issuer: "Chainlink", date: "2025", badgeColor: "from-blue-600 to-indigo-600", id_code: "LINK-DEV-01", skills: ["Oracles", "Smart Contracts", "DeFi"] },
    { id: "c30", title: "Unity Certified Programmer", issuer: "Unity", date: "2024", badgeColor: "from-gray-700 to-gray-500", id_code: "UCP-2024", skills: ["C#", "Physics", "3D Math"] },
    { id: "c31", title: "Unreal Engine 5 Professional", issuer: "Epic Games", date: "2025", badgeColor: "from-gray-800 to-black", id_code: "UE5-PRO-01", skills: ["Blueprints", "C++", "Nanite/Lumen"] },
    { id: "c32", title: "Salesforce Certified Administrator", issuer: "Salesforce", date: "2023", badgeColor: "from-blue-400 to-cyan-300", id_code: "SF-ADM-201", skills: ["CRM", "Configuration", "Flows"] },
    { id: "c33", title: "Elastic Certified Engineer", issuer: "Elastic", date: "2024", badgeColor: "from-yellow-500 to-pink-500", id_code: "ELASTIC-ENG", skills: ["Elasticsearch", "Kibana", "Queries"] },
    { id: "c34", title: "Splunk Core Certified Power User", issuer: "Splunk", date: "2023", badgeColor: "from-green-500 to-teal-400", id_code: "SPLK-1002", skills: ["Searching", "Reporting", "Dashboards"] }

];

const LAB_PROJECTS = [
    {
        id: "p1",
        title: "Autonomous Drone Swarm Simulation",
        tagline: "Multi-Agent Reinforcement Learning",
        desc: "Designed a decentralized control consensus algorithm for 50+ autonomous agents using Python and PyTorch. Focused on collision avoidance and target convergence.",
        tech: ["Python", "PyTorch", "Unity Sim"],
        outcome: "PUBLISHED RESEARCH",
        stats: { commits: 450, stars: 120, forks: 35 }
    },
    {
        id: "p2",
        title: "High-Frequency Trading Engine",
        tagline: "Low-Latency C++ Architecture",
        desc: "Built a matching engine processing 10k orders/sec with <50µs latency. Implemented lock-free data structures and kernel bypass networking.",
        tech: ["C++20", "Network Stack", "Linux"],
        outcome: "SYSTEM OPTIMIZATION",
        stats: { commits: 890, stars: 45, forks: 12 }
    },
    {
        id: "p3",
        title: "Decentralized Identity Vault",
        tagline: "Blockchain & ZK-Proofs",
        desc: "Created a privacy-first identity management system using Zero-Knowledge proofs, allowing users to verify age/citizenship without revealing data.",
        tech: ["Solidity", "React", "Web3.js"],
        outcome: "SECURITY AUDIT PASS",
        stats: { commits: 210, stars: 85, forks: 20 }
    },

    // --- EXPANDED RESEARCH LOGS: 15+ NEW PROJECTS ---

    // AI & MACHINE LEARNING
    {
        id: "p4",
        title: "Neural Style Transfer Engine",
        tagline: "Generative AI Art Tool",
        desc: "Implemented a VGG-19 based neural network to transfer artistic styles to photos in real-time. Optimized inference speed by 40% using quantization.",
        tech: ["Python", "TensorFlow", "Flask"],
        outcome: "MODEL OPTIMIZATION",
        stats: { commits: 150, stars: 320, forks: 45 }
    },
    {
        id: "p5",
        title: "RAG-Based Doc Assistant",
        tagline: "Enterprise Knowledge LLM",
        desc: "Built a Retrieval-Augmented Generation system for querying internal PDF documentation. Integrated Pinecone vector DB and GPT-4 API.",
        tech: ["LangChain", "OpenAI", "React"],
        outcome: "INTERNAL TOOL",
        stats: { commits: 280, stars: 95, forks: 15 }
    },
    {
        id: "p6",
        title: "Traffic Sign Recognition System",
        tagline: "Computer Vision for Autonomous Driving",
        desc: "Trained a CNN on the German Traffic Sign Recognition Benchmark (GTSRB) with 98.5% accuracy. Deployed on Raspberry Pi for edge inference.",
        tech: ["PyTorch", "OpenCV", "Edge Computing"],
        outcome: "98.5% ACCURACY",
        stats: { commits: 120, stars: 60, forks: 10 }
    },

    // WEB3 & BLOCKCHAIN
    {
        id: "p7",
        title: "DeFi Yield Aggregator",
        tagline: "Smart Contract Protocol",
        desc: "Developed a protocol that automatically shifts user liquidity between lending platforms (Aave, Compound) to maximize APY. Written in Solidity.",
        tech: ["Solidity", "Hardhat", "Ethers.js"],
        outcome: "$50k TVL SIMULATED",
        stats: { commits: 310, stars: 150, forks: 40 }
    },
    {
        id: "p8",
        title: "Fractional Real Estate Marketplace",
        tagline: "ERC-1155 Tokenization",
        desc: "Created a dApp for tokenizing real estate assets, allowing fractional ownership. Implemented KYC integration and legal compliance smart contracts.",
        tech: ["React", "Solidity", "IPFS"],
        outcome: "HACKATHON WINNER",
        stats: { commits: 240, stars: 210, forks: 55 }
    },

    // FULL STACK & SAAS
    {
        id: "p9",
        title: "Collaborative Whiteboard SaaS",
        tagline: "Real-Time WebSocket App",
        desc: "Built a miro-like infinite canvas with real-time multi-user collaboration using Socket.io and CRDTs for conflict resolution.",
        tech: ["Next.js", "Socket.io", "Redis"],
        outcome: "SCALED TO 500 USERS",
        stats: { commits: 550, stars: 400, forks: 80 }
    },
    {
        id: "p10",
        title: "E-Commerce Microservices Platform",
        tagline: "Scalable Backend Architecture",
        desc: "Refactored a monolith into microservices (Auth, Product, Order, Payment) using RabbitMQ for event-driven communication.",
        tech: ["Node.js", "RabbitMQ", "Docker"],
        outcome: "ARCHITECTURAL REFACTOR",
        stats: { commits: 620, stars: 110, forks: 25 }
    },
    {
        id: "p11",
        title: "HealthTech Telemedicine App",
        tagline: "HIPAA Compliant WebRTC",
        desc: "Developed a video consultation platform with encrypted video calls and secure patient record storage.",
        tech: ["WebRTC", "PostgreSQL", "React"],
        outcome: "PROTOTYPE LAUNCHED",
        stats: { commits: 380, stars: 75, forks: 18 }
    },

    // DEVOPS & INFRASTRUCTURE
    {
        id: "p12",
        title: "Kubernetes Chaos Monkey",
        tagline: "Resilience Testing Tool",
        desc: "Wrote a Go operator that randomly terminates pods in a cluster to test self-healing capabilities of microservices.",
        tech: ["Go", "Kubernetes API", "Docker"],
        outcome: "OPEN SOURCE CONTRIB",
        stats: { commits: 180, stars: 250, forks: 60 }
    },
    {
        id: "p13",
        title: "Serverless Image Optimized Pipeline",
        tagline: "Event-Driven AWS Architecture",
        desc: "Automated image resizing and compression workflow triggering Lambda functions upon S3 uploads.",
        tech: ["AWS Lambda", "S3", "Python"],
        outcome: "COST REDUCTION",
        stats: { commits: 90, stars: 45, forks: 8 }
    },

    // SYSTEMS & TOOLS
    {
        id: "p14",
        title: "Custom 3D Game Engine",
        tagline: "C++ / OpenGL Renderer",
        desc: "Built a game engine from scratch with a custom ECS (Entity Component System), physics engine integration, and PBR rendering.",
        tech: ["C++", "OpenGL", "Lua"],
        outcome: "ACADEMIC PROJECT",
        stats: { commits: 800, stars: 150, forks: 20 }
    },
    {
        id: "p15",
        title: "Rust CLI File Explorer",
        tagline: "High-Performance Tool",
        desc: "Developed a blazing fast command-line file manager with async I/O, replacing 'ls' and 'find' with enhanced UX.",
        tech: ["Rust", "Tokio", "Clap"],
        outcome: "PERFORMANCE BOOST",
        stats: { commits: 140, stars: 300, forks: 45 }
    },

    // SECURITY 
    {
        id: "p16",
        title: "Network Intrusion Detection System",
        tagline: "ML-Based Security",
        desc: "Built a packet sniffer that analyzes network traffic features to detect anomalies and potential ddos attacks using Random Forest.",
        tech: ["Python", "Scikit Level", "Wireshark"],
        outcome: "SECURED DEMO NET",
        stats: { commits: 200, stars: 90, forks: 15 }
    },
    {
        id: "p17",
        title: "Password Strength Auditor",
        tagline: "Entropy Analysis Tool",
        desc: "Created a library to calculate password entropy and check against a database of 10 million breached passwords.",
        tech: ["Go", "Bloom Filter", "SQL"],
        outcome: "LIBRARY PUBLISHED",
        stats: { commits: 85, stars: 55, forks: 10 }
    },
    {
        id: "p18",
        title: "Smart Home IoT Dashboard",
        tagline: "MQTT & React integration",
        desc: "Centralized dashboard for controlling IoT devices (lights, thermostat) via MQTT broker with real-time state updates.",
        tech: ["React", "MQTT", "Node.js"],
        outcome: "HOME AUTOMATION",
        stats: { commits: 330, stars: 110, forks: 28 }
    }
];

// ============================================================================
// 🎮 MAIN COMPONENT
// ============================================================================

import CareerOps from "@/components/ui/CareerOps";
import SimulationDeck from "@/components/ui/SimulationDeck";

// ... existing imports ...

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function CoursesHub() {
    const { addXp } = useUserProgress();
    const [view, setView] = useState<'hub' | 'skills' | 'certs' | 'projects' | 'career' | 'simulation'>('hub');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

    // Filter Logic
    const filteredSkills = SKILL_NODES.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredCerts = CERT_VAULT.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.issuer.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredProjects = LAB_PROJECTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return (
        <div className="h-screen w-full bg-[#050505] text-slate-200 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505] z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none z-0" />

            {/* HEADER NAV */}
            <div className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-4">
                    {view !== 'hub' && (
                        <button
                            onClick={() => { setView('hub'); setSearchQuery(""); }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg backdrop-blur-md transition-all group"
                        >
                            <ArrowLeft size={16} className="text-slate-400 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold text-slate-300">RETURN TO HUB</span>
                        </button>
                    )}
                </div>
                <div className="flex gap-4 pointer-events-auto">
                    {/* SEARCH BAR (Only in sub-views) */}
                    {view !== 'hub' && (
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Globe size={14} className="text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="SEARCH DATA..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs font-mono text-white focus:border-cyan-500/50 focus:bg-black/60 outline-none w-48 transition-all"
                            />
                        </div>
                    )}
                    <div className="px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded text-[10px] font-mono text-cyan-500 flex items-center">
                        LEARNING_OS v2.4
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-10 w-full h-full flex flex-col pt-20 px-8 lg:px-12 pb-12 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">

                    {/* --- VIEW: LOBBY (COMMAND CENTER) --- */}
                    {view === 'hub' && (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="h-full flex flex-col justify-center max-w-7xl mx-auto w-full"
                        >
                            <div className="text-center mb-16">
                                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4">
                                    QUANTUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">KNOWLEDGE</span>
                                </h1>
                                <p className="text-slate-400 text-lg lg:text-xl font-light tracking-wide max-w-2xl mx-auto">
                                    Select a neural pathway to explore advanced competencies.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[400px]">
                                {/* CARD 1: SKILLS */}
                                <div
                                    onClick={() => setView('skills')}
                                    className="group relative h-full bg-gradient-to-b from-cyan-950/30 to-black border border-cyan-500/30 rounded-3xl p-8 cursor-pointer hover:border-cyan-400/80 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full" />

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
                                            <BrainCircuit size={32} className="text-cyan-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">NEURAL SKILLS</h3>
                                            <p className="text-sm text-slate-400 font-light">Interactive mastery graph of strategic and technical competencies.</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-cyan-500 text-xs font-bold tracking-widest uppercase">
                                            <span>Access Node</span>
                                            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2: CERTS */}
                                <div
                                    onClick={() => setView('certs')}
                                    className="group relative h-full bg-gradient-to-b from-yellow-950/30 to-black border border-yellow-500/30 rounded-3xl p-8 cursor-pointer hover:border-yellow-400/80 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-yellow-500/20 blur-3xl rounded-full" />

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                                            <Award size={32} className="text-yellow-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">CREDENTIALS</h3>
                                            <p className="text-sm text-slate-400 font-light">Verified professional certifications and license vault.</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold tracking-widest uppercase">
                                            <span>Open Vault</span>
                                            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 3: PROJECTS */}
                                <div
                                    onClick={() => setView('projects')}
                                    className="group relative h-full bg-gradient-to-b from-purple-950/30 to-black border border-purple-500/30 rounded-3xl p-8 cursor-pointer hover:border-purple-400/80 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                                            <Code size={32} className="text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">RESEARCH LABS</h3>
                                            <p className="text-sm text-slate-400 font-light">Applied intelligence projects and system architecture logs.</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-500 text-xs font-bold tracking-widest uppercase">
                                            <span>Enter Lab</span>
                                            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                                {/* 4. CAREER OPS */}
                                <motion.div variants={itemVariants} onClick={() => setView('career')} className="cursor-pointer group h-full">
                                    <div
                                        className="group relative h-full bg-gradient-to-b from-green-950/30 to-black border border-green-500/30 rounded-3xl p-8 cursor-pointer hover:border-green-400/80 transition-all duration-500 overflow-hidden shadow-lg shadow-green-900/10 hover:shadow-green-500/20"
                                    >
                                        <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-green-500/20 blur-3xl rounded-full" />

                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform">
                                                <Globe size={32} className="text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">CAREER OPS</h3>
                                                <p className="text-sm text-slate-400 font-light">Global market intelligence, salary tickers, and demand heatmaps.</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase">
                                                <span>Access Intel</span>
                                                <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 5. SIMULATION DECK */}
                                <motion.div variants={itemVariants} onClick={() => setView('simulation')} className="cursor-pointer group h-full">
                                    <div
                                        className="group relative h-full bg-gradient-to-b from-red-950/30 to-black border border-red-500/30 rounded-3xl p-8 cursor-pointer hover:border-red-400/80 transition-all duration-500 overflow-hidden shadow-lg shadow-red-900/10 hover:shadow-red-500/20"
                                    >
                                        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-red-500/20 blur-3xl rounded-full" />

                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform">
                                                    <Terminal size={32} className="text-red-400" />
                                                </div>
                                                <div className="px-2 py-1 border border-red-500/30 rounded text-[9px] text-red-400 font-mono animate-pulse bg-red-900/20 uppercase tracking-wider">
                                                    Live Ops
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">SIMULATION DECK</h3>
                                                <p className="text-sm text-slate-400 font-light">Interactive scenarios: incident response, system design, and security audits.</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-red-500 text-xs font-bold tracking-widest uppercase">
                                                <span>Initialize Sim</span>
                                                <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW: SKILLS (NEURAL GRAPH) --- */}
                    {view === 'skills' && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-6xl mx-auto w-full pt-8"
                        >
                            <div className="mb-12 flex items-end justify-between border-b border-cyan-500/20 pb-6">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                                        <Layers className="text-cyan-500" /> NEURAL SKILL GRAPH
                                    </h2>
                                    <p className="text-slate-400 font-mono text-xs tracking-widest">SYSTEM_MASTERY_LEVEL: 92%</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredSkills.map((skill, i) => (
                                    <motion.div
                                        key={skill.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => {
                                            setSelectedSkill(skill);
                                            addXp(50, `NEURAL SYNC: ${skill.name}`);
                                        }}
                                        className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:bg-cyan-950/10 hover:border-cyan-500/50 transition-all group cursor-pointer active:scale-95"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                                                <skill.icon size={24} />
                                            </div>
                                            <span className="text-xs font-mono text-slate-500 border border-white/10 px-2 py-1 rounded">{skill.category}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                                        <p className="text-xs text-slate-400 mb-6 leading-relaxed h-10">{skill.details}</p>

                                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                                                className="absolute top-0 left-0 h-full bg-cyan-500"
                                            />
                                        </div>
                                        <div className="mt-2 text-right text-[10px] font-mono text-cyan-500">{skill.level}% SYNCHRONIZED</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW: CERTS (VAULT) --- */}
                    {view === 'certs' && (
                        <motion.div
                            key="certs"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-6xl mx-auto w-full pt-8"
                        >
                            <div className="mb-12 flex items-end justify-between border-b border-yellow-500/20 pb-6">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                                        <Lock className="text-yellow-500" /> CREDENTIAL VAULT
                                    </h2>
                                    <p className="text-slate-400 font-mono text-xs tracking-widest">VERIFIED_BLOCKCHAIN_IDS</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {filteredCerts.map((cert, i) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, rotateY: 90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="perspective-1000"
                                    >
                                        <div className="relative h-[400px] w-full bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all group p-8 flex flex-col items-center text-center shadow-2xl">
                                            {/* Holographic Sticker */}
                                            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-yellow-500/30 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Star size={16} className="text-yellow-500 animate-spin-slow" />
                                            </div>

                                            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform`}>
                                                <Award size={40} className="text-black" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                                            <p className="text-slate-400 text-sm mb-8">{cert.issuer}</p>

                                            <div className="mt-auto w-full pt-6 border-t border-white/5">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-[10px] text-slate-500 font-mono uppercase">BLOCKCHAIN_HASH</span>
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-900/20 border border-green-500/30 rounded text-[9px] font-bold text-green-400 uppercase tracking-widest">
                                                        <ShieldCheck size={10} /> Verified
                                                    </div>
                                                </div>
                                                <div className="bg-black/40 py-2 px-3 rounded text-[10px] font-mono text-slate-400 tracking-wider mb-4 border border-white/5 truncate">
                                                    0x{cert.id_code}8f2...9a
                                                </div>

                                                <button className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-xs font-bold uppercase transition-all flex items-center justify-center gap-2">
                                                    Verify On-Chain <Zap size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW: PROJECTS (LAB) --- */}
                    {view === 'projects' && (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-6xl mx-auto w-full pt-8"
                        >
                            <div className="mb-12 flex items-end justify-between border-b border-purple-500/20 pb-6">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                                        <Terminal className="text-purple-500" /> RESEARCH TERMINAL
                                    </h2>
                                    <p className="text-slate-400 font-mono text-xs tracking-widest">ACTIVE_EXPERIMENTS_LOG</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredProjects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative bg-black/40 border border-white/10 rounded-2xl p-0 overflow-hidden hover:border-purple-500/50 transition-all"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex flex-col md:flex-row">
                                            {/* LEFT: Project Info */}
                                            <div className="p-8 flex-1">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                                                        <p className="text-sm text-purple-500 font-mono mt-1">{project.tagline}</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-purple-900/20 border border-purple-500/30 rounded text-[10px] text-purple-300 font-bold uppercase">
                                                        {project.outcome}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-2xl">{project.desc}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map(t => (
                                                        <span key={t} className="px-3 py-1 bg-white/5 rounded text-xs text-slate-300 border border-white/5 group-hover:border-purple-500/20 transition-colors">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* RIGHT: Stats / Data */}
                                            <div className="bg-white/2 p-6 w-full md:w-64 border-l border-white/5 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-[10px] font-mono text-green-400 tracking-widest uppercase">SYSTEM ONLINE</span>
                                                    </div>

                                                    {/* Fake CPU Graph */}
                                                    <div className="mb-4">
                                                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                            <span>CPU_LOAD</span>
                                                            <span>12%</span>
                                                        </div>
                                                        <div className="flex items-end gap-0.5 h-6">
                                                            {[...Array(10)].map((_, k) => (
                                                                <div key={k} className="w-full bg-cyan-500/20 rounded-sm" style={{ height: `${Math.random() * 100}%` }} />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Fake Memory Graph */}
                                                    <div>
                                                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                            <span>MEM_USAGE</span>
                                                            <span>64%</span>
                                                        </div>
                                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full w-[64%] bg-purple-500" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mt-4">
                                                    <div className="flex justify-between items-center text-[10px] font-mono">
                                                        <span className="text-slate-500">UPTIME</span>
                                                        <span className="text-white">99.98%</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-mono">
                                                        <span className="text-slate-500">REQUESTS</span>
                                                        <span className="text-white">4.2k/s</span>
                                                    </div>
                                                </div>

                                                <button className="mt-4 w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-xs font-bold transition-all uppercase">
                                                    Access Terminal
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}


                    {/* --- VIEW: CAREER OPS --- */}
                    {view === 'career' && (
                        <motion.div
                            key="career"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            className="w-full h-full flex flex-col pointer-events-auto"
                        >
                            <div className="mb-6">
                                <button
                                    onClick={() => setView('hub')}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mb-4"
                                >
                                    <ArrowLeft size={14} /> Return to Hub
                                </button>
                            </div>
                            <CareerOps />
                        </motion.div>
                    )}

                    {/* --- VIEW: SIMULATION DECK --- */}
                    {view === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            className="w-full h-full flex flex-col pointer-events-auto"
                        >
                            <div className="mb-6">
                                <button
                                    onClick={() => setView('hub')}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mb-4"
                                >
                                    <ArrowLeft size={14} /> Return to Hub
                                </button>
                            </div>
                            <SimulationDeck />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* --- LEARNING PROTOCOL PANEL (SLIDE-OVER) --- */}
            <AnimatePresence>
                {selectedSkill && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-black border-l border-cyan-500/30 z-50 overflow-y-auto custom-scrollbar shadow-2xl shadow-cyan-500/20"
                        >
                            <div className="p-8">
                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase"
                                >
                                    <ArrowLeft size={14} /> Return to Grid
                                </button>

                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                                            <selectedSkill.icon size={32} className="text-cyan-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white leading-none mb-2">{selectedSkill.name}</h2>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-cyan-500 px-2 py-0.5 bg-cyan-950/50 border border-cyan-500/20 rounded">{selectedSkill.category}</span>
                                                <span className="text-xs font-mono text-slate-500">LEVEL {selectedSkill.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                                        {selectedSkill.details}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <BookOpen size={16} className="text-cyan-500" /> LEARNING PROTOCOLS
                                    </h3>

                                    <div className="space-y-4">
                                        {selectedSkill.courses ? (
                                            selectedSkill.courses.map((course, idx) => (
                                                <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-cyan-950/10 hover:border-cyan-500/30 transition-all">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{course.provider}</span>
                                                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                                            <Star size={10} fill="currentColor" /> {course.rating}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-200 transition-colors">
                                                        {course.title}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-4">
                                                        <span className="flex items-center gap-1"><Layers size={10} /> {course.level}</span>
                                                        <span className="flex items-center gap-1"><Globe size={10} /> {course.duration}</span>
                                                    </div>
                                                    <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                                        Initialize Protocol <ChevronRight size={12} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 border border-dashed border-white/10 rounded-xl text-center">
                                                <p className="text-slate-500 text-xs font-mono">NO PROTOCOLS FOUND FOR THIS NODE.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}


            </AnimatePresence>
        </div>
    );
}
