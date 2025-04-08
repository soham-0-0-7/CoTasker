// import React, { useState } from 'react';
// import Errorpopup from '../errorMessage/Errorpopup';

// function Eventtab({ eventName, contributors, eventDate, eid, onTaskClick }) {
//   const [clickedOnMore, setClickedOnMore] = useState(false);

//   const handleDelete = async () => {
//     try {
//       await fetch('http://localhost:8080/api/events/delete', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: eid }),
//       });
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     }
    
//     // refresh();
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs text-gray-800 transition hover:shadow-lg">
//       <div className="text-lg flex items-center justify-between font-semibold">
//         {eventName}
//         <div className="flex space-x-2">
//           <button
//             onClick={handleDelete}
//             className="w-6 h-6 text-xs bg-gray-200 hover:bg-red-500 rounded-md"
//             title="Delete"
//           >
//             🗑️
//           </button>
//           <button
//             onClick={() => setClickedOnMore(!clickedOnMore)}
//             className="w-6 h-6 text-xs bg-gray-200 hover:bg-blue-400 rounded-md"
//             title="Toggle Details"
//           >
//             {clickedOnMore ? '🔼' : '🔽'}
//           </button>
//           <button className="font-bold" onClick={onTaskClick}>
//             ...
//           </button>
//         </div>
//       </div>
//       <div
//         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//           clickedOnMore ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="mt-2 bg-gray-100 p-3 rounded-md text-sm shadow-inner">
//           <div>
//             <b>Date:</b> {eventDate}
//           </div>
//           <div className="font-semibold">Contributors:</div>
//           <div className="text-xs text-gray-600">{contributors}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Eventtab;
import React, { useState } from 'react';

function Eventtab({ eventName, contributors, eventDate, eid, onTaskClick, onDeleted }) {
  const [clickedOnMore, setClickedOnMore] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch('http://localhost:8080/api/events/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eid }),
      });
      onDeleted(); // 👈 notify parent to refresh events
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs text-gray-800 transition hover:shadow-lg">
      <div className="text-lg flex items-center justify-between font-semibold">
        {eventName}
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="w-6 h-6 text-xs bg-gray-200 hover:bg-red-500 rounded-md"
            title="Delete"
          >
            🗑️
          </button>
          <button
            onClick={() => setClickedOnMore(!clickedOnMore)}
            className="w-6 h-6 text-xs bg-gray-200 hover:bg-blue-400 rounded-md"
            title="Toggle Details"
          >
            {clickedOnMore ? '🔼' : '🔽'}
          </button>
          <button className="font-bold" onClick={onTaskClick}>
            ...
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          clickedOnMore ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-2 bg-gray-100 p-3 rounded-md text-sm shadow-inner">
          <div>
            <b>Date:</b> {eventDate}
          </div>
          <div className="font-semibold">Contributors:</div>
          <div className="text-xs text-gray-600">{contributors}</div>
        </div>
      </div>
    </div>
  );
}

export default Eventtab;
