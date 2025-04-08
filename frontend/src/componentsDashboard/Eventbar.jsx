// import React, { useEffect, useState } from 'react';
// import Eventtab from './Eventtab.jsx';
// import Tasktab from './Tasktab.jsx';
// import Taskform from './Taskform.jsx';
// import { motion, AnimatePresence } from 'framer-motion';

// function Eventbar({ useremail, refreshEvents }) {
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [eventsWithNames, setEventsWithNames] = useState([]);
//   const [eventClicked, setEventClicked] = useState(0);
//   const [eventClickedName, setEventClickedName] = useState('');
//   const [taskWithNames, setTaskWithNames] = useState([]);
//   const [loadingEvents, setLoadingEvents] = useState(true);
//   const [refreshTasks, setRefreshTasks] = useState(false);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = String(date.getFullYear()).slice(-2);
//     return `${day}-${month}-${year}`;
//   };

//   const getNameById = async (id) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/users/getNameById", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       const data = await response.json();
//       return data.name || "Unknown";
//     } catch {
//       return "Error";
//     }
//   };

//   useEffect(() => {
//     const getContributorNames = async (contributors) => {
//       const names = await Promise.all(contributors.map(getNameById));
//       return names.join(", ");
//     };

//     const getEvents = async () => {
//       try {
//         setLoadingEvents(true);
//         const response = await fetch("http://localhost:8080/api/events/getEvents", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: useremail.trim() }),
//         });

//         const data = await response.json();
//         const eventList = data.event_list || [];

//         const enrichedEvents = await Promise.all(
//           eventList.map(async (event) => ({
//             ...event,
//             contributorNames: await getContributorNames(event.contributors),
//           }))
//         );

//         setEventsWithNames(enrichedEvents);
//       } catch (err) {
//         console.log("An error occurred. Please try again.", err);
//       } finally {
//         setLoadingEvents(false);
//       }
//     };

//     if (useremail) {
//       getEvents();
//     }
//   }, [useremail, refreshEvents]); // 👈 listens for refresh

//   useEffect(() => {
//     const fetchTasksForEvent = async () => {
//       if (!eventClicked) return;

//       try {
//         const response = await fetch("http://localhost:8080/api/tasks/getTasks", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ eventId: eventClicked }),
//         });

//         const data = await response.json();
//         const taskList = data.task_list || [];

//         const enrichedTasks = await Promise.all(
//           taskList.map(async (task) => ({
//             ...task,
//             assignedToName: await getNameById(task.assignedTo),
//           }))
//         );

//         setTaskWithNames(enrichedTasks);
//       } catch (err) {
//         console.log("Failed to fetch tasks", err);
//       }
//     };

//     fetchTasksForEvent();
//   }, [eventClicked, refreshTasks]);

//   return (
//     <div className="flex flex-col md:flex-row mt-16">
//       {/* Sidebar */}
//       <div className="bg-gray-100 p-5 overflow-auto scrollbar-hide w-full md:w-1/4 h-[calc(100vh-64px)] flex flex-col justify-between">
//         <div className="space-y-4">
//           {eventsWithNames.map((event, index) => (
//             <Eventtab
//               eid={event.id}
//               key={index}
//               eventName={event.title}
//               contributors={event.contributorNames}
//               eventDate={formatDate(event.date)}
//               onTaskClick={() => {
//                 setEventClicked(event.id);
//                 setEventClickedName(event.title);
//               }}
//             />
//           ))}
//         </div>

//         <AnimatePresence>
//           {eventClicked !== 0 && (
//             <motion.button
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.3 }}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//               onClick={() => {
//                 setEventClicked(0);
//                 setEventClickedName('');
//                 setTaskWithNames([]);
//               }}
//             >
//               Close Event
//             </motion.button>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Right Pane */}
//       <AnimatePresence mode="wait">
//         {eventClicked !== 0 ? (
//           <motion.div
//             key="event-tasks"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.4 }}
//             className="bg-gray-200 w-full md:w-3/4 p-4 overflow-auto h-[calc(100vh-64px)] scrollbar-hide"
//           >
//             <motion.button
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//               onClick={() => {
//                 setShowTaskForm(true);
//               }}
//             >
//               + Add Task
//             </motion.button>

//             {taskWithNames.length === 0 ? (
//               <motion.p
//                 key="no-tasks"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4 text-gray-600"
//               >
//                 No tasks available for event - {eventClickedName}
//               </motion.p>
//             ) : (
//               taskWithNames.map((task, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Tasktab
//                     title={task.title}
//                     description={task.desc}
//                     duedate={formatDate(task.dueDate)}
//                     assignedto={task.assignedToName}
//                     tid={task._id}
//                   />
//                 </motion.div>
//               ))
//             )}
//           </motion.div>
//         ) : (
//           !loadingEvents && (
//             <motion.div
//               key="select-message"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="w-full md:w-3/4 flex items-center justify-center h-[calc(100vh-64px)] text-gray-600 text-lg"
//             >
//               Select an event.
//             </motion.div>
//           )
//         )}
//       </AnimatePresence>

//       {/* Task Form Modal */}
//       {showTaskForm && (
//         <Taskform
//           eventId={eventClicked}
//           onClose={() => {
//             setShowTaskForm(false);
//             setRefreshTasks(prev => !prev);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Eventbar;

// Your existing imports
import React, { useEffect, useState } from 'react';
import Eventtab from './Eventtab.jsx';
import Tasktab from './Tasktab.jsx';
import Taskform from './Taskform.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function Eventbar({ useremail, refEvents }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [eventsWithNames, setEventsWithNames] = useState([]);
  const [eventClicked, setEventClicked] = useState(0);
  const [eventClickedName, setEventClickedName] = useState('');
  const [taskWithNames, setTaskWithNames] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const getNameById = async (id) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/getNameById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      return data.name || "Unknown";
    } catch {
      return "Error";
    }
  };

  useEffect(() => {
    const getContributorNames = async (contributors) => {
      const names = await Promise.all(contributors.map(getNameById));
      return names.join(", ");
    };

    const getEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch("http://localhost:8080/api/events/getEvents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: useremail.trim() }),
        });

        const data = await response.json();
        const eventList = data.event_list || [];

        const enrichedEvents = await Promise.all(
          eventList.map(async (event) => ({
            ...event,
            contributorNames: await getContributorNames(event.contributors),
          }))
        );

        setEventsWithNames(enrichedEvents);
      } catch (err) {
        console.log("An error occurred. Please try again.", err);
      } finally {
        setLoadingEvents(false);
      }
    };

    if (useremail) {
      getEvents();
    }
  }, [useremail, refreshEvents, refEvents]);

  useEffect(() => {
    const fetchTasksForEvent = async () => {
      if (!eventClicked) return;

      try {
        const response = await fetch("http://localhost:8080/api/tasks/getTasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: eventClicked }),
        });

        const data = await response.json();
        const taskList = data.task_list || [];

        const enrichedTasks = await Promise.all(
          taskList.map(async (task) => ({
            ...task,
            assignedToName: await getNameById(task.assignedTo),
          }))
        );

        setTaskWithNames(enrichedTasks);
      } catch (err) {
        console.log("Failed to fetch tasks", err);
      }
    };

    fetchTasksForEvent();
  }, [eventClicked, refreshTasks]);

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* Sidebar */}
      <div className="bg-gray-100 p-5 overflow-auto scrollbar-hide w-full md:w-1/4 h-[calc(100vh-64px)] flex flex-col justify-between">
        <div className="space-y-4">
          {eventsWithNames.map((event, index) => (
            <Eventtab
              eid={event.id}
              key={index}
              eventName={event.title}
              contributors={event.contributorNames}
              eventDate={formatDate(event.date)}
              onTaskClick={() => {
                setEventClicked(event.id);
                setEventClickedName(event.title);
              }}
              onDeleted={() => setRefreshEvents(prev => !prev)} // 👈 pass handler
            />
          ))}
        </div>

        <AnimatePresence>
          {eventClicked !== 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => {
                setEventClicked(0);
                setEventClickedName('');
                setTaskWithNames([]);
              }}
            >
              Close Event
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right Pane */}
      <AnimatePresence mode="wait">
        {eventClicked !== 0 ? (
          <motion.div
            key="event-tasks"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-200 w-full md:w-3/4 p-4 overflow-auto h-[calc(100vh-64px)] scrollbar-hide"
          >
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => {
                setShowTaskForm(true);
              }}
            >
              + Add Task
            </motion.button>

            {taskWithNames.length === 0 ? (
              <motion.p
                key="no-tasks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-gray-600"
              >
                No tasks available for event - {eventClickedName}
              </motion.p>
            ) : (
              taskWithNames.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Tasktab
                    title={task.title}
                    description={task.desc}
                    duedate={formatDate(task.dueDate)}
                    assignedto={task.assignedToName}
                    tid={task._id}
                    onDeleted={() => setRefreshTasks(prev => !prev)} // 👈 handle task deletion
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          !loadingEvents && (
            <motion.div
              key="select-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full md:w-3/4 flex items-center justify-center h-[calc(100vh-64px)] text-gray-600 text-lg"
            >
              Select an event.
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Task Form Modal */}
      {showTaskForm && (
        <Taskform
          eventId={eventClicked}
          onClose={() => {
            setShowTaskForm(false);
            setRefreshTasks(prev => !prev);
          }}
        />
      )}
    </div>
  );
}

export default Eventbar;
