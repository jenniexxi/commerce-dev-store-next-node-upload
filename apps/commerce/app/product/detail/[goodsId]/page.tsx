import ProductDetail from './ProductDetail';

const ProductDetailPage = async ({ params }: { params: { goodsId: string } }) => {
  const resolvedSearchParams = await Promise.resolve(params);
  const goodsId = Number(resolvedSearchParams.goodsId || '0');
  return <ProductDetail goodsId={goodsId} />;
};

export default ProductDetailPage;
