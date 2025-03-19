import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as S from './TabNavigation.style';

type TabNavigationProps = {
  data: { link: string; mainTitle: string; subTitle: string | null; isNew: boolean; isAd: boolean }[];
  mode?: 'light' | 'dark';
};

export default function TabNavigation({ data, mode = 'light' }: TabNavigationProps) {
  const pathname = usePathname();

  return (
    <S.TabNavigation
      className='tab-navigation'
      $mode={mode}
    >
      <ul className='tab-navigation__list'>
        {data?.map(({ link, mainTitle, subTitle, isNew, isAd }) => (
          <li
            className={clsx('tab-navigation__menu', {
              'is-new': isNew,
              'is-active': pathname === link,
            })}
            key={link}
          >
            <Link href={link}>
              {subTitle && <sup>{subTitle}</sup>}
              {isAd && <sup>AD</sup>}
              <span>{mainTitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </S.TabNavigation>
  );
}
