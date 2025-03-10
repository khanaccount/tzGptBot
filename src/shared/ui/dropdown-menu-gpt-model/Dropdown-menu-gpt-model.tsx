import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Models } from "interface";
import s from "./Dropdown-menu-gpt-model.module.scss";

interface DropdownProps {
  items: Models[];
  selectedValue: string;
  onSelect: (value: string) => void;
  trigger?: React.ReactNode;
  className?: string;
}

export const DropdownMenuGptModel: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  trigger,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className={`${s.Trigger} ${className}`} asChild>
        {trigger ? (
          <div className={s.TriggerWrapper}>
            {trigger}
            {isOpen ? <ChevronUpIcon className={s.Icon} /> : <ChevronDownIcon className={s.Icon} />}
          </div>
        ) : (
          <button className={s.TriggerContent}>
            <span>{selectedValue}</span>
            {isOpen ? <ChevronUpIcon className={s.Icon} /> : <ChevronDownIcon className={s.Icon} />}
          </button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.Content} side="top" sideOffset={5} align="start">
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              className={`${s.Item} ${selectedValue === item.label ? s.Selected : ""}`}
              onSelect={() => onSelect(item.label)}
            >
              <div className={s.ItemContent}>
                <span>{item.label}</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
