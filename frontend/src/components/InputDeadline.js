import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {  title,date,description };
      const response = await fetch("http://localhost:3001/deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setDate("");
    setDescription("");
  }

  return (
    <>
      <div className="container" class="flex justify-end" >
        <button
            onClick={() => setIsOpen(true)}
            className="block text-black bg-transparent border-x-2 border-y-2 border-shamrockg ease-in-out transform hover:scale-105 duration-500 hover:border-white rounded-lg px-5 py-2.5 text-center hover:bg-dceladon" 
            type="button"
        >
            +
        </button>

      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white bg-opacity-75 flex justify-center items-center transition-all duration-500 ease-in-out transform scale-105">
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add a Deadline
                </h3>
                <button
                  onClick={() => handleClose()}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                > X
                </button>
              </div>
              <form onSubmit={onSubmitForm} className="p-6 space-y-6">
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
                        onClick={e => onSubmitForm(e)}
                        className="text-white bg-shamrockg hover:bg-celadon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                        >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => handleClose()}
                        className="text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium text-sm px-5 py-2.5"
                        >
                        Cancel
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

export default Modal;
