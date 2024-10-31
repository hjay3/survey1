interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className = "" }: ProgressBarProps) => (
  <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;