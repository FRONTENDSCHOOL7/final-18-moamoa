import { useRecoilState } from 'recoil';
import { festivalActiveState, experienceActiveState } from '../../Recoil/ProductTypeStateAtom';

import { getTodayDate, semanticEventEndDate } from './formatEventDate';
export function filterActive(item) {
  const todayDate = new Date(getTodayDate());

  const expEndDate = new Date(semanticEventEndDate(item.price.toString()));

  const [festivalActive, experienceActive] = useRecoilState(
    festivalActiveState,
    experienceActiveState,
  );

  if (festivalActive && item.itemName.includes('[f]')) {
    if (todayDate > expEndDate) {
      return false;
    }
    return true;
  }

  if (!festivalActive && experienceActive && item.itemName.includes('[e]')) {
    if (todayDate > expEndDate) {
      return false;
    }
    return true;
  }
}
