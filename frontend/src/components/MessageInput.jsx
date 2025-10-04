import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 sm:p-4 border-t border-[var(--border-primary)] bg-[var(--secondary-bg)]">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-[var(--border-primary)]"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--tertiary-bg)] flex items-center justify-center text-[var(--primary-text)] hover:bg-[var(--quaternary-bg)] transition-colors"
              type="button"
            >
              <XIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStrokeSound();
            }}
            className="w-full bg-[var(--tertiary-bg)] border border-[var(--border-primary)] rounded-full py-2.5 sm:py-3 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base text-[var(--primary-text)] placeholder-[var(--tertiary-text)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
            placeholder="Type a message..."
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`btn-secondary p-2 sm:p-3 transition-colors ${
            imagePreview ? "text-[var(--accent-primary)]" : ""
          }`}
          title="Attach image"
        >
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn-primary p-2 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Send message"
        >
          <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;
