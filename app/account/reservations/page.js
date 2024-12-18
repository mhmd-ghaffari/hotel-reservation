import ReservationList from "@/app/_components/ReservationList"
import { auth } from "@/app/_lib/auth"
import { getBookings } from "@/app/_lib/data-service"

export const metadata = {
  title: "Reservations",
}

export default async function Page() {
  const session = await auth()
  const bookings = await getBookings(session.user.guestId)

  return (
    <div className="px-1 md:px-6 lg:px-8">
      <h2 className="font-semibold text-xl md:text-2xl text-accent-400 mb-5 sm:mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-sm md:text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  )
}
