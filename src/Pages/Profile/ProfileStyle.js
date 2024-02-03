/*
  설명: 프로필 상세 페이지에 사용된 css
  작성자: 이해지
  최초 작성 날짜: 2023.02.02
  마지막 수정 날까: 2023.02.03
*/

import styled from 'styled-components';

export const ProfileWrap = styled.div`
  background-color: #fff;

  @media (min-width: 768px) {
    margin-left: calc(120px + (100% - 768px) / 2);
    margin-right: calc(120px + (100% - 1020px) / 2);
  }

  @media (min-width: 1200px) {
    min-width: 648px;
    margin-left: calc(240px + (100% - 1020px) / 2);
  }
`;

export const ProfileTop = styled.div`
  position: relative;
  margin-top: 48px;
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;

export const Btns = styled.div`
  position: absolute;
  top: 128px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (min-width: 1200px) {
    position: absolute;
    flex-direction: row;
    top: 214px;
    right: 50%;
    transform: translateX(50%);
  }
`;

export const MyProfileBtn = styled.button`
  width: 12rem;
  padding: 8px 23px;
  border: 1px solid #767676;
  border-radius: 30px;
  font-size: 1.4rem;
  font-weight: 700;

  color: #767676;
`;

export const CircleBtn = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  @media (min-width: 1200px) {
    position: absolute;
    width: 234px;
    justify-content: space-between;
  }
`;
