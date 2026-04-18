import Hero from "../../Component/Home/Home";
import Expertise from "../../Component/Home/Expertise";
import Experience from "../../Component/Home/Experience";
import Language from "../../Component/Home/Language";
import Contact from "../../Component/Home/Contect";
import { apiClient } from "../../lib/api-Client";
import {
  GET_HERO,
  GET_EXPERTISE,
  GET_EXPERIENCE,
  GET_SKILL,
  GET_CV,
} from "../../Utils/Constant";
import { useEffect, useState } from "react";
import { useAppStore } from "../../store"; // assuming this is how you import the store

const Home = () => {
  // Single loading state for all data
  const [loading, setLoading] = useState(true);

  // Hero Data
  const [heroData, setHeroData] = useState({
    greeting: "",
    name: "",
    roles: [],
    description: "",
    image: "",
  });

  // Expertise Data
  const [expertiseData, setExpertiseData] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  // Experience Data
  const [experiences, setExperiences] = useState([]);

  const { setSkill, skill } = useAppStore();

  // Fetch all data in one effect
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch Hero Data
        const heroResponse = await apiClient.get(GET_HERO);
        if (!isMounted) {
          return;
        }
        if (heroResponse.status === 200) {
          setHeroData(heroResponse.data);
        }

        // Fetch Expertise Data
        const expertiseResponse = await apiClient.get(GET_EXPERTISE);
        if (!isMounted) {
          return;
        }
        if (expertiseResponse.status === 200) {
          setExpertiseData(expertiseResponse.data);
        }

        // Fetch Experience Data
        const experienceResponse = await apiClient.get(GET_EXPERIENCE);
        if (!isMounted) {
          return;
        }
        if (experienceResponse.status === 200) {
          setExperiences(experienceResponse.data);
        }


        // Fetch Resume Data
        const cvResponse = await apiClient.get(GET_CV);
        if (!isMounted) {
          return;
        }
        if (cvResponse.status === 200) {
          setResumeFile(cvResponse.data.data[0]?.CV);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (skill.length !== 0) {
      return;
    }

    let isMounted = true;

    const fetchSkills = async () => {
      try {
        const skillResponse = await apiClient.get(GET_SKILL);
        if (!isMounted) {
          return;
        }

        if (skillResponse.status === 200) {
          setSkill(skillResponse.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();

    return () => {
      isMounted = false;
    };
  }, [setSkill, skill.length]);

  return (
    <div className="overflow-hidden">
      <Hero data={heroData} loading={loading} />
      <Expertise data={expertiseData} loading={loading} />
      <Experience data={experiences} loading={loading} />
      <Language resume={resumeFile} data={skill} loading={loading} />
      <Contact />
    </div>
  );
};

export default Home;
