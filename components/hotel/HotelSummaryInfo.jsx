import { getRatings, getReviewsCount } from "@/DAL";
import Link from "next/link";

const HotelSummaryInfo = async ({ fromListPage, info }) => {
  const totalReviews = await getReviewsCount(info?._id);
  const ratingsArr = await getRatings(info?._id);

  let avgRating = 0;

  if (ratingsArr.length === 1) avgRating = ratingsArr[0].rating;
  if (ratingsArr.length > 1) {
    avgRating = ratingsArr.reduce((acc, curr) => acc + curr.rating, 0) / ratingsArr.length;
  }

  const getRatingStatus = (avgRating) => {
    if (avgRating === 0) {
      return "No Ratings Yet!";
    } else if (avgRating > 0 && avgRating <= 2) {
      return "Poor";
    } else if (avgRating > 2 && avgRating <= 3) {
      return "Average";
    } else if (avgRating > 3 && avgRating <= 4) {
      return "Good";
    } else if (avgRating > 4) {
      return "Very Good";
    }
  };

  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2 className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl text-primary"}>
          {info?.name}
        </h2>
        <p>📍 {info?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <div className="bg-primary px-2 h-[35px] rounded-sm text-white grid place-items-center font-bold">
            {avgRating} {ratingsArr.length > 0 && `(${ratingsArr.length})`}
          </div>
          <div className="text-sm">
            <span className="font-semibold">{getRatingStatus(avgRating)}</span>
            <p>
              {totalReviews === 0 ? (
                <Link href="#" className="underline hover:text-primary transition-colors">
                  Be the first one to review
                </Link>
              ) : (
                <Link href={`/hotel/${info._id}/reviews`} className="underline">
                  {totalReviews} Reviews
                </Link>
              )}
            </p>
          </div>
        </div>
        <div>
          <span className="bg-yellow-300 p-1 rounded-md text-sm">
            {info?.propertyCategory} Star Property
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${(info?.highRate + info?.lowRate) / 2}/night
        </h2>
        <p className=" text-right">Per Night for 1 Room</p>
        {fromListPage ? (
          <Link href={`/hotels/${info._id}`} className="btn-primary">
            Details
          </Link>
        ) : (
          <button className="btn-primary">Book</button>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
