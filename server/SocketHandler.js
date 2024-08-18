
import { Chat, Project } from "./Schema.js";
import {v4 as uuid} from 'uuid';

const SocketHandler = (socket) =>{

    socket.on("join-chat-room", async({projectId, freelancerId})=>{
        const project = await Project.findById(projectId);

        if(project.freelancerId === freelancerId){

          await socket.join(projectId);
  
          console.log(socket.rooms);
          
  
          socket.broadcast.to(projectId).emit("user-joined-room");
          
          const chats = await Chat.findById(projectId);
  
          if(!chats){
              const newChat = new Chat({
                  _id: projectId,
                  messages: []
              })
  
              await newChat.save();
          }
  
          await socket.emit('messages-updated', {chats});
        }
    })


    socket.on("join-chat-room-client", async({projectId})=>{
      const project = await Project.findById(projectId);

      if(project.status === "Assigned" || project.status === "Completed"){

        await socket.join(projectId);

        console.log(socket.rooms);
        

        socket.broadcast.to(projectId).emit("user-joined-room");
        
        const chats = await Chat.findById(projectId);

        if(!chats){
            const newChat = new Chat({
                _id: projectId,
                messages: []
            })

            await newChat.save();
        }

        await socket.emit('messages-updated', {chats});
      }
  })

    socket.on('update-messages', async ({ projectId }) => {
        try {
          const chat = await Chat.findOne({ projectId});
          console.log('updating messages');
          socket.emit('messages-updated', { chat });
        } catch (error) {
          console.error('Error updating messages:', error);
        }
    });


    socket.on('new-message', async ({ projectId, senderId, message, time}) => {
        try {
          await Chat.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { messages: { id: uuid(), text: message, senderId, time } } },
            { new: true }
          );
      
          const chat = await Chat.findOne({ _id: projectId });
          console.log(chat);
          socket.emit('messages-updated', { chat });
          socket.broadcast.to(projectId).emit('message-from-user');
        } catch (error) {
          console.error('Error adding new message:', error);
        }
      });



}

export default SocketHandler;