"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const [numberOfMonths, setNumberOfMonths] = useState(2); // Default to 2 months

  // Detect screen size and update `numberOfMonths`
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 1027px)").matches) {
        setNumberOfMonths(1); // 1 month for mobile
      } else {
        setNumberOfMonths(2); // 2 months for wider screens
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 md:pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={numberOfMonths} // Dynamically updated
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      {/* Price Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 bg-accent-500 text-primary-800 h-auto md:h-[72px] gap-4 md:gap-0 py-4 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <p className="flex gap-1 md:gap-2 items-baseline text-center md:text-left">
            {discount > 0 ? (
              <>
                <span className="text-xl md:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700 text-sm md:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl md:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm md:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 py-1 text-lg md:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="text-center md:text-left">
                <span className="text-sm md:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-xl md:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-1 px-3 md:py-2 md:px-4 text-xs md:text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
