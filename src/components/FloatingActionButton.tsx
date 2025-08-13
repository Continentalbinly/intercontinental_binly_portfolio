"use client";

import { useState } from "react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function FloatingActionButton({ onClick, children, className = "" }: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 left-8 z-50 w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${className}`}
      style={{
        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(59, 130, 246, 0.5)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="relative">
        {children}
        {isHovered && (
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
        )}
      </div>
    </button>
  );
} 