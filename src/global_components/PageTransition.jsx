import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Let pages overlap during transitions
      style={{ position: "absolute", inset: 0, width: "100%", minHeight: "100svh" }}
      // (Optional) Enter anim — keep or remove if you only care about "away"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      // >>> This is your AWAY animation <<<
      exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

