
import { Building2 } from "lucide-react";

interface LogoProps {
  variant?: "default" | "white" | "compact";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ variant = "default", size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-10 h-10 text-xl",
    lg: "w-16 h-16 text-3xl"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl"
  };

  const colorClasses = {
    default: "bg-orange-500 text-white",
    white: "bg-white text-orange-500",
    compact: "bg-orange-500 text-white"
  };

  const textColorClasses = {
    default: "text-gray-900",
    white: "text-white",
    compact: "text-gray-900"
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} ${colorClasses[variant]} rounded-lg flex items-center justify-center`}>
        <Building2 className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-10 h-10'}`} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
          AKIBEKS Engineering
        </span>
      )}
    </div>
  );
};

export default Logo;
