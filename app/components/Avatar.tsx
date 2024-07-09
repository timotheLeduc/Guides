"use client"

import Image from "next/image"
import { FC } from "react";
import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";


interface AvatarProps {
    src?: string | null | undefined
    user?: User | null;
}

const Avatar: FC<AvatarProps> = ({ src, user }) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;
    return (
        <div>
            <Image
                className="rounded-full"
                height={30}
                width={30}
                alt="Avatar"
                src={src || "/images/placeholder.jpg"}
            />
            {isActive ? (
                <span
                    className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
                />
            ) : null}
        </div>
    )
}

export default Avatar