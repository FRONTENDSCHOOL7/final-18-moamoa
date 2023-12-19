import { useRecoilState } from 'recoil';
import { festivalActiveState, experienceActiveState } from '../../Recoil/ProductTypeStateAtom';

export function filterActive(item) {
  const [festivalActive, experienceActive] = useRecoilState(
    festivalActiveState,
    experienceActiveState,
  );

  if (festivalActive && item.itemName.includes('[f]')) {
    return true;
  }

  if (!festivalActive && experienceActive && item.itemName.includes('[e]')) {
    return true;
  }
  return false;
}
