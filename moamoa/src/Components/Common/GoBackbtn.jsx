import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconGoBack from '../../Assets/icons/icon-arrow-left.svg';

export default function Gobackbtn() {
  const navigate = useNavigate();
  console.log(navigate);
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <a onClick={handleGoBack}>
        <img src={iconGoBack} />
      </a>
    </div>
  );
}
