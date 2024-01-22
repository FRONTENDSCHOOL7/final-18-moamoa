import styled from 'styled-components';

export const MoaMoaBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  background-color: #2e2c39;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 390px;
  height: 100vh;
  margin: 0 auto;
  p {
    padding-top: 10px;
    color: #ffffff;
    font-size: 18px;
  }
  overflow: hidden;
  position: relative;
  @media (min-width: 768px) {
    position: absolute;
    top: 50%;
    left: 50%;

    height: 740px;
    display: flex;
    width: 780px;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 10px;
  }
`;
export const Copyright = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  margin-top: 370px;
  color: #ffffff;
  font-size: 14px;
  @media (min-width: 768px) {
    position: absolute;
    top: 30%;
    transition: 0.5s ease;
    left: ${(props) => (props.visible === true ? '14%' : '40%')};
  }
`;
