import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Github,
  Twitter,
  Facebook,
  Apple,
  PartyPopper,
  Music,
  Heart,
  Plus,
  X
} from "lucide-react";
import ProgressBar from "./components/ProgressBar";
import WelcomePage from "./components/WelcomePage";
import Confetti from "./components/Confetti";
import AuthDisplay from "./components/AuthDisplay";
import ColorPicker from "./components/ColorPicker";
import RatingSlider from "./components/RatingSlider";
import { generateUserId } from "./utils/helpers";

type User = {
  name: string;
  userId: string;
  authProvider: string;
};

type Artist = {
  name: string;
  rating: number;
};

type Activity = {
  name: string;
  rating: number;
};

type Dislike = {
  item: string;
  rating: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    favoriteColor: "hsl(0, 100%, 50%)",
    favoritePerson: "",
    personRating: 5,
    likeMusic: false,
    artists: [] as Artist[],
    hobbies: [] as Activity[],
    dislikes: [] as Dislike[],
    question5: "",
    question6: ""
  });

  const totalPages = 12;
  const progress = (currentPage / totalPages) * 100;

  const handleAuth = (provider: string) => {
    const newUser = {
      name: "",
      userId: generateUserId(),
      authProvider: provider
    };
    setUser(newUser);
    setCurrentPage(4);
  };

  const handleNext = () => {
    if (currentPage === totalPages - 1) {
      setShowConfetti(true);
    }
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const addArtist = () => {
    setFormData(prev => ({
      ...prev,
      artists: [...prev.artists, { name: "", rating: 5 }]
    }));
  };

  const updateArtist = (index: number, field: keyof Artist, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      artists: prev.artists.map((artist, i) => 
        i === index ? { ...artist, [field]: value } : artist
      )
    }));
  };

  const removeArtist = (index: number) => {
    setFormData(prev => ({
      ...prev,
      artists: prev.artists.filter((_, i) => i !== index)
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, { name: "", rating: 5 }]
    }));
  };

  const updateActivity = (index: number, field: keyof Activity, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.map((hobby, i) => 
        i === index ? { ...hobby, [field]: value } : hobby
      )
    }));
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  const addDislike = () => {
    setFormData(prev => ({
      ...prev,
      dislikes: [...prev.dislikes, { item: "", rating: 5 }]
    }));
  };

  const updateDislike = (index: number, field: keyof Dislike, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      dislikes: prev.dislikes.map((dislike, i) => 
        i === index ? { ...dislike, [field]: value } : dislike
      )
    }));
  };

  const removeDislike = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dislikes: prev.dislikes.filter((_, i) => i !== index)
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <WelcomePage
            soundEnabled={soundEnabled}
            onSoundChange={setSoundEnabled}
            language={language}
            onLanguageChange={setLanguage}
            onContinue={handleNext}
          />
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Terms and Conditions</h2>
            <div className="h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTermsAccepted(true);
                  handleNext();
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                I Accept
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            <div className="grid gap-4">
              {[
                { icon: Github, name: "Google", color: "bg-red-500" },
                { icon: Apple, name: "Apple", color: "bg-black" },
                { icon: Facebook, name: "Facebook", color: "bg-blue-600" },
                { icon: Twitter, name: "Twitter", color: "bg-blue-400" }
              ].map(({ icon: Icon, name, color }) => (
                <button
                  key={name}
                  onClick={() => handleAuth(name)}
                  className={`flex items-center justify-center gap-3 p-3 ${color} text-white rounded-lg hover:opacity-90 transition-all`}
                >
                  <Icon className="w-5 h-5" />
                  Continue with {name}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">What is your name?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setFormData(prev => ({ ...prev, name: newName }));
                  setUser(prev => prev ? { ...prev, name: newName } : null);
                }}
                className="w-full p-3 border-2 rounded-lg focus:border-violet-600 outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">What's your favorite color?</label>
              <ColorPicker
                value={formData.favoriteColor}
                onChange={(color) => setFormData(prev => ({ ...prev, favoriteColor: color }))}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">Who's your favorite person?</label>
              <input
                type="text"
                value={formData.favoritePerson}
                onChange={(e) => setFormData(prev => ({ ...prev, favoritePerson: e.target.value }))}
                className="w-full p-3 border-2 rounded-lg focus:border-violet-600 outline-none"
                placeholder="Enter their name"
              />
              <label className="block text-lg font-medium mt-4">How much do you like them?</label>
              <RatingSlider
                value={formData.personRating}
                onChange={(value) => setFormData(prev => ({ ...prev, personRating: value }))}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">Do you like music?</label>
              <div className="flex items-center gap-3">
                <Music className="w-6 h-6 text-violet-600" />
                <input
                  type="checkbox"
                  checked={formData.likeMusic}
                  onChange={(e) => setFormData(prev => ({ ...prev, likeMusic: e.target.checked }))}
                  className="w-4 h-4 accent-violet-600"
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            {formData.likeMusic && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-lg font-medium">Who are your favorite artists?</label>
                  {formData.artists.length < 3 && (
                    <button
                      onClick={addArtist}
                      className="flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Artist
                    </button>
                  )}
                </div>
                {formData.artists.map((artist, index) => (
                  <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={artist.name}
                        onChange={(e) => updateArtist(index, 'name', e.target.value)}
                        className="flex-1 p-2 border-2 rounded-lg focus:border-violet-600 outline-none"
                        placeholder="Artist name"
                      />
                      <button
                        onClick={() => removeArtist(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <RatingSlider
                      value={artist.rating}
                      onChange={(value) => updateArtist(index, 'rating', value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-medium">What do you enjoy doing?</label>
                <button
                  onClick={addActivity}
                  className="flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Activity
                </button>
              </div>
              {formData.hobbies.map((hobby, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={hobby.name}
                      onChange={(e) => updateActivity(index, 'name', e.target.value)}
                      className="flex-1 p-2 border-2 rounded-lg focus:border-violet-600 outline-none"
                      placeholder="Activity name"
                    />
                    <button
                      onClick={() => removeActivity(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <RatingSlider
                    value={hobby.rating}
                    onChange={(value) => updateActivity(index, 'rating', value)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">Question #5</label>
              <textarea
                value={formData.question5}
                onChange={(e) => setFormData(prev => ({ ...prev, question5: e.target.value }))}
                className="w-full p-3 border-2 rounded-lg focus:border-violet-600 outline-none"
                rows={4}
                placeholder="Your answer..."
              />
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <div className="space-y-4">
              <label className="block text-lg font-medium">Question #6</label>
              <textarea
                value={formData.question6}
                onChange={(e) => setFormData(prev => ({ ...prev, question6: e.target.value }))}
                className="w-full p-3 border-2 rounded-lg focus:border-violet-600 outline-none"
                rows={4}
                placeholder="Your answer..."
              />
            </div>
          </div>
        );

      case 12:
        return (
          <div className="text-center space-y-6">
            {showConfetti && <Confetti />}
            {user && <AuthDisplay 
              authProvider={user.authProvider}
              userId={user.userId}
              name={user.name}
            />}
            <h2 className="text-2xl font-bold">Here is your first self map!</h2>
            <div className="p-6 bg-violet-50 rounded-lg">
              {/* Add visualization here */}
            </div>
            <button
              onClick={() => console.log("Start using app")}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all"
            >
              <PartyPopper className="w-5 h-5 inline-block mr-2" />
              Let's begin using the app!
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!termsAccepted && currentPage > 2) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Functionality is very disabled</h2>
          <p className="text-gray-600">Please accept the terms and conditions to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <ProgressBar progress={progress} />
        
        <div className="bg-white rounded-2xl shadow-xl mt-4 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Personal Survey</h1>
            <p className="text-violet-100 mt-2">Help us get to know you better</p>
          </div>

          <div className="p-6">
            {renderPage()}

            {currentPage > 1 && (
              <div className="flex justify-between mt-8 pt-4 border-t">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                {currentPage < totalPages && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <ProgressBar progress={progress} className="mt-4" />
      </div>
    </div>
  );
}

export default App;