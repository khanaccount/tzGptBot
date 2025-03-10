import { Sidebar } from "widgets/sidebar/Sidebar";
import { Chat } from "widgets/chat/Chat";
import s from "./ChatPage.module.scss";

export const ChatPage: React.FC = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <Chat />
    </div>
  );
};
