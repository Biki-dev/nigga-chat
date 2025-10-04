import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

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
    
    // Mark messages as read when chat is opened
    markMessagesAsRead(selectedUser._id);

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages, markMessagesAsRead]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-4 overflow-y-auto py-4 bg-[var(--primary-bg)]">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-1">
            {messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === authUser._id;
              const prevMessage = messages[index - 1];
              const showAvatar = !prevMessage || prevMessage.senderId !== msg.senderId;
              
              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-end gap-2.5 slide-in-right`}
                >
                  {/* Avatar for received messages */}
                  {!isOwnMessage && showAvatar && (
                    <div className=" flex-shrink-0">
                    <img
  src={selectedUser.profilePic || "/avatar.png"}
  alt={selectedUser.fullName}
  className="size-8 rounded-full object-cover"
/>

                    </div>
                  )}
                  
                  {/* Spacer for received messages without avatar */}
                  {!isOwnMessage && !showAvatar && <div className="w-6 ml-2" />}
                  
                  {/* Message bubble */}
                  <div
                    className={`relative max-w-xs mb-1 ml-2 lg:max-w-md ${
                      isOwnMessage ? 'message-sent' : 'message-received'
                    }`}
                  >
                    {msg.image && (
                      <img 
                        src={msg.image} 
                        alt="Shared" 
                        className="rounded-lg h-40 w-full object-cover mb-2" 
                      />
                    )}
                    {msg.text && (
                      <p className="text-sm leading-relaxed break-words">
                        {msg.text}
                      </p>
                    )}
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      isOwnMessage ? 'text-white/70' : 'text-[var(--tertiary-text)]'
                    }`}>
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* 👇 scroll target */}
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
