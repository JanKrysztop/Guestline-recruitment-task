import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Slides from './Slides';
import { Image } from './Slides';

interface RoomData {
  id: string;
  name: string;
  occupancy: Occupancy;
  longDescription: string;
}

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

interface Occupancy {
  maxAdults: number;
  maxChildren: number;
}

const Hotel = (props: Props) => {
  const [roomList, setRoomList] = useState<RoomData[]>([]);

  useEffect(() => {
    fetchRoomData();
    console.log(roomList);
  }, []);

  const fetchRoomData = () => {
    fetch(
      `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${props.hotel.id}`
    )
      .then((response) => response.json())
      .then((data) => setRoomList(data.rooms));
  };

  const filteredRooms = roomList
    .filter(
      ({ occupancy }) =>
        occupancy.maxAdults >= props.adultsCount &&
        occupancy.maxChildren >= props.childrenCount
    )
    .map((room) => (
      <StyledBottom key={room.id}>
        <StyledRoom>
          <h4>{room.name}</h4>
          <h5>Adults: {room.occupancy.maxAdults}</h5>
          <h5>Children: {room.occupancy.maxChildren}</h5>
        </StyledRoom>
        <StyledDescription>{room.longDescription}</StyledDescription>
      </StyledBottom>
    ));

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
      {filteredRooms}
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

// const StyledImages = styled.div`
//   position: relative;
//   width: 200px;
//   height: 200px;
//   display: flex;
//   border: 1px solid black;
//   img {
//     width: 100%;
//     height: 100%;
//   }
// `;

const StyledName = styled.div`
  padding-left: 10px;
  font-size: 40px;
  h3 {
    margin-top: 20px;
    font-size: 30px;
  }
`;

const StyledBottom = styled.div`
  display: flex;
  border: 1px solid black;
`;

const StyledRoom = styled.div`
  width: 150px;
  margin: 20px;
  padding-right: 20px;
  h4 {
    margin-bottom: 10px;
    font-weight: bold;
  }
  h5 {
    margin-bottom: 5px;
  }
`;

const StyledDescription = styled.p`
  width: 100%;
  margin: 10px;
`;
