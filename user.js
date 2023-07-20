const messages = [];

const addMessage = (roomId, data) => {
  const msg = {  roomId, ...data };
  messages.push(msg);
  return msg;
};


const getMessagesInRoom = (roomId) =>
  messages.filter((message) => message.roomId === roomId);

module.exports = { addMessage, getMessagesInRoom};
