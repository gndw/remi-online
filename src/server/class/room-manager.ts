import { Server, Socket } from "socket.io";
import { ListRoom } from "../model/room";
import { Room } from "./room";
import {
  sendNotifErrRoomNotFound,
  sendNotifToClient,
} from "./sendNotifErrRoomNotFound";

export class RoomManager {
  startRoom(id: string, socket: Socket) {
    const rid = this.listRoomByUser.get(id);
    if (!rid) {
      return socket.emit("notif", {
        type: "error",
        message: `user not entered any room`,
      });
    }
    const room = this.listRoom.get(rid);
    if (!room) {
      return sendNotifErrRoomNotFound(socket, rid);
    }
    room.startRoom();
    this.listRoom.set(room.roomId(), room);
  }
  playerJoinRoom(id: string, roomID: string, socket: Socket) {
    const room = this.listRoom.get(roomID);
    if (!room) {
      return sendNotifErrRoomNotFound(socket, roomID);
    }
    this.listRoomByUser.set(id, roomID);
    sendNotifToClient(socket, "info", `join to room: ${roomID}`);
    socket.join(roomID);
  }
  playerLeaveRoom(id: string, socket: Socket): string | undefined {
    if (!this.listRoomByUser.has(id)) {
      return;
    }
    const roomId = this.listRoomByUser.get(id);

    if (roomId && !this.listRoom.has(roomId)) {
      return;
    }
    const room = this.listRoom.get(roomId!);
    if (!room) {
      return;
    }
    //player leave room socketio
    socket.leave(room.roomId());
    // getting all player in same room
    const playerInRoom = this.server.of(room.roomId());
    if (room.roomOwnerId() == id) {
      const listPlayer = Array.from(playerInRoom.sockets.keys());
      if (listPlayer.length != 0) {
        const newHost = listPlayer[0];
        room.switchRoomOwner(newHost);
        this.listRoom.set(room.roomId(), room);
        playerInRoom.emit("host-change", newHost);
      }
    }
    return room.roomId();
  }
  createNewRoom(room: Room) {
    if (this.listRoom.has(room.roomId())) {
      return;
    }
    this.listRoom.set(room.roomId(), room);
    this.listRoomByUser.set(room.roomOwnerId(), room.roomId());
  }
  private listRoom: Map<string, Room>;
  private listRoomByUser: Map<string, string>;

  /**
   *
   */
  constructor(private readonly getServer: () => Server) {
    this.listRoom = new Map();
    this.listRoomByUser = new Map();
  }
  get server(): Server {
    return this.getServer();
  }
}
