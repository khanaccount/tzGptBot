import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchModels = async () => {
  try {
    const response = await axiosInstance.get("/model/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

export const createChat = async (name: string) => {
  try {
    const response = await axiosInstance.post("/chat", {
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании чата:", error);
    throw error;
  }
};

export const getChats = async () => {
  try {
    const response = await axiosInstance.get("/chat/list");
    return response.data.data;
  } catch (error) {
    console.error("Ошибка при получении чатов:", error);
    throw error;
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    await axiosInstance.delete(`/chat/${chatId}`);
  } catch (error) {
    console.error("Ошибка при удалении чата:", error);
  }
};

export const fetchChatMessages = async (chatId: string) => {
  try {
    const response = await axiosInstance.get(`/chat/${chatId}/messages`);

    return response.data.data;
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    throw error;
  }
};

export const sendMessage = async (chatId: string, message: string) => {
  try {
    const response = await axiosInstance.post("/message/send", {
      chatId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    throw error;
  }
};
