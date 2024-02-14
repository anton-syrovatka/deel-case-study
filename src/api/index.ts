import React from 'react';
import get from './get';

interface Country {
  name: {
    common: string;
    official: string;
  };
}

export const useGetCountries = (input: string) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!input) {
      return setData([]);
    }

    setLoading(true);
    const controller = new AbortController();

    (async (controller) => {
      try {
        const data = await get<Country[]>(
          `https://restcountries.com/v3.1/name/${input}`,
          controller
        );
        const countries = data.map((c) => c.name.official);

        const filteredCountries = input
          ? countries.filter(
              (country) =>
                country.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >
                -1
            )
          : [];

        setLoading(false);
        setData(filteredCountries);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    })(controller);

    return () => {
      controller.abort();
    };
  }, [input]);

  return { loading, data };
};
