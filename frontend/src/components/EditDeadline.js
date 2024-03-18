import React, { Fragment, useState } from "react";

const EditDeadline = ({ deadline, handleOnClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [description, setDescription] = useState(deadline.description);
  const [title, setTitle] = useState(deadline.title);
  const [date, setDate] = useState(deadline.date);

  
  const deleteDeadline = async id => {
    try {
      const deleteDeadline = await fetch(`http://localhost:3001/deadlines/${id}`, {
        method: "DELETE"
      });
      console.log(deleteDeadline);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  //edit description function

  const update = async e => {
    e.preventDefault();
    try {
      const body = { title,date,description };
      const response = await fetch(
        `http://localhost:3001/deadlines/${deadline.deadline_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleXOnClick = () => {
    setIsOpen(false);
    handleOnClose(false);
  }

 
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white bg-opacity-75 flex justify-center items-center">
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Deadline
                </h3>
                <button
                  onClick={() => handleXOnClick()}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                > X
                </button>
              </div>
              <form update={update} className="p-6 space-y-6">
              <input
                  type="text"
                  name="title"
                  value={ title }
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Title"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={ date }
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                <textarea
                  name="description"
                  value={ description }
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Description"
                  required
                />
                <div className="flex items-center p-6 border-t border-gray-200 rounded-b justify-end">
                    <button
                        type="submit"
                        onClick={e => update(e)}
                        className="text-white bg-shamrockg hover:bg-celadon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                        >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteDeadline(deadline.deadline_id)}
                        className="rounded-lg border text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 border-gray-200 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 "
                        >
                        Delete
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDeadline;