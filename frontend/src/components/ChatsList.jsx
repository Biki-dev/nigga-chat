import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, markMessagesAsRead } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="card card-hover p-2 sm:p-3 cursor-pointer fade-in relative"
          onClick={() => {
            setSelectedUser(chat);
            if (chat.unreadCount > 0) {
              markMessagesAsRead(chat._id);
            }
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                <img 
                  src={chat.profilePic || "/avatar.png"} 
                  alt={chat.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[var(--primary-text)] font-medium text-sm truncate">
                {chat.fullName}
              </h4>
              <p className="text-[var(--secondary-text)] text-xs">
                {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="unread-badge text-xs min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;

