import { CopyIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { DropdownMenuGptModel } from "shared/ui/dropdown-menu-gpt-model/Dropdown-menu-gpt-model";
import { $chatId, $isSidebarOpen, toggleSidebar } from "entities/sidebar/model";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { SwitchComponent } from "shared/ui/switch/Switch";
import { useUnit } from "effector-react";
import { Message, Models } from "interface";
import { fetchChatMessages, fetchModels, sendMessage } from "entities/chat/api";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";

import s from "./Chat.module.scss";

import svgGpt from "assets/svgs/gpt3.5.svg";

export const Chat: React.FC = () => {
  const [model, setModel] = useState("ChatGPT");
  const [inputValue, setInputValue] = useState("");
  const [models, setModels] = useState<Models[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const isOpen = useUnit($isSidebarOpen);
  const chatId = useUnit($chatId);

  useEffect(() => {
    fetchModels().then((data) => setModels(data));

    const intervalId = setInterval(async () => {
      try {
        const updatedMessages = await fetchChatMessages(chatId);
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [chatId]);

  const handleSendRequest = async () => {
    setLoading(true);

    try {
      const result = await sendMessage(chatId, inputValue);
      console.log("Сообщение отправлено:", result);
      setInputValue("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (content: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          toast.success("Текст скопирован в буфер обмена!");
        })
        .catch((error) => {
          toast.error("Ошибка при копировании текста");
          console.error("Ошибка при копировании текста: ", error);
        });
    } else {
      toast.error("Clipboard API не поддерживается в этом браузере.");
    }
  };

  return (
    <div className={s.chat}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={s.chat_container}>
        {!isOpen && (
          <div className={s.sidebar_toggle} onClick={() => toggleSidebar()}>
            <SwitchComponent />
          </div>
        )}
        <div className={s.chat_block}>
          {messages.map((message) => (
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
                      {" "}
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
                      <p className={s.name_gpt_model}> {message.model?.label || "Unknown model"}</p>
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
        {loading && (
          <div className={s.loading}>
            <ClipLoader color="#3498db" loading={loading} size={50} />
          </div>
        )}
        <div className={s.inputBlock}>
          <DropdownMenuGptModel
            items={models}
            selectedValue={model}
            onSelect={setModel}
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
              onClick={handleSendRequest}
              className={s.send_btn}
              variant="classic"
            >
              <PaperPlaneIcon width="20" height="20" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
