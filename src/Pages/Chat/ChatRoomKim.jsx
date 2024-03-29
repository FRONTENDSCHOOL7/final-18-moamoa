import React, { useLayoutEffect, useRef, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import Header from '../../Components/Header/Header';
import Photo from '../../Components/Chat/ChatPhoto';
import img from '../../Assets/images/followImg/fog.jpg';
import iconImageButton from '../../Assets/icons/icon-img-button.svg';
import NavBar from '../../Components/Common/NavBar';
import RecommendPlace from '../../Components/Common/RecommendPlace';
import Myfollowings from '../../Components/Follow/Myfollowings';

import {
  ChatRoom,
  ChatMessages,
  UserName,
  Message,
  MyTalk,
  RemoveFile,
  InputArea,
  FileBox,
  FileInput,
  MessageInput,
  SendButton,
  ChatRoomWrap,
  SendMsg,
} from './ChatStyle';
export default function ChatRoomKim() {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [ButtonActive, setButtonActive] = useState(false);
  const fileInputRef = useRef(null);
  const [sendMsg, setSendMsg] = useState([]);
  const bottomRef = useRef(null);
  const [scrollDown, setScrollDown] = useState(false);
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      const newMessage = message;
      const updatedSendMsg = [...sendMsg, newMessage];
      setScrollDown(true);
      setSendMsg(updatedSendMsg);
      setMessage('');
    }
  };
  useLayoutEffect(() => {
    if (scrollDown) {
      bottomRef.current.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      setScrollDown(false);
    }
  }, [scrollDown]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setButtonActive(true);
    } else {
      setFile(null);
      setButtonActive(false);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
    setButtonActive(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <Container>
      <Header type='chatFixedUser'></Header>
      <ChatRoomWrap>
        <ChatRoom>
          <ChatMessages ref={bottomRef}>
            <div className='talkBox'>
              <Photo src={img} />
              <div>
                <UserName>양떼목장 김사장</UserName>
                <Message>
                  옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의
                  뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
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
            <SendMsg>
              {sendMsg.map((msg, index) => (
                <MyTalk key={index}>{msg}</MyTalk>
              ))}
            </SendMsg>
          </ChatMessages>
          {file && (
            <RemoveFile>
              <button onClick={handleRemoveFile}>파일 삭제</button>
              <p className='removeFileName'>{file.name.slice(0, 8)}</p>
            </RemoveFile>
          )}
          <InputArea>
            <FileBox>
              <label htmlFor='file'>
                <img src={iconImageButton} alt='이미지 첨부' className='fileImg' />
              </label>
              <FileInput
                type='file'
                id='file'
                accept='image/*'
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </FileBox>
            <MessageInput
              type='text'
              placeholder='메시지 입력하기...'
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <SendButton onClick={handleSendClick} disabled={message.trim() === '' && !ButtonActive}>
              전송
            </SendButton>
          </InputArea>
        </ChatRoom>
        <div className='Recommend'>
          <RecommendPlace />
          <Myfollowings />
        </div>
      </ChatRoomWrap>
      <div className='large-scree'>
        <NavBar />
      </div>
    </Container>
  );
}
