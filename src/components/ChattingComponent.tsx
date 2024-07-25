import ChatEventEnum from "@/constant";
import { useSocket } from "@/context/socketContext";
import { Message } from "@/types";
import Axios from "@/utils";
import React, { useEffect } from "react";

const ChattingComponent = ({
  roomId,
  originalUserId,
  user,
}: {
  roomId: string;
  originalUserId: string;
  user: {
    id: string;
    email: string;
    profilePicture: string;
    roomId: string;
  };
}) => {
  const [allMessages, setAllMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  useEffect(() => {
    const fetchAllRoomMessages = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(`/message/room-message/${roomId}`);
        console.log(response.data);
        if (response.data.success) {
          setAllMessages(response.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRoomMessages();
  }, [roomId]);

  const recievedMessage = (message: Message) => {
    setAllMessages((prev) => [...prev, message]);
  };

  const typingTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const stopTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const isTyping = () => {
    const timer = 3000; // 5 seconds

    // Clear previous timer
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set new timer
    typingTimeout.current = setTimeout(() => {
      socket?.emit(ChatEventEnum.IS_TYPING_START_EVENT, {
        roomId,
        userId: user.id,
        typing: true,
      });
    }, timer);
  };

  React.useEffect(() => {
    socket?.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, recievedMessage);
    // socket?.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, (message: Message) => {
    //   setAllMessages((prev) => [...prev, message]);
    // });

    return () => {
      // socket?.off(ChatEventEnum.MESSAGE_RECEIVED_EVENT);
    };
  }, [socket]);

  const handleSendMessage = async () => {
    try {
      if (inputRef.current?.value) {
        const message = inputRef.current.value;

        const response = await Axios.post(`/message/send-message/${roomId}`, {
          message,
        });

        setAllMessages((prev) => [...prev, response.data.data]);
      } else {
        return;
      }

      inputRef.current!.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    divRef.current?.scrollTo(0, divRef.current.scrollHeight);
  }, [allMessages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md relative h-[calc(100dvh-2rem)]">
      {/* some information */}

      <div className="flex items-center gap-2">
        <img
          src={user.profilePicture}
          alt=""
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h1 className="text-lg font-bold">
            {user.email.split("@")[0].split(".")[0].toUpperCase()}
          </h1>
        </div>
      </div>

      <div
        ref={divRef}
        className="h-[calc(100dvh-4rem-10rem)] overflow-y-auto p-4 bg-white rounded-lg shadow-md relative mt-4"
      >
        {allMessages.map((item, index) => (
          <div>
            <div
              key={index}
              className={`${
                item.senderId === originalUserId
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={`
                    w-[fit-content] max-w-[70%] mb-4
                    ${
                      item.senderId === originalUserId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } p-2 rounded-lg shadow-md`}
              >
                {item.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        className="absolute bottom-0 left-0 w-full flex items-start gap-2 px-4"
      >
        <input
          type="text"
          onChange={isTyping}
          ref={inputRef}
          onBlur={() => {
            const timer = 3000;
            if (stopTimeout.current) {
              clearTimeout(stopTimeout.current);
            }

            stopTimeout.current = setTimeout(() => {
              socket?.emit(ChatEventEnum.IS_TYPING_START_EVENT, {
                roomId,
                userId: user.id,
                typing: false,
              });
            }, timer);
          }}
          placeholder="Type a message"
          className="w-full p-2 rounded-lg shadow-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-[.6rem] px-8 min-w-fit rounded-lg shadow-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChattingComponent;
