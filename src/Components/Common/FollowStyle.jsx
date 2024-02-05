import styled from 'styled-components';

export const FollowWrap = styled.li`
  width: 358px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  Button {
    font-size: 12px;
    font-weight: bold;
    margin-left: 80px;
  }
  @media (min-width: 768px) {
    width: 480px;
    margin-left: 120px;
    padding: 0px 0px 16px 0px;
  }
  @media (min-width: 1200px) {
    margin-left: -200px;
  }
`;
export const UserPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
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
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const UserId = styled.h2`
  font-size: 14px;
`;
export const UserText = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
