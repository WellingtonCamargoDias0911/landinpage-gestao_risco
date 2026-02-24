import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = ({ 
  threshold = 0.1, 
  root = null, 
  rootMargin = '0px',
  triggerOnce = true 
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, isVisible };
};