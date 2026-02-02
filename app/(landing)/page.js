import Search from "@/components/search/Search";
import { getAllHotels } from "@/database/queries";

export default async function Home() {
  const data = await getAllHotels();
  return (
    <section className="relative min-h-screen flex items-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      {/* <div className="absolute inset-0 bg-[rgba(46,46,46,0.25)] mix-blend-overlay" /> */}

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Hotels for memorable moments rich in emotions
          </h1>
          <p className="mt-4 text-gray-200 text-lg sm:text-xl">
            459 rooms across Indonesia with 5-star standards — find your perfect stay.
          </p>

          {/* <div className="mt-8 flex justify-center gap-4">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md shadow-lg font-semibold">
              Explore Hotels
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-md">
              My Bookings
            </button>
          </div> */}

          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-3xl mx-auto">
            <Search />
          </div>
        </div>
      </div>
    </section>
  );
}
