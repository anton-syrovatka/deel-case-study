import React from "react";

type useGetCountriesProps = {
  input: string;
};

type useGetCountriesReturn = {
  loading: boolean;
  data: string[];
};

export const useGetCountries = ({
  input,
}: useGetCountriesProps): useGetCountriesReturn => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<string[]>([]);

  React.useEffect(() => {
    let controller: AbortController | null = new AbortController();
    setLoading(true);

    if (!input) {
      return setData([]);
    }

    (async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${input}`,
          {
            signal: controller.signal,
          }
        );

        const result: any[] = await response.json();
        const countries: string[] = result.map((c) => c.name.common);

        const filteredCountries = input
          ? countries.filter(
              (country) =>
                country.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >
                -1
            )
          : [];

        setLoading(false);
        setData(filteredCountries);
        controller = null;
      } catch (e: any) {
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [input, setLoading, setData]);

  return { loading, data };
};
