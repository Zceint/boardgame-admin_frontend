import { useState, useEffect } from "react";

export default function Clock() {
  const [clock, setClock] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleString("en-GB"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{clock}</>;
}
