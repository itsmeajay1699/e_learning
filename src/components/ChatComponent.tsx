import { ChatRoom } from "@/types";
import Axios from "@/utils";
import React, { useEffect, useRef } from "react";
import ChatSidebar from "./ChatSidebar";
import ChattingComponent from "./ChattingComponent";

const ChatComponent = () => {
  const [chatRoom, setChatRoom] = React.useState<ChatRoom[] | []>([]);
  // const [roomId, setRoomId] = React.useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.offsetWidth;
        const padding = sidebarWidth - 20;
        if (divRef.current) {
          divRef.current.style.paddingLeft = `${padding}px`;
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
    <section className="p-4 flex flex-col gap-4  shadow-md  bg-gray-100 py-4 rounded-lg">
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

        <div
          ref={divRef}
          className="chat-content"
          style={{
            transition: "padding-left 0.5s",
          }}
        >
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
