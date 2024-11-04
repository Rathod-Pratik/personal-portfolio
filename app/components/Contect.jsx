import React, { useEffect, useState } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Contect = () => {
  const [OpenDialog, SetOpenDialog] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  const SubmitFormData = async (e) => {
    e.preventDefault();

    const formData = {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      number: document.getElementById("number").value,
      message: document.getElementById("message").value,
    };
    console.log(formData);
    try {
      SetOpenDialog(true);
      // Automatically close the dialog after 3 seconds
      setTimeout(() => {
        SetOpenDialog(false);
      }, 3000);
      const response = await fetch("https://76zsstq72k.execute-api.ap-south-1.amazonaws.com/dev/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      // Clear form data after submission
      e.target.reset();

    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      {OpenDialog && (
        <AlertDialog open={OpenDialog} onOpenChange={SetOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="m-auto">Form Submitted Successfully</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Thank you for reaching out! Your message has been received, and our team will get back to you shortly. <br />
                Your message is on its way to us! We&apos;re excited to connect and will be in touch soon. Thank you for reaching out!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => SetOpenDialog(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="p-4 m-auto md:w-full lg:w-[60%] w-[90%]" id="contact-us-section">
        <div className="text-center pt-5" data-aos="fade-down">
          <p className="text-purple-500 text-xl font-semibold">Get in Touch</p>
          <h1 className="mt-2 text-4xl font-bold">Any Questions? Feel Free to Contact</h1>
        </div>

        <div className="flex flex-col md:flex-row w-full mx-auto mt-6 space-y-6 md:space-y-0 md:space-x-8">
          <form onSubmit={SubmitFormData} className="flex-1 flex flex-col items-center space-y-6 m-auto" data-aos="fade-left">
            <input
              required
              type="text"
              placeholder="Name"
              id="name"
              className="w-full md:w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <input
              required
              type="email"
              id="email"
              placeholder="E-mail"
              className="w-full md:w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <input
              required
              type="tel"
              id="number"
              placeholder="Mobile No."
              className="w-full md:w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <textarea
              required
              rows={8}
              id="message"
              placeholder="Message"
              className="w-full md:w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 resize-none"
            ></textarea>
            <div className="w-full md:w-4/5 mx-auto">
              <button className="bg-[#fca61f] text-white p-2 px-6 text-xl leading-7 rounded-full border-0 cursor-pointer hover:bg-[#6f34fe] transition-all duration-500  md:w-auto">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contect;
