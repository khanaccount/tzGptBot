export interface Models {
  id: string;
  label: string;
}

export interface Message {
  tokenCost: number;
  id: string;
  role: "assistant" | "user";
  content: string;
  tokens: number;
  created_at: string;
  time: number;
  model: {
    label: string;
    parent: {
      label: string;
    };
  };
}
