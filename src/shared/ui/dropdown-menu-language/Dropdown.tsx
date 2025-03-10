import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import s from "./Dropdown.module.scss";
import { MdLanguage } from "react-icons/md";
import i18n from "app/providers/i18n/i18n";

const LanguageDropdown = () => {
  const [language, setLanguage] = React.useState(i18n.language);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <DropdownMenu.Root onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenu.Trigger className={s.Trigger} asChild>
        <div className={s.TriggerContent}>
          <MdLanguage size={20} />
          {language.toUpperCase()}
          {isOpen ? <ChevronUpIcon className={s.Icon} /> : <ChevronDownIcon className={s.Icon} />}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.Content}
          sideOffset={5}
          align="start"
          avoidCollisions={false}
        >
          <DropdownItem value="ru" setLanguage={toggleLang} selected={language === "ru"}>
            RU
          </DropdownItem>
          <DropdownItem value="en" setLanguage={toggleLang} selected={language === "en"}>
            EN
          </DropdownItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const DropdownItem = ({
  value,
  setLanguage,
  children,
  selected,
}: {
  value: string;
  setLanguage: (lang: string) => void;
  children: React.ReactNode;
  selected: boolean;
}) => (
  <DropdownMenu.Item
    className={`${s.Item} ${selected ? s.Selected : ""}`}
    onSelect={() => setLanguage(value)} // При выборе вызываем setLanguage
  >
    {children}
  </DropdownMenu.Item>
);

export default LanguageDropdown;
