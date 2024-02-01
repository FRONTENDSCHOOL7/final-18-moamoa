import styled from 'styled-components';
import commentBg from '../../Assets/icons/message-circle.svg';

export const NavbarCont = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`

export const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 39rem;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    max-width: 600px;
    padding-left: 120px;
  }
  @media (min-width: 1200px) {
    max-width: 720px;
    padding-left: 240px;
  }
`;
export const PostItemContainer = styled.div`
  padding: 64px 1.6rem 0 1.5rem;
  li {
    article {
      margin-top: 0;
    }
  }
  @media (min-width: 768px) {
    padding: 80px 0 0 0;
  }
`;

export const PostArticle = styled.article`
  /* margin-bottom: 3rem; */
`;
export const Frofile = styled.div`
  margin: 0 auto;
  height: 4.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostFooterContainer = styled.div`
  margin: 1.5rem 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CreateDate = styled.p`
  font-size: 1rem;
  color: #767676;
`;

export const HeartBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'heartcolor',
})`
  padding-left: 2.6rem;
  padding-right: 1.6rem;
  height: 2rem;
  color: #767676;
  background: url(${(props) => props.heartcolor}) 0.2rem no-repeat;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background: url(${(props) => props.heartcolor}) 0.2rem no-repeat;
  }
`;

export const CommentBtn = styled.button`
  height: 2rem;
  padding-left: 2.3rem;
  color: #767676;
  &:link {
    color: #767676;
  }
  &:hover {
    cursor: pointer;
  }
  background: url(${commentBg}) 0.2rem no-repeat;
  background-position-x: -0.1rem;
`;
