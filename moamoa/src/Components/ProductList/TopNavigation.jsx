import React from 'react';
import styled from 'styled-components';
import { festivalActiveState, experienceActiveState } from '../../Recoil/ProductTypeStateAtom';
import { useRecoilState } from 'recoil';

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

const Nav = styled.div`
  padding: 10px;
`;
const Button = styled.button`
  width: 80px;
  height: 36px;
  border: 1px solid #dadada;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  margin-right: 6px;
`;
const FestivalBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['onActive'].includes(prop),
})`
  background-color: ${({ onActive }) => (onActive ? '#87b7e4' : '#ffffff')};
  color: ${({ onActive }) => (onActive ? '#ffffff' : '#dadada')};
`;

const ExperienceBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['onActive', 'onActive'].includes(prop),
})`
  background-color: ${({ onActive }) => (onActive ? '#87b7e4' : '#ffffff')};
  color: ${({ onActive }) => (onActive ? '#ffffff' : '#dadada')};
`;
