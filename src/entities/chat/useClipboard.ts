import { toast } from "react-hot-toast";

export const useClipboard = () => {
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

  return { handleCopyToClipboard };
};
