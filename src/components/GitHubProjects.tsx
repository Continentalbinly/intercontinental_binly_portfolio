"use client";

import { useState, useEffect } from "react";
import FloatingCard from "./FloatingCard";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

interface GitHubProjectsProps {
  username: string;
  isVisible: boolean;
}

export default function GitHubProjects({ username, isVisible }: GitHubProjectsProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=all`
        );

        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
        }

        const reposData: GitHubRepo[] = await reposResponse.json();

        // Fetch topics for each repository
        const reposWithTopics = await Promise.all(
          reposData.map(async (repo) => {
            try {
              const topicsResponse = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/topics`,
                {
                  headers: {
                    Accept: "application/vnd.github.mercy-preview+json",
                  },
                }
              );

              if (topicsResponse.ok) {
                const topicsData = await topicsResponse.json();
                return { ...repo, topics: topicsData.names || [] };
              }
              return { ...repo, topics: [] };
            } catch {
              return { ...repo, topics: [] };
            }
          })
        );

        setRepos(reposWithTopics);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch repositories");
        // Fallback to sample data if API fails
        setRepos([
          {
            id: 1,
            name: "portfolio-website",
            description: "Modern portfolio website built with Next.js and Tailwind CSS",
            html_url: `https://github.com/${username}/portfolio-website`,
            language: "TypeScript",
            stargazers_count: 5,
            forks_count: 2,
            updated_at: new Date().toISOString(),
            topics: ["nextjs", "react", "typescript", "tailwindcss"]
          },
          {
            id: 2,
            name: "ecommerce-platform",
            description: "Full-stack e-commerce solution with React and Node.js",
            html_url: `https://github.com/${username}/ecommerce-platform`,
            language: "JavaScript",
            stargazers_count: 8,
            forks_count: 3,
            updated_at: new Date().toISOString(),
            topics: ["react", "nodejs", "mongodb", "express"]
          },
          {
            id: 3,
            name: "task-management-app",
            description: "Real-time collaborative task management application",
            html_url: `https://github.com/${username}/task-management-app`,
            language: "TypeScript",
            stargazers_count: 12,
            forks_count: 4,
            updated_at: new Date().toISOString(),
            topics: ["typescript", "socketio", "real-time", "collaboration"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f7df1e",
      Python: "#3776ab",
      Java: "#b07219",
      C: "#555555",
      "C++": "#f34b7d",
      PHP: "#4f5d95",
      Ruby: "#701516",
      Go: "#00add8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#f18e33",
      HTML: "#e34f26",
      CSS: "#1572b6",
      Vue: "#4fc08d",
      React: "#61dafb",
      Angular: "#dd0031",
      Svelte: "#ff3e00",
    };
    return colors[language || ""] || "#6e7681";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Updated today";
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    return `Updated ${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <FloatingCard key={index} className="animate-pulse">
            <div className="w-full h-48 bg-secondary rounded-lg mb-4 flex items-center justify-center">
              <div className="text-4xl">⏳</div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-secondary rounded"></div>
              <div className="h-4 bg-secondary rounded w-3/4"></div>
              <div className="h-4 bg-secondary rounded w-1/2"></div>
            </div>
          </FloatingCard>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-2xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2">Unable to load projects</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <p className="text-sm text-muted-foreground">
          Showing sample projects. Check your GitHub profile for real projects!
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {repos.map((repo, index) => (
        <FloatingCard 
          key={repo.id} 
          className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} group`} 
          style={{animationDelay: `${index * 0.2}s`}}
        >
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center transition-all duration-500 group-hover:from-primary/30 group-hover:to-accent/30">
            <div className="text-4xl animate-bounce transition-transform duration-500 group-hover:scale-110">🚀</div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary truncate">
              {repo.name}
            </h3>
            <div className="flex items-center space-x-2">
              {repo.language && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground text-sm line-clamp-3">
            {repo.description || "No description available"}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span 
                key={topic} 
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs transition-all duration-300 hover:bg-primary/20 hover:scale-105 hover-lift"
              >
                {topic}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🔄 {repo.forks_count}</span>
            </div>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-all duration-300 group-hover:translate-x-1 inline-flex items-center text-sm"
            >
              View Project →
            </a>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDate(repo.updated_at)}
          </div>
        </FloatingCard>
      ))}
    </div>
  );
} 