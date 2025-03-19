import { ReactNode } from 'react';
import * as S from './Button.style';
import SvgIcon from '@ui/commons/SvgIcon';

interface Props {
  path?: string;
  btnSize?: number;
  imgSize?: number;
  tintColor?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}
const IconButton = ({ btnSize = 24, onClick, className, imgSize = 24, tintColor, children, path }: Props) => {
  return (
    <S.IconButton
      $size={btnSize}
      onClick={onClick}
      className={className}
    >
      {path ? (
        <SvgIcon
          path={path}
          tintColor={tintColor}
          width={imgSize}
          height={imgSize}
        />
      ) : (
        children
      )}
    </S.IconButton>
  );
};

export default IconButton;
