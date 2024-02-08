import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .block {
    display: flex;
    align-items: center;
  }
  .userInfoSkeleton {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    gap: 6px;
  }
  .photoSkeleton {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .idSkeleton {
    width: 120px;
    height: 12px;
  }
  .introSkeleton {
    width: 150px;
    height: 12px;
  }
`;

export const SearchResultBox = styled.li`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const SearchPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;
export const SearchImg = styled.img`
  width: 50px;
  height: 50px;
`;
export const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--buttonDisable);
`;
export const UserId = styled.h2`
  font-size: 15px;
`;
export const UserIntro = styled.span`
  color: var(--buttonDisable);
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const NotFoundContainer = styled.div`
  margin-top: 40%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 120px;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    transform: translateX(5%);
    color: var(--buttonDisable);
  }
`;
export const BlueCheck = styled.img`
  padding-left: 0.3rem;
  width: 1.2rem;
`;
export const OfficialContainer = styled.div`
  display: flex;
  align-items: center;
  vertical-align: top;
`;
