import { useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [showSpectrum, setShowSpectrum] = useState(false);

  const handleSpectrumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const hue = (x / rect.width) * 360;
    const color = `hsl(${hue}, 100%, 50%)`;
    onChange(color);
  };

  return (
    <div className="space-y-2">
      <div 
        className="w-full h-12 rounded-lg cursor-pointer relative overflow-hidden"
        style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
        onClick={handleSpectrumClick}
      />
      <div className="flex gap-2 items-center">
        <div 
          className="w-8 h-8 rounded-full border-2 border-gray-200"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm text-gray-600">{value}</span>
      </div>
    </div>
  );
};

export default ColorPicker;