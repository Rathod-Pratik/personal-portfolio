import { AboutModel } from "../Model/about.model.js";

export const getAbout = async (req, res) => {
  try {
    let about = await AboutModel.findOne();
    if (!about) {
      about = await AboutModel.create({
        content: `Hi! I'm **Rathod Pratik**, a passionate web developer specializing in React and C++. I enjoy building interactive web applications that provide a seamless user experience. With a keen eye for detail and a commitment to quality, I strive to create applications that not only function well but also engage and delight users.

My journey into the world of programming began at a young age when I first discovered the power of code. I was fascinated by how lines of text could create something visually appealing and functional. This passion led me to pursue a career in web development, where I could combine my love for creativity and technology.

## Skills:
* Web Development: HTML, CSS, JavaScript, React
* Backend Development: Node.js, Express, PHP
* Database Management: FireBase, MONGODB, MYSQL, SQL
* Responsive Design: Tailwind CSS, Bootstrap
* Some Languages: C, C++

Currently, I'm working on my project **'inotebook'**, a note-taking application designed with a robust backend and a user-friendly interface. This project has been a fantastic opportunity to apply my knowledge of React and Node.js while learning new techniques in state management and API integration.

Beyond coding, I'm committed to continuous learning. I regularly participate in online courses and coding challenges to enhance my skills in data structures and algorithms, particularly in C++. I believe that mastering these fundamentals is crucial for writing efficient and effective code.

## My Learning Journey
As a lifelong learner, I embrace challenges as opportunities for growth. I actively seek out new programming languages and frameworks to broaden my skill set. Recently, I have been exploring advanced concepts in React and diving into server-side rendering to enhance my web applications performance and SEO.

I also enjoy contributing to open-source projects, which not only helps me refine my coding skills but also connects me with like-minded developers. It's rewarding to collaborate with others and contribute to projects that benefit the broader community.

## Expressing Enthusiasm
I have a genuine enthusiasm for technology and how it can solve real-world problems. Whether it's developing a small utility application or a large-scale enterprise solution, I approach every project with curiosity and dedication. I love experimenting with new tools and techniques to push the boundaries of what's possible with code.

Outside of coding, I believe in maintaining a balanced lifestyle. I enjoy hiking and exploring the great outdoors, which helps me recharge and gain fresh perspectives. Photography is another passion of mine; I find that capturing moments allows me to appreciate the beauty in everyday life and inspires my creative endeavors in coding.`,
      });
    }
    return res.status(200).json(about);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;
    let about = await AboutModel.findOne();
    if (!about) {
      about = await AboutModel.create({ content });
    } else {
      about.content = content;
      await about.save();
    }
    return res
      .status(200)
      .json({ message: "About updated successfully", about });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
