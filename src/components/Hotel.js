import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const StyledHotel = styled.div`
  margin: 20px 200px;
  border: 1px solid black;
`;

const StyledTop = styled.div`
  padding: 25px;
  display: flex;
  border-bottom: solid 1px black;
  .left-arrow {
    position: absolute;
    top: 42%;
    left: 1px;
    font-size: 2.5rem;
    color: white;
    z-index: 100;
    cursor: pointer;
    user-select: none;
  }
  .right-arrow {
    position: absolute;
    top: 42%;
    right: 1px;
    font-size: 2.5rem;
    color: white;
    z-index: 100;
    cursor: pointer;
    user-select: none;
  }
`;

const StyledImages = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  border: 1px solid black;
  img {
    width: 100%;
    height: 100%;
    /* object-fit: contain; */
  }
`;

const StyledName = styled.div`
  padding-left: 10px;
  font-size: 40px;
  h3 {
    margin-top: 20px;
    font-size: 30px;
  }
`;

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

const Hotel = (props) => {
  const [roomList, setRoomList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = props.image.length;

  useEffect(() => {
    fetchRoomData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  if (!Array.isArray(props.image) || length <= 0) {
    return null;
  }
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

  return (
    <StyledHotel>
      <StyledTop>
        <StyledImages>
          <IoIosArrowBack className="left-arrow" onClick={prevSlide} />
          {props.image.map((img, index) => {
            return (
              <div
                className={index === currentSlide ? 'slide active' : 'slide'}
                key={index}
              >
                {index === currentSlide && (
                  <img src={img.url} alt="hotel image" />
                )}
              </div>
            );
          })}
          <IoIosArrowForward className="right-arrow" onClick={nextSlide} />
        </StyledImages>
        <StyledName>
          <h2>{props.name}</h2>
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
      {filteredRooms}
    </StyledHotel>
  );
};

export default Hotel;
