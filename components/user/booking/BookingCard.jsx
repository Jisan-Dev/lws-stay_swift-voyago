import { getDayDifference } from "@/utils";

const BookingCard = ({ booking, type }) => {
  const days = getDayDifference(booking.checkin, booking.checkout);
  const totalCost = ((booking?.hotelId?.highRate + booking?.hotelId?.lowRate) / 2) * days;
  return (
    <div className={`${type === "past" ? "bg-[#ebf6e9]" : "bg-primary/20"} p-4 rounded-md`}>
      <div className="flex justify-between items-center ">
        <div>
          <h3 className="text-xl font-semibold">{booking.hotelId?.name}</h3>
          <div className="text-sm text-gray-600 my-4">
            <p>Check In: {booking.checkin}</p>
            <p>Check Out: {booking.checkout}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-right">${totalCost}</h3>
          <p className="text-sm text-gray-600">
            ${totalCost / days} per night X {days} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
