import { motion } from 'framer-motion';
import { Grid } from '@mui/material';
import { Card } from '@/components/ui/card';

export function WeatherSkeleton() {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const pulse = {
    animate: {
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div {...fadeIn}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <motion.div {...pulse}>
            <Card className="h-32" />
          </motion.div>
        </Grid>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} md={4} key={i}>
            <motion.div {...pulse}>
              <Card className="h-48" />
            </motion.div>
          </Grid>
        ))}
        <Grid item xs={12}>
          <motion.div {...pulse}>
            <Card className="h-64" />
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}