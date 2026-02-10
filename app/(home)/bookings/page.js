import { getBookingsByUser } from "@/DAL";
import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const { user } = await auth.api.getSession({ headers: headers() });

  if (!user) redirect("/login");

  const bookings = await getBookingsByUser(user?.id);

  const pastBookings = bookings.filter(
    (booking) => new Date().getTime() > new Date(booking.checkin).getTime(),
  );

  const upcomingBookings = bookings.filter((booking) => {
    console.log(new Date().getTime(), "||", new Date(booking.checkin).getTime());
    return new Date().getTime() < new Date(booking.checkin).getTime();
  });

  return (
    <>
      <section className="mt-[100px]">
        <div className="container">
          <ProfileInfo />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PastBooking bookings={pastBookings} />
            <UpcomingBooking bookings={upcomingBookings} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingsPage;
