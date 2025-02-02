import Chat from "../model/Chat"
import Message from "../model/Message"
import User from "../model/User";

const createChat = async (msgObject : any) => {

    const sender = await User.findOne({username : msgObject.sender});
    const receiver = await User.findOne({username : msgObject.receiver});
    const newChat = await Chat.create({
        members : [sender?._id,receiver?._id],
        messages : []
    });

    sender?.chats.push(newChat._id);
    receiver?.chats.push(newChat._id);

    await sender?.save();
    await receiver?.save();

    return newChat;
};

export const updateChat = async (msgObject : any) => {
    const sender = await User.findOne({username : msgObject.sender});
    const receiver = await User.findOne({username : msgObject.receiver});
    const existingChat = await Chat.findOne({ 
        members: {
          $all: [sender?._id, receiver?._id]
        }
      }).exec();

    let chat;
    if (!existingChat) {
        // Create new chat and add the chat to users
        chat = await createChat(msgObject);
    } else {
        chat = existingChat;
    }

    //create new message
    const message = await Message.create({
        sender : msgObject.sender,
        receiver : msgObject.receiver,
        content : msgObject.content
    });

    // put the message in the chat
    if (chat) {
        chat.messages.push(message._id);
        chat.lastMessage = message._id;
        await chat.save();
    }
    chat = await Chat.findOne({ 
        members: {
          $all: [sender?._id, receiver?._id]
        }
      }).populate({path : "members messages lastMessage"}).exec();

    return {message , chat};
}