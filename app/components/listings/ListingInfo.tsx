"use client"

import useCities from "@/app/hooks/useCities";
import { SafeUser } from "@/app/types"
import { FC } from "react"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    meetingPoint: string;
    duration: number;
    groupSize: number;
    inclusions: string[];
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
    user,
    description,
    meetingPoint,
    duration,
    groupSize,
    inclusions,
    category,
    locationValue
}) => {

    const { getByValue } = useCities();
    console.log(inclusions);

    const coordinate = getByValue(locationValue)?.latlng;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meetingPoint)}`;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} user={user} />
                </div>
                <div className="flex flex-col gap-4 font-light text-neutral-500">
                    <div>
                        <strong>Duration:</strong> {duration} hours
                    </div>
                    <div>
                        <strong>Group Size:</strong> Up to {groupSize} people
                    </div>
                    <div>
                        <strong>Meeting Point:</strong> <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{meetingPoint}</a>
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-500">
                <strong>Inclusions:</strong>
                <ul className="list-disc pl-5 space-y-1">
                    {inclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <hr />
            <Map center={coordinate} />
        </div>
    )

}

export default ListingInfo;
