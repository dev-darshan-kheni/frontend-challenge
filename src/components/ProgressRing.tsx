// ProgressRing.tsx
import { motion } from 'framer-motion';

const ProgressRing = ({ progress }: { progress: number }) => {
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="relative w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          r="45"
          cy="48"
          cx="48"
          fill="none"
          strokeWidth="6"
          className="stroke-purple-100"
        />
        <motion.circle
          r="45"
          cx="48"
          cy="48"
          fill="none"
          strokeWidth="6"
          className="stroke-purple-500"
          transition={{ duration: 1, ease: 'easeInOut' }}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{
            strokeDasharray: `${progress * circumference} ${circumference}`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-purple-600"
        >
          {Math.round(progress * 100)}%
        </motion.span>
      </div>
    </div>
  );
};

export default ProgressRing;
