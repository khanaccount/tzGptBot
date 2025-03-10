import { Route, Routes } from "react-router";
import "./styles/index.scss";

import { ChatPage } from "pages/chat/ChatPage";
import { Auth } from "widgets/auth/Auth";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
