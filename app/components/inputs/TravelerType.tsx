import { FC } from "react";
import { IconType } from "react-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Heading from "../Heading";
import { FaHiking, FaPlane, FaHotel, FaGlobe, FaMoneyBill, FaCouch, FaLeaf } from "react-icons/fa";

const travelerTypes = [
    { value: "Adventurous", label: "Adventurous", icon: FaHiking },
    { value: "Relaxed", label: "Relaxed", icon: FaCouch },
    { value: "Budget", label: "Budget", icon: FaMoneyBill },
    { value: "Luxury", label: "Luxury", icon: FaHotel },
    { value: "Cultural", label: "Cultural", icon: FaGlobe },
    { value: "Eco", label: "Eco", icon: FaLeaf },
    // Add more options as needed
];

interface TravelerTypeProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setValue: (id: string, value: any, options?: any) => void;
    watch: (id: string) => any;
}

const TravelerType: FC<TravelerTypeProps> = ({ register, errors, setValue, watch }) => {
    const selectedTypes = watch('travelerType') || [];

    const handleSelect = (value: string) => {
        if (selectedTypes.includes(value)) {
            setValue("travelerType", selectedTypes.filter((type: string) => type !== value));
        } else {
            setValue("travelerType", [...selectedTypes, value]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Heading
                title="Type of Traveler"
                subtitle="Select the option(s) that best describe you"
            />
            <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto md:grid-cols-2">
                {travelerTypes.map((type) => (
                    <div
                        key={type.value}
                        onClick={() => handleSelect(type.value)}
                        className={`rounded-xl border-2 p-4 flex flex-col items-center gap-3 hover:border-black transition cursor-pointer 
                        ${selectedTypes.includes(type.value) ? "border-black" : "border-neutral-200"}`}
                    >
                        {<type.icon size={30} />}
                        <div className="font-semibold">
                            {type.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelerType;
