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

export const ProductContainer = styled.ul`
  max-width: 100%;

  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 480px;
  }

  padding-bottom: 150px;

  @media (min-width: 768px) {
  }
`;
export const ProductBox = styled.li`
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

export const Nav = styled.nav`
  display: flex;
  margin: 10px auto;
  margin-top: 16px;
  max-width: 370px;
  .btn {
    width: 80px;
    height: 36px;
    border-radius: 10px;
    margin-right: 6px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    max-width: 480px;
    margin-top: 0px;
  }
`;
export const SkeletonContainer = styled(ProductContainer)`
  gap: 20px;
  margin: 10px auto;
  margin-left: 10px;
  .itemImage {
    border-radius: 10px;
    width: 370px;
    height: 180px;
    margin-bottom: 5px;
    @media (min-width: 768px) {
      width: 280px;
    }
  }

  .itemName {
    margin: 0 auto;
    margin: 13px 0 6px 4px;
    width: 150px;
    height: 15px;
    @media (min-width: 768px) {
    }
  }
  .itemDate {
    margin-left: 4px;
    width: 140px;
  }
  @media (min-width: 768px) {
    grid-column-gap: 43px;
    grid-row-gap: 20px;
    max-width: 480px;
    margin: 0px auto;
  }
`;
