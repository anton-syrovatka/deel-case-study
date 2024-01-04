import React from "react";
import get from "./get";

type CountriesData = {
  name: {
    common: string;
  };
}[];

type UseGetCountriesReturn = {
  loading: boolean;
  data: string[];
};

export const useGetCountries = (input: string): UseGetCountriesReturn => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoading(true);

    if (!input) {
      return setData([]);
    }

    const controller = new AbortController();

    (async (controller) => {
      try {
        const data = await get<CountriesData>(
          `https://restcountries.com/v3.1/name/${input}`,
          controller
        );
        const countries = data.map((c) => c.name.common);

        const filteredCountries = input
          ? countries.filter(
              (country) =>
                country.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >
                -1
            )
          : [];

        setLoading(false);
        setData(filteredCountries);
      } catch (e: any) {
        setData([]);
      } finally {
        setLoading(false);
      }
    })(controller);

    return () => {
      controller.abort();
    };
  }, [input, setLoading, setData]);

  return { loading, data };
};
