import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

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
          sx={{ fontSize: '40px', padding: '0 25px' }}
        />
        <StyledCounters>
          <StyledSingle>
            <p>Adults:</p>
            <StyledButton
              onClick={() => props.setAdultsCount(props.adultsCount + 1)}
            >
              +
            </StyledButton>
            {props.adultsCount}
            <StyledButton
              onClick={() => {
                if (props.adultsCount > 0) {
                  props.setAdultsCount(props.adultsCount - 1);
                }
              }}
            >
              -
            </StyledButton>
          </StyledSingle>
          <StyledSingle>
            <p>Children:</p>
            <StyledButton
              onClick={() => props.setChildrenCount(props.childrenCount + 1)}
            >
              +
            </StyledButton>
            {props.childrenCount}
            <StyledButton
              onClick={() => {
                if (props.childrenCount > 0) {
                  props.setChildrenCount(props.childrenCount - 1);
                }
              }}
            >
              -
            </StyledButton>
          </StyledSingle>
        </StyledCounters>
      </StyledContainer>
    </>
  );
};

export default Filters;

const StyledContainer = styled.div`
  margin: 30px auto;
  height: 50px;
  width: 660px;
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const StyledCounters = styled.div`
  display: flex;
  font-size: 20px;
`;

const StyledSingle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  align-items: center;
`;
