import IcoAi from '@ui/svg/ico_ai.svg';
import { pxToRem } from '@ui/utils';
import * as S from './headerType.style';

export default function HeaderTypeForyou() {
  return (
    <S.CustomModuleHeader>
      <h2>
        <strong>
          For you
          <IcoAi
            className='svg'
            width={pxToRem(14.178)}
            height={pxToRem(15.599)}
          />
        </strong>
      </h2>
      <span>홍길동글동글님을 위한 큐레이션</span>
    </S.CustomModuleHeader>
  );
}
