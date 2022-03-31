import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';

const StyledHotel = styled.div`
  margin: 20px 200px;
  border: 1px solid black;
`;

const StyledTop = styled.div`
  padding: 25px;
  display: flex;
  border-bottom: solid 1px black;
`;

const StyledImages = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;

const StyledName = styled.div`
  padding-left: 10px;
  font-size: 20px;
`;

const StyledBottom = styled.div`
  display: flex;
  border: 1px solid black;
`;

const Hotel = (props) => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchRoomData();
    console.log(roomList);
  }, []);

  const fetchRoomData = () => {
    fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${props.id}`)
      .then((response) => response.json())
      .then((data) => setRoomList(data.rooms));
  };

  return (
    <StyledHotel>
      <StyledTop>
        {props.image.map((img) => (
          <StyledImages>
            <img
              src={img.url}
              alt="hotel image"
              style={{ width: '100%', height: '100%' }}
            />
          </StyledImages>
        ))}
        <StyledName>
          <h2 style={{ marginTop: '0' }}>{props.name}</h2>
          <h3>{props.address1}</h3>
          <h3>{props.address2}</h3>
        </StyledName>
        <Rating
          name="read-only"
          value={props.rating}
          readOnly
          sx={{ marginLeft: 'auto', fontSize: '40px' }}
        />
      </StyledTop>
      {roomList.map((room) => (
        <StyledBottom key={room.id}>
          <div>
            <h4>{room.name}</h4>
            <h5>Adults: {room.occupancy.maxAdults}</h5>
            <h5>Children: {room.occupancy.maxChildren}</h5>
          </div>
          <p>{room.longDescription}</p>
        </StyledBottom>
      ))}
    </StyledHotel>
  );
};

export default Hotel;
