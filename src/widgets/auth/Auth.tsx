import { useState } from "react";
import { useNavigate } from "react-router";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import s from "./Auth.module.scss";

export const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      navigate("/");
    } else {
      setError("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div className={s.authBackdrop} onClick={() => navigate("/")}>
      <div className={s.authModal} onClick={(e) => e.stopPropagation()}>
        <div className={s.authHeader}>
          <h2>{t("auth.title")}</h2>
          <button className={s.closeBtn} onClick={() => navigate("/")}>
            <Cross2Icon width={20} height={20} />
          </button>
        </div>

        <form className={s.authForm} onSubmit={handleSubmit}>
          <label>{t("auth.email")}</label>
          <input
            type="text"
            placeholder={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{t("auth.password")}</label>
          <input
            type="password"
            placeholder={t("auth.yourPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className={s.error}>{error}</p>}

          <button type="submit" className={s.loginBtn}>
            {t("auth.signIn")}
          </button>
        </form>
      </div>
    </div>
  );
};
