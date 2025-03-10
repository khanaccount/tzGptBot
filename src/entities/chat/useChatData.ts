import { Message, Models } from "interface";
import { useEffect, useState } from "react";
import { fetchChatMessages, fetchModels } from "./api";

export const useChatData = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState<Models[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [messagesData, modelsData] = await Promise.all([
          fetchChatMessages(chatId),
          fetchModels(),
        ]);
        setMessages(messagesData);
        setModels(modelsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadData();
  }, [chatId]);

  return { messages, models, setMessages, setModels };
};
