import styled from 'styled-components';

const Button = styled.button`
  width: 80px;
  height: 36px;
  border: 1px solid var(--buttonDisable);
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  margin-right: 6px;
`;
export const FestivalBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['onActive'].includes(prop),
})`
  background-color: ${({ onActive }) => (onActive ? 'var(--buttonActive)' : '#ffffff')};
  color: ${({ onActive }) => (onActive ? '#ffffff' : 'var(--buttonDisable)')};
  border: ${({ onActive }) => (onActive ? 'none' : '1px solid var(--buttonDisable)')};
`;
export const ExperienceBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['onActive', 'onActive'].includes(prop),
})`
  background-color: ${({ onActive }) => (onActive ? 'var(--buttonActive)' : '#ffffff')};
  color: ${({ onActive }) => (onActive ? '#ffffff' : 'var(--buttonDisable)')};
  border: ${({ onActive }) => (onActive ? 'none' : '1px solid var(--buttonDisable)')};
`;
import backgroundMoamoa from '../../Assets/images/backgroundMoamoa.png';

export const ProductContainer = styled.div`
  max-width: 100%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  flex: 1;

  padding-bottom: 150px;
  background-image: url(${backgroundMoamoa});
  background-repeat: no-repeat;
  background-position: 110% 91%;
  background-position: bottom 8rem right 0px;
`;
export const ProductBox = styled.div`
  margin: 0 auto;

  .itemName {
    width: 300px;
    font-size: 16px;
    margin: 12px 0 6px 4px;
    font-weight: 500;
  }
  .itemDate {
    margin-left: 4px;
    color: var(--buttonDisable);
    font-size: 11px;
    font-weight: 400;
  }
`;

export const Nav = styled.div`
  display: flex;
  padding: 10px;
  .btn {
    width: 80px;
    height: 36px;
    border-radius: 10px;
    margin-right: 6px;
  }
`;
export const SkeletonContainer = styled(ProductContainer)`
  gap: 20px;
  margin: 10px auto;
  margin-left: 10px;
  .itemImage {
    border-radius: 10px;
    width: 370px;
    height: 140px;
    margin-bottom: 5px;
  }

  .itemName {
    margin: 0 auto;
    margin: 13px 0 6px 4px;
    width: 150px;
    height: 15px;
  }
  .itemDate {
    margin-left: 4px;
    width: 140px;
  }
`;
