interface InputProps {
    children?: React.ReactNode,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: ()=>void;
    onFocus?: ()=>void;
    value?:string;
    placeholder?: string;
    style?: string;
    icon?: React.ReactNode;
  }

export const Input: React.FC<InputProps> = ({
    children,
    onChange, 
    onClick,
    onFocus,
    value,
    placeholder,
    style,
    icon,
    })  => {
    return (
        <label className="relative">
            {children}
            <input 
                type="text" 
                onClick={onClick}
                onChange={onChange}
                onFocus={onFocus}
                value={value}
                className={`outline-none block w-full rounded-md border border-gray-300 px-10 hover:shadow-md 
                transition-all hover:bg-gray-50 focus:border-primary-400 shadow-gray-300
                disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${style}`}
                placeholder={placeholder}
            />
            {icon && 
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                    {icon}
                </div>
            }
        </label>   
        
    );
};

