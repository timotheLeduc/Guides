'use client'

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "."
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import CitySelect from "../inputs/CitySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs";
import Meetup from "../inputs/Meetup";
import Inclusions from "../inputs/Inclusions";
import axios from "axios";
import { toast } from "react-hot-toast";

enum STEPS {
  TITLE_DESCRIPTION = 0,
  CATEGORY = 1,
  LOCATION = 2,
  MEETUP_POINT = 3,
  DETAILS = 4,
  INCLUSIONS = 5,
  IMAGES = 6
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.TITLE_DESCRIPTION);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inclusions, setInclusions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: null,
      meetingPoint: "",
      price: 1,
      duration: 1,
      groupSize: 1,
      inclusions: [],	
      imageSrc: "",
    }
  });

  const category = watch("category");
  const location = watch("location");
  const meetingPoint = watch("meetingPoint");
  const price = watch("price");
  const duration = watch("duration");
  const groupSize = watch("groupSize");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false
  }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.inclusions = inclusions; // Include the inclusions in the form data

    if (step !== STEPS.IMAGES) {
      return onNext();
    }

    setIsLoading(true);

    axios.post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!")
        router.refresh();
        reset();
        setInclusions([]);
        setStep(STEPS.TITLE_DESCRIPTION);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return "Create"
    }

    return "Next"
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TITLE_DESCRIPTION) return undefined;

    return "Back";
  }, [step]);

  // Step 1: Title and Description
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your tour?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        placeholder="Enter the tour title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id="description"
        label="Description"
        placeholder="Enter a detailed description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        multiline // Set this to true for multi-line input
      />
    </div>
  );

  // Step 2: Category
  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your tour?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue('category', category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Step 3: Location (city) and Meeting Point
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which city is your tour located?"
          subtitle="Help guests find you!"
        />
        <CitySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.MEETUP_POINT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is the meetup point?"
          subtitle="Help travelers find the starting location!"
        />
        <Meetup
          id="meetingPoint"
          label="Meetup Point Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // Step 4: Details
  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your tour"
          subtitle="Provide some key information"
        />
        <Counter
          title="Price"
          subtitle="The cost of the tour ($)"
          value={price}
          onChange={(value) => setCustomValue("price", value)}
        />
        <hr />
        <Counter
          title="Duration"
          subtitle="How long the tour lasts (hours)"
          value={duration}
          onChange={(value) => setCustomValue("duration", value)}
        />
        <hr />
        <Counter
          title="Group Size"
          subtitle="Maximum number of participants"
          value={groupSize}
          onChange={(value) => setCustomValue("groupSize", value)}
        />
      </div>
    );
  }

  if (step === STEPS.INCLUSIONS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="What is included in the tour?"
          subtitle="Add all the inclusions for the travelers."
        />
        <Inclusions
          inclusions={inclusions}
          setInclusions={setInclusions}
        />
      </div>
    );
  }

  // Step 6: Images
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a thumbnail image"
          subtitle="Upload an image for your tour"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TITLE_DESCRIPTION ? undefined : onBack}
      title="List Your Adventure!"
      body={bodyContent}
    />
  )
}

export default RentModal;