import React, { Fragment } from 'react';
import './App.css';
import InputDeadline from "./components/InputDeadline";
import ListDeadline from "./components/ListDeadline";
import TopBar from "./components/TopBar"


function App() {
  return (
    <>
    <nav class="fixed top-0 w-screen">
      <TopBar />
      
    </nav>
    <br/>
    <br/>
    <br/>
    <br/>
    <div class="flex items-center justify-center">
      <div className="container" class="p-5 w-1/2 scroll-mx-1 ">
        <InputDeadline />
        <div class="flex m-4 justify-center text-4xl font-bold text-gray-700">
          <h1>
            Daftar Deadline
          </h1>
        </div>
        <ListDeadline />
      </div>
    
    </div>
    </>
  );
}

export default App;
