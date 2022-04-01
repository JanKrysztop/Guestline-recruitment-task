import { Reset } from 'styled-reset';
import { useState, useEffect } from 'react';
import Hotel from './components/Hotel';
import Filters from './components/Filters';

function App() {
  const [hotelList, setHotelList] = useState([]);
  const [starValue, setStarValue] = useState(0);

  useEffect(() => {
    fetchApiData();
  }, []);
  console.log(starValue);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  const filtered = hotelList
    .filter(({ starRating }) => starRating >= starValue)
    .map((hotel) => (
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
    ));

  return (
    <>
      1
      <Reset />
      <Filters value={starValue} setValue={setStarValue} />
      {filtered}
    </>
  );
}

export default App;
