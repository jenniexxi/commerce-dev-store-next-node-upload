import { useState } from 'react';
import IconButton from '@ui/components/button/IconButton';

interface Props {
  onImg: string;
  offImg: string;
  btnSize?: number;
  imgSize?: number;
  onTintColor?: string;
  offTintColor?: string;
  defaultToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  className?: string;
}

const ToggleIconButton = ({
  onImg,
  offImg,
  onTintColor,
  offTintColor,
  defaultToggled = false,
  onToggle,
  className,
}: Props) => {
  const [isToggled, setIsToggled] = useState(defaultToggled);

  const handleClick = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle?.(newState);
  };

  return (
    <IconButton
      img={isToggled ? onImg : offImg}
      tintColor={isToggled ? onTintColor : offTintColor}
      onClick={handleClick}
      className={className}
    />
  );
};

export default ToggleIconButton;
