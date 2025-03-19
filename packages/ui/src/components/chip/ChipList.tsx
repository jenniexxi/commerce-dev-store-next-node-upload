'use client';

import { useEffect, useRef, useState } from 'react';
import Chip from './Chip';
import * as S from './ChipList.style';
import SvgIcon from '@ui/commons/SvgIcon';

export interface ScrollScreen {
  isFilter?: boolean;
  onClickFilter?: () => void;
}

export interface ChipItem<T> {
  label: string;
  value: T;
  hasChild?: boolean;
  disabled?: boolean;
}

export type ChipType = 'basic' | 'option';

export type ChipColorType = 'black' | 'gray';

export interface TypeProps<T> {
  chipType: ChipType;
  colorType?: ChipColorType;
  onClickChip: (value: T) => void;
}

type Props<T> = TypeProps<T> &
  ScrollScreen & {
    item: ChipItem<T>[];
    selectedItem: T[];
    isMultiSelect?: boolean;
  };

const ChipList = <T,>({
  chipType,
  colorType = 'black',
  item,
  selectedItem,
  onClickChip,
  isFilter = false,
  isMultiSelect = false,
  onClickFilter,
}: Props<T>) => {
  const [selectValue, setSelectValue] = useState<T[]>(selectedItem);
  const [filterUI, setFilterUI] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current?.scrollLeft;

      if (scrollLeft > 1) {
        setFilterUI(!filterUI);
      } else {
        setFilterUI(filterUI);
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChipClick = (value: T) => {
    if (isMultiSelect) {
      // 다중선택
      setSelectValue((prev) => {
        if (prev.includes(value)) {
          return prev.filter((i) => i !== value);
        } else {
          return [...prev, value];
        }
      });
    } else {
      // 단일선택
      setSelectValue([value]);
    }

    onClickChip(value);
  };

  return (
    <S.ChipListWrap ref={scrollRef}>
      {isFilter && (
        <S.FilterItemBox $filterUI={filterUI}>
          <S.FilterItem
            $filterUI={filterUI}
            onClick={onClickFilter}
          >
            <SvgIcon
              path={'/ui/svg/ico_filter.svg'}
              width={16}
              height={16}
            />
            <span>필터</span>
            {selectValue.length !== 0 && <strong>{selectValue.length}</strong>}
          </S.FilterItem>
        </S.FilterItemBox>
      )}
      {item.map((i) => {
        return (
          <Chip
            key={i.value + ''}
            chipType={chipType}
            colorType={colorType}
            isSelected={selectValue.includes(i.value)}
            onClickChip={handleChipClick}
            {...i}
          />
        );
      })}
    </S.ChipListWrap>
  );
};

export default ChipList;
