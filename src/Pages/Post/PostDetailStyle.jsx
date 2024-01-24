import styled from 'styled-components';
import commentBg from '../../Assets/icons/message-circle.svg';

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
`;
export const PostItemContainer = styled.div`
  padding: 0 1.6rem 1.5rem;
  padding-top: 64px;
  li {
    article {
      margin-top: 0;
    }
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
