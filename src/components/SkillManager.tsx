"use client";

import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillManagerProps {
  skills: Skill[];
  onSkillsUpdate: (skills: Skill[]) => void;
}

export default function SkillManager({ skills, onSkillsUpdate }: SkillManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>(skills);

  const handleSkillUpdate = (index: number, field: keyof Skill, value: string | number) => {
    const updatedSkills = [...currentSkills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setCurrentSkills(updatedSkills);
  };

  const handleSave = () => {
    onSkillsUpdate(currentSkills);
    setIsOpen(false);
  };

  const addSkill = () => {
    setCurrentSkills([
      ...currentSkills,
      {
        name: "New Skill",
        level: 80,
        color: "#3b82f6",
        category: "Frontend"
      }
    ]);
  };

  const removeSkill = (index: number) => {
    setCurrentSkills(currentSkills.filter((_, i) => i !== index));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        ⚙️ Manage Skills
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">Manage Your Skills</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {currentSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillUpdate(index, "name", e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Skill name"
              />
              <input
                type="number"
                value={skill.level}
                onChange={(e) => handleSkillUpdate(index, "level", parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-border rounded-md bg-background"
                min="0"
                max="100"
              />
              <input
                type="color"
                value={skill.color}
                onChange={(e) => handleSkillUpdate(index, "color", e.target.value)}
                className="w-12 h-10 border border-border rounded-md"
              />
              <select
                value={skill.category}
                onChange={(e) => handleSkillUpdate(index, "category", e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud</option>
                <option value="Mobile">Mobile</option>
                <option value="Testing">Testing</option>
              </select>
              <button
                onClick={() => removeSkill(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            + Add Skill
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <h3 className="font-semibold mb-2">💡 Tips for updating your skills:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Check your GitHub repositories for technologies used</li>
            <li>• Look at package.json files for dependencies</li>
            <li>• Consider your actual experience level (0-100)</li>
            <li>• Update colors to match official brand colors</li>
            <li>• Organize skills by category for better presentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 