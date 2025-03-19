import { ChangeEvent } from 'react';

import * as S from './QuantityCounter.style';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;

  maxValue?: number;
  minValue?: number;
};

const QuantityCounter = ({ quantity, setQuantity, minValue = 1, maxValue = 999 }: Props) => {
  const max = maxValue > 999 ? 999 : maxValue;
  const plusQuantity = () => {
    if (max) {
      if (quantity + 1 > max) return;
    }

    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity === minValue) return;
    setQuantity(quantity - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isNaN(parseInt(newValue))) {
      setQuantity(1);
      return;
    }
    if (max) {
      if (parseInt(newValue) > max) {
        setQuantity(max);
      } else {
        setQuantity(parseInt(newValue));
      }
    } else {
      setQuantity(parseInt(newValue));
    }
  };

  return (
    <S.Container>
      <S.QuntitiyBtn
        onClick={minusQuantity}
        disabled={quantity === minValue}
      >
        <SvgIcon
          path={'/ui/svg/ico_minus.svg'}
          tintColor={quantity === minValue ? colors.icon4 : colors.text3}
        />
      </S.QuntitiyBtn>
      <S.QuntityInput
        name='name'
        type='number'
        value={quantity.toString()}
        onChange={handleChange}
      />
      <S.QuntitiyBtn
        onClick={plusQuantity}
        disabled={quantity === maxValue}
      >
        <SvgIcon
          path={'/ui/svg/ico_plus.svg'}
          tintColor={quantity === maxValue ? colors.icon4 : colors.text3}
        />
      </S.QuntitiyBtn>
    </S.Container>
  );
};

export default QuantityCounter;
