import React from 'react';
import { festivalActiveState, experienceActiveState } from '../../Recoil/ProductTypeStateAtom';
import { useRecoilState } from 'recoil';
import { Nav, FestivalBtn, ExperienceBtn } from './ProductStyle';

export default function TopNavigation() {
  const [festivalActive, setFestivalActive] = useRecoilState(festivalActiveState);
  const [experienceActive, setExperienceActive] = useRecoilState(experienceActiveState);
  const toggleExperience = () => {
    setFestivalActive(false);
    setExperienceActive(true);
  };
  const toggleFestival = () => {
    setFestivalActive(true);
    setExperienceActive(false);
  };

  return (
    <Nav>
      <FestivalBtn onActive={festivalActive} onClick={toggleFestival}>
        축제
      </FestivalBtn>
      <ExperienceBtn onActive={experienceActive} onClick={toggleExperience}>
        체험
      </ExperienceBtn>
    </Nav>
  );
}
