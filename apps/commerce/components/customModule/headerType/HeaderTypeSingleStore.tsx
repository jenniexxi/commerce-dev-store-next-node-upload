import * as S from './headerType.style';

type HeaderTypeSingleStoreProps = {
  goodsName: string;
};
export default function HeaderTypeSingleStore({ goodsName }: HeaderTypeSingleStoreProps) {
  return (
    <S.CustomModuleHeader>
      <h2>
        관심있게 봤던
        <br />
        <b>{goodsName}</b>의 스토어 구경하기
      </h2>
    </S.CustomModuleHeader>
  );
}
