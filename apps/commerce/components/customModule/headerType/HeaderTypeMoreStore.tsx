import * as S from './headerType.style';

type HeaderTypeMoreStoreProps = {
  historyExistYn: boolean;
};

export default function HeaderTypeMoreStore({ historyExistYn }: HeaderTypeMoreStoreProps) {
  return (
    <S.CustomModuleHeader>
      <h2>
        {/* TODO: 비회원일때 케이스 추가 필요 */}
        {historyExistYn ? (
          <>
            <b>비슷한 상품</b>을 판매하는 스토어에요
          </>
        ) : (
          <>
            <b>찜이 가장 많은</b> 스토어에요
          </>
        )}
      </h2>
    </S.CustomModuleHeader>
  );
}
