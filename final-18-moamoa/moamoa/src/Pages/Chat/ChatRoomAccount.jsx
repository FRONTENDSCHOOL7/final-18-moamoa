import React, { useLayoutEffect, useRef, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import Header from '../../Components/Common/Header/Header';

import iconImageButton from '../../Assets/icons/icon-img-button.svg';
import { useParams } from 'react-router-dom';
import {
  ChatRoom,
  ChatMessages,
  MyTalk,
  RemoveFile,
  InputArea,
  FileBox,
  FileInput,
  MessageInput,
  SendButton,
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
  const { chatUserName } = useParams();
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
      console.log(setFile(e.target.files[0]));
      setButtonActive(true);
    } else {
      setFile(null);
      setButtonActive(false);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      console.log('test:', fileInputRef);
    }
    setFile(null);
    setButtonActive(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendClick();
    }
  };

  console.log(chatUserName);
  return (
    <Container>
      <Header type='chatChangeUser'></Header>
      <ChatRoom>
        <ChatMessages ref={bottomRef}>
          {sendMsg.map((msg, index) => (
            <MyTalk key={index}>{msg}</MyTalk>
          ))}
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
    </Container>
  );
}