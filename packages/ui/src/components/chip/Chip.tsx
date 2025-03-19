import { ChipColorType, ChipItem, TypeProps } from './ChipList';
import * as S from './ChipList.style';

type ChildItemProps<T> = TypeProps<T> &
  ChipItem<T> & {
    colorType: ChipColorType;
    isSelected: boolean;
  };

const Chip = <T,>({
  label,
  value,
  chipType,
  colorType,
  isSelected,
  disabled = false,
  onClickChip,
  hasChild = false,
}: ChildItemProps<T>) => {
  return (
    <S.Chip
      $chipType={chipType}
      $colorType={colorType}
      $isSelected={isSelected}
      $disabled={disabled}
      $hasChild={hasChild}
      onClick={() => {
        if (disabled) return;
        onClickChip(value);
      }}
    >
      {label}
    </S.Chip>
  );
};

export default Chip;
