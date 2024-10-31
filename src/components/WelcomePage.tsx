import { Volume2, Languages } from "lucide-react";
import Logo from "./Logo";

interface WelcomePageProps {
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onContinue: () => void;
}

const WelcomePage = ({
  soundEnabled,
  onSoundChange,
  language,
  onLanguageChange,
  onContinue
}: WelcomePageProps) => {
  const languages = [
    "English", "Spanish", "Mandarin", "Hindi", "Arabic", "Portuguese", 
    "Bengali", "Russian", "Japanese", "German", "Korean", "French", 
    "Italian", "Turkish", "Vietnamese", "Polish", "Dutch", "Thai", 
    "Greek", "Swedish"
  ];

  const colorScheme = {
    name: "Midnight Bloom",
    primary: "#1a1b4b",
    secondary: "#4f46e5",
    accent: "#818cf8",
    background: "#e0e7ff"
  };

  return (
    <div className="space-y-8 text-center">
      <Logo className="w-32 h-32 mx-auto" />
      
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          <input
            type="checkbox"
            id="sound"
            checked={soundEnabled}
            onChange={(e) => onSoundChange(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />
          <label htmlFor="sound" className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-600" />
            Sound enabled
          </label>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <label className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-indigo-600" />
            Select Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-64 p-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-600 outline-none"
          >
            {languages.map(lang => (
              <option key={lang.toLowerCase()} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Begin Survey
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Current Theme: {colorScheme.name}</p>
          <div className="flex justify-center gap-2 mt-1">
            {Object.entries(colorScheme).map(([key, value]) => (
              key !== 'name' && (
                <div key={key} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: value }}
                  />
                  <span>{value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;