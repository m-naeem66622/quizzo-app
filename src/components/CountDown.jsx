import React, { useState, useEffect } from "react";

function Countdown() {
  // Set the initial countdown state
  const [countdown, setCountdown] = useState(["Ready", "Set", "Go"]);
  const [index, setIndex] = useState(0);

  // Use useEffect hook to update the countdown every second
  useEffect(() => {
    // Check if the countdown is over
    if (index === countdown.length) {
      return;
    }
    // Set a timeout to update the index after one second
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, 1000);
    // Clear the timeout when the component unmounts or the index changes
    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  // Return the JSX element for the countdown
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-9xl font-bold text-indigo-600 animate-pulse">
        {countdown[index]}
      </h1>
    </div>
  );
}

export default Countdown;
