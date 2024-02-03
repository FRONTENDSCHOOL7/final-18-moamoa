import styled from 'styled-components';

export const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

export const Modal = styled.div`
  width: 39rem;
  height: 20.7rem;
  margin: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background-color: white;
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  flex-direction: column;
`;

export const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
`;

export const BtnDel = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #eb5757;
  &:hover {
    font-weight: bold;
  }
`;

export const BtnModify = styled(BtnDel)`
  color: #4f9ee9;
  border-top: 1px solid #dbdbdb;
  padding-top: 2.5rem;
`;

export const BtnProductDesc = styled(BtnModify)`
  color: #000;
`;

// ConfirmDelModal
export const ConfirmModal = styled.div`
  width: 26rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%);
  padding: 3rem 0 0;
  box-sizing: border-box;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const Deltext = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dbdbdb;
`;

export const CancelBtn = styled.button`
  width: 12.5rem;
  height: 6.5rem;
  font-size: 1.4rem;
  color: #000;
  &:hover {
    font-weight: bold;
  }
`;

export const DelBtn = styled(CancelBtn)`
  color: #eb5757;
  border-right: 1px solid #dbdbdb;
`;
