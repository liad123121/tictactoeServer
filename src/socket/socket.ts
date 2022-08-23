import { Server, Socket } from "socket.io";
import http from "http";

export abstract class SocketConnection {
  public connect(server: http.Server) {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      this.messages(io, socket);
    });
  }

  abstract messages(io: Server, socket: Socket): void;
}
