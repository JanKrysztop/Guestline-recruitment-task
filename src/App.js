import { useState, useEffect } from 'react';
import Hotel from './components/Hotel';

function App() {
  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    fetchApiData();
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
      {hotelList.map((hotel) => (
        <Hotel
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          description={hotel.description}
        />
      ))}
    </>
  );
}

export default App;
