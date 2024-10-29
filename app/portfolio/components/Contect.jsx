import React, { useEffect, useState } from "react";
import Button from './Button';
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
  const [OpenDialog, SetOpenDialog] = useState(true);

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
    console.log(formData)
    try {
      SetOpenDialog(true);
      // Automatically close the dialog after 3 seconds
      setTimeout(() => {
         SetOpenDialog(false);
      }, 3000);
      const response = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      // Open the dialog on successful submission

      // Clear form data after submission
      e.target.reset();

    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      {/* Dialog box for submission feedback */}
      {/* {OpenDialog && ( */}
        <AlertDialog open={OpenDialog} onOpenChange={SetOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle  className="m-auto">Form Submitted Successfully</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
              Thank you for reaching out! Your message has been received, and our team will get back to you shortly. <br />
              Your message is on its way to us! We're excited to connect and will be in touch soon. Thank you for reaching out!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => SetOpenDialog(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      {/* )} */}

      <div className="lg:p-4 py-4 m-auto md:w-full lg:w-[60%] w-[100%]">
        <div className="text-center pt-5" data-aos="fade-down">
          <p className="text-purple-500 text-xl font-semibold">Get in Touch</p>
          <h1 className="mt-2 text-4xl font-bold">Any Questions? Feel Free to Contact</h1>
        </div>

        <div className="flex flex-col md:flex-row w-4/5 mx-auto mt-6 space-y-6 md:space-y-0 md:space-x-8">
          {/* Contact Form */}
          <form onSubmit={SubmitFormData} className="flex-1 flex flex-col items-center space-y-6 m-auto" data-aos="fade-left">
            <input
              required
              type="text"
              placeholder="Name"
              id="name"
              className="w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <input
              required
              type="email"
              id="email"
              placeholder="E-mail"
              className="w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <input
              required
              type="tel"
              id="number"
              placeholder="Mobile No."
              className="w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2"
            />
            <textarea
              required
              rows={8}
              id="message"
              placeholder="Message"
              className="w-4/5 p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 resize-none"
            ></textarea>
            <div className="w-4/5">
              <Button text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contect;
