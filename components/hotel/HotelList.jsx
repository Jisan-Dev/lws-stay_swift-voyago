import { getAllHotels } from "@/DAL";
import HotelCard from "./HotelCard";
import NoHotels from "./NoHotel";

const HotelList = async ({ destination, checkin, checkout, category }) => {
  const hotels = await getAllHotels(destination, checkin, checkout, category);

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels.length ? (
          hotels?.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} checkin={checkin} checkout={checkout} />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
