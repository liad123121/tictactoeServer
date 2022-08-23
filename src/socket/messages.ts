import { Server, Socket } from "socket.io";
import { SocketConnection } from "./socket";

export class SocketMessages extends SocketConnection {
  messages(io: Server, socket: Socket) {
    socket.on("join_room", (data) => {
      if (
        io.sockets.adapter.rooms.get(data) != null &&
        io.sockets.adapter.rooms.get(data)!.size > 1
      ) {
        socket.emit("tooManyPeople", false);
      } else {
        if (!io.sockets.adapter.rooms.get(data)) {
          socket.emit("Piece", "X");
        } else {
          socket.emit("Piece", "O");
        }
        socket.join(data);
      }
    });

    socket.on("send", (data) => {
      socket.to(data.room).emit("matrix", data);
    });

    socket.on("end", (data) => {
      socket.to(data.room).emit("result", data);
    });
  }
}
