'use client';

import React, { ComponentType, JSX, Suspense, useEffect, useState } from 'react';
import * as S from './Accordion.style';
import SvgIcon from '@ui/commons/SvgIcon';
import { Separator, T } from '@ui/commons';
import IcoChevronUp from '@ui/svg/ico_chevron_up.svg';
import IcoChevronDown from '@ui/svg/ico_chevron_down.svg';

type AccordionItem = {
  title: string | JSX.Element;
  content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIndex?: number | number[];
  isGroup?: boolean;
  isOpenAll?: boolean;
};

const Accordion = ({ items, defaultOpenIndex = -1, isGroup = true, isOpenAll = false }: AccordionProps) => {
  const initialIndexes = (
    Array.isArray(defaultOpenIndex) ? (isGroup ? [defaultOpenIndex[0]] : defaultOpenIndex) : [defaultOpenIndex]
  ) as number[];

  const [activeIndexes, setActiveIndexes] = useState<number[]>(initialIndexes);

  useEffect(() => {
    if (isOpenAll) {
      setActiveIndexes(items.map((_, index) => index));
    }
  }, [isOpenAll, items]);

  const handleClick = (index: number) => {
    if (isGroup) {
      setActiveIndexes([activeIndexes.includes(index) ? -1 : index]);
    } else {
      if (activeIndexes.includes(index)) {
        setActiveIndexes(activeIndexes.filter((i) => i !== index));
      } else {
        setActiveIndexes([...activeIndexes, index]);
      }
    }
  };

  const renderContent = (content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element) => {
    if (typeof content === 'object' && 'type' in content) {
      return content;
    } else {
      return <Suspense fallback={<div>Loading...</div>}>{React.createElement(content)}</Suspense>;
    }
  };

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item.title.toString() + index}>
          <S.Accordion $active={activeIndexes.includes(index)}>
            <S.AccordionTrigger onClick={() => handleClick(index)}>
              {typeof item.title === 'string' ? <T.Headline2B>{item.title}</T.Headline2B> : item.title}

              {activeIndexes.includes(index) ? (
                <SvgIcon
                  path={'/ui/svg/ico_chevron_up.svg'}
                  width={20}
                  height={20}
                />
              ) : (
                <SvgIcon
                  path={'/ui/svg/ico_chevron_down.svg'}
                  width={20}
                  height={20}
                />
              )}
            </S.AccordionTrigger>
            {activeIndexes.includes(index) && (
              <S.AccordionTarget>
                <S.AccordionTargetInner>{renderContent(item.content)}</S.AccordionTargetInner>
              </S.AccordionTarget>
            )}
          </S.Accordion>
          <Separator $height={8} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Accordion;
