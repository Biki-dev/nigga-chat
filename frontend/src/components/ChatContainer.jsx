import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    markMessagesAsRead,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    markMessagesAsRead(selectedUser._id);
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
    markMessagesAsRead,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-2 sm:px-4 overflow-y-auto py-4 bg-[var(--primary-bg)]">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-1">
            {messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === authUser._id;
              const prevMessage = messages[index - 1];
              const showAvatar =
                !prevMessage || prevMessage.senderId !== msg.senderId;

              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  } items-end gap-2 sm:gap-2.5`}
                >
                  {/* Avatar */}
                  {!isOwnMessage && showAvatar && (
                    <div className="flex-shrink-0">
                      <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt={selectedUser.fullName}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                      />
                    </div>
                  )}

                  {!isOwnMessage && !showAvatar && (
                    <div className="w-4 sm:w-6 ml-1 sm:ml-2" />
                  )}

                  {/* Message bubble */}
                  <div
                    className={`relative max-w-[85%] sm:max-w-xs lg:max-w-md mb-1 ${
                      isOwnMessage ? "message-sent" : "message-received"
                    }`}
                  >
                    {/* 🖼️ Zoomable Image */}
                    {msg.image && (
                      <Zoom
                        zoomMargin={30}
                        overlayBgColorEnd="rgba(0,0,0,0.9)"
                        transitionDuration={300}
                      >
                        <img
                          src={msg.image}
                          alt="Shared"
                          className="rounded-lg h-32 sm:h-40 w-full object-cover mb-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                        />
                      </Zoom>
                    )}

                    {/* 💬 Text */}
                    {msg.text && (
                      <p className="text-sm leading-relaxed break-words">
                        {msg.text}
                      </p>
                    )}

                    {/* ⏰ Timestamp */}
                    <p
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        isOwnMessage
                          ? "text-white/70"
                          : "text-[var(--tertiary-text)]"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
