import * as S from './headerType.style';

export default function HeaderTypeSearch() {
  return (
    <S.CustomModuleHeader>
      <h2>
        <b>최근 관심있게 본</b> 상품이에요 🔍
      </h2>
      {/* TODO: 계정 정보 작업 필요 */}
      <span>홍길동글동글님을 위한 큐레이션</span>
    </S.CustomModuleHeader>
  );
}
