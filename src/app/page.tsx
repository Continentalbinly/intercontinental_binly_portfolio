"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingCard from "@/components/FloatingCard";
import TypewriterText from "@/components/TypewriterText";
import MagneticButton from "@/components/MagneticButton";
import AnimatedSkillBar from "@/components/AnimatedSkillBar";
import CursorTrail from "@/components/CursorTrail";
import LoadingAnimation from "@/components/LoadingAnimation";
import ConfettiEffect from "@/components/ConfettiEffect";
import FloatingActionButton from "@/components/FloatingActionButton";
import SkillManager from "@/components/SkillManager";
import GitHubProjects from "@/components/GitHubProjects";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());
  const [showConfetti, setShowConfetti] = useState(false);
  const [skills, setSkills] = useState([
    // Frontend Technologies
    { name: "React", level: 95, color: "#61dafb", category: "Frontend" },
    { name: "Next.js", level: 90, color: "#000000", category: "Frontend" },
    { name: "TypeScript", level: 88, color: "#3178c6", category: "Frontend" },
    { name: "JavaScript", level: 92, color: "#f7df1e", category: "Frontend" },
    { name: "HTML5", level: 95, color: "#e34f26", category: "Frontend" },
    { name: "CSS3", level: 90, color: "#1572b6", category: "Frontend" },
    { name: "Tailwind CSS", level: 85, color: "#06b6d4", category: "Frontend" },
    { name: "Bootstrap", level: 80, color: "#7952b3", category: "Frontend" },
    
    // Backend Technologies
    { name: "Node.js", level: 85, color: "#339933", category: "Backend" },
    { name: "Express.js", level: 82, color: "#000000", category: "Backend" },
    { name: "Python", level: 80, color: "#3776ab", category: "Backend" },
    { name: "Django", level: 75, color: "#092e20", category: "Backend" },
    { name: "Flask", level: 70, color: "#000000", category: "Backend" },
    { name: "PHP", level: 75, color: "#777bb4", category: "Backend" },
    { name: "Laravel", level: 70, color: "#ff2d20", category: "Backend" },
    
    // Database Technologies
    { name: "MongoDB", level: 80, color: "#47a248", category: "Database" },
    { name: "MySQL", level: 85, color: "#4479a1", category: "Database" },
    { name: "PostgreSQL", level: 75, color: "#336791", category: "Database" },
    { name: "Redis", level: 70, color: "#dc382d", category: "Database" },
    
    // Cloud & DevOps
    { name: "AWS", level: 80, color: "#ff9900", category: "Cloud" },
    { name: "Docker", level: 75, color: "#2496ed", category: "Cloud" },
    { name: "Git", level: 90, color: "#f05032", category: "Cloud" },
    { name: "GitHub", level: 92, color: "#181717", category: "Cloud" },
    { name: "Vercel", level: 85, color: "#000000", category: "Cloud" },
    { name: "Netlify", level: 80, color: "#00c7b7", category: "Cloud" },
    
    // Mobile Development
    { name: "React Native", level: 75, color: "#61dafb", category: "Mobile" },
    { name: "Flutter", level: 70, color: "#02569b", category: "Mobile" },
    
    // Testing & Tools
    { name: "Jest", level: 75, color: "#c21325", category: "Testing" },
    { name: "Cypress", level: 70, color: "#17202c", category: "Testing" },
    { name: "Postman", level: 80, color: "#ff6c37", category: "Tools" },
    { name: "Figma", level: 75, color: "#f24e1e", category: "Tools" },
  ]);

  const typewriterTexts = [
    "Full-Stack Developer",
    "UI/UX Designer", 
    "Problem Solver",
    "Innovation Enthusiast"
  ];

  const handleContactClick = () => {
    window.location.href = "mailto:thipphasone.work.2077@gmail.com";
  };

  const handleSkillsUpdate = (updatedSkills: any[]) => {
    setSkills(updatedSkills);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
    }, 3000);

    // Trigger confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Loading Animation */}
      <LoadingAnimation />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Cursor Trail */}
      <CursorTrail />

      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text">Intercontinental Binly</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="hover:text-primary transition-colors">Home</a>
                <a href="#about" className="hover:text-primary transition-colors">About</a>
                <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
                <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Intercontinental</span>
              <br />
              <span className="text-foreground">Binly Portfolio</span>
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              <TypewriterText 
                text={typewriterTexts[currentTextIndex]} 
                speed={100}
                className="text-primary font-semibold"
              />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Bridging continents through innovative technology solutions and creative digital experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300 glow" onClick={scrollToProjects}>
                View Projects
              </MagneticButton>
              <MagneticButton className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Download CV
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h2 className="text-4xl font-bold mb-6 gradient-text">About Me</h2>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with a global perspective, creating innovative solutions 
                that transcend geographical boundaries. With experience spanning multiple continents, I bring 
                diverse cultural insights to every project.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                My expertise lies in building scalable applications, designing intuitive user experiences, 
                and leveraging cutting-edge technologies to solve complex problems across different markets.
              </p>
              <div className="flex gap-4">
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-primary animate-float">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-primary animate-float" style={{animationDelay: '0.5s'}}>15+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-primary animate-float" style={{animationDelay: '1s'}}>5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <FloatingCard className="w-full">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float">🌍</div>
                  <div className="text-xl font-semibold">Global Innovation</div>
                  <p className="text-muted-foreground mt-4">
                    Full-Stack Development • UI/UX Design • Cloud Architecture
                  </p>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
            <p className="text-lg text-muted-foreground">Mastering the latest technologies to deliver exceptional results</p>
          </div>
          
          {/* Skills by Category */}
          <div className="space-y-8">
            {["Frontend", "Backend", "Database", "Cloud", "Mobile", "Testing"].map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-2xl font-bold text-center gradient-text mb-6">{category} Technologies</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                        delay={index * 100}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Manager */}
      <SkillManager skills={skills} onSkillsUpdate={handleSkillsUpdate} />

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">Showcasing innovative solutions across different domains</p>
          </div>
          <GitHubProjects username="Continentalbinly" isVisible={isVisible} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FloatingCard>
              <div className="text-3xl mb-4 animate-float">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">thipphasone.work.2077@gmail.com</p>
            </FloatingCard>
            <FloatingCard>
              <div className="text-3xl mb-4 animate-float" style={{animationDelay: '0.3s'}}>💼</div>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-muted-foreground">@Continentalbinly</p>
            </FloatingCard>
          </div>
          <MagneticButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300 glow">
            Get In Touch
          </MagneticButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="text-2xl animate-float">🌟</div>
              <div className="text-2xl animate-float" style={{animationDelay: '0.2s'}}>💻</div>
              <div className="text-2xl animate-float" style={{animationDelay: '0.4s'}}>🚀</div>
              <div className="text-2xl animate-float" style={{animationDelay: '0.6s'}}>🌍</div>
              <div className="text-2xl animate-float" style={{animationDelay: '0.8s'}}>⚡</div>
            </div>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Intercontinental Binly Portfolio. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="mailto:thipphasone.work.2077@gmail.com" className="text-primary hover:text-primary/80 transition-colors hover-lift">
                📧 Email
              </a>
              <a href="https://github.com/Continentalbinly" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors hover-lift">
                💼 GitHub
              </a>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="animate-pulse">●</span>
              <span>Built with Next.js & Tailwind CSS</span>
              <span className="animate-pulse">●</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleContactClick}>
        <span className="text-2xl">💬</span>
      </FloatingActionButton>
    </div>
  );
}
