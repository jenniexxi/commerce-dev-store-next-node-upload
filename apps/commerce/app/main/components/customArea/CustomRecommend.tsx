import { cloneElement, JSX } from 'react';
import { useGetMainCustomRecommend } from 'hooks/query/displayQuery';

type CustomRecommendProps = {
  mainGroupId: number;
  children: JSX.Element;
};

export default function CustomRecommend({ mainGroupId, children }: CustomRecommendProps) {
  const { data } = useGetMainCustomRecommend(mainGroupId);

  return <>{cloneElement(children, { data })}</>;
}
