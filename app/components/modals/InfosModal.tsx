'use client';

import { useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler, Control } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

import useInfosModal from "@/app/hooks/useInfosModal";

import Modal from "./";
import Input from "../inputs";
import Heading from "../Heading";
import Passions from "../Passions";
import LanguageSelect from "../inputs/LanguageSelect";
import TravelerType from "../inputs/TravelerType";
import CountrySelect from "../inputs/CountrySelect";

import { useRouter } from "next/navigation";
import { FaMusic, FaBook, FaCode, FaRunning, FaPaintBrush, FaCamera, FaHiking, FaGuitar, FaFilm, FaUtensils, FaPlane, FaBiking, FaLeaf, FaSwimmer, FaFish, FaPray, FaChess, FaBeer } from "react-icons/fa";

enum STEPS {
    DESCRIPTION = 0,
    AGE = 1,
    PASSIONS = 2,
    TRAVELER_TYPE = 3,
    NATIONALITY = 4,
    LANGUAGES = 5,
}

const InfosModal = () => {
    const infosModal = useInfosModal();
    const [step, setStep] = useState(STEPS.DESCRIPTION);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const passionsList = [
        { label: "Music", icon: FaMusic },
        { label: "Reading", icon: FaBook },
        { label: "Coding", icon: FaCode },
        { label: "Running", icon: FaRunning },
        { label: "Painting", icon: FaPaintBrush },
        { label: "Photography", icon: FaCamera },
        { label: "Hiking", icon: FaHiking },
        { label: "Guitar", icon: FaGuitar },
        { label: "Movies", icon: FaFilm },
        { label: "Cooking", icon: FaUtensils },
        { label: "Traveling", icon: FaPlane },
        { label: "Cycling", icon: FaBiking },
        { label: "Gardening", icon: FaLeaf },
        { label: "Swimming", icon: FaSwimmer },
        { label: "Fishing", icon: FaFish },
        { label: "Meditation", icon: FaPray },
        { label: "Chess", icon: FaChess },
        { label: "Beer", icon: FaBeer },
        // add more passions here
    ];
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      };
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control, // Add this line
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            description: '',
            age: '',
            passions: [],
            travelerType: [],
            nationality: '',
            languages: [],
        },
    });

    const passions = watch('passions');
    const location = watch('location');
    const age = watch('age');
    const nationality = watch('nationality'); 


    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.LANGUAGES) {
            return onNext();
        }
        console.log(data);
        setIsLoading(true);
    
        axios.post('/api/infos', data)
            .then(() => {
                toast.success('Information added!');
                infosModal.onClose();
                router.refresh();
                reset();
                setStep(STEPS.DESCRIPTION);
            })
            .catch((error) => {
                console.error(error); // Add this line
                toast.error(error.response?.data?.message || "Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    

    const actionLabel = useMemo(() => {
        if (step === STEPS.LANGUAGES) {
            return 'Finish';
        }

        return 'Next';

    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-4">
            <Passions
                passionsList={passionsList}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
            />
        </div>
    );

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Tell us about yourself"
                    subtitle="Introduce yourself in 500 words or less"
                />
                <Input
                    id="description"
                    label="Description"
                    type="text"
                    multiline // Add the multiline prop to use a textarea
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.AGE) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="How old are you?"
                    subtitle="Tell us your age"
                />
                <Input
                    id="age"
                    label="Age"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.LANGUAGES) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="What languages do you speak?"
                    subtitle="Select the languages you can speak"
                />
                <LanguageSelect control={control} />
            </div>
        );
    }
    if (step === STEPS.NATIONALITY) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where are you from?"
              subtitle="Where do you call home?"
            />
            <CountrySelect
              value={nationality}
              onChange={(value) => setCustomValue("nationality", value)}
            />
    
          </div>
        )
      }
    if (step === STEPS.TRAVELER_TYPE) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <TravelerType
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />
            </div>
        );
    }



    return (
        <Modal
            isOpen={infosModal.isOpen}
            onClose={infosModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
            title="Complete Your Profile"
            body={bodyContent}
        />
    );
}

export default InfosModal;
