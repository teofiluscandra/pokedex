import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (callback) => {
  const ref = useRef(null);
  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    if (!window.IntersectionObserver || !ref?.current) return;
    const node = ref.current;

    function handleEntries([entry]) {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    }

    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver(handleEntries, options);
    observer.observe(node);

    return () => observer.unobserve(node);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  return [ref, isFetching, setIsFetching];
};
