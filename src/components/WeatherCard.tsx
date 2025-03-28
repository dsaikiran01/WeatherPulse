import { motion } from 'framer-motion';
import { Card, CardProps } from '@/components/ui/card';

interface WeatherCardProps extends CardProps {
  delay?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function WeatherCard({ children, className = "", delay = 0, ...props }: WeatherCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </motion.div>
  );
}