import React, { useState } from "react";
import { fetchСoordinates } from "../../../api/apiWeather";
import MyButton from "../../../ui/button/MyButton";
import { CoordinatesProps } from "./typeWeather/typeWeather";

const CoordinatesComponent: React.FC<CoordinatesProps> = ({
  setLocation,
  setLoading,
}) => {
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleCoordinates(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const coordinates = await fetchСoordinates(city); //получаю в консоли города по названию в инпуте
      console.log(coordinates);
      if (!coordinates || coordinates.length === 0) {
        throw new Error(
          "Город не найден. Пожалуйста, проверьте название города и попробуйте снова."
        );
      }

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
      const message =
        err instanceof Error ? err.message : "Не удалось получить координаты";
      setErrorMessage(message);
      console.error("Ошибка при получении координат", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {errorMessage && (
        <div className="error-popup">
          <div className="error-popup-content">
            <span className="close" onClick={() => setErrorMessage(null)}>
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      <form className="coordinate-form" onSubmit={handleCoordinates}>
        <input
          className="coordinate-input"
          type="text"
          placeholder="  Введите ваш город..."
          onChange={(event) => {
            setCity(event.target.value);
          }}
        ></input>
        <MyButton>🔍</MyButton>
      </form>
    </>
  );
};

export default CoordinatesComponent;
