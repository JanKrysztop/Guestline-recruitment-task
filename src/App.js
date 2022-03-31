import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hotel from './components/Hotel';

const StyledWrapper = styled.div`
  margin: 0 auto;
`;

function App() {
  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    fetchApiData();
    console.log(hotelList);
  }, []);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  const hotelId = hotelList.map(({ id }) => id);
  // console.log(hotelId);

  // const fetchRoomsData = () => {
  //   for (let roomId of hotelId) {
  //     // console.log(roomId);
  //     fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${roomId}`)
  //       .then((response) => response.json())
  //       .then((data) => setRoomList(data));
  //     // .then(() => setRoomList(roomList.push(currentRoom)));
  //   }
  // };

  return (
    <>
      1232
      {hotelList.map((hotel) => (
        <Hotel
          key={hotel.id}
          id={hotel.id}
          image={hotel.images}
          name={hotel.name}
          address1={hotel.address1}
          address2={hotel.address2}
          rating={hotel.starRating}
          description={hotel.description}
        />
      ))}
    </>
  );
}

export default App;
