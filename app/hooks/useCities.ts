// useCities.js
import cities from "./cities";

const formattedCities = cities.map((city) => ({
  value: city.value,
  label: city.label,
  country: city.country,
  countryCode: city.countryCode,
  latlng: city.latlng,
  region: city.region,
}));

const useCities = () => {
  const getAll = () => formattedCities;

  const getByValue = (value: string) => {
    return formattedCities.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCities;
