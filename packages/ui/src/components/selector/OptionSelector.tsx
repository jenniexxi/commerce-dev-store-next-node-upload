/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { GoodsOptions, GoodsOptionsList } from '@ui/apis/goodsApi';
import { MiniCartsList } from '@ui/apis/shoppingCartApi';
import Selector, { Option } from '@ui/components/selector/Selector';
import { convertMinicartOptionFormat } from '@ui/utils/goods';
import * as S from './Selector.style';

interface Props {
  options?: GoodsOptions | MiniCartsList;
  onChange: (optionId: GoodsOptionsList, prevValue?: string[]) => void;
  optionCount?: number;
}

const OptionSelector = ({ options, onChange, optionCount = 1 }: Props) => {
  if (!options?.optionList || !Array.isArray(options.optionList) || options.optionList.length === 0) {
    return null;
  }
  const [firstSelector, setFirstSelector] = useState(convertMinicartOptionFormat(options.optionList));
  const [secondSelector, setSecondSelector] = useState<Option<GoodsOptionsList>[]>([]);
  const [thirdSelector, setThirdSelector] = useState<Option<GoodsOptionsList>[]>([]);

  const [firstValue, setFirstValue] = useState<GoodsOptionsList>();
  const [secondValue, setSecondValue] = useState<GoodsOptionsList>();
  const [thirdValue, setThirdValue] = useState<GoodsOptionsList>();

  const [currentOptionList, setCurrentOptionList] = useState(options.optionList);

  useEffect(() => {
    setFirstSelector(convertMinicartOptionFormat(options.optionList));
    setCurrentOptionList(options.optionList);
    setSecondSelector([]);
    setThirdSelector([]);
    setFirstValue(undefined);
    setSecondValue(undefined);
    setThirdValue(undefined);
  }, [options, optionCount]);

  const handleOptionChange = (value: GoodsOptionsList, index: number) => {
    if (index === optionCount - 1) {
      const topOptionValue: string[] = [];
      if (firstValue) {
        topOptionValue.push(firstValue.valueStr);
      }
      if (secondValue) {
        topOptionValue.push(secondValue.valueStr);
      }
      if (thirdValue) {
        topOptionValue.push(thirdValue.valueStr);
      }
      onChange(value, topOptionValue);
    } else {
      const idx = currentOptionList.findIndex((item) => {
        return item.valueStr === value.valueStr;
      });

      if (currentOptionList[idx].optionList) {
        if (index === 0) {
          setCurrentOptionList(options.optionList);
          setSecondSelector(convertMinicartOptionFormat(currentOptionList[idx].optionList));
          setSecondValue(undefined);
          setThirdValue(undefined);
        } else if (index === 1) {
          setCurrentOptionList(currentOptionList[idx].optionList);
          setThirdSelector(convertMinicartOptionFormat(currentOptionList[idx].optionList));
          setThirdValue(undefined);
        }
      }
    }
  };
  const renderSelector = () => {
    const selector = [];

    {
      for (let index = 0; index < optionCount; index++) {
        const name = options.optionNameList[index];

        if (index === 0) {
          selector.push(
            <S.OptionSelectorContainer key={'optionSelector' + optionCount + index}>
              <span> {name || `옵션 ${index + 1}`}</span>
              <Selector
                placeholder={'옵션 선택'}
                options={firstSelector}
                defaultValue={firstValue}
                onChange={(value) => {
                  setFirstValue(value);
                  handleOptionChange(value, index);
                }}
                disable={firstSelector.length === 0}
              />
            </S.OptionSelectorContainer>,
          );
        } else if (index === 1) {
          selector.push(
            <S.OptionSelectorContainer key={'optionSelector' + optionCount + index}>
              <span> {name || `옵션 ${index + 1}`}</span>
              <Selector
                placeholder={'옵션 선택'}
                options={secondSelector}
                defaultValue={secondValue}
                onChange={(value) => {
                  handleOptionChange(value, index);
                  setSecondValue(value);
                }}
                disable={secondSelector.length === 0}
              />
            </S.OptionSelectorContainer>,
          );
        } else {
          selector.push(
            <S.OptionSelectorContainer key={'optionSelector' + optionCount + index}>
              <span> {name || `옵션 ${index + 1}`}</span>
              <Selector
                placeholder={'옵션 선택'}
                options={thirdSelector}
                defaultValue={thirdValue}
                onChange={(value) => {
                  setThirdValue(value);
                  handleOptionChange(value, index);
                }}
                disable={thirdSelector.length === 0}
              />
            </S.OptionSelectorContainer>,
          );
        }
      }
    }

    return selector;
  };

  return renderSelector();
};

export default OptionSelector;
