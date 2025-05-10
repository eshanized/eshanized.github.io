"use client";

import { useState } from 'react';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import { Progress } from '@/components/ui/progress';

export default function SkillsApp() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(SKILLS)[0]);
  
  // Convert skills data to chart format
  const getChartData = (category: string) => {
    return SKILLS[category as keyof typeof SKILLS].map(skill => ({
      name: skill.name,
      value: skill.proficiency,
    }));
  };

  const chartData = getChartData(selectedCategory);

  return (
    <div className="h-full p-6 overflow-auto bg-background">
      <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
      
      <Tabs defaultValue="chart" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <TabsList>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="progress">Progress View</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
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
          </div>
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
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Proficiency']}
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#eee' : '#333'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--chart-1))" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>

        <TabsContent value="progress" className="w-full space-y-6">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold border-b pb-2">{category}</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <Progress 
                      value={skill.proficiency} 
                      className="h-2 bg-muted"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}