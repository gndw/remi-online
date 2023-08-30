import io from "socket.io";
import { Room } from "./class/room";
import { RoomManager } from "./class/room-manager";
const server = new io.Server();
server.listen(8000);
const roomManager = new RoomManager(() => server);
//when player connect to server
server.on("connect", (socket) => {
  //test handsake to client
  socket.emit("hand-sake", "from server");
  //join client to room loby
  socket.join("lobby");
  updateNumPlayerInRoom();
  listenerCreateRoom(socket);
  listenerJoinRoom(socket);
  listenerHostPlayRoom(socket);
  clientDisconnected(socket);
});

function listenerCreateRoom(socket: io.Socket) {
  socket.on("create-room", (d?: string) => {
    const roomObj = new Room(socket.id);
    socket.join(roomObj.roomId());
    socket.leave("lobby");
  });
}

function clientDisconnected(socket: io.Socket) {
  socket.on("disconnect", () => {
    const roomId = roomManager.playerLeaveRoom(socket.id, socket);
    if (roomId) updateNumPlayerInRoom(roomId);
  });
}

function updateNumPlayerInRoom(roomName = "lobby") {
  const room = server.of(roomName);
  room.emit("player-number", room.sockets.size);
}
function listenerJoinRoom(socket: io.Socket) {
  socket.on("join-room", (roomID) => {
    roomManager.playerJoinRoom(socket.id, roomID, socket);
  });
}
function listenerHostPlayRoom(socket: io.Socket) {
  socket.on("start-room", () => {
    roomManager.startRoom(socket.id, socket);
  });
}
