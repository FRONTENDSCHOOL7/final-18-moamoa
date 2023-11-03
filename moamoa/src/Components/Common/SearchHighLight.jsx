import React from 'react';
import styled from 'styled-components';

const HighLightColor = styled.span`
  color: royalblue;
`;

export default function highlightText(originalText, highlightedText) {
  if (!highlightedText) return originalText;
  const regex = new RegExp(`(${highlightedText})`, 'gi');
  return originalText.split(regex).map((correct, index) => {
    if (index % 2 === 1) {
      return <HighLightColor key={index}>{correct}</HighLightColor>;
    }
    return correct;
  });
}
