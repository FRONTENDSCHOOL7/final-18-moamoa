import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  width: 100%;
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
`;
export const ContainerPercent = styled(Container)`
  height: 100%;
`;