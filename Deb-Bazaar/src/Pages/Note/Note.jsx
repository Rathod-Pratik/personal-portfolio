import React,{useState,useEffect} from 'react'
import { FETCH_PDF } from '../../Utils/Constant';
import { apiClient } from '../../lib/api-Client';
import Card from '../../Component/Note/Notes';

const Note = ({setProgress}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const getCodeData = async () => {
        try {
          const response=await apiClient.get(FETCH_PDF);
           setData(response.data);
        } catch (error) {
          console.error("Error fetching code data:", error);
        }
      };
  
      getCodeData();
    }, []);

  return (
    <div className="min-h-screen flex flex-col py-4">
    {/* Main Content */}
    <h2 className="flex text-5xl justify-center font-bold">Notes</h2>
    {data ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center 2xl:grid-cols-4 gap-6 w-full m-auto mt-5">
        {data.map((item, index) => (
          <div key={index}>
            <Card item={item} />
          </div>
        ))}
      </div>
    ) : (
      <div className="flex-grow"></div>
    )}
  </div>
  )
}

export default Note
