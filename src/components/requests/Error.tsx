import { FC } from 'react';

interface ErrorProps {
  text: string;
}

export const Error: FC<ErrorProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-red-500">{text}</div>
    </div>
  );
};
