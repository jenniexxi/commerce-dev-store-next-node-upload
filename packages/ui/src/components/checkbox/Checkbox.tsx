import { fonts } from '@ui/styles/theme';
import * as S from './Checkbox.style';

/* value 값이 없을 수 있으니 옵셔널 처리 */

export type CheckboxProps = {
  id: string;
  value?: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  fontType?: keyof typeof fonts;
  className?: string;
};

const Checkbox = ({
  id,
  value = '',
  name,
  checked,
  onChange,
  disabled = false,
  fontType = 'body1_normal',
  className,
}: CheckboxProps) => {
  return (
    <S.CheckboxContainer className={className}>
      <S.CheckboxInput
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.checked);
        }}
        disabled={disabled}
      />
      <S.CheckboxLabel
        htmlFor={id}
        $fontType={fontType}
      >
        {value}
      </S.CheckboxLabel>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
