import { useState, useEffect } from 'react';

const Hotel = (props) => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = () => {
    fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${props.id}`)
      .then((response) => response.json())
      .then((data) => setRoomList(data));
  };

  console.log(roomList);
  return (
    <>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
    </>
  );
};

export default Hotel;
