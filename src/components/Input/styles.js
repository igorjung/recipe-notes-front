import styled from 'styled-components';

export const Container = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  padding-right: 15px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  background-color: #ddd;

  button {
    height: 40px;
    width: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;
