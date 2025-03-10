// Sidebar.tsx
import { useState, useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { useNavigate } from "react-router";
import { IconButton } from "shared/ui/icon-button/IconButton";
import { SwitchComponent } from "shared/ui/switch/Switch";
import { AnimatePresence, motion } from "framer-motion";
import { $isSidebarOpen, closeSidebar, setChatId } from "entities/sidebar/model";
import { useUnit } from "effector-react";
import {
  ChatBubbleIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import LanguageDropdown from "shared/ui/dropdown-menu-language/Dropdown";
import s from "./Sidebar.module.scss";
import logo from "assets/svgs/logo.svg";
import profiePic from "assets/svgs/profile-pic.svg";
import { createChat, getChats, deleteChat } from "entities/chat/api";
import { useTranslation } from "react-i18next";

type Chat = {
  id: string;
  name: string;
  group_id: null | string;
  model_id: string;
};

export const Sidebar: React.FC = () => {
  const isOpen = useUnit($isSidebarOpen);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
  const { t } = useTranslation();

  const searchRef = useRef(null);
  useClickAway(searchRef, () => setIsSearchOpen(false));

  const navigate = useNavigate();

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
    setActiveChatId(chatId);
    setChatId(chatId);
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(null);
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

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExit = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setEmail(null);
    navigate("/auth");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={s.sidebar}
          initial={{ width: "0px", opacity: 0 }}
          animate={{ width: "324px", opacity: 1 }}
          exit={{ width: "0px", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div>
            <div className={s.sidebar_top}>
              <a href="/" className={s.sidebar_top__link}>
                <img src={logo} alt="logo" />
              </a>
              <LanguageDropdown />
            </div>
            <div className={s.sidebar_middle}>
              <div className={s.sidebar_middle_content}>
                <div className={s.sidebar_middle__actions}>
                  <IconButton onClick={handleCreateChat}>
                    <PlusIcon width="20" height="20" />
                  </IconButton>
                  {!isSearchOpen ? (
                    <IconButton variant="soft" onClick={() => setIsSearchOpen(true)}>
                      <MagnifyingGlassIcon width="20" height="20" />
                    </IconButton>
                  ) : (
                    <div className={s.searchInputWrapper} ref={searchRef}>
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={t("sidebar.search")}
                        className={s.searchInput}
                      />
                    </div>
                  )}
                </div>
                <div className={s.sidebar_toggle} onClick={() => closeSidebar()}>
                  <SwitchComponent />
                </div>
              </div>
              <div className={s.sidebar_chats}>
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`${s.sidebar_chats__chat} ${
                        activeChatId === chat.id ? s.sidebar_chats__chat_active : ""
                      }`}
                      onClick={() => handleChatClick(chat.id)}
                    >
                      <div className={s.title}>
                        <ChatBubbleIcon className={s.svgIcon} width={20} height={20} />
                        <p>{chat.name}</p>
                      </div>
                      <button
                        className={s.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id);
                        }}
                      >
                        <TrashIcon className={s.svgIcon} width={20} height={20} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className={s.noChats}>{t("sidebar.noChats")}</p>
                )}
              </div>
            </div>
          </div>
          <div className={s.sidebar_bottom}>
            {email ? (
              <>
                <div className={s.user_info_block}>
                  <img src={profiePic} alt="profiePic" />
                  <div className={s.user_info}>
                    <p className={s.name}>{email}</p>
                    <p className={s.token}>9 012 TKN</p>
                  </div>
                </div>
                <button className={s.exitBtn} onClick={handleExit}>
                  <ExitIcon width={20} height={20} />
                </button>
              </>
            ) : (
              <button className={s.loginBtn} onClick={() => navigate("/auth")}>
                {t("sidebar.authBtn")}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
