import * as S from './Tab.style';

interface Props {
  onSelect: () => void;
  isSelected: boolean;
  label: string;
  isNew?: boolean;
  height: number;
  itemWidth?: number;
  isFixedWidth: boolean;
  isBottomLineStretch: boolean;
  tabStyle?: 'basic' | 'chip';
}

const TabItem = ({
  onSelect,
  isSelected,
  label,
  isNew,
  height,
  itemWidth,
  isFixedWidth,
  isBottomLineStretch,
  tabStyle = 'basic',
}: Props) => {
  return (
    <S.TabItem
      onClick={onSelect}
      $isFixedWidth={isFixedWidth}
      $width={itemWidth}
      $height={height}
      $tabStyle={tabStyle}
    >
      <S.TabItemLabel
        $isSelected={isSelected}
        $isBottomLineStretch={isBottomLineStretch}
        className={isSelected ? 'isSelected' : ''}
        $tabStyle={tabStyle}
      >
        <span>
          {label}
          {isNew !== undefined && isNew ? <S.NewIcon /> : <></>}
        </span>
        <S.SelectBorder
          $isSelected={isSelected}
          $tabStyle={tabStyle}
          className='line'
        />
      </S.TabItemLabel>
    </S.TabItem>
  );
};

export default TabItem;
