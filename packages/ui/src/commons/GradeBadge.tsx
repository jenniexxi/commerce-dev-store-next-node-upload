// import R from '@ui/utils/resourceMapper';
import IcoBadgeR1 from '@ui/svg/ico_badge_r1.svg';
import IcoBadgeR2 from '@ui/svg/ico_badge_r2.svg';
import IcoBadgeR3 from '@ui/svg/ico_badge_r3.svg';
import IcoBadgeR4 from '@ui/svg/ico_badge_r4.svg';
import IcoBadgeR5 from '@ui/svg/ico_badge_r5.svg';
import IcoBadgeS from '@ui/svg/ico_badge_s.svg';
// import SvgIcon from './SvgIcon';

export type GradeName = 'S' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
interface Props {
  gradeName: GradeName;
}

const GradeBadge = ({ gradeName }: Props) => {
  switch (gradeName) {
    case 'R1':
      return (
        <IcoBadgeR1
          width={16}
          height={16}
        />
      );
    case 'R2':
      return (
        <IcoBadgeR2
          width={16}
          height={16}
        />
      );
    case 'R3':
      return (
        <IcoBadgeR3
          width={16}
          height={16}
        />
      );
    case 'R4':
      return (
        <IcoBadgeR4
          width={16}
          height={16}
        />
      );
    case 'R5':
      return (
        <IcoBadgeR5
          width={16}
          height={16}
        />
      );
    default:
      return (
        <IcoBadgeS
          width={16}
          height={16}
        />
      );
  }
};

export default GradeBadge;
