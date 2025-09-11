import React, { useEffect, useRef } from "react";
import { years } from "../../../constants/constYears";
import { YearsContainerProps } from "./typeWeather/typeWeather";
import Button from "../../../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSelectedYear } from "../../../store/slices/calendarSlice";
import useRequest from "../../../hooks/useRequest";

const YearsContainer: React.FC<YearsContainerProps> = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedYear } = useSelector((state: RootState) => state.calendar);
  const {
    setLoading,
    state: { loading },
  } = useRequest();
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !selectedYear === undefined) return;

    const activeBtn = container.querySelector(`[data-year="${selectedYear}"]`);
    if (!activeBtn) return;

    requestAnimationFrame(() => {
      const containerHeight = container.clientHeight;
      const btnHeight = activeBtn.clientHeight;
      const btnOffsetTop = (activeBtn as HTMLElement).offsetTop;

      const scrollPosition = btnOffsetTop - containerHeight / 2 + btnHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    });
  }, [selectedYear]);

  async function handleYearClick(year: number) {
    setLoading(true);
    try {
      dispatch(setSelectedYear(year));
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="years-container" ref={containerRef}>
      {years.map((year) => (
        <Button
          key={year}
          size="normal"
          data-year={year}
          active={year === selectedYear}
          disabled={loading}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </Button>
      ))}
    </div>
  );
};

export default YearsContainer;
