import { useState } from "react";

export const useModel = () => {
  const [model, setModel] = useState("ChatGPT");

  const handleChangeModel = (newModel: string) => {
    setModel(newModel);
  };

  return { model, handleChangeModel };
};
