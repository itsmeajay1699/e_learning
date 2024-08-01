import ChatEventEnum from "@/constant";
import React, { createContext, useContext, useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

const getSocket = () => {
  // const token = localStorage.getItem("token");

  return io(import.meta.env.VITE_WEBSOCKET_PROD, {
    withCredentials: true,
    auth: {
      // token,
    },
  });
};

const SocketContext = createContext<{
  socket: ReturnType<typeof io> | null;
}>({
  socket: null,
});

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(getSocket());
    socket?.on(ChatEventEnum.NEW_CHAT_ROOM_EVENT, (data) => {
      console.log(data, "new chat room", "from the context");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
