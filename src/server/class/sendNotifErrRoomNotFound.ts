import { Socket } from "socket.io";

export function sendNotifErrRoomNotFound(socket: Socket, id: string) {
  const message = `room ${id} is not found`;
  return sendNotifError(socket, message);
}
export function sendNotifError(socket: Socket, message: string) {
  const type = "error";
  return sendNotifToClient(socket, type, message);
}
export function sendNotifToClient(
  socket: Socket,
  type: string,
  message: string
) {
  return socket.emit("notif", {
    type: type,
    message: message,
  });
}
