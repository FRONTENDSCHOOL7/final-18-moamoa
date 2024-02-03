/*
  설명: 프로필 상세 페이지 컴포넌트에 사용된 css
  작성자: 이해지
  최초 작성 날짜: 2023.02.02
  마지막 수정 날까: 2023.02.03
*/

import styled from 'styled-components';

//PostCount
export const PostCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 5.4rem;

  p {
    font-size: 1.8rem; // 여기에서 텍스트 사이즈를 10px로 변경합니다.
  }

  p:last-child {
    font-size: 1.2rem; // 첫 번째 p 태그 (게시글 수 숫자)는 기존대로 유지합니다.
    color: #767676;
  }
`;

//ProfileDetail
export const ProfileDetailBox = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
`;

export const ProfileImg = styled.div`
  background: linear-gradient(to bottom, #ffc700 50%, #ffc700 calc(30% + 65px), transparent 50%);
  padding-top: 65px;
  padding-left: 20px;

  img {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    border: 5px solid #fff;
    background: #fff;

    @media (min-width: 1200px) {
      display: flex;
      margin: 0 auto;

      width: 120px;
      height: 120px;
    }
  }

  @media (min-width: 768px) {
    background: linear-gradient(
      to bottom,
      rgba(255, 199, 0, 0) 0%,
      #ffc700 calc(30% + 65px),
      white calc(30% + 65px),
      white 100%
    );
  }
  @media (min-width: 1200px) {
    background: none;
    padding: 0px;
  }
`;

export const ProfileInfo = styled.div`
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    color: #767676;
    font-size: 1.2rem;
  }

  p:first-child {
    color: #000;
    font-size: 1.6rem;
    margin-bottom: 0.3rem;
  }

  .profile-intro {
    font-size: 1.4rem;
  }

  div {
    p:first-child {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }

  @media (min-width: 1200px) {
    div {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
    }
    p {
      margin: 0 auto;
    }
    margin-bottom: 35px;
  }
`;

export const CountWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 14px 0;
  text-align: center;

  p {
    font-size: 1.8rem;
  }

  button {
    width: 5.4rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    p: last-child {
      font-size: 1.2rem;
      color: #767676;
    }
  }

  span {
    display: inline-block;
    width: 0.5px;
    height: 22px;
    background-color: #e3e3e3;
  }

  @media (min-width: 1200px) {
    justify-content: space-around;
    padding: 1.6rem 0;
    span {
      display: none;
    }
  }
`;

//ProfileDetailPost
export const PostListBox = styled.div`
  background-color: #fff;
  padding: 0;

  .emptyItem {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    padding-top: 200px;
    color: #2e2c39;
  }
`;

export const BtnIcons = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'view',
})`
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: end;
  padding: 9px 16px 9px;
  gap: 9px;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .btn-postlist img {
    filter: ${(props) => (props.view === 'PostImgList' ? 'grayscale(100%)' : 'none')};
    opacity: ${(props) => (props.view === 'PostImgList' ? '0.3' : '1')};
  }

  .btn-postimglist img {
    filter: ${(props) => (props.view === 'PostList' ? 'grayscale(100%)' : 'none')};
    opacity: ${(props) => (props.view === 'PostList' ? '0.3' : '1')};
  }
`;

export const HamView = styled.div`
  display: flex;
  justify-content: center;

  ul {
    li {
      min-width: 358px;
      @media (min-width: 768px) {
        min-width: 480px;
      }
    }
    li:first-child {
      margin-top: 1.5rem;
    }
    li:last-child {
      margin-bottom: 8.5rem;
      @media (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }
`;

export const BenView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1.6rem;
  padding-bottom: 6rem;

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
    margin: 0;
    list-style: none;

    gap: 1.1rem;
  }

  img {
    vertical-align: top;
    width: 100%;
    height: 11rem;
    object-fit: cover;
  }
  @media (min-width: 768px) {
    padding-bottom: 0;
    margin-bottom: 2rem;
  }
`;

// ProfileDetailProduct
export const ProductItro = styled.div`
  padding: 16px;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  h2 {
    color: #000;
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
`;

export const ProfileProductWrapper = styled.div`
  position: relative;
  width: 100%;

  .emptyItem {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    padding-bottom: 16px;
    color: #2e2c39;
  }
`;

export const ProfileProduct = styled.div`
  display: flex;
  overflow-x: auto; // 가로 스크롤바를 추가
  overflow-y: hidden; // 세로 스크롤바는 숨김

  position: relative;
  padding-bottom: 10px;

  /* 스크롤바 스타일 적용 */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #767676; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #2e2c39;
  }

  &::-webkit-scrollbar-track {
    background: none; /*스크롤바 뒷 배경 색상*/
  }
`;

export const MoveBtn = styled.div`
  position: absolute;
  top: 30%; // 버튼을 부모 컨테이너의 수직 중앙에 위치시킵니다.

  z-index: 10; // 다른 요소들 위에 오도록 z-index 설정

  display: flex;
  justify-content: space-between;
  width: 100%;

  pointer-events: none;
  cursor: pointer;

  button.left-btn {
    left: 0;
  }

  button.right-btn {
    right: 0;
  }

  button {
    position: absolute;
    pointer-events: auto; // 버튼만 클릭 가능하도록 설정
  }

  img {
    width: 2.1rem;
    height: 3rem;
  }
`;

export const ProductListBox = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  p:last-child {
    color: #87b7e4;
  }

  @media (min-width: 768px) {
    gap: 3rem;
  }
`;

export const ProductBox = styled.ul`
  max-width: 172px;
  margin: 0;
  cursor: pointer;

  Img {
    width: 172px;
    height: 110px;

    @media (min-width: 768px) {
      width: 191px;
      height: 122px;
    }
  }

  .itemName {
    font-size: 1.4rem;
    margin: 12px 0 6px 4px;
    font-weight: 500;
  }

  p.itemDate {
    margin-left: 4px;
    color: #2e2c39;
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

//FollowButton
export const FollowBtn = styled.div`
  button {
    width: 12rem;
    padding: 8px 23px;
    border-radius: 30px;
    font-size: 1.4rem;
    font-weight: 700;
    color: #767676;
    background-color: #2e2c39;
    border: 1px solid #2e2c39;
  }

  p {
    color: #fff;
  }

  &.followed button {
    background-color: #fff;
    border-color: #767676;
  }

  &.followed p {
    color: #767676;
  }

  @media (min-width: 1200px) {
    position: relative;
    margin: 0 45px;
    z-index: 10;
  }
`;
