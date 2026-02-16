// ---------------------------------------------------------
// 📚 THE KNOWLEDGE BASE (24 Modern Topics)
// ---------------------------------------------------------
export const INTERVIEW_TOPICS = [
    // 🟢 FRONTEND & UI
    { id: "react", icon: "⚛️", title: "React & Next.js", desc: "Hooks, SSR, Performance", color: "cyan" },
    { id: "angular", icon: "🅰️", title: "Angular Core", desc: "RxJS, Dependency Injection", color: "red" },
    { id: "vue", icon: "💚", title: "Vue.js & Nuxt", desc: "Directives, State Mgmt", color: "emerald" },
    { id: "svelte", icon: "🔥", title: "Svelte & SvelteKit", desc: "Reactivity, Compiler", color: "orange" },
    { id: "tailwind", icon: "🎨", title: "Modern CSS/UI", desc: "Tailwind, Framer Motion", color: "pink" },
    { id: "typescript", icon: "📘", title: "TypeScript", desc: "Generics, Union Types", color: "blue" },

    // 🔵 BACKEND & API
    { id: "node", icon: "🟩", title: "Node.js & Express", desc: "Event Loop, Async/Await", color: "green" },
    { id: "nestjs", icon: "🦁", title: "NestJS", desc: "Modules, Decorators", color: "red" },
    { id: "java", icon: "☕", title: "Java Spring Boot", desc: "Microservices, JPA", color: "orange" },
    { id: "python", icon: "🐍", title: "Python Backend", desc: "Django, FastAPI, REST", color: "yellow" },
    { id: "csharp", icon: "#️⃣", title: "C# .NET Core", desc: "MVC, Entity Framework", color: "purple" },
    { id: "golang", icon: "🐹", title: "Go (Golang)", desc: "Concurrency, Goroutines", color: "cyan" },
    { id: "rust", icon: "🦀", title: "Rust Systems", desc: "Ownership, Borrowing", color: "orange" },
    { id: "ruby", icon: "💎", title: "Ruby on Rails", desc: "MVC, Active Record", color: "red" },
    { id: "php", icon: "🐘", title: "PHP & Laravel", desc: "Modern PHP, Eloquent", color: "indigo" },

    // ☁️ CLOUD & DEVOPS
    { id: "aws", icon: "☁️", title: "AWS Cloud", desc: "EC2, S3, Lambda, DynamoDB", color: "yellow" },
    { id: "azure", icon: "🔷", title: "Microsoft Azure", desc: "Functions, CosmosDB", color: "blue" },
    { id: "gcp", icon: "🌈", title: "Google Cloud", desc: "BigQuery, GKE, Run", color: "red" },
    { id: "docker", icon: "🐳", title: "Docker & K8s", desc: "Containers, Orchestration", color: "blue" },
    { id: "terraform", icon: "🏗️", title: "Terraform (IaC)", desc: "Modules, State Mgmt", color: "purple" },
    { id: "ansible", icon: "📜", title: "Ansible", desc: "Playbooks, Automation", color: "red" },
    { id: "cicd", icon: "🚀", title: "CI/CD Pipelines", desc: "GitHub Actions, Jenkins", color: "gray" },
    { id: "linux", icon: "🐧", title: "Linux Admin", desc: "Shell, Permissions, VIM", color: "yellow" },
    { id: "observability", icon: "🔭", title: "Observability", desc: "Prometheus, Grafana", color: "orange" },

    // 💾 DATA ENGINEERING & BIG DATA
    { id: "sql", icon: "🗄️", title: "Advanced SQL", desc: "Window Funcs, Indexing", color: "blue" },
    { id: "nosql", icon: "🍃", title: "NoSQL Databases", desc: "MongoDB, Cassandra", color: "green" },
    { id: "spark", icon: "⚡", title: "Apache Spark", desc: "RDDs, DataFrames", color: "orange" },
    { id: "kafka", icon: "📨", title: "Apache Kafka", desc: "Streaming, Partitions", color: "gray" },
    { id: "snowflake", icon: "❄️", title: "Snowflake DB", desc: "Warehousing, SQL", color: "cyan" },
    { id: "airflow", icon: "🌬️", title: "Apache Airflow", desc: "DAGs, Orchestration", color: "red" },
    { id: "redis", icon: "🧠", title: "Redis Caching", desc: "Pub/Sub, Persistence", color: "red" },

    // 🧠 AI & DATA SCIENCE
    { id: "ml", icon: "🤖", title: "Machine Learning", desc: "Algorithms, Scikit-Learn", color: "indigo" },
    { id: "genai", icon: "✨", title: "GenAI & LLMs", desc: "Transformers, Prompt Eng", color: "purple" },
    { id: "nlp", icon: "🗣️", title: "NLP", desc: "Tokenization, BERT, GPT", color: "yellow" },
    { id: "cv", icon: "👁️", title: "Computer Vision", desc: "OpenCV, CNNs, YOLO", color: "blue" },
    { id: "datascience", icon: "📊", title: "Data Science", desc: "Pandas, NumPy, Viz", color: "orange" },

    // 🔗 WEB3 & BLOCKCHAIN
    { id: "blockchain", icon: "🔗", title: "Blockchain Core", desc: "Consensus, Cryptography", color: "emerald" },
    { id: "solidity", icon: "Ξ", title: "Solidity & EVM", desc: "Smart Contracts, Gas", color: "gray" },
    { id: "web3js", icon: "🌐", title: "Web3.js & Ethers", desc: " dApp Integration", color: "orange" },

    // 📱 MOBILE & GAME DEV
    { id: "flutter", icon: "🐦", title: "Flutter & Dart", desc: "Widgets, Cross-Platform", color: "cyan" },
    { id: "reactnative", icon: "⚛️", title: "React Native", desc: "Bridge, Native Modules", color: "blue" },
    { id: "ios", icon: "🍎", title: "iOS & Swift", desc: "UIKit, SwiftUI, Memory", color: "gray" },
    { id: "android", icon: "🤖", title: "Android Kotlin", desc: "Jetpack Compose, MVVM", color: "green" },
    { id: "unity", icon: "🎮", title: "Unity & C#", desc: "Game Physics, ECS", color: "gray" },

    // 🛡️ SECURITY
    { id: "cybersec", icon: "🛡️", title: "Cybersecurity", desc: "OWASP, Encryption", color: "red" },
    { id: "hacking", icon: "🕵️", title: "Ethical Hacking", desc: "Pen Testing, Kali", color: "green" },

    // 🏗️ ARCHITECTURE & SOFT SKILLS
    { id: "system", icon: "🏗️", title: "System Design", desc: "Scalability, CAP Theorem", color: "pink" },
    { id: "dsa", icon: "🧠", title: "DSA (Algorithms)", desc: "Trees, Graphs, DP", color: "red" },
    { id: "behavioral", icon: "🤝", title: "HR & Behavioral", desc: "Leadership, Soft Skills", color: "yellow" },
    { id: "pm", icon: "📅", title: "Product Mgmt", desc: "Agile, Scrum, Roadmap", color: "blue" },
    { id: "cpp", icon: "⚡", title: "C++ Programming", desc: "Pointers, Memory Mgmt", color: "blue" },
];
