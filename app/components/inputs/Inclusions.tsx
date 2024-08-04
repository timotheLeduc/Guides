import { FC, useState } from "react";

interface InclusionsProps {
  inclusions: string[];
  setInclusions: (inclusions: string[]) => void;
}

const Inclusions: FC<InclusionsProps> = ({ inclusions, setInclusions }) => {
  const [newInclusion, setNewInclusion] = useState("");

  const addInclusion = () => {
    if (newInclusion.trim() !== "") {
      setInclusions([...inclusions, newInclusion]);
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    const updatedInclusions = inclusions.filter((_, i) => i !== index);
    setInclusions(updatedInclusions);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg font-semibold text-black">Add Inclusion</label>
      <div className="w-full relative flex items-center">
        <input
          type="text"
          value={newInclusion}
          onChange={(e) => setNewInclusion(e.target.value)}
          placeholder="e.g., Snacks, Drinks, Guidebook, Transportation"
          className="peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-neutral-700"
        />
        <button
          type="button"
          onClick={addInclusion}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md"
        >
          Add
        </button>
      </div>
      <ul className="list-none pl-0">
        {inclusions.map((inclusion, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
            <span>{inclusion}</span>
            <button
              type="button"
              onClick={() => removeInclusion(index)}
              className="ml-4 text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inclusions;
