import styled from 'styled-components';

export const Accordion = styled.div<{ $active: boolean }>`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: all 0.3s ease;

  ${({ $active }) =>
    $active &&
    `
    background-color: #f1f1f1;
    border-color: #000;
  `}
`;

export const AccordionTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  background-color: #f7f7f7;
`;

export const AccordionTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
`;

export const AccordionArrow = styled.span<{ $active: boolean }>`
  width: 16px;
  height: 16px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACbSURBVHgB7ZWxDYAgEEXPuIAjUFo6ghs4hqUjOJOTEEs7x7DTI1IQg4Bw0Hgv+Y0B3+sAYBiG+Tu15VuPG3Ab7gAaGtyIa3Gr66DAnXpSX6SQS+O/netwZxykiHjK1YTv0kwUYZPPoZdTI5LkqREk8tgIUvnXiCzy0Iiscl9EEbkropj8LaKo3BUxQQQVxCPgfrQUC24HhmGYCC5r/GVZIvgzuQAAAABJRU5ErkJggg==')
    center / cover no-repeat;

  ${({ $active }) =>
    $active &&
    `
    transform:rotate(180deg);
  `}
`;

export const AccordionTarget = styled.div`
  padding: 12px;
  border-top: 1px solid #ccc;
`;

export const AccordionTargetInner = styled.div`
  font-size: 14px;
  line-height: 1.3;
`;
