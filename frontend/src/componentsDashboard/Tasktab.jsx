// import React from 'react';

// function Tasktab({ title, description, assignedto, duedate, tid }) {
//   const handleDelete = async () => {
//     try {
//       await fetch('http://localhost:8080/api/tasks/delete', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ taskId: tid }),
//       });
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     } 
    
//     // refresh();
//   };

//   return (
//     <div className="m-2 p-4 bg-white text-gray-900 rounded-lg shadow-md w-full max-w-3xl relative">
//       <button
//         onClick={handleDelete}
//         className="absolute top-2 right-2 w-6 h-6 text-xs bg-gray-200 hover:bg-red-500 rounded-md"
//         title="Delete Task"
//       >
//         🗑️
//       </button>
//       <p className="text-2xl font-bold mb-2">{title}</p>
//       <p className="text-sm text-gray-700 mb-2">{description}</p>
//       <p className="mb-2">
//         <b>Assigned to:</b> {assignedto}
//       </p>
//       <p className="mb-2">
//         <b>Due date:</b> {duedate}
//       </p>
//     </div>
//   );
// }

// export default Tasktab;
import React from 'react';

function Tasktab({ title, description, assignedto, duedate, tid, onDeleted }) {
  const handleDelete = async () => {
    try {
      await fetch('http://localhost:8080/api/tasks/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: tid }),
      });
      onDeleted(); // 👈 notify parent to refresh tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="m-2 p-4 bg-white text-gray-900 rounded-lg shadow-md w-full max-w-3xl relative">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 w-6 h-6 text-xs bg-gray-200 hover:bg-red-500 rounded-md"
        title="Delete Task"
      >
        🗑️
      </button>
      <p className="text-2xl font-bold mb-2">{title}</p>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <p className="mb-2">
        <b>Assigned to:</b> {assignedto}
      </p>
      <p className="mb-2">
        <b>Due date:</b> {duedate}
      </p>
    </div>
  );
}

export default Tasktab;
