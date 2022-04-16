import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface RoomData {
  id: string;
  name: string;
  occupancy: Occupancy;
  longDescription: string;
}

interface Occupancy {
  maxAdults: number;
  maxChildren: number;
}
interface Props {
  id: string;
  adultsCount: number;
  childrenCount: number;
}
const Room = (props: Props) => {
  const [roomList, setRoomList] = useState<RoomData[]>([]);

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = () => {
    fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${props.id}`)
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

  return <>{filteredRooms}</>;
};

export default Room;

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
