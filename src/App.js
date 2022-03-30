import { useState, useEffect } from 'react';

function App() {
  const [hotelList, setHotelList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    // console.log(hotelList);
    fetchApiData();
    fetchRoomsData();
  }, []);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  const hotelId = hotelList.map(({ id }) => id);
  // console.log(hotelId);

  const fetchRoomsData = () => {
    for (let roomId of hotelId) {
      // console.log(roomId);
      fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${roomId}`)
        .then((response) => response.json())
        .then((data) => setRoomList(data));
      // .then(() => setRoomList(roomList.push(currentRoom)));
    }
  };
  console.log(roomList);

  return (
    <>
      {hotelList.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
