export const portfolio = {
  name: "Thomas Lee",
  title: "Software Engineer",
  location: "Baton Rouge, Louisiana",
  email: "mathheejoo@gmail.com",
  phone: "(337)371-1110",
  website: "https://luffysolosyonko.github.io/TLeePortfolio/",
  github: "https://github.com/luffysolosyonko",
  linkedin: "https://www.linkedin.com/in/thomas-lee-842a95265/",
  headshot: "/thomas-lee-headshot.jpg",
  intro:
    "I build full-stack and frontend applications with a focus on clear interfaces, practical data flows, and production-ready implementation.",
  education: [
    {
      logo: "/LSU-Logo-2007.jpg",
      school: "Louisiana State University, Baton Rouge, Louisiana",
      period: "August 2022 - May 2026",
      degree: "B.S. in Computer Science (Software Engineering), Honors College"
    },
    {
      logo: "/YonseiUniversityEmblem.svg.png",
      school: "Yonsei University, Seoul, South Korea",
      period: "February 2024 - June 2024",
      degree: "Computer Science Exchange Semester"
    }
  ],
  skills: {
    languages: ["Java", "Python", "C", "C#", "JavaScript", "TypeScript", "SQL", "Bash"],
    frameworks: ["Angular", "React", "React Native", "ASP.NET Core", "Entity Framework Core", "Node.js"],
    dataDevOps: [
      "SQL Server",
      "SSMS",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "Azure DevOps",
      "Azure Functions",
      "CI/CD",
      "Git/GitHub",
      "Linux"
    ],
    aiRobotics: ["OpenAI API", "ABB RobotStudio"]
  },
  awards: [
    "S&B Engineers and Constructors Scholarship (2025)",
    "LSU Ogden Honors College Study Abroad Scholarship (2024)",
    "Burger King Scholarship Recipient (2022)",
    "Dean's List (Fall 2023)"
  ],
  extracurriculars: [
    "Korean Translator, Lafayette Korean Church",
    "Public Relations Officer, Google Developer Student Club"
  ],
  projects: [
    {
      name: "Soteria",
      summary:
        "Enterprise safety platform with backend persistence, secure routing, and AI-adjacent reporting infrastructure.",
      stack: ["React", ".NET Core", "Azure DevOps", "Next.js", "PostgreSQL", "OpenAI"],
      notes:
        "Engineered a backend persistence layer in .NET Core and C# for reliable safety observation storage, led downstream OAuth integration for secure routing into the safety manager flow, and validated persistence with manual database testing that reached a 98% retrieval accuracy rate across 100 standardized test questions.",
      link: null,
      linkLabel: "Private project"
    },
    {
      name: "Whirl",
      summary:
        "Cross-platform mobile app for user profiles, event discovery, and real-time data access.",
      stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL"],
      notes:
        "Implemented authentication, profile management, event discovery, and mobile UI flows for iOS and Android.",
      link: "https://github.com/ghebert3/4330-Group-Project"
    },
    {
      name: "Poetry Garden",
      summary:
        "Full-stack poetry sharing app with authentication, real-time poem storage, and an interactive visual discovery experience.",
      stack: ["React", "TypeScript", "Firebase"],
      notes:
        "Built Firebase auth and real-time database flows, designed a flower-association feature for each poem, and optimized the responsive React frontend for publishing and browsing.",
      link: "https://github.com/CSC-3380-Spring-2025/Team-29",
      screenshots: [
        "/poetry-garden/Screenshot 2026-05-06 221308.png",
        "/poetry-garden/Screenshot 2026-05-06 221445.png"
      ]
    },
    {
      name: "Discord Workout Tracker",
      summary:
        "Discord bot that logs workouts, tracks progress, and estimates calories burned across servers.",
      stack: ["Node.js", "Firebase", "Python", "Railway"],
      notes:
        "Integrated Firebase for workout history and performance data, generated progress graphs over time, and deployed with environment variable handling for stable multi-server use.",
      link: "https://github.com/luffysolosyonko/discord-workout-tracker"
    },
    {
      name: "Personality Country Quiz",
      summary:
        "Web-based personality quiz that recommends travel destinations based on user responses and trait matching.",
      stack: ["HTML", "CSS", "JavaScript"],
      notes:
        "Implemented the recommendation logic, matched users to travel outcomes, and improved load performance by 25% through responsive CSS and layout optimization.",
      link: "https://github.com/luffysolosyonko/Personalitytravelguide"
        ,
        screenshots: [
          "/country1.png",
          "/country2.png"
        ]
      },
    {
      name: "Heartfusion",
      summary:
        "Top-down survival shooter built for Chillenium 2023 with enemy waves, combat systems, and health tracking.",
      stack: ["GameMaker", "GML"],
      notes:
        "Built as a game jam project at Texas A&M, featuring fast-paced combat, survival gameplay, and wave-based enemy encounters.",
      link: "https://github.com/luffysolosyonko/Heartfusion",
      screenshots: [
        "/heartfusion-gameplay.png",
        "/heartfusion-menu.png"
      ]
    },
    {
      name: "Shooter Game",
      summary:
        "Top-down shooter game created as the final project for video game design.",
      stack: ["Unity", "C#"],
      notes:
        "Built as a final project for video game design, focused on top-down shooter gameplay and core combat mechanics.",
      link: "https://github.com/luffysolosyonko/Shooter-game",
      screenshots: [
        "/shooter-game-gameplay.png",
        "/shooter-game-level.png"
      ]
    }
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Performance Contractors Inc",
      period: "July 2026 - Present",
      bullets: [
        "Developed full-stack features for an enterprise workforce platform using Angular, ASP.NET Core, and SQL Server to streamline payroll, timesheet, and project productivity workflows.",
        "Engineered secure role-based access control using Microsoft Entra ID, MSAL, and JWTs to enforce route-level permissions across five user privilege tiers.",
        "Improved scalability for high-volume payroll processing by moving intensive calculations and automated Excel and PDF report generation to Azure Functions and RESTful APIs."
      ]
    },
    {
      role: "Student AI Software Developer",
      company: "Performance Contractors Inc",
      period: "Jan 2026 - May 2026",
      bullets: [
        "Integrated the OpenAI API into an ASP.NET Core backend to turn unstructured safety reports into structured risk data.",
        "Built React and Next.js dashboard features for real-time analysis and data visualization.",
        "Improved delivery stability through Azure CI/CD, logging, and validation workflows."
      ]
    },
    {
      role: "Systems Analyst",
      company: "Louisiana State University",
      period: "Sept 2025 - May 2026",
      bullets: [
        "Managed and monitored Linux-based systems, troubleshooting reliability and performance issues.",
        "Wrote shell scripts to automate weekly backups and reduce recurring manual work.",
        "Supported university infrastructure by resolving hardware and software issues."
      ]
    },
    {
      role: "Undergraduate Robotics Researcher",
      company: "Louisiana State University",
      period: "Sept 2025 - May 2026",
      bullets: [
        "Developed a C# and .NET interface for OpenAI integration with ABB RobotStudio.",
        "Designed simulation tooling to improve robotics usability for research and education.",
        "Collaborated on robotics and AI automation research with faculty."
      ]
    },
    {
      role: "LSU Tutor",
      company: "Louisiana State University",
      period: "Sept 2023 - Dec 2024",
      bullets: [
        "Coached 50+ students and helped drive a 90% pass rate in historically difficult computer science courses.",
        "Explained complex technical and mathematical concepts through clear step-by-step instruction.",
        "Mentored freshmen to strengthen core academic foundations and improve early-course performance."
      ]
    }
  ]
};
