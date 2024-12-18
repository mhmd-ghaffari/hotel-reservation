"use client"

import { XMarkIcon } from "@heroicons/react/24/solid"
import { format } from "date-fns"
import { useReservation } from "./ReservationContext"

function ReservationReminder() {
  const { range, resetRange } = useReservation()

  if (!range.from || !range.to) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-1 px-2  md:py-5 md:px-8 rounded-lg md:rounded-full bg-accent-500 text-primary-800 text-sm md:text-lg font-semibold shadow-xl shadow-slate-900 flex md:gap-8 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br />
        <span className="hidden md:block">
          from {format(new Date(range.from), "MMM dd yyyy")} to{" "}
          {format(new Date(range.to), "MMM dd yyyy")}
        </span>
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default ReservationReminder
