import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-[var(--tertiary-bg)] m-3 sm:m-4 rounded-lg p-1">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
          activeTab === "chats" 
            ? "bg-[var(--accent-primary)] text-white shadow-sm" 
            : "text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:bg-[var(--quaternary-bg)]"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
          activeTab === "contacts" 
            ? "bg-[var(--accent-primary)] text-white shadow-sm" 
            : "text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:bg-[var(--quaternary-bg)]"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
