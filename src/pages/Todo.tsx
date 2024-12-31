// TodoApp.tsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

import { ITodo } from '../hooks/useTodoState';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import ProgressRing from '../components/ProgressRing';

type SortType = 'date' | 'alphabetical';

const TodoApp = () => {
  const [filter, setFilter] = useState('All');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);

  const filters = ['All', 'Favourite', 'Active', 'Completed'];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    toast[type](message, {
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: false,
      position: 'bottom-right',
    });
  };

  const addTodo = (text: string) => {
    const newTodo = {
      text,
      id: Date.now(),
      starred: false,
      completed: false,
      createdAt: new Date().toISOString(),
      createdAtTime: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    showToast('Task added successfully! ✨', 'success');
  };

  // Rest of the functions remain the same...
  const deleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      showToast('Task removed from your list 🗑️', 'error');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showToast('Task status updated! 🎉', 'info');
  };

  const toggleStar = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, starred: !todo.starred } : todo
      )
    );
    showToast('Task priority updated! ⭐', 'success');
  };

  const startEditing = (todo: ITodo) => {
    setEditingTodo(todo);
  };

  const saveEdit = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditingTodo(null);
    showToast('Task updated successfully! ✏️', 'success');
  };

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (filter === 'Active') return !todo.completed;
      if (filter === 'Completed') return todo.completed;
      if (filter === 'Favourite') return todo.starred;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.text.localeCompare(b.text);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const completionRate = todos.length
    ? todos.filter((todo) => todo.completed).length / todos.length
    : 0;

  return (
    <div className="min-h-screen !p-7 sm:!p-20 w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white/80 h-full backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-8 border border-purple-100"
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -20, opacity: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            ✨ Task Master Pro
          </h1>
          <p className="text-gray-500">Organize your day, achieve your goals</p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <ProgressRing progress={completionRate} />
        </div>

        <TodoInput onAdd={addTodo} />

        <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 10, opacity: 0 }}
            className="flex bg-gray-100/50 p-1 rounded-full w-full md:w-auto overflow-x-auto scrollbar-none"
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none px-6 py-2 transition-all duration-300 font-medium text-sm ${
                  filter === f
                    ? 'bg-white text-purple-600 rounded-full shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {f}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="flex-1 bg-white/50 border border-purple-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="date">Created Date</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[300px] h-full"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            <motion.ul
              layout
              className="space-y-3 mt-6"
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <TodoItem
                      todo={todo}
                      saveEdit={saveEdit}
                      toggleStar={toggleStar}
                      toggleDelete={deleteTodo}
                      toggleEdit={startEditing}
                      toggleComplete={toggleComplete}
                      cancelEdit={() => setEditingTodo(null)}
                      isEditing={editingTodo?.id === todo.id}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.ul>

            {filteredAndSortedTodos.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-gray-500 text-center pt-20"
              >
                <p>No tasks found. Add some tasks to get started! ✨</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TodoApp;
