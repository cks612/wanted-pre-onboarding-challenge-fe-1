import { css } from "styled-components";
// common CSS
export const display = css`
  display: flex;
  flex-wrap: wrap;
`;

export const commonDisplay = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const commonH1Tag = css`
  width: 100%;
  height: 3em;
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  color: ${({ theme }) => theme.whiteColor};
  box-shadow: 0 0 100px #fff; ;
`;
