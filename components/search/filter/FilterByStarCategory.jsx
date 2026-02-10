"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByStarCategory = () => {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathName = usePathname();
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
    if (params.get("category")) {
      setQuery(params.get("category").split("|"));
    }
  }, []);

  useEffect(() => {
    if (query.length) {
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label for="fiveStar">
          <input
            onChange={handleChange}
            checked={query.includes("5")}
            type="checkbox"
            name="5"
            id="fiveStar"
          />
          5 Star
        </label>

        <label for="fourStar">
          <input
            onChange={handleChange}
            checked={query.includes("4")}
            type="checkbox"
            name="4"
            id="fourStar"
          />
          4 Star
        </label>

        <label for="threeStar">
          <input
            onChange={handleChange}
            checked={query.includes("3")}
            type="checkbox"
            name="3"
            id="threeStar"
          />
          3 Star
        </label>

        <label for="twoStar">
          <input
            onChange={handleChange}
            checked={query.includes("2")}
            type="checkbox"
            name="2"
            id="twoStar"
          />
          2 Star
        </label>

        <label for="oneStar">
          <input
            onChange={handleChange}
            checked={query.includes("1")}
            type="checkbox"
            name="1"
            id="oneStar"
          />
          1 Star
        </label>
      </form>
    </div>
  );
};

export default FilterByStarCategory;
