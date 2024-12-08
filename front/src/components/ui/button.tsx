interface ButtonProps {
  children: React.ReactNode,
  onClick: () => void;
  disabled?: boolean;
  style?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick, 
  disabled = false,
  style }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center  rounded-2xl  border border-secondary bg-secondary px-5 py-1.5 
        text-center text-sm font-medium text-white shadow-sm transition-all 
        hover:border-gray-700 hover:bg-gray-700 focus:ring focus:ring-gray-200 
        disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300
         ${style}`}
    >
      {children}
    </button>
  );
};

