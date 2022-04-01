import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
const StyledContainer = styled.div`
  margin: 30px auto;
  height: 50px;
  width: 660px;
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const Filters = (props) => {
  return (
    <>
      <StyledContainer>
        <Rating
          name="simple-controlled"
          value={props.value}
          onChange={(event, newValue) => {
            props.setValue(newValue);
          }}
          sx={{ fontSize: '40px' }}
        />
        <div></div>
      </StyledContainer>
    </>
  );
};

export default Filters;
