/*
  설명: 사용지 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 2023.10.25
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import joinStateAtom from '../../Recoil/userTypeAtom'; //파일경로 변경 완료
import PostCard from '../../Components/Common/PostCard';

//진행중인 행사
function EventList() {
  const location = useLocation();
  const [eventList, setEventList] = useState([]);
  const token = useRecoilValue(userToken);
  const joinData = useRecoilValue(joinStateAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const getEventList = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();

    setEventList(json.product);
  };

  useEffect(() => {
    getEventList();
  }, []);

  // 판매자일 경우에만 진행중인 행사를 출력
  return joinData.userType === 'organization' ? (
    <article>
      <h2>진행중인 행사</h2>
      {/* <button type='button' onClick={getEventList}> </button> */}
      <section>
        {eventList.map((event) => (
          //
          <div key={event.id}>
            <img src={event.itemImage} alt='Profile' />
            <p>{event.itemName}</p>
            <p>{event.price}</p>
          </div>
        ))}
      </section>
    </article>
  ) : null;
}

// 게시글 수
function PostCnt() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  const joinData = useRecoilValue(joinStateAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const [postCount, setPostCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${userAccountname}/userpost`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      setPostCount(json.post.length);
    };

    const fetchProductCount = async () => {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();

      //판매자 계정이 아닐경우 행사 길이가 0
      joinData.userType === 'organization'
        ? setProductCount(json.product.length)
        : setProductCount(0);
    };

    fetchPostCount();
    fetchProductCount();
  }, [userAccountname, token]);

  return <p>게시글 수 : {postCount + productCount}</p>;
}

// 내 게시글
function PostList() {
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const [myPostList, setMyPostList] = useState([]);

  const postList = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${userAccountname}/userpost`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    setMyPostList(json.post);
  };

  useEffect(() => {
    postList();
  }, []);

  return (
    <ul>
      {myPostList.map((item) => {
        return <PostCard key={item.id} post={item} />;
      })}
      {/* const profileImgUrl =`{postprop.author.image} :: 이렇게 하면 안되는지 물어보기
      이미지가 깨지기 때문에*/}
    </ul>
  );
}

// 팔로우
function Follow() {
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const follow = async () => {
    const res = await fetch(
      //  /profile/:accountname/follow => :accountname부분에 팔로우 할 계정의 accountname을 작성
      `https://api.mandarin.weniv.co.kr/profile/${userAccountname}/follow`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    const json = await res.json();
    console.log(json);
  };

  return follow;
}

// 언팔로우
function UnFollow() {
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const unfollow = async () => {
    const res = await fetch(
      //  /profile/:accountname/follow => :accountname부분에 팔로우 할 계정의 accountname을 작성
      `https://api.mandarin.weniv.co.kr/profile/${userAccountname}/unfollow`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    const json = await res.json();
    console.log(json);
  };
  return unfollow;
}

// 프로필보기
function YourProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  const followAction = Follow();
  const unfollowAction = UnFollow();
  const [isFollow, setIsFollow] = useState(true);

  // 게시글 화면 전환
  const [view, setView] = useState('PostList');

  const token = useRecoilValue(userToken);
  const joinData = useRecoilValue(joinStateAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const getYourinfo = async () => {
    // const accountname = localStorage.getItem('accountname');

    const res = await fetch(`https://api.mandarin.weniv.co.kr/profile/${userAccountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json.profile['isfollow']);

    setProfileImg(json.profile['image']);
    setProfileAccountname(JSON.stringify(json.profile['accountname']));
    setProfileUsername(JSON.stringify(json.profile['username']));
    setProfileIntro(JSON.stringify(json.profile['intro']));
    setProfileFollowerCount(JSON.stringify(json.profile['followerCount']));
    setProfileFollowingCount(JSON.stringify(json.profile['followingCount']));
    setIsFollow(json.profile['isfollow']);
  };

  useEffect(() => {
    getYourinfo(); // 컴포넌트가 마운트될 때 getMyinfo 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 마운트될 때만 실행

  // 팔로우/언팔로우
  const handleFollow = () => {
    if (isFollow === true) {
      //팔로우 상태라면
      unfollowAction(); // 팔로우 상태를 변경합니다.
      setIsFollow(!isFollow);
    } else {
      // 언팔로우 상태라면
      followAction(); // 버튼 클릭시 followAction 함수를 실행합니다.
      setIsFollow(!isFollow); // 팔로우 상태를 변경합니다.
    }
  };

  // 현제 페이지 주소 복사
  function copyURLToClipboard() {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert('페이지 주소가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('주소 복사 실패!: ', err);
      });
  }
  return (
    <div>
      <section>
        <h1>남의 프로필</h1>
        {/* <button type='button' onClick={getYourinfo}>
          내 정보 불러오기
        </button> */}
        <section>
          <img src={profileImg} alt='Profile' />
          <p>
            닉네임: {profileUsername}
            {joinData.userType === 'organization' ? <span>★</span> : ''}
          </p>
          <p>계정 id: {profileAccountname}</p>
          <p>소개글: {profileIntro}</p>
          {/* <p>게시글 수: 행사</p>   */}
          <PostCnt />
          <p>팔로워: {profileFollowerCount}</p>
          <p>팔로잉: {profileFollowingCount}</p>

          {/* 내 계정 페이지 버튼 */}
          <button
            type='button'
            onClick={() => {
              navigate('/profile/edit');
            }}
          >
            프로필 수정
          </button>
          {/* 판매자 계정일 경우 상품등록 버튼 삭제 */}
          {joinData.userType === 'organization' ? (
            <button
              type='button'
              onClick={() => {
                navigate('/product');
              }}
            >
              상품 등록
            </button>
          ) : null}

          {/* 남의 계정 페이지 버튼 */}
          <button onClick={handleFollow}>{isFollow ? <p>언팔로우</p> : <p>팔로우</p>}</button>
          {/* 라우터에 연결되면 채팅방으로 연결 */}
          <button>채팅 버튼</button>
          <button onClick={copyURLToClipboard}>공유 버튼</button>
        </section>
        <EventList />
        <button onClick={() => setView('PostList')}>햄버거 버튼</button>
        <button onClick={() => setView('PostImgList')}>벤토 버튼</button>

        {view === 'PostList' && <PostList />}
        {view === 'PostImgList' && <p>벤토버튼 클릭</p>}
      </section>
    </div>
  );
}

export default YourProfile;
