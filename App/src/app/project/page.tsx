'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { GET_PROJECT } from '@/utils/constants';
import Loading from '@/components/Loading';
import Card from './components/Card';
import type { ProjectDifficulty, ProjectItem } from '@/types';
import { motion } from 'framer-motion';

type GetProjectsResponse = {
  data: ProjectItem[];
};

type DifficultyFilter = 'all' | ProjectDifficulty;

export default function Project() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<GetProjectsResponse>(GET_PROJECT);
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const difficultyLevels: DifficultyFilter[] = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredProjects = useMemo(() => {
    const difficultyOrder: Record<ProjectDifficulty, number> = {
      Hard: 0,
      Medium: 1,
      Easy: 2,
    };

    const sortedProjects = [...projects].sort((a, b) => {
      const aRank = a.difficult ? difficultyOrder[a.difficult] : Number.MAX_SAFE_INTEGER;
      const bRank = b.difficult ? difficultyOrder[b.difficult] : Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });

    if (difficultyFilter === 'all') {
      return sortedProjects;
    }

    return sortedProjects.filter((item) => item.difficult === difficultyFilter);
  }, [difficultyFilter, projects]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex flex-col py-4">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-3xl font-bold text-center my-10 sm:hidden">
        Projects
      </motion.h2>

      <div className="w-full px-2 sm:px-4">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-6">
          {difficultyLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficultyFilter(level)}
              className={`px-4 py-2 rounded-md hover:text-white cursor-pointer ${difficultyFilter === level ? "bg-purple-700 text-white" : ""
                } hover:bg-purple-900`}
            >
              {level === 'all' ? 'All' : level}
            </button>
          ))}
        </motion.div>

        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">No projects available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4 lg:gap-6 justify-items-center">
            {filteredProjects.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card item={item} routerPush={router.push} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
