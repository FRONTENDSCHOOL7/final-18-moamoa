import styled from 'styled-components';

export const ChatRoom = styled.div`
  margin-top: 47px;
  height: 100vh;
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
`;
export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;
export const Message = styled.div`
  width: 220px;
  font-size: 14px;
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
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
`;
export const MessageInput = styled.input`
  width: 60%;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
`;
export const SendButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#fff' : 'var(--buttonActive)')};
  color: ${(props) => (props.disabled ? 'var(--buttonDisable)' : '#fff')};
  border: 1px solid ${(props) => (props.disabled ? 'var(--buttonDisable)' : '#fff')};
  border-radius: 10px;
  margin-left: 3px;
  width: 46px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  box-sizing: border-box;
`;
export const FileBox = styled.div`
  width: 30px;
  margin-left: 6px;
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
  font-size: 12px;
  color: var(--buttonDisable);
  font-weight: 500;
`;
export const MyTalk = styled.p`
  width: 220px;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid var(--buttonDisable);
  border-radius: 30px 0px 30px 30px;
  margin: 0px 80px 10px;
  box-sizing: border-box;
  padding: 10px 12px 12px;
  line-height: normal;
  white-space: pre-line;
`;
export const RemoveFile = styled.div`
  button {
    color: red;
    font-size: 12px;
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
    font-size: 12px;
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
  font-size: 14px;
`;
export const UserText = styled.span`
  color: var(--buttonDisable);
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ChatDate = styled.span`
  color: var(--buttonDisable);
  font-size: 10px;
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
