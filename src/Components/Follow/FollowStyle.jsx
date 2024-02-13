import styled from 'styled-components';
import Button from '../Button/Button';

export const FollowWrap = styled.li`
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  Button {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 8rem;
  }
  @media (min-width: 768px) {
    Button {
      width: 5.6rem;
    }
    margin-left: 120px;
    padding: 0px 0px 16px 0px;
  }
  @media (min-width: 1200px) {
  }
`;
export const FollowButton = styled(Button)`
  background-color: red;
`;

export const UserPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;
export const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const UserInfo = styled.div`
  margin-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const UserId = styled.h2`
  font-size: 1.4rem;
`;
export const UserText = styled.span`
  color: #767676;
  font-size: 12px;
  width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
