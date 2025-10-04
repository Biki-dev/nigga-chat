import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useTheme } from "../contexts/ThemeContext";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { MenuIcon, XIcon } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative w-full h-screen fade-in">
      <BorderAnimatedContainer>
        <div className="flex h-full">
          {/* LEFT SIDEBAR - Telegram/WhatsApp Style */}
          <div className={`
            fixed lg:relative z-50 lg:z-auto
            w-80 h-full lg:h-auto
            bg-[var(--secondary-bg)] border-r border-[var(--border-primary)] 
            flex flex-col shadow-lg lg:shadow-none
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Chat Area */}
          <div className="flex-1 flex flex-col bg-[var(--primary-bg)] min-w-0">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-[var(--secondary-bg)] border-b border-[var(--border-primary)]">
              <button
                onClick={toggleSidebar}
                className="btn-ghost p-2"
                title="Open menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              
              {selectedUser && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={selectedUser.profilePic || "/avatar.png"} 
                      alt={selectedUser.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[var(--primary-text)] font-medium text-sm truncate">
                      {selectedUser.fullName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="btn-ghost p-1"
                    title="Back to chats"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeSidebar}
            />
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
