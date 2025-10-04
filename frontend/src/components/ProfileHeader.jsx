import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, SunIcon, MoonIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useTheme } from "../contexts/ThemeContext";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const { theme, toggleTheme } = useTheme();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const playClickSound = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
  };

  return (
    <div className="p-3 sm:p-4 border-b border-[var(--border-primary)] bg-[var(--tertiary-bg)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative group transition-transform hover:scale-105"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[var(--primary-text)] font-medium text-sm sm:text-base truncate">
              {authUser.fullName}
            </h3>
            <p className="text-[var(--secondary-text)] text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-1 sm:gap-2 items-center">
          {/* THEME TOGGLE BTN */}
          <button
            className="btn-ghost p-1.5 sm:p-2"
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="btn-ghost p-1.5 sm:p-2"
            onClick={() => {
              playClickSound();
              toggleSound();
            }}
            title={`${isSoundEnabled ? 'Disable' : 'Enable'} sounds`}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <VolumeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* LOGOUT BTN */}
          <button
            className="btn-ghost p-1.5 sm:p-2 text-[var(--accent-tertiary)] hover:text-[var(--accent-tertiary)]/80"
            onClick={logout}
            title="Logout"
          >
            <LogOutIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
