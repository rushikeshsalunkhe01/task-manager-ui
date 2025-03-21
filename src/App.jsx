import React, { useEffect, useState } from 'react';
import TodoCard from './components/TodoCard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [todoItem, setTodoItem] = useState({ task: "", priority: "" });
  const [todoList, setTodoList] = useState(() => JSON.parse(localStorage.getItem("todoList")) || []);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    if (todoList.length === 0) return;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const onDelete = (index) => {
    const listAfterDeletion = todoList.filter((_, i) => i !== index);
    setTodoList(listAfterDeletion);
  };

  const filteredTodoList = selectedTab === "All" ? todoList : todoList.filter(taskItem => taskItem.priority === selectedTab);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-center border-b-2 border-gray-400 py-3 gap-4'>
        {["All", "High", "Medium", "Low"].map((tab, i) => (
          <button 
            key={i}
            className={`py-2 px-6 text-md font-semibold rounded-md transition-all ${tab === selectedTab ? "bg-gray-700 text-white" : "bg-white text-gray-700 hover:bg-gray-300"}`} 
            onClick={() => setSelectedTab(tab)}  
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='h-[60vh] md:h-[75vh] overflow-y-scroll p-4'>
        {filteredTodoList.map((taskItem, index) => (
          <TodoCard key={index} index={index} {...taskItem} onDelete={onDelete} />
        ))}
      </div>

      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-6 shadow-xl rounded-lg flex flex-col md:flex-row items-center gap-3 md:gap-6'>
        <input
          type="text"
          placeholder='Enter Task'
          value={todoItem.task}
          onChange={(e) => setTodoItem({ ...todoItem, task: e.target.value })}
          className='bg-gray-200 text-md w-64 md:w-80 rounded-md p-2 focus:outline-none'
        />

        <select
          className='text-md bg-gray-200 px-3 py-2 rounded-md w-44'
          value={todoItem.priority}
          onChange={(e) => setTodoItem({ ...todoItem, priority: e.target.value })}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          className='text-md bg-blue-600 px-5 py-2 rounded-md text-white hover:bg-blue-700 transition-all'
          onClick={() => {
            if (!todoItem.task) return toast.error('Please enter task');
            if (!todoItem.priority) return toast.error('Please select priority');
            setSelectedTab(todoItem.priority);
            setTodoList([todoItem, ...todoList]);
            setTodoItem({ task: "", priority: "" });
            toast.success('Task Added Successfully');
          }}
        >
          Add Task
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
