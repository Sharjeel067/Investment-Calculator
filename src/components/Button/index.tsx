import React from 'react';
import colors from '../config/colors';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded font-semibold shadow-md"
      style={{
        backgroundColor: colors.primary,
        color: '#fff',
        border: `1px solid ${colors.border}`,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
