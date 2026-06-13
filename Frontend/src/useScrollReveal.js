import { useEffect } from 'react';

function useScrollReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const timer = setTimeout(() => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll(
          '.reveal, .reveal-left, .reveal-right'
        );
        elements.forEach((el) => observer.observe(el));
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref]);
}

export default useScrollReveal;