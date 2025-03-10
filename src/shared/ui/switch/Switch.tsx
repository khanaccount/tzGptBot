import * as Switch from "@radix-ui/react-switch";
import s from "./Switch.module.scss";

export const SwitchComponent = () => {
  return (
    <div>
      <Switch.Root className={s.Root}>
        <Switch.Thumb className={s.Thumb} />
      </Switch.Root>
    </div>
  );
};
