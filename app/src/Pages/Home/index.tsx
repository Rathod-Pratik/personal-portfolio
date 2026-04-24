import { apiClient } from "@apiClient";
import {
  GET_HERO,
  GET_EXPERTISE,
  GET_EXPERIENCE,
  GET_SKILL,
  GET_CV,
} from "@api";
import { useQuery } from "@tanstack/react-query";
import type { Hero as HeroType, Services, ExperienceItem, SkillItem, ResumeFile } from "@Type";
import { Service ,Contact, Experience, Hero, Skills } from "./Component";
import { Loading } from "@component";

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

  const resumeQuery = useQuery<ResumeFile>({
    queryKey: ["home", "resume"],
    queryFn: async () => {
      const response = await apiClient.get(GET_CV);
      return response.data.data[0]?.CV ?? null;
    },
  });

  const skillsQuery = useQuery<SkillItem[]>({
    queryKey: ["home", "skills"],
    queryFn: async () => {
      const response = await apiClient.get(GET_SKILL);
      return response.data.data;
    },
  });

  const loading =
    heroQuery.isLoading ||
    expertiseQuery.isLoading ||
    experienceQuery.isLoading ||
    resumeQuery.isLoading ||
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Hero data={heroData} />
      <Service data={expertiseData} />
      <Experience data={experiences} />
      <Skills resumeFile={resumeFile} data={skillsData} />
      <Contact />
    </div>
  );
};

export default Home;