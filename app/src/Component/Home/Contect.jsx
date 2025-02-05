import React, { useEffect, useState } from "react";
 import {
   AlertDialog,
   AlertDialogAction,
 AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "../../components/ui/alert-dialog"
import { apiClient } from "../../lib/api-Client";
import { CONTECT_fORM } from "../../Utils/Constant";

const Contact = () => {


  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
    number: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      message: "",
      email: "",
      number: "",
    });
  };

  const submitFormData = async () => {
    const { name, message, email, number } = formData;
    setProcess(10);
    try {
     const response=await apiClient.post(CONTECT_fORM,{name, message, email, number});
     setProcess(70);
      if (response.status === 200) {
        setOpenDialog(true);
        setTimeout(() => setOpenDialog(false), 3000);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setProcess(100);
    }
  };
  return (
    <>
        {openDialog && (
         <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle className="m-auto">
                 Form Submitted Successfully
               </AlertDialogTitle>
               <AlertDialogDescription className="text-center">
                 Thank you for reaching out! Your message has been received, and
                 our team will get back to you shortly. <br />
                 Your message is on its way to us! We&apos;re excited to connect
                 and will be in touch soon. Thank you for reaching out!
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogAction onClick={() => setOpenDialog(false)}>
                 Close
               </AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
      )}
      <div className="p-4 mx-auto w-[90%] lg:w-[60%]" id="contact-us-section">
        {/* Heading Section */}
        <div className="text-center pt-3" data-aos="fade-down" >
          <p className="text-purple-500 text-xl font-semibold">Get in Touch</p>
          <h1 className="mt-2 text-4xl font-bold">
            Any Questions? Feel Free to Contact
          </h1>
        </div>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row w-full mx-auto mt-5 space-y-8 md:space-y-0 md:space-x-8">
          <section className="w-full p-6">
            <div
              data-aos="fade-left"
              className="flex flex-col space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 p-6 rounded-md shadow-sm">
                {/* Name Field */}
                <input
                  required
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Name"
                />

                {/* Email Field */}
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Email"
                />

                {/* Phone Field */}
                <input
                  required
                  type="tel"
                  id="number"
                  placeholder="Mobile No."
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Mobile Number"
                />

                {/* Message Field */}
                <textarea
                  required
                  rows={6}
                  id="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  aria-label="Message"
                ></textarea>

                {/* Submit Button */}
                <div className="flex justify-start">
                  <button
                    onClick={submitFormData}
                    className="bg-[#fca61f] text-white p-3 px-6 text-xl rounded-full border-0 cursor-pointer hover:bg-[#6f34fe] transition-all duration-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;
