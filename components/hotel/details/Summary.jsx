import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = ({ hotelInfo }) => {
  return (
    <section className="py-4 mt-[100px] ">
      <div className="flex container">
        <HotelSummaryInfo fromListPage={false} info={hotelInfo} />
      </div>
    </section>
  );
};

export default Summary;
