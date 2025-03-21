import { Trash2 as TrashIcon } from 'lucide-react';

const TASK_PRIORITY_CLASSES = {
  High: "border-l-8 border-green-600",
  Medium: "border-l-8 border-yellow-500",
  Low: "border-l-8 border-red-500",
};

const BADGE_PRIORITY_CLASSES = {
  High: "bg-green-600 text-white",
  Medium: "bg-yellow-500 text-white",
  Low: "bg-red-500 text-white",
};

function TodoCard({ task, priority, index, onDelete }) {
  return (
    <div className={`bg-gradient-to-br from-gray-200 to-gray-100 shadow-md p-4 m-3 rounded-lg relative flex flex-col md:flex-row md:items-center md:justify-between ${TASK_PRIORITY_CLASSES[priority]}`}>
      <div>
        <span className={`px-3 py-1 rounded-md ${BADGE_PRIORITY_CLASSES[priority]}`}>
          {priority}
        </span>
        <h1 className="mt-2 text-lg font-medium text-gray-700">{task}</h1>
      </div>
      <TrashIcon
        onClick={() => onDelete(index)}
        className='cursor-pointer text-gray-500 hover:text-red-600 transition-all mt-2 md:mt-0'
      />
    </div>
  );
}

export default TodoCard;
