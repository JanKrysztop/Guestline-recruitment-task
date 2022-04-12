import React from 'react';
import { Reset } from 'styled-reset';
import { useState, useEffect } from 'react';
import Hotel from './components/Hotel';
import Filters from './components/Filters';

interface HotelList {
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  id: string;
  images: string[];
}

const App = () => {
  const [hotelList, setHotelList] = useState<HotelList[]>([]);
  const [starValue, setStarValue] = useState<null | number>(0);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    fetchApiData();
    console.log(hotelList);
  }, []);

  const fetchApiData = () => {
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      .then((response) => response.json())
      .then((json) => setHotelList(json));
  };

  const filteredHotel = hotelList
    .filter(({ starRating }) => parseInt(starRating) >= starValue!)
    .map((hotel) => (
      <Hotel
        key={hotel.id}
        id={hotel.id}
        image={hotel.images}
        name={hotel.name}
        address1={hotel.address1}
        address2={hotel.address2}
        rating={hotel.starRating}
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
      {filteredHotel}
    </>
  );
};

export default App;
