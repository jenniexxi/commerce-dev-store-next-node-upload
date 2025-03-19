import { ChangeEvent, forwardRef } from 'react';
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { BtnSize } from '@ui/components/button/Button';
import CloseButton from '@ui/components/button/CloseButton';
import * as S from './Input.style';

type Props<T extends FieldValues> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: Path<T>;
  useForm?: boolean;
  error?: string;
  value?: string;
  resetValue?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  rules?: RegisterOptions<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  width?: number;
  height?: BtnSize;
};

// type IconState = 'error' | '';

const Input = forwardRef(
  <T extends FieldValues>(
    {
      name,
      useForm = false,
      disabled,
      value,
      error = '',
      resetValue,
      onChange,
      placeholder,
      type = 'text',
      register,
      watch,
      rules,
      errors,
      width,
      height = 'lg',
      ...props
    }: Props<T>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const inputProps = useForm && register ? register(name, rules) : { name, value, onChange };

    const errorMessage = useForm ? errors?.[name]?.message?.toString() || '' : error;
    const watchedValue = useForm && watch ? watch(name) : value || '';
    const showResetButton = watchedValue?.toString().length > 0 && !!resetValue;
    return (
      <>
        <S.InputWrapper $width={width}>
          <S.Input
            type={type}
            placeholder={placeholder}
            error={errorMessage}
            ref={ref}
            contentEditable={!disabled}
            $height={height}
            $showResetBtn={showResetButton}
            autoComplete='off'
            {...inputProps}
            {...props}
          />
          {showResetButton && (
            <S.Icon>
              <CloseButton
                size={26}
                strokeWidth={1}
                onClick={resetValue}
              />
            </S.Icon>
          )}
          {error && (
            <S.Icon>
              <></>
            </S.Icon>
          )}
        </S.InputWrapper>
        {errorMessage !== '' && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </>
    );
  },
) as <T extends FieldValues>(props: Props<T> & { ref?: React.ForwardedRef<HTMLInputElement> }) => React.ReactElement;

export default Input;
