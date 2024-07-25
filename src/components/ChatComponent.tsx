import { ChatRoom } from "@/types";
import Axios from "@/utils";
import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChattingComponent from "./ChattingComponent";

const ChatComponent = () => {
  const [chatRoom, setChatRoom] = React.useState<ChatRoom[] | []>([]);
  // const [roomId, setRoomId] = React.useState<string>("");

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
            // setRoomId={setRoomId}
            originalUserId={user_id}
            // roomId={roomId}
            setUser={setUser}
            user={user}
          />
        </div>

        <div>
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
