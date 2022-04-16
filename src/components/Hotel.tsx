import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Slides from './Slides';
import { Image } from './Slides';
import Rooms from './Rooms';

export interface HotelData {
  id: string;
  images: Image[];
  name: string;
  address1: string;
  address2: string;
  starRating: string;
}

interface Props {
  hotel: HotelData;
  adultsCount: number;
  childrenCount: number;
}

const Hotel = (props: Props) => {
  return (
    <StyledHotel>
      <StyledTop>
        <Slides images={props.hotel.images} />
        <StyledName>
          <h2>{props.hotel.name}</h2>
          <h3>{props.hotel.address1}</h3>
          <h3>{props.hotel.address2}</h3>
        </StyledName>
        <Rating
          name="read-only"
          value={parseInt(props.hotel.starRating)}
          readOnly
          sx={{ marginLeft: 'auto', fontSize: '40px' }}
        />
      </StyledTop>
      <Rooms
        id={props.hotel.id}
        adultsCount={props.adultsCount}
        childrenCount={props.childrenCount}
      />
    </StyledHotel>
  );
};

export default Hotel;

const StyledHotel = styled.div`
  margin: 20px 200px;
  border: 1px solid black;
`;

const StyledTop = styled.div`
  padding: 25px;
  display: flex;
  border: solid 1px black;
  .left-arrow {
    position: absolute;
    top: 42%;
    left: 1px;
    font-size: 40px;
    color: white;
    z-index: 100;
    cursor: pointer;
    user-select: none;
  }
  .right-arrow {
    position: absolute;
    top: 42%;
    right: 1px;
    font-size: 40px;
    color: white;
    z-index: 100;
    cursor: pointer;
    user-select: none;
  }
`;

const StyledName = styled.div`
  padding-left: 10px;
  font-size: 40px;
  h3 {
    margin-top: 20px;
    font-size: 30px;
  }
`;
