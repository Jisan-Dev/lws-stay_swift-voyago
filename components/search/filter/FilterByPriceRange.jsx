/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByPriceRange = () => {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      setQuery((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const price = params.get("price");
    if (price) {
      setQuery(price.split("|"));
    }
  }, []);

  useEffect(() => {
    if (query.length) {
      params.set("price", encodeURI(query.join("|")));
    } else {
      params.delete("price");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input
            type="checkbox"
            name="0-1000"
            id="range1"
            checked={query.includes("0-1000")}
            onChange={handleChange}
          />
          $ 0-1000
        </label>

        <label htmlFor="range2">
          <input
            type="checkbox"
            name="1000-2000"
            id="range2"
            checked={query.includes("1000-2000")}
            onChange={handleChange}
          />
          $ 1000-2000
        </label>

        <label htmlFor="range3">
          <input
            type="checkbox"
            name="2000-3000"
            id="range3"
            checked={query.includes("2000-3000")}
            onChange={handleChange}
          />
          $ 2000-3000
        </label>

        <label htmlFor="range4">
          <input
            type="checkbox"
            name="3000-4000"
            id="range4"
            checked={query.includes("3000-4000")}
            onChange={handleChange}
          />
          $ 3000-4000
        </label>

        <label htmlFor="range6">
          <input
            type="checkbox"
            name="4000+"
            id="range6"
            checked={query.includes("4000+")}
            onChange={handleChange}
          />
          $ 4000+
        </label>
      </form>
    </div>
  );
};

export default FilterByPriceRange;
// const FilterByPriceRange = () => {
//   return (
//     <div>
//       <h3 className="font-bold text-lg">Price Range</h3>
//       <form action="" className="flex flex-col gap-2 mt-2">
//         <label for="range1">
//           <input type="checkbox" name="range1" id="range1" />$ 13 - $ 30
//         </label>

//         <label for="range2">
//           <input type="checkbox" name="range2" id="range2" />$ 30 - $ 60
//         </label>

//         <label for="range3">
//           <input type="checkbox" name="range3" id="range3" />$ 60 - $ 97
//         </label>

//         <label for="range3">
//           <input type="checkbox" name="range3" id="range3" />$ 97 - $ 152
//         </label>

//         <label for="range4">
//           <input type="checkbox" name="range4" id="range4" />$ 152 - $ 182
//         </label>

//         <label for="range5">
//           <input type="checkbox" name="range5" id="range5" />$ 182+
//         </label>
//       </form>
//     </div>
//   );
// };

// export default FilterByPriceRange;
