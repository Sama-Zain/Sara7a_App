import { NotFoundException } from "../../Utils/response/error.response.js";
import { create, findAll, findById } from "../../DB/database.repository.js";
import User from "../../DB/Models/user.model.js";
import Message from "../../DB/Models/message.model.js";
import { successResponse } from "../../Utils/response/succes.response.js";
export const sendMessage = async (req, res) => {
  const { receiverId } = req.params;
  const { content } = req.body;
  const receiver = await findById({ model: User, id: receiverId });
  if (!receiver) {
    throw NotFoundException({ message: "Receiver not found" });
  }
  // send message
    const message = await create({
    model: Message,
    data: {
      content,
      receiverId: receiver._id,
    },
  });
  return successResponse({
    res,
    message: "Message sent successfully",
    data: message,
    statusCode: 200,
  });
};

export const getMessage = async (req, res) => {
  const message = await findAll({ model: Message ,
   });
  return successResponse({
    res,
    message: "Message fetched successfully",
    data: message,
    statusCode: 200,
  });
};
export const getMessageAll = async (req, res) => {
  const messages = await Message.find();
  return successResponse({
    res,
    message: "Messages fetched successfully",
    data: messages,
    statusCode: 200,
  });
};