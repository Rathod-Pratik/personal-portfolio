import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc,doc } from "firebase/firestore";
import {db} from '../config/FireBase'
import AddAndUpdateContect from "./AddAndUpdateContect";
import useDisclous from "../useDisclous";
import { toast } from "react-toastify";

const ContectCard = ({contect}) => {
  const deleteContect=async(id)=>{
    try {
      await deleteDoc(doc(db,"contects",id));
      toast.success("content Deleted success fully");
    } catch (error) {
      console.log(error);
    }
  }
  const {isOpen,onClose,onOpen} =useDisclous();

  return (
            <>
    <div key={contect.id} className="bg-yellow flex justify-between rounded-lg mt-2 p-2 gap-2">
            <div className="flex gap-1">
              <HiOutlineUserCircle className="text-orange text-4xl flex items-center" />
              <div className="flex flex-col">
                <h2 className="font-medium">{contect.name}</h2>
                <p className="text-sm">{contect.email}</p>
                <p className="text-sm">{contect.mobile}</p>
              </div>
            </div>
            <div className="text-4xl items-center flex">
              <RiEditCircleLine onClick={onOpen}   className="cursor-pointer" />
              <IoMdTrash onClick={()=>deleteContect(contect.id)} className="text-purple-800 cursor-pointer" />
            </div>
          </div>
          <AddAndUpdateContect contect={contect} isupdate={true} isOpen={isOpen} onClose={onClose}/>
          </>
  )
}

export default ContectCard
