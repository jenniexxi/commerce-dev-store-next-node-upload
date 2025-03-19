import { cloneElement, JSX } from 'react';
import { useGetMainCustomGoods } from 'hooks/query/displayQuery';

type CustomGoodsProps = {
  mainGroupId: number;
  children: JSX.Element;
};

export default function CustomGoods({ mainGroupId, children }: CustomGoodsProps) {
  const { data } = useGetMainCustomGoods(mainGroupId);

  return <>{cloneElement(children, { data })}</>;
}
