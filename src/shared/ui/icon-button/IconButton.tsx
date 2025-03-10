import * as React from "react";
import { IconButton as RadixIconButton } from "@radix-ui/themes";
import s from "./IconButton.module.scss";
import classNames from "classnames";

interface IconButtonProps extends React.ComponentProps<typeof RadixIconButton> {
  variant?: "classic" | "soft" | "outline";
}

export const IconButton: React.FC<IconButtonProps> = ({
  className,
  variant = "classic",
  ...props
}) => {
  return (
    <RadixIconButton
      className={classNames(s.IconButton, className, s[variant])}
      variant={variant}
      {...props}
    />
  );
};
