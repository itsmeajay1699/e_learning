import ChatEventEnum from "@/constant";
import { useSocket } from "@/context/socketContext";
import { ChatRoom } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatSidebar = ({
  chatRoom,

  // setRoomId,

  originalUserId,
  // roomId,
  setUser,
  user,
}: {
  chatRoom: ChatRoom[];
  // setRoomId: (id: string) => void;
  // roomId: string;
  originalUserId: string;
  setUser: (user: {
    id: string;
    email: string;
    profilePicture: string;
    roomId: string;
  }) => void;
  user: {
    id: string;
    email: string;
    profilePicture: string;
    roomId: string;
  };
}) => {
  const navigate = useNavigate();

  const { socket } = useSocket();

  const [isTyping, setIsTyping] = useState<{
    [key: string]: boolean;
  }>({
    roomId: false,
  });

  useEffect(() => {
    socket?.on(ChatEventEnum.IS_TYPING_START_EVENT, (data) => {
      // also persist the previous state
      setIsTyping((prev) => ({
        ...prev,
        [data.roomId]: data.typing,
      }));
    });

    return () => {
      socket?.off(ChatEventEnum.IS_TYPING_START_EVENT);
    };
  }, [socket]);

  return (
    <aside className="sidebar sidebar-chat">
      <div className="sidebar-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="flex md:justify-end"
        >
          <span className="company-name hide flex-1 ">Treadue Courses</span>
          <img
            src={"/public/icons/cross.png"}
            alt="logo"
            onClick={() => {
              navigate(-1);
            }}
            className="h-8 w-8 mr-2 md:mr-0 bg-red-500 rounded-full p-1 backdrop-filter"
          />
        </div>

        <h1 className="text-3xl font-bold mt-6 mb-3">Chats</h1>

        <div className="sidebar__nav cursor-pointer flex flex-col">
          {chatRoom.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                // console.log(item);
                // // setRoomId(item.id);
                // reference two new object consider the two different state
                if (user.roomId === item.id) {
                  return;
                }
                setUser({
                  id:
                    item.participant1 === originalUserId
                      ? item.participant2_educator.id
                      : item.participant1_student.id,
                  email:
                    item.participant1 === originalUserId
                      ? item.participant2_educator.email
                      : item.participant1_student.email,
                  profilePicture:
                    item.participant1 === originalUserId
                      ? item.participant2_educator.profilePicture
                      : item.participant1_student.profilePicture,
                  roomId: item.id,
                });
              }}
              className={`sidebar__nav-item ${
                user.roomId === item.id
                  ? "bg-gray-500 bg-opacity-50 border-r-4 border-blue-500 border-opacity-50 shadow-md"
                  : "border-2"
              }`}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 * index,
                  damping: 30,
                }}
                className="md:flex-1 w-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`flex items-center gap-2`}>
                  <img
                    className="h-12 w-12 md:h-8 md:w-8 rounded-full"
                    src={
                      item.participant1 === originalUserId
                        ? item.participant2_educator.profilePicture
                        : item.participant1_student.profilePicture
                    }
                    alt=""
                  />

                  <div className="truncate hide flex flex-col items-start">
                    <span className="text-black">
                      {item.participant1 === originalUserId
                        ? item.participant2_educator.email
                        : item.participant1_student.email}
                    </span>

                    <span className="text-[12px] text-gray-600">
                      {isTyping[item.id] ? (
                        <div className="text-xs text-green-500">Typing...</div>
                      ) : (
                        <div className="text-xs text-gray-500">
                          {item.lastMessage
                            ? item.lastMessage
                            : "No message yet"}
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
