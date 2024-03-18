import React, { useEffect, useState } from "react";
import EditDeadline from "./EditDeadline";

const ListDeadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [deadline, setDeadline] = useState();
  const [convertedDates, setConvertedDates] = useState({});

  const getDeadlines = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines");
      const jsonData = await response.json();
      setDeadlines(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = (deadline) => {
    setShowEdit(!showEdit);
    setDeadline(deadline);
  }

  const handleOnClose = (bool) => {
    setShowEdit(bool);
  }

  const convertDate = async (deadline) => {
    try {
        const response = await fetch(`http://localhost:3001/convertdate/${deadline.deadline_id}`);
        const jsonData = await response.json();
        setConvertedDates(prevDates => ({
          ...prevDates,
          [deadline.deadline_id]: jsonData
        }));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getDeadlines();
  }, []);

  useEffect(() => {
    deadlines.forEach(deadline => {
      convertDate(deadline);
    });
  }, [deadlines]);

  return (
    <>
      {deadlines.map((deadline) => (
        <div 
          key={deadline.deadline_id} 
          onClick={() => handleClick(deadline)} 
          className="bg-white shadow-lg p-4 m-2 flex rounded-xl border-b-8 border-shamrockg hover:bg-dceladon hover:border-white cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105"
        >
          <div className="w-5/6">
            <h2 className="block text-gray-700 text-lg font-bold mb-2">{deadline.title}</h2> 
          </div>
          <div className="w-1/6">
            <p className="flex text-gray-700 text-lg mb-4 justify-end">H{convertedDates[deadline.deadline_id] < 0? `+${convertedDates[deadline.deadline_id]*-1+1}` : `-${convertedDates[deadline.deadline_id]+1}`}</p>  
          </div>
        </div>
      ))}
      {
        showEdit ? <EditDeadline deadline={deadline} handleOnClose={handleOnClose}/> : null
      }
    </>
  );
};

export default ListDeadlines;
