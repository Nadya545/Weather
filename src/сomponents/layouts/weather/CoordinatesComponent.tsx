import React, { useState } from "react";
import { fetchСoordinates } from "../../../Api/Api";
import Button from "../../../UI/button/Button";

interface CoordinatesProps {
  setLocation: (coordinates: Coordinates) => void;
  setLoading: (loading: boolean) => void;
}

interface Coordinates {
  lat: string;
  lon: string;
  name: string;
}

const CoordinatesComponent: React.FC<CoordinatesProps> = ({
  setLocation,
  setLoading,
}) => {
  const [city, setCity] = useState("");

  async function handleCoordinates(event: React.FormEvent<HTMLFormElement>) {
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
      <form className="coordinate-form" onSubmit={handleCoordinates}>
        <input
          className="coordinate-input"
          type="text"
          placeholder="  Введите ваш город..."
          onChange={(event) => {
            setCity(event.target.value);
          }}
        ></input>
        <Button className="coordinate-btn" type="submit">
          🔍
        </Button>
      </form>
    </>
  );
};

export default CoordinatesComponent;
