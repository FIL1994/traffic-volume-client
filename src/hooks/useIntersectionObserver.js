import { useRef, useState } from "react";

export default function useIntersectionObserver(options) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(entries => {
        entries.forEach(({ isIntersecting }) => {
          setInView(isIntersecting);
        });
      }, options)
  );

  useLayoutEffect(() => {
    observer.observe(ref.current);

    return () => observer.unobserve(ref.current);
  });

  return { ref, inView };
}
