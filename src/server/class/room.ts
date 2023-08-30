import { Server } from "socket.io";
import { CreateRoomParams, ListRoom } from "../model/room";
import { v4 as UUID } from "uuid";
import { RoomManager } from "./room-manager";

export class Room {
  startRoom() {
    this.startGame = true;
  }
  switchRoomOwner(newRoomOwner: string) {
    this.rOwnerID = newRoomOwner;
  }
  private startGame = false;
  private readonly name: string;
  private readonly rID: string;
  leaveRoom() {}

  constructor(private rOwnerID: string, name?: string) {
    this.rID = UUID();
    this.name = name ?? this.rID.slice(0, 6);
  }
  roomOwnerId() {
    return this.rOwnerID;
  }
  roomId() {
    return this.rID;
  }
}
