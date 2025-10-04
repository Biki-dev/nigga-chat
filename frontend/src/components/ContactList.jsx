import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="card card-hover p-3 cursor-pointer fade-in"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full overflow-hidden">
                <img 
                  src={contact.profilePic || "/avatar.png"} 
                  alt={contact.fullName}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[var(--primary-text)] font-medium text-sm truncate">
                {contact.fullName}
              </h4>
              <p className="text-[var(--secondary-text)] text-xs">
                {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;

