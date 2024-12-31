// TodoInput.tsx
import { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 },
};

const TodoInput = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');
  const [error, setError] = useState<boolean>(false);

  const validateInput = () => {
    if (!text.trim()) {
      setError(true);
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (validateInput()) {
      onAdd(text);
      setText('');
      setError(false);
    } else {
      toast.error('Please enter a task');
    }
  };

  return (
    <motion.div
      className="space-y-4"
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
    >
      <motion.div
        animate={error ? shakeAnimation : {}}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.input
          type="text"
          value={text}
          ref={inputRef}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(false);
          }}
          placeholder="✨ What's on your mind?"
          animate={error ? shakeAnimation : {}}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          className={`flex-1 px-6 py-4 bg-white/50 backdrop-blur-sm border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm hover:shadow-md text-lg ${
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-purple-100 focus:ring-purple-400'
          }`}
        />
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TodoInput;
