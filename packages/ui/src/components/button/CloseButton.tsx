//import SvgIcon from '@ui/commons/SvgIcon';
// import { colors } from '@ui/styles/theme';
// import R from '@ui/utils/resourceMapper';
import * as S from './Button.style';

interface Props {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  closeBtnPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  className?: string;
  tintColor?: string;
}

const CloseButton = ({
  onClick,
  /* size = 20 ,*/ closeBtnPosition,
  className /*  tintColor = colors.icon3 */,
}: Props) => {
  return (
    <S.CloseButton
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      $closeBtnPosition={closeBtnPosition}
      className={className}
    >
      {/* <CloseButtonSVG
        size={size}
        strokeWidth={strokeWidth}
      /> */}
      {/* <SvgIcon
        name={R.svg.icoClose}
        tintColor={tintColor}
        width={size}
        height={size}
      /> */}
    </S.CloseButton>
  );
};

export default CloseButton;
