"use client";

import React, { useEffect, useState } from "react";

const DateDisplay: React.FC = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => setDate(new Date().toLocaleDateString());

    updateDate();
    
    const timer = setInterval(updateDate, 86400000);

    return () => clearInterval(timer);
  }, []);

  return <div style={{ fontSize: "3rem", textAlign: "center" }}>{date}</div>;
};

export default DateDisplay;
