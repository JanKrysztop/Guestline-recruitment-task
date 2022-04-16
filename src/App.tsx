import { Reset } from 'styled-reset';
import { useState, useEffect } from 'react';
import Hotel from './components/Hotel';
import Filters from './components/Filters';
import { HotelData } from './components/Hotel';

const App = () => {
  const [hotelList, setHotelList] = useState<HotelData[]>([]);
  const [starValue, setStarValue] = useState<null | number>(0);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  const filteredHotels = hotelList
    .filter(({ starRating }) => parseInt(starRating) >= starValue!)
    .map((hotel) => (
      <Hotel
        key={hotel.id}
        hotel={hotel}
        adultsCount={adultsCount}
        childrenCount={childrenCount}
      />
    ));

  return (
    <>
      <Reset />
      <Filters
        value={starValue}
        setValue={setStarValue}
        adultsCount={adultsCount}
        setAdultsCount={setAdultsCount}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
      />
      {filteredHotels}
    </>
  );
};

export default App;
