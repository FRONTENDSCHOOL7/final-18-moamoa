import { styled } from 'styled-components';

export const TabMenu = styled.div`
  width: 390px;
  height: 60px;
  background-color: #2e2c39;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  @media (min-width: 768px) {
    top: 0;
    bottom: 0;
    left: 60px;
    width: 120px;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1200px) {
    top: 0;
    bottom: 0;
    left: 120px;
    width: 240px;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  height: 60px;
  width: 100%;
  padding-bottom:4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  }
  @media (min-width: 768px) {
    margin-bottom: 16px;
    gap: 7px;
  }
  @media (min-width: 1200px) {
    padding-left: 46px;
    justify-content: start;
    flex-direction: row;
    gap: 23px;
    width: 100%;
  }

  &:hover {
    background-color: #3B394A;
  }
`;
export const TabBtnImg = styled.img`
  @media (min-width: 768px) {
    padding-top: 5px;
  }
  @media (min-width: 1200px) {
    padding-top: 0px;
  }
`;
export const TabLabel = styled.span`
  font-size: 10px;
  color: ${(props) => (props.$colors ? '#FFC700' : '#fff')};

  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;
export const TabletLogOut = styled.button`
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    width: 120px;
    height: 56px;
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 6px 0 2px 50px;
    gap: 7px;
    bottom: 80px;
    .logout {
      transform: translateX(-30%);
    }
  }
  @media (min-width: 1200px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 34px;
    .logout {
      margin-left: 5px;
    }
  }
  &:hover {
    background-color: #3B394A;
    color: #FFC700;
  }
`;
export const TabletLogo = styled.img`
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 1200px) {
    display: none;
  }
  margin-block: 60px;
`;
export const DesktopLogo = styled.img`
  width: 172px;
  margin-block: 60px;
  @media (max-width: 1199px) {
    display: none;
  }
`;
