import React, { useState } from 'react';
import Errorpopup from '../errorMessage/Errorpopup';
import Successpopup from '../errorMessage/Successpopup';

function Taskform({ onClose, eventId }) { const [error, setError] = useState(false);
    const[errorM , setErrorM] = useState("");
    const [success, setSuccess] = useState(false);
    const [successM, setSuccessM] = useState("");
    
        const handleSubmit = async (event) => {
          event.preventDefault();
          setErrorM("")
          setSuccessM("")
          setError(false)
          setSuccess(false)
    
        
          // const name = event.target.form[0].value.trim();
          const title = event.target.form[0].value.trim();
          const desc = event.target.form[1].value.trim();
          const assignedTo = event.target.form[2].value.trim();
          const dueDate = event.target.form[3].value.trim();

          // const eventId = 8;
        

          // console.log(  contributors + " " + date + " " + title);
          if ( !title || !desc || !assignedTo || !dueDate ) {
            console.log(2)
            setError(true)
            setErrorM("fields required");
            return;
          }
    
          // console.log(contributors )
        
          try {
            const response = await fetch("http://localhost:8080/api/tasks/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, desc, assignedTo, dueDate,eventId }),
            });
      
            const data = await response.json();
            console.log(data,response.status);
        
            if (data.error) {
              setError(true);
              setSuccess(false);
              setErrorM(data.error)
            } else {
              setSuccess(true);
              setError(false);
              setSuccessM(data.message || "task creation successful!");
              setTimeout(() => {
                onClose();
              }, 1500);
            }
            
          } catch (err) {
            setError("An error occurred. Please try again.");
          }
        };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Add Task</h2>
          <form >
            <label className="block mb-2">Title</label>
            <input type="text" className="w-full p-2 border rounded mb-4" />
  
            <label className="block mb-2">Description</label>
            <textarea className="w-full p-2 border rounded mb-4"></textarea>
  
            <label className="block mb-2">Assigned To - email of user</label>
            <input type="text" className="w-full p-2 border rounded mb-4" />
  
            <label className="block mb-2">Due Date</label>
            <input type="date" className="w-full p-2 border rounded mb-4" />
  
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" onClick = {handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Task
              </button>
            </div>
          </form>

          {/* Error Popup stays until manually closed */}
          {error && <Errorpopup message={errorM} onClose={() => setError(false)} />}
            {success && <Successpopup message={successM} onClose={() => setSuccess(false)} />}
        </div>
      </div>
    );
}

export default Taskform;
