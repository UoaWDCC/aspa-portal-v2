export const fadeUpInView = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    type: "spring",
    bounce: 0,
    duration: 0.8,
    delay: delay,
  },
});
