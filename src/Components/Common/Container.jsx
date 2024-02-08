import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  // max-width: var(--small);
  width: 100%;
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  @media (min-width: 768px) {
    max-width: var(--large);
  }
`;
export const ContainerVh = styled(Container)`
  height: 100vh;
`;
