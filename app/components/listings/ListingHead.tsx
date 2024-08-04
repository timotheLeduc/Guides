"use client"

import useCities from "@/app/hooks/useCities";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({ title, locationValue, imageSrc, id, currentUser }) => {

    const { getByValue } = useCities();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.label}, ${location?.country}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead