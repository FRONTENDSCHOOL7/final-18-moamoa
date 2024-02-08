import styled from 'styled-components';

export const ChatRoomWrap = styled.div`
  margin-top: 47px;
  height: 100%;
  display: flex;
  background-color: #fff;

  @media (min-width: 768px) {
    margin-top: 0px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;

    padding-right: 30px;
    height: 100%;
  }
  .Recommend {
    display: none;
    @media (min-width: 1200px) {
      display: block;
    }
  }
  div.Recommend > :nth-child(2) {
    height: auto;
  }
`;

export const ChatRoom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  .talkBox {
    display: flex;
    flex-direction: row;
  }
  margin: 16px;
  gap: 10px;
  @media (min-width: 768px) {
    margin: 80px auto 16px;
    max-width: 480px;
    padding-left: 120px;
  }
  @media (min-width: 1200px) {
    margin: 0px;
    min-width: 480px;
    margin-left: 0px;
    padding-left: 270px;
    padding-bottom: 16px;
    margin-bottom: 80px;
  }
`;

export const SendMsg = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p {
    margin-top: 10px;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0px;

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    border: 3px solid #2e2c39;
    padding: 20px;
  }
`;

export const Message = styled.div`
  width: 220px;
  font-size: 1.4rem;
  background-color: #ffffff;
  border: 1px solid var(--buttonDisable);
  border-radius: 0px 30px 30px 30px;
  margin: 0px 10px 10px;
  padding: 10px 12px 12px;
  line-height: normal;
  box-sizing: border-box;
`;
export const InputArea = styled.div`
  display: flex;
  align-items: center;

  padding: 10px;
  background-color: #ffffff;

  border: 3px solid #2e2c39;
  border-radius: 10px;
  gap: 10px;
`;
export const MessageInput = styled.input`
  font-size: 1.4rem;
  flex: 1;
  border: none;
  border-width: 0 0 1px;

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#fff' : 'var(--buttonActive)')};
  color: ${(props) => (props.disabled ? 'var(--buttonDisable)' : '#fff')};
  border: 1px solid ${(props) => (props.disabled ? 'var(--buttonDisable)' : '#fff')};
  border-radius: 10px;
  height: 40px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  box-sizing: border-box;
  padding: 0 20px;
`;
export const FileBox = styled.div`
  .fileImg {
    cursor: pointer;
  }
`;
export const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
export const UserName = styled.h2`
  display: block;
  margin-left: 8px;
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: var(--buttonDisable);
  font-weight: 500;
`;
export const MyTalk = styled.p`
  width: 220px;
  font-size: 1.4rem;
  background-color: #ffffff;
  border: 1px solid var(--buttonDisable);
  border-radius: 30px 0px 30px 30px;
  // margin: 0px 80px 10px;
  box-sizing: border-box;
  padding: 10px 12px 12px;
  line-height: normal;
  white-space: pre-line;

  // position: absolute;
  right: 0px;
`;
export const RemoveFile = styled.div`
  button {
    color: red;
    font-size: 1.2rem;
    border: 1px solid red;
  }
  .removeFileName {
    margin: 3px;
  }
  margin: 0px 10px;
`;

export const ChatListWrap = styled.ul`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  @media (min-width: 768px) {
    width: 480px;
    padding: 0;
    margin-top: 80px;
    margin-left: 204px;
  }
  @media (min-width: 1200px) {
    margin-left: 310px;
  }
`;
export const SearchImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50px;
`;
export const SearchWrap = styled.li`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;

  Button {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 80px;
  }
`;
export const SearchPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;
export const UserInfo = styled.div`
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &.unRead::after {
    content: '';
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50px;
    background-color: tomato;
    left: 0px;
    top: 0px;
  }
`;
export const UserId = styled.h2`
  font-size: 1.4rem;
`;
export const UserText = styled.span`
  color: var(--buttonDisable);
  font-size: 1.2rem;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ChatDate = styled.span`
  color: var(--buttonDisable);
  font-size: 1rem;
`;
export const ChatDateBox = styled.div`
  display: flex;
  vertical-align: baseline;
  margin-left: 50px;
  position: absolute;
  bottom: 22%;
  right: 0px;
  @media (min-width: 768px) {
    right: 55px;
  }
`;
export const RecommendPlaceContainer = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
  position: absolute;
  top: 8%;
  right: 2.5%;
`;
