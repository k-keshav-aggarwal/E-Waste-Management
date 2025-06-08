export const animateNumbers = (target, element) => {
  let start = 0;
  const end = target;
  const duration = 2000; // Animation duration in milliseconds
  const stepTime = Math.abs(Math.floor(duration / end));

  const timer = setInterval(() => {
    start += 1;
    element.textContent = start;
    if (start === end) {
      clearInterval(timer);
    }
  }, stepTime);
};
