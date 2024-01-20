import { authContext } from "../../utils/check_auth.js";
import Msg from "../../models/Msg.js";

export const msgResolvers = {
  Query: {
    async getMsgs() {
      try {
        const messages = await Msg.find().sort({ createdAt: -1 });
        const msgList = messages.map((message) => ({ message: message.msg }));
        return msgList;
      } catch (error) {
        console.error("Error fetching messages:", error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createMsg(_, { msg }, context) {
      const user = authContext(context);

      if (msg.trim() === "") {
        throw new Error("Message must not be empty");
      }

      try {
        const newMsg = new Msg({
          msg,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const savedMsg = await newMsg.save();
        return { message: savedMsg.msg };
      } catch (error) {
        console.error("Error creating message:", error);
        throw new Error(error);
      }
    },
  },
};
