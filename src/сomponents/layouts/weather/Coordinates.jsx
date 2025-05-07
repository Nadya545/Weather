import React, { useState } from "react";
import { fetchСoordinates } from "../../../Api/Api";
import Button from "../../../UI/button/Button";

const Coordinates = ({ setLocation, setLoading }) => {
  const [city, setCity] = useState("");

  async function handleCoordinates(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const coordinates = await fetchСoordinates(city); //получаю в консоли города по названию в инпуте
      console.log(coordinates);

      if (coordinates && coordinates[0].lat && coordinates[0].lon) {
        setLocation({
          lat: coordinates[0].lat,
          lon: coordinates[0].lon,
          name: coordinates[0].name,
        });
        console.log(
          coordinates[0].lat,
          coordinates[0].lon,
          coordinates[0].name
        ); // вытаскиваю широту и долготу и передаю в стейт с помощью setLocation
      }
    } catch (err) {
      console.error("Ошибка при получении координат", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="coordinate-form">
        <input
          className="coordinate-input"
          type="text"
          placeholder="  Ваш город"
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
    </>
  );
};

export default Coordinates;
