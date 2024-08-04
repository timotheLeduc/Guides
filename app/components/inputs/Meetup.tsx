import { FC, useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MeetupProps {
  id: string;
  label: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
}

const Meetup: FC<MeetupProps> = ({ id, label, disabled, register, errors, required }) => {
  const [address, setAddress] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  useEffect(() => {
    if (address) {
      const formattedAddress = encodeURIComponent(address);
      setGoogleMapsLink(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`);
    } else {
      setGoogleMapsLink("");
    }
  }, [address]);

  return (
    <div className="w-full relative">
      <label className={`text-lg font-semibold ${errors[id] ? "text-rose-500" : "text-black-500"}`}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-neutral-700"}`}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="e.g., 1600 Amphitheatre Parkway, Mountain View, CA"
      />
      {errors[id] && <p className="text-rose-500 text-sm mt-1">This field is required</p>}
      <p className="text-sm text-neutral-500 mt-2">Please copy the exact Google Maps address.</p>
      {googleMapsLink && (
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-1"
        >
          Verify Address on Google Maps
        </a>
      )}
    </div>
  );
};

export default Meetup;
