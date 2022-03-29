import { useState, useEffect } from 'react';

function App() {
  const [hotelList, setHotelList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchApiData();
    // fetchRoomData();
    // console.log(hotelList);
  }, []);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  // const fetchRoomData = () => {
  //   fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`)
  //     .then((response) => response.json())
  //     .then((json) => setRoomList(json));
  // };

  const hotelId = hotelList.map(({ id }) => ({ id }));
  console.log(hotelId);

  return (
    <>
      {hotelList.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
          {/* {hotelId.map((link) => (
            <div>{link.id}</div>
          ))} */}
        </div>
      ))}
    </>
  );
}

export default App;
