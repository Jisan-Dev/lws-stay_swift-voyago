"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortHotel = () => {
  const [sort, setSort] = useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathName = usePathname();
  const router = useRouter();

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  // useEffect

  useEffect(() => {
    if (sort) params.set("sort", sort);
    else params.delete("sort");

    router.replace(`${pathName}?${params.toString()}`);
  }, [sort]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label for="highToLow">
          <input
            type="radio"
            name="sort"
            id="highToLow"
            value="desc"
            onChange={handleChange}
            checked={sort === "desc"}
          />
          Price High to Low
        </label>

        <label for="lowToHigh">
          <input
            type="radio"
            name="sort"
            id="lowToHigh"
            value="asc"
            onChange={handleChange}
            checked={sort === "asc"}
          />
          Price Low to high
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
