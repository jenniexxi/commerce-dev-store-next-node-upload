import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useGetMainInfo } from 'hooks/query/displayQuery';
import * as S from './QuickMenu.style';

export default function QuickMenu() {
  const { data: mainInfo } = useGetMainInfo();

  return (
    <S.QuickMenu className='quickmenu'>
      <ul className='quickmenu__list'>
        {mainInfo?.quickMenuList.map(({ imageFilesUrl, quickMenuName, url, sort }) => (
          <li
            className={clsx('quickmenu__item', { new: false })}
            key={sort}
          >
            {/* TODO: new 정책 정의 이후 작업 필요 */}
            <Link href={url}>
              <div className='quickmenu__icon'>
                <Image
                  src={imageFilesUrl}
                  alt={`${quickMenuName} 썸네일`}
                  width={64}
                  height={82}
                />
              </div>
              <span className='quickmenu__name'>{quickMenuName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </S.QuickMenu>
  );
}
