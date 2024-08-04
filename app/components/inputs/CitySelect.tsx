"use client"

import { FC } from "react";
import useCities from "@/app/hooks/useCities";
import Select from 'react-select';
import Flag from 'react-world-flags';

export type CitySelectValue = {
  value: string;
  label: string;
  country: string;
  countryCode: string;
  latlng: number[];
  region: string;
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: FC<CitySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCities();

  return (
    <div>
      <Select
        placeholder="Select a city"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: CitySelectValue) => (
          <div className="flex items-center gap-3">
            <Flag code={option.countryCode} alt={option.label} className="w-5 h-5" />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.country}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6"
          }
        })}
      />
    </div>
  );
}

export default CitySelect;
