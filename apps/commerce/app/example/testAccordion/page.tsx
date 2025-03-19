'use client';

import { Accordion } from '@ui/components';

export default function TestAccordion() {
  const accordionItems = [
    {
      title: '첫 번째 아코디언',
      content: <p>아코디언 1의 내용입니다.</p>,
    },
    {
      title: '두 번째 아코디언',
      content: <p>아코디언 2의 내용입니다.</p>,
    },
    {
      title: '세 번째 아코디언',
      content: <p>아코디언 3의 내용입니다.</p>,
    },
  ];

  return (
    <div>
      <h2>Accordion Group</h2>
      <Accordion
        items={accordionItems}
        isGroup={true}
        defaultOpenIndex={0}
      />

      <h2>Accordion 전체 열기</h2>
      <Accordion
        items={accordionItems}
        isGroup={false}
        isOpenAll={true}
      />

      <h2>Accordion</h2>
      <Accordion
        items={accordionItems}
        isGroup={false}
      />
    </div>
  );
}
