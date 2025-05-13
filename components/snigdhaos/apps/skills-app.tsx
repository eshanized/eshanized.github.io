"use client";

import { useState } from 'react';
import { SKILLS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import { Progress } from '@/components/ui/progress';
import { IconType } from 'react-icons';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiHtml5, SiNodedotjs, SiExpress, SiMongodb, 
  SiPostgresql, SiGraphql, SiGit, SiDocker, 
  SiAmazon, SiJest 
} from 'react-icons/si';

// Map skill names to their corresponding icons
const skillToIcon: { [key: string]: IconType } = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "TailwindCSS": SiTailwindcss,
  "HTML/CSS": SiHtml5,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "GraphQL": SiGraphql,
  "Git": SiGit,
  "Docker": SiDocker,
  "AWS": SiAmazon,
  "Jest": SiJest,
};

export default function SkillsApp() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(SKILLS)[0]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Convert skills data to chart format
  const getChartData = (category: string) => {
    return SKILLS[category as keyof typeof SKILLS].map(skill => ({
      name: skill.name,
      value: skill.proficiency,
    }));
  };

  const chartData = getChartData(selectedCategory);

  // Get icon component for a skill
  const getSkillIcon = (skillName: string) => {
    const Icon = skillToIcon[skillName];
    if (Icon) {
      return <Icon className="w-6 h-6" />;
    }
    return null;
  };

  // Custom tooltip component for the bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const icon = getSkillIcon(label);
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="font-medium">{label}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Proficiency: {payload[0].value}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full p-6 overflow-auto bg-background">
      <motion.h2 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </motion.h2>
      
      <Tabs defaultValue="chart" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsList>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="progress">Progress View</TabsTrigger>
            </TabsList>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm text-muted-foreground">Category:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-muted text-foreground rounded-md px-2 py-1 text-sm border border-input"
            >
              {Object.keys(SKILLS).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </motion.div>
        </div>

        <TabsContent value="chart" className="w-full h-[400px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                onMouseMove={(e) => {
                  if (e.activeLabel) {
                    setHoveredSkill(e.activeLabel);
                  }
                }}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#eee'} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#888' : '#666'}
                  angle={-45}
                  textAnchor="end"
                  tick={{ fontSize: 12 }}
                  height={60}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#888' : '#666'} 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <motion.rect
                      key={`bar-${index}`}
                      fill={hoveredSkill === entry.name ? 'hsl(var(--primary))' : 'hsl(var(--chart-1))'}
                      animate={{
                        fill: hoveredSkill === entry.name ? 'hsl(var(--primary))' : 'hsl(var(--chart-1))',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>

        <TabsContent value="progress" className="w-full space-y-6">
          <AnimatePresence mode="wait">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold border-b pb-2">{category}</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => {
                    const icon = getSkillIcon(skill.name);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {icon && (
                              <motion.div
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="text-primary"
                              >
                                {icon}
                              </motion.div>
                            )}
                            <span className="text-sm">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.proficiency} 
                            className="h-2"
                          />
                          <motion.div
                            className="absolute top-0 left-0 right-0 bottom-0 bg-primary/20 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}