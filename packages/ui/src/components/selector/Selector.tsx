'use client';

import { useEffect, useRef, useState } from 'react';
import * as S from './Selector.style';

export interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
  preDisableText?: string;
  tailDisableText?: string;
  width?: string;
}

interface Props<T> {
  options: Option<T>[];
  onChange: (value: T) => void;
  defaultValue?: T;
  placeholder?: string;
  disable?: boolean;
  width?: number;
  className?: string;
}

const Selector = <T,>({
  options,
  onChange,
  defaultValue,
  placeholder,
  width,
  disable = false,
  className,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue !== undefined) {
      const option = options.find((item) => item.value === defaultValue);
      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(null);
    }
  }, [defaultValue, options]);

  const openSelector = (e: React.MouseEvent) => {
    if (disable) return;
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectOption = (option: Option<T>, e: React.MouseEvent) => {
    if (option.disabled) return;
    e.stopPropagation();
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <S.SelectContainer
      ref={selectorRef}
      onClick={openSelector}
      $disable={disable}
      $width={width}
      className={className}
    >
      <S.Selector
        $selectedOption={selectedOption}
        $isOpen={isOpen}
        $disable={disable}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </S.Selector>
      {isOpen && (
        <S.OptionContainer>
          {options.map((option, index) => (
            <S.Option
              key={index + option.label}
              $disabled={option?.disabled}
              onClick={(e) => selectOption(option, e)}
            >
              {option?.disabled && option?.preDisableText}
              {option.label}
              {option?.disabled && option?.tailDisableText}
            </S.Option>
          ))}
        </S.OptionContainer>
      )}
    </S.SelectContainer>
  );
};

export default Selector;
