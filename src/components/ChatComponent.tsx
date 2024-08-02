import { ChatRoom } from "@/types";
import Axios from "@/utils";
import React, { useEffect, useRef } from "react";
import ChatSidebar from "./ChatSidebar";
import ChattingComponent from "./ChattingComponent";

const ChatComponent = () => {
  const [chatRoom, setChatRoom] = React.useState<ChatRoom[] | []>([]);
  // const [roomId, setRoomId] = React.useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (sidebarRef.current) {
        const sidebarDiv = document.querySelector(".sidebar-handle-width");
        const sidebarWidth = sidebarRef.current.offsetWidth;
        if (sidebarDiv) {
          (sidebarDiv as HTMLElement).style.paddingLeft = `${sidebarWidth}px`;
        }
      }
    };

    const observer = new ResizeObserver(updatePadding);

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    // Set initial padding
    updatePadding();

    return () => {
      if (sidebarRef.current) {
        observer.unobserve(sidebarRef.current);
      }
    };
  }, []);

  const [user, setUser] = React.useState<{
    id: string;
    email: string;
    profilePicture: string;
    roomId: string;
  }>({
    id: "",
    email: "",
    profilePicture: "",
    roomId: "",
  });

  React.useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const response = await Axios.get("/chat");
        if (response.data.success) {
          setChatRoom(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChatRoom();
  }, []);

  const user_id = JSON.parse(localStorage.getItem("user") || "{}").id;

  return (
    <section>
      <div>
        <div>
          <ChatSidebar
            chatRoom={chatRoom}
            sidebarRef={sidebarRef}
            // setRoomId={setRoomId}
            originalUserId={user_id}
            // roomId={roomId}
            setUser={setUser}
            user={user}
          />
        </div>

        <div className="sidebar-handle-width">
          {user.roomId ? (
            <div>
              <ChattingComponent
                roomId={user.roomId}
                originalUserId={user_id}
                user={user}
              />
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-500 text-gradient">
                Select a chat to start
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatComponent;
