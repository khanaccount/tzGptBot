import { IconButton } from "shared/ui/icon-button/IconButton";
import { SwitchComponent } from "shared/ui/switch/Switch";
import { AnimatePresence, motion } from "framer-motion";
import { $isSidebarOpen, closeSidebar } from "entities/sidebar/model";
import { useUnit } from "effector-react";
import {
  ChatBubbleIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router";
import LanguageDropdown from "shared/ui/dropdown-menu-language/Dropdown";
import s from "./Sidebar.module.scss";
import logo from "assets/svgs/logo.svg";
import profiePic from "assets/svgs/profile-pic.svg";

import { useTranslation } from "react-i18next";
import { useAuth } from "entities/sidebar/useAuth";
import { useSearch } from "entities/sidebar/useSearch";
import { useChats } from "entities/sidebar/useChats";

export const Sidebar: React.FC = () => {
  const isOpen = useUnit($isSidebarOpen);

  const { chats, activeChatId, handleChatClick, handleDeleteChat, handleCreateChat } = useChats();
  const { isSearchOpen, searchText, setSearchText, setIsSearchOpen, searchRef } = useSearch();
  const { handleExit } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
            {localStorage.getItem("email") ? (
              <>
                <div className={s.user_info_block}>
                  <img src={profiePic} alt="profiePic" />
                  <div className={s.user_info}>
                    <p className={s.name}>{localStorage.getItem("email")}</p>
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
