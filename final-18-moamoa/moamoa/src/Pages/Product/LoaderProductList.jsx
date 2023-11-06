import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '../../Components/Common/Container';

const spin = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const SpinnerDiv = styled.div`
  left: 190px;
  top: 48px;
  position: absolute;
  animation: ${spin} linear 1s infinite;
  background: #767676;
  width: 12px;
  height: 24px;
  border-radius: 6px / 12px;
  transform-origin: 6px 52px;
  margin: 0 auto;

  &:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.9166666666666666s;
    background: #767676;
  }
  &:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.8333333333333334s;
    background: #767676;
  }
  &:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
    background: #767676;
  }
  &:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.6666666666666666s;
    background: #767676;
  }
  &:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.5833333333333334s;
    background: #767676;
  }
  &:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
    background: #767676;
  }
  &:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.4166666666666667s;
    background: #767676;
  }
  &:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.3333333333333333s;
    background: #767676;
  }
  &:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
    background: #767676;
  }
  &:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.16666666666666666s;
    background: #767676;
  }
  &:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.08333333333333333s;
    background: #767676;
  }
  &:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    background: #767676;
  }
`;

const LoaderProductList = () => {
  return (
    <Container>
      <Spinner>
        {[...Array(12)].map((_, index) => (
          <SpinnerDiv key={index}></SpinnerDiv>
        ))}
      </Spinner>
    </Container>
  );
};

export default LoaderProductList;
