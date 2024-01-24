// import { css } from "styled-components";

const sizes = {
  large: 120,
  mideum: 76.8,
  small: 39,
};

// const media = Object.entries(sizes).reduce((acc, [key, value]) => {
//   return {
//     ...acc,
//     [key]: function (first, ...interpolations) {
//       return css`
//         @media screen and (max-width: ${value}rem) {
//           ${css(first, ...interpolations)}
//         }
//       `;
//     },
//   };
// }, {});

export { sizes };