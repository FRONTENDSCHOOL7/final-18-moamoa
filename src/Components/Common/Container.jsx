import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  @media (min-width: 768px) {
    max-width: 1200px;
  }

`;
export const ContainerPercent = styled(Container)`
  height: 100%;
`;