"use client";

import { EXPERIENCE } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExperienceApp() {
  return (
    <div className="h-full bg-background flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Work Experience
        </h2>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-border z-0" />
          
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10"
            >
              <div className="flex">
                {/* Timeline dot */}
                <div className="mt-1 relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border-4 border-background">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                </div>
                
                <Card className="flex-1 ml-4 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <CardTitle className="font-semibold">{job.position}</CardTitle>
                        <CardDescription className="text-base">{job.company}</CardDescription>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {job.period}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <p className="text-center text-muted-foreground text-sm">
          For detailed work history and recommendations, please visit my <a href="https://linkedin.com/in/eshanroy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn profile</a>.
        </p>
      </div>
    </div>
  );
}