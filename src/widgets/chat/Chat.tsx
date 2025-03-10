import { CopyIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { DropdownMenuGptModel } from "shared/ui/dropdown-menu-gpt-model/Dropdown-menu-gpt-model";
import { $chatId, $isSidebarOpen, toggleSidebar } from "entities/sidebar/model";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { SwitchComponent } from "shared/ui/switch/Switch";
import { useUnit } from "effector-react";
import { Message } from "interface";
import { fetchChatMessages, fetchModels } from "entities/chat/api";
import { useTranslation } from "react-i18next";

import s from "./Chat.module.scss";

import svgGpt from "assets/svgs/gpt3.5.svg";
import { useClipboard } from "entities/chat/useClipboard";
import { useSendMessage } from "entities/chat/useSendRequest";
import { useModel } from "entities/chat/useModal";
import { useChatData } from "entities/chat/useChatData";

export const Chat: React.FC = () => {
  const chatId = useUnit($chatId);
  const isOpen = useUnit($isSidebarOpen);

  const [inputValue, setInputValue] = useState("");

  const { t } = useTranslation();

  const { messages, models, setMessages, setModels } = useChatData(chatId);
  const { handleCopyToClipboard } = useClipboard();
  const { isSending, handleSendRequest } = useSendMessage(chatId);
  const { model, handleChangeModel } = useModel();

  useEffect(() => {
    fetchModels().then((data) => setModels(data));
    fetchChatMessages(chatId).then((data) => setMessages(data));
  }, [chatId, setModels, setMessages]);

  return (
    <div className={s.chat}>
      <div className={s.chat_container}>
        {!isOpen && (
          <div className={s.sidebar_toggle} onClick={() => toggleSidebar()}>
            <SwitchComponent />
          </div>
        )}
        <div className={s.chat_block}>
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={message.role === "user" ? s.user_message : s.gpt_message}
            >
              {message.role === "user" ? (
                <>
                  <CopyIcon
                    onClick={() => handleCopyToClipboard(message.content)}
                    className={s.copy_icon}
                    width={17}
                    height={17}
                  />
                  <div className={s.message_block}>
                    <p className={s.user_text}>{message.content}</p>
                    <p className={s.user_text__time}>
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img className={s.svgGpt} src={svgGpt} alt="svgGpt" />
                  <div>
                    <div className={s.top}>
                      <p className={s.name_gpt}>
                        {message.model?.parent?.label || "Unknown model"}
                      </p>
                      <p className={s.name_gpt_model}>{message.model?.label || "Unknown model"}</p>
                    </div>
                    <div className={s.middle}>
                      <p className={s.gpt_answer}>{message.content}</p>
                    </div>
                    <div className={s.bottom}>
                      <div className={s.token_info}>
                        <p className={s.token_cost}>-{message.tokens} CAPS</p>
                        <CopyIcon
                          onClick={() => handleCopyToClipboard(message.content)}
                          className={s.svgIcon}
                        />
                      </div>
                      <p className={s.answer_gpt_time}>
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className={s.inputBlock}>
          <DropdownMenuGptModel
            items={models}
            selectedValue={model}
            onSelect={handleChangeModel}
            trigger={
              <div className={s.TriggerContent}>
                <span>{model}</span>
              </div>
            }
          />
          <div className={s.input_container}>
            <input
              type="text"
              placeholder={t("chat.placeholder")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={s.input_field}
            />
            <IconButton
              type="submit"
              onClick={() => handleSendRequest(inputValue)} // Используем хук для отправки сообщения
              className={s.send_btn}
              variant="classic"
              disabled={isSending} // Блокируем кнопку, если сообщение отправляется
            >
              <PaperPlaneIcon width="20" height="20" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
