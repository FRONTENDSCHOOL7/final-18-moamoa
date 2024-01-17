import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import monomoa from '../../Assets/images/mono_moa.png'
import styled from 'styled-components';

FestaMap.propTypes = {
  festaName: PropTypes.string
}


const { kakao } = window;

export default function FestaMap({festaName}) {

  const [showMap, setShowMap] = useState(true)

  useEffect(()=>{

    const container = document.getElementById('map'); 
    //지도를 담을 영역의 DOM 레퍼런스 (지도를 표시할 div )
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), 
      //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
  
    // 지도를 생성합니다    
    const map = new kakao.maps.Map(container, options); 

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 주소-좌표간 변환 서비스 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          for (let i=0; i<result.length; i++) {
              displayMarker(result[i]);    
              bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
          }       
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
      } 
      if (status !== kakao.maps.services.Status.OK) {
        setShowMap(false);
      }
    }

geocoder.addressSearch(festaName, callback);

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  },[])


  return (
    <>
      { showMap ?
      <Map>
        <FestivalDesc>{festaName}</FestivalDesc>
        <div id="map" style={{width:'358px',height:'300px'}}></div>
      </Map> : 
      <NotMap>
        <MonoImg src={monomoa} alt="모아모아 캐릭터" />
        <FestivalDesc>지도를 불러오지 못했습니다.</FestivalDesc>
      </NotMap>
      }
    </>
  )
}

const Map = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FestivalDesc = styled.p`
  font-size: 1.4rem;
  padding: 0 1.8rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  color: #767676;
`;

const MonoImg =styled.img`
  width: 8rem;
  margin: -1rem 0 3rem;
`;