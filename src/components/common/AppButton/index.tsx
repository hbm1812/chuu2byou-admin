import { Button } from "antd";

type Props = {
  title: string;
  style?: any;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const AppButton: React.FC<Props & React.ComponentProps<typeof Button>> = ({
  title,
  style,
  disabled,
  onClick,
  ...restProps
}) => {
  return (
    <Button {...restProps} style={style} disabled={disabled} onClick={onClick}>
      {title}
    </Button>
  );
};
export default AppButton;
