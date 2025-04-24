import React, { useState } from "react";
import { fetchСoordinates } from "../../../Api/Api";
import Button from "../../../UI/button/Button";
import Calendar from "../calendar/Calendar";

const Coordinates = () => {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  async function handleCoordinates(event) {
    event.preventDefault();

    try {
      const coordinates = await fetchСoordinates(city);
      console.log(coordinates);

      if (coordinates && coordinates[0].lat && coordinates[0].lon) {
        setLat(coordinates[0].lat);
        setLon(coordinates[0].lon);

        console.log(coordinates[0].lat, coordinates[0].lon);
        return { lat: coordinates[0].lat, lon: coordinates[0].lon };
      }
    } catch (err) {
      console.error("Ошибка при получении координат", err);
    }
  }

  return (
    <>
      <form className="coordinate-form">
        <input
          className="coordinate-input"
          type="text"
          placeholder="Ваш город"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        ></input>
        <Button
          className="coordinate-btn"
          type="submit"
          onClick={handleCoordinates}
        >
          узнать
        </Button>
      </form>
      <Calendar handleCoordinates={handleCoordinates} />
    </>
  );
};

export default Coordinates;
