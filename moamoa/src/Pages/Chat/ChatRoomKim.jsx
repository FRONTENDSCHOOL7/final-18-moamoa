import React, { useState } from 'react';
import { Container } from '../../Components/Common/Container';
import styled from 'styled-components';
import HeaderChat from '../../Components/Common/HeaderChat';
import Photo from '../../Components/Common/ChatPhoto';
import img from '../../Assets/images/followImg/fog.jpg';
import iconImageButton from '../../Assets/icons/icon-img-button.svg';
export default function ChatRoomKim() {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    // Send 버튼을 클릭했을 때 실행되는 로직 추가
    if (message.trim() !== '') {
      // 메시지가 비어 있지 않다면 처리
      console.log('Sending message:', message);
      // 여기에서 메시지를 서버로 전송하는 로직을 추가하면 됩니다.
    }
  };
  return (
    <Container>
      <HeaderChat headerText={'양떼목장 김사장'}></HeaderChat>
      <ChatRoom>
        <ChatMessages>
          <div className='talkBox'>
            <Photo src={img} />
            <div>
              <UserName>양떼목장 김사장</UserName>
              <Message>
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈
                따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
              </Message>
            </div>
          </div>
          <div className='talkBox'>
            <Photo src={img} />
            <div>
              <UserName>양떼목장 김사장</UserName>
              <Message>애들이 많이 놀러와~</Message>
            </div>
          </div>
          <MyTalk>
            옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈
            따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
          </MyTalk>
        </ChatMessages>
        <InputArea>
          <FileBox>
            <label htmlFor='file'>
              <img src={iconImageButton} alt='이미지 첨부' className='fileImg' />
            </label>
            <FileInput type='file' id='file' accept='image/*' />
          </FileBox>
          <MessageInput
            type='text'
            placeholder='메시지 입력하기...'
            value={message}
            onChange={handleInputChange}
          />
          <SendButton onClick={handleSendClick} disabled={message.trim() === ''}>
            전송
          </SendButton>
        </InputArea>
      </ChatRoom>
    </Container>
  );
}
const ChatRoom = styled.div`
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

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Message = styled.div`
  width: 220px;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 0px 30px 30px 30px;
  margin: 0px 10px 10px;
  padding: 10px 12px 12px;
  line-height: normal;
  box-sizing: border-box;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  background-color: #ffffff;
`;

const MessageInput = styled.input`
  width: 60%;

  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
`;

const SendButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#fff' : '#87B7E4')};
  color: ${(props) => (props.disabled ? '#c4c4c4' : '#fff')};
  border: 1px solid ${(props) => (props.disabled ? '#c4c4c4' : '#fff')};
  border-radius: 10px;
  margin-left: 3px;
  width: 46px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
`;
const FileBox = styled.div`
  margin-left: 6px;
  .fileImg {
    cursor: pointer;
  }
`;
const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const UserName = styled.h2`
  display: block;
  margin-left: 8px;
  margin-bottom: 5px;
  font-size: 12px;
  color: gray;
  font-weight: 500;
`;
const MyTalk = styled.p`
  width: 220px;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 30px 0px 30px 30px;
  margin: 0px 80px 10px;
  box-sizing: border-box;
  padding: 10px 12px 12px;
  line-height: normal;
`;
