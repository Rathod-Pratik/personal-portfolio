"use client";
import Footer from '@/components/Footer';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {

  useEffect(() => {

    AOS.init({ once: true });
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8" data-aos="zoom-out-up">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="mb-4">
          Hi! I'm <strong>Rathod Pratik</strong>, a passionate web developer specializing in React and C++. I enjoy building interactive web applications that provide a seamless user experience. With a keen eye for detail and a commitment to quality, I strive to create applications that not only function well but also engage and delight users.
        </p>

        <p className="mb-4">
          My journey into the world of programming began at a young age when I first discovered the power of code. I was fascinated by how lines of text could create something visually appealing and functional. This passion led me to pursue a career in web development, where I could combine my love for creativity and technology.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Skills:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Web Development: HTML, CSS, JavaScript, React</li>
          <li>Backend Development: Node.js, Express, PHP</li>
          <li>Database Management: FireBase, MONGODB, MYSQL, SQL</li>
          <li>Responsive Design: Tailwind CSS, Bootstrap</li>
          <li>Some Languages: C, C++, </li>
        </ul>

        <p className="mb-4">
          Currently, I'm working on my project <strong>'inotebook'</strong>, a note-taking application designed with a robust backend and a user-friendly interface. This project has been a fantastic opportunity to apply my knowledge of React and Node.js while learning new techniques in state management and API integration.
        </p>

        <p className="mb-4">
          Beyond coding, I’m committed to continuous learning. I regularly participate in online courses and coding challenges to enhance my skills in data structures and algorithms, particularly in C++. I believe that mastering these fundamentals is crucial for writing efficient and effective code.
        </p>

        <h2 className="text-2xl font-semibold mb-2">My Learning Journey</h2>
        <p className="mb-4">
          As a lifelong learner, I embrace challenges as opportunities for growth. I actively seek out new programming languages and frameworks to broaden my skill set. Recently, I have been exploring advanced concepts in React and diving into server-side rendering to enhance my web applications' performance and SEO.
        </p>

        <p className="mb-4">
          I also enjoy contributing to open-source projects, which not only helps me refine my coding skills but also connects me with like-minded developers. It's rewarding to collaborate with others and contribute to projects that benefit the broader community.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Expressing Enthusiasm</h2>
        <p className="mb-4">
          I have a genuine enthusiasm for technology and how it can solve real-world problems. Whether it's developing a small utility application or a large-scale enterprise solution, I approach every project with curiosity and dedication. I love experimenting with new tools and techniques to push the boundaries of what’s possible with code.
        </p>

        <p className="mb-4">
          Outside of coding, I believe in maintaining a balanced lifestyle. I enjoy hiking and exploring the great outdoors, which helps me recharge and gain fresh perspectives. Photography is another passion of mine; I find that capturing moments allows me to appreciate the beauty in everyday life and inspires my creative endeavors in coding.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
