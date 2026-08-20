import React, { useState } from "react";
import { fetchСoordinates } from "../../../api/weather";
import Button from "../../../UI/button/Button";
import { CoordinatesProps } from "./typeWeather/weather";
import useRequest from "../../../hooks/useRequest";

interface CoordinateData {
  lat: number;
  lon: number;
  name: string;
}

const CoordinatesComponent: React.FC<CoordinatesProps> = ({ setLocation }) => {
  const [city, setCity] = useState("");
  const {
    state: coordinateRequest,
    makeRequest,
    setError,
  } = useRequest<CoordinateData[]>();

  async function handleCoordinates(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!city.trim()) {
      setError("Пожалуйста, введите название города");
      return;
    }

    const result = await makeRequest(() => fetchСoordinates(city));

    if (result && result.length > 0) {
      const firstResult = result[0];
      setLocation({
        lat: firstResult.lat,
        lon: firstResult.lon,
        name: firstResult.name,
      });
    } else {
      setError("Город не найден. Проверьте название и попробуйте снова");
    }
  }

  return (
    <>
      {coordinateRequest.error && (
        <div className="error-popup">
          <div className="error-popup-content">
            <span className="close" onClick={() => setError(null)}>
              &times;
            </span>
            <p>{coordinateRequest.error}</p>
          </div>
        </div>
      )}
      <form className="coordinate-form" onSubmit={handleCoordinates}>
        <input
          className="coordinate-input"
          type="text"
          id="coordinates"
          placeholder="  Введите ваш город..."
          onChange={(event) => {
            setCity(event.target.value);
          }}
        ></input>
        <Button disabled={coordinateRequest.loading} size="small">
          🔍
        </Button>
      </form>
    </>
  );
};

export default CoordinatesComponent;
