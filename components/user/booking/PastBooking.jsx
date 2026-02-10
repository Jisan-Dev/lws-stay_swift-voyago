import BookingCard from "./BookingCard";

const PastBooking = ({ bookings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>

      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} type="past" />
      ))}
    </div>
  );
};

export default PastBooking;
