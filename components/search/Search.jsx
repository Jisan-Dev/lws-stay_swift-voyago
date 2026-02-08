"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList, destination, checkin, checkout }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState({
    destination: destination || "",
    checkin: checkin || "",
    checkout: checkout || "",
  });

  const [allowSearch, setAllowSearch] = useState(true);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const state = { ...searchTerm, [name]: value };

    if (
      new Date(state.checkin).getTime() > new Date(state.checkout).getTime() ||
      (!state.checkin && state.checkout) ||
      (!state.checkout && state.checkin)
    ) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }

    setSearchTerm(state);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm.destination);
    if (searchTerm?.checkin && searchTerm?.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    if (pathname.includes("hotels")) {
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.replace(`/hotels?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={`${fromList && "!shadow-none"}`}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                value={searchTerm.destination}
                onChange={handleInputs}
              >
                <option value=""> Select a destination </option>
                <option value="Puglia">Puglia</option>
                <option value="Frejus">Frejus</option>
                <option value="Kerkira">Kerkira</option>
                <option value="Karlovasi">Karlovasi</option>
                <option value="Saint-Denis">Saint-Denis</option>
                <option value="Cergy">Cergy</option>
                <option value="Paris">Paris</option>
                <option value="Le Pré-Saint-Gervais">Le Pré-Saint-Gervais</option>
                <option value="Calvi">Calvi</option>
                <option value="Catania">Catania</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                value={searchTerm.checkin}
                onChange={handleInputs}
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                value={searchTerm.checkout}
                onChange={handleInputs}
              />
            </h4>
          </div>
        </div>
      </div>

      <button onClick={handleSearch} disabled={!allowSearch} className="search-btn">
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
