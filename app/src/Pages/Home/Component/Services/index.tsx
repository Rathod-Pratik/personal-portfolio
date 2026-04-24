import type { ServicesProps } from "@Type";

const Services = ({ data }: ServicesProps) => {
  if (data.length === 0) return null;

  return (
    <div className="p-4">
      <h1
        data-aos="fade-down"
        className="text-center text-purple-500 text-xl font-semibold mt-3"
      >
        My Expertise
      </h1>
      <h2 className="text-center text-3xl font-bold mt-5" data-aos="fade-down">
        Provide Wide Range of <br />
        Digital Services
      </h2>
      <div
        className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3"
        data-aos="fade-down"
      >
        {data.map((exp, index) => (
          <div
            key={exp._id || index}
            className="bg-[#1f2937] shadow-md text-center mx-auto w-full md:w-[250px] lg:w-[350px] relative z-0 flex flex-col items-center p-8 border rounded-md"
          >
            <img
              className="w-24 mx-auto mb-4 object-contain"
              src={exp.image}
              alt={exp.title}
              width={400}
              height={400}
            />
            <h1 className="text-white text-2xl font-bold mb-4">{exp.title}</h1>
            <p className="text-gray-600 mb-4 line-clamp-4">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
