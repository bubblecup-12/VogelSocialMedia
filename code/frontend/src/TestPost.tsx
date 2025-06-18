import React, { useMemo } from "react";
import "./testPost.css";

interface TestPostProps {
  postId: number;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TestPost: React.FC<TestPostProps> = ({ postId }) => {
  const bgColor = useMemo(() => getRandomColor(), []);

  return (
    <div
      className="testPostCard"
      style={{ backgroundColor: bgColor }}
    >
      <span className="testPostNumber">{postId}</span>
    </div>
  );
};

export default TestPost;
