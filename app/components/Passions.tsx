import { FC } from "react";
import { IconType } from "react-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Passion from "./inputs/Passion";
import Heading from "./Heading";

interface PassionsProps {
  passionsList: { label: string; icon: IconType }[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: (id: string, value: any, options?: any) => void;
  watch: (id: string) => any;
  maxSelections?: number;
}

const Passions: FC<PassionsProps> = ({ passionsList, register, errors, setValue, watch, maxSelections = 5 }) => {
  const selectedPassions = watch('passions') || [];

  const handleSelect = (label: string) => {
    let updatedSelections = [...selectedPassions];
    if (selectedPassions.includes(label)) {
      updatedSelections = updatedSelections.filter(p => p !== label);
    } else if (selectedPassions.length < maxSelections) {
      updatedSelections.push(label);
    }

    setValue("passions", updatedSelections);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="Tell us about your passions"
        subtitle={`Select up to ${maxSelections} passions`}
      />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
        {passionsList.map((item) => (
          <Passion
            key={item.label}
            onClick={handleSelect}
            selected={selectedPassions.includes(item.label)}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Passions;
