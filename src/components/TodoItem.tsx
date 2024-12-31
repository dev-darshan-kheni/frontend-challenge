// TodoItem.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Edit3, Circle, Trash2, CheckCircle2 } from 'lucide-react';

import { shakeAnimation } from './TodoInput';
import { ITodo } from '../hooks/useTodoState';

interface TodoItemProps {
  todo: ITodo;
  isEditing: boolean;
  cancelEdit: () => void;
  toggleStar: (id: number) => void;
  toggleEdit: (todo: ITodo) => void;
  toggleDelete: (id: number) => void;
  toggleComplete: (id: number) => void;
  saveEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  saveEdit,
  isEditing,
  cancelEdit,
  toggleStar,
  toggleEdit,
  toggleDelete,
  toggleComplete,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  const validateEdit = (): boolean => {
    if (!editText.trim()) {
      setError(true);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateEdit()) {
      saveEdit(todo.id, editText);
    }
  };

  if (isEditing) {
    return (
      <motion.li
        layout
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        className="flex flex-col p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg transition-all duration-100 space-y-4"
      >
        <motion.div
          transition={{ duration: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
        >
          <motion.input
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              if (error) setError(false);
            }}
            animate={error ? shakeAnimation : {}}
            className={`w-full bg-gray-50/50 backdrop-blur-sm border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all duration-100 ${
              error
                ? 'border-red-500 focus:ring-red-400'
                : 'border-purple-100 focus:ring-purple-400'
            }`}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          className="flex justify-end space-x-2"
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-100 shadow-md hover:shadow-lg"
          >
            Save
          </motion.button>
          <motion.button
            onClick={cancelEdit}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-100 shadow-md hover:shadow-lg"
          >
            Cancel
          </motion.button>
        </motion.div>
      </motion.li>
    );
  }

  return (
    <motion.li
      layout
      whileHover={{ scale: 1.02 }}
      exit={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-100 ${
        todo.completed
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100'
          : 'bg-white/80 border-purple-100 backdrop-blur-sm'
      } shadow-md hover:shadow-lg`}
    >
      <div className="flex items-start space-x-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="text-purple-500 mt-1"
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </motion.button>
        <div className="flex flex-col flex-1">
          <span
            className={`text-lg transition-all duration-100 ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
            }`}
          >
            {todo.text}
          </span>
          <span className="text-xs text-gray-400">
            Created:{' '}
            {new Date(todo.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
            {' - '}
            {new Date(todo.createdAtTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => toggleStar(todo.id)}
          className={`p-2 ${
            todo.starred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
          } transition-colors duration-100 hover:text-yellow-500 `}
        >
          <Star size={20} />
        </motion.button>

        <motion.div
          className="flex space-x-2"
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        >
          <motion.button
            onClick={() => {
              toggleEdit(todo);
              setEditText(todo.text);
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-100"
          >
            <Edit3 size={20} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleDelete(todo.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-100"
          >
            <Trash2 size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.li>
  );
};

export default TodoItem;
