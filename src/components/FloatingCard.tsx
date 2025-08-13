"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function FloatingCard({ children, className = "", style }: FloatingCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Reduce rotation intensity for smoother effect
    const rotateX = (mouseY / (rect.height / 2)) * -5;
    const rotateY = (mouseX / (rect.width / 2)) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-500 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl transition-all duration-500"
        style={{
          transform: "translateZ(-10px)",
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />
      <div
        className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl"
        style={{
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </div>
  );
} 