import { useState, useEffect } from "react";
import { createChat, getChats, deleteChat } from "entities/chat/api";
import { useUnit } from "effector-react";
import { $chatId, setChatId } from "./model";

type Chat = {
  id: string;
  name: string;
  group_id: null | string;
  model_id: string;
};

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const activeChatId = useUnit($chatId);

  const loadChats = async () => {
    try {
      const chatList = await getChats();
      if (Array.isArray(chatList)) {
        setChats(chatList);
      } else {
        console.error("Полученные данные не массив", chatList);
      }
    } catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
    }
  };

  const handleChatClick = (chatId: string) => {
    setChatId(chatId);
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (activeChatId === chatId) {
        setChatId("");
      }
    } catch (error) {
      console.error("Ошибка при удалении чата:", error);
    }
  };

  const handleCreateChat = async () => {
    const newChatName = prompt("Введите название чата:");
    if (newChatName) {
      try {
        const newChat = await createChat(newChatName);
        setChats((prevChats) => [
          ...prevChats,
          { id: newChat.id, name: newChat.name, group_id: null, model_id: "gpt" },
        ]);
      } catch (error) {
        console.error("Ошибка при создании чата:", error);
      }
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return {
    chats,
    activeChatId,
    handleChatClick,
    handleDeleteChat,
    handleCreateChat,
  };
};
