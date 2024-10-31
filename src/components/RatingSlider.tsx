interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const RatingSlider = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  step = 1 
}: RatingSliderProps) => (
  <div className="space-y-2">
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
    />
    <div className="flex justify-between text-sm text-gray-600">
      <span>{min}</span>
      <span className="font-medium text-violet-600">{value}</span>
      <span>{max}</span>
    </div>
  </div>
);

export default RatingSlider;