'use client';

import { apiClient } from '@/lib/api-client';
import { GET_HERO, GET_EXPERTISE, GET_EXPERIENCE, GET_SKILL, DOWNLOAD_CV } from '@/utils/constants';
import type { Hero as HeroType, Services, ExperienceItem, SkillItem, ResumeFile } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Contact, Experience, Hero, Service, Skills } from './components';
import { Loading } from '@/components';
import { motion } from 'framer-motion';

const Home = () => {
  const heroQuery = useQuery<HeroType>({
    queryKey: ["home", "hero"],
    queryFn: async () => {
      const response = await apiClient.get(GET_HERO);
      return response.data;
    },
  });

  const expertiseQuery = useQuery<Services["data"]>({
    queryKey: ["home", "expertise"],
    queryFn: async () => {
      const response = await apiClient.get(GET_EXPERTISE);
      return response.data;
    },
  });

  const experienceQuery = useQuery<ExperienceItem[]>({
    queryKey: ["home", "experience"],
    queryFn: async () => {
      const response = await apiClient.get(GET_EXPERIENCE);
      return response.data;
    },
  });

  const skillsQuery = useQuery<SkillItem[]>({
    queryKey: ["home", "skills"],
    queryFn: async () => {
      const response = await apiClient.get(GET_SKILL);
      return response.data.data;
    },
  });

  const resumeQuery = useQuery<string | null>({
    queryKey: ["home", "resume-download-url"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(DOWNLOAD_CV);
        return res?.data?.url ?? null;
      } catch (err) {
        console.error("Failed to fetch resume download url", err);
        return null;
      }
    },
  });

  const loading =
    heroQuery.isLoading ||
    expertiseQuery.isLoading ||
    experienceQuery.isLoading ||
    skillsQuery.isLoading;

  const heroData: HeroType =
    heroQuery.data ?? {
      greeting: "",
      roles: [],
      description: "",
      image: "",
    };
  const expertiseData: Services["data"] = expertiseQuery.data ?? [];
  const experiences: ExperienceItem[] = experienceQuery.data ?? [];
  const resumeFile: ResumeFile = resumeQuery.data ?? null;
  const skillsData: SkillItem[] = skillsQuery.data ?? [];

  if (loading) {
    return <Loading />;
  }
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Hero data={heroData} />
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
        <Service data={expertiseData} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
        <Experience data={experiences} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
        <Skills resumeFile={resumeFile} data={skillsData} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
        <Contact />
      </motion.div>
    </motion.div>
  );
};

export default Home;
