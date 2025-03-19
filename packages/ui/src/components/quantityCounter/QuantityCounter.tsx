import { ChangeEvent } from 'react';
import Button, { BtnSize } from '@ui/components/button/Button';
import Input from '@ui/components/input/Input';

interface Props {
  quantity: number;
  setQuantity: (quantity: number) => void;
  size?: BtnSize;
  width?: number;
  maxValue?: number;
  minValue?: number;
}

const QuantityCounter = ({ quantity, setQuantity, size = 'xsm', minValue = 1, width, maxValue = 999 }: Props) => {
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
    <div style={{ display: 'flex' }}>
      <Button
        title={'-'}
        btnType='tertiary'
        onClick={minusQuantity}
        size={size}
        width={width}
      />
      <Input
        name='name'
        type='number'
        value={quantity.toString()}
        onChange={handleChange}
        width={100}
        height='xsm'
      />
      <Button
        title={'+'}
        btnType='tertiary'
        onClick={plusQuantity}
        size={size}
        width={width}
      />
    </div>
  );
};

export default QuantityCounter;
