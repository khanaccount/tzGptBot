import { useState } from "react";
import { toast } from "react-hot-toast";
import { sendMessage } from "entities/chat/api";

export const useSendMessage = (chatId: string) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendRequest = async (inputValue: string) => {
    if (!inputValue.trim()) return;

    setIsSending(true);
    try {
      const result = await sendMessage(chatId, inputValue);
      console.log("Сообщение отправлено:", result);
      toast.success("Сообщение отправлено!");
    } catch (error) {
      toast.error("Ошибка при отправке сообщения");
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, handleSendRequest };
};
