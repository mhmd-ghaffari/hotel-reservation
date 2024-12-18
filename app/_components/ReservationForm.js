"use client"

import Image from "next/image"
import { useReservation } from "./ReservationContext"
import { differenceInDays } from "date-fns"
import { createBooking } from "../_lib/action"
import { useFormStatus } from "react-dom"
import SubmitButton from "./SubmitButton"

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation()
  const { maxCapacity, regularPrice, discount, id } = cabin
  console.log(range)

  const startDate = range.from
  const endDate = range.to

  const numNights = differenceInDays(endDate, startDate)

  const cabinPrice = numNights * (regularPrice - discount)

  const bookingDate = { startDate, endDate, numNights, cabinPrice, cabinId: id }

  const createBookingWithData = createBooking.bind(null, bookingDate)

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center text-xs md:text-base">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            height="35"
            width="35"
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData)
          resetRange()
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 text-base md:text-lg py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-start md:justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
