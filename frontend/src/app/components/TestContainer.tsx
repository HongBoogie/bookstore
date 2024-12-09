"use client";

import { useEffect } from "react";

const TestContainer = () => {
  const getLambda = async () => {};

  useEffect(() => {
    getLambda();
  }, []);

  return (
    <div>
      <h1>Test Container</h1>
    </div>
  );
};

export default TestContainer;
