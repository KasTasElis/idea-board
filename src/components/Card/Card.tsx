import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="p-4 bg-slate-200 rounded-md">{children}</div>;
};

export { Card };
