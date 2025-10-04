import { useChatStore } from "../store/useChatStore";
import { useTheme } from "../contexts/ThemeContext";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const { theme } = useTheme();

  return (
    <div className="relative w-full max-w-6xl h-[800px] fade-in">
  <BorderAnimatedContainer>
    <div className="flex h-full">
      {/* LEFT SIDEBAR - Telegram/WhatsApp Style */}
      <div className="w-80 bg-[var(--secondary-bg)] border-r border-[var(--border-primary)] flex flex-col shadow-lg">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Chat Area */}
      <div className="flex-1 flex flex-col bg-[var(--primary-bg)]">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  </BorderAnimatedContainer>
</div>
  );
}
export default ChatPage;
