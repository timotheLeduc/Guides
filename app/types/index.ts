import { Listing, Reservation, User } from "@prisma/client";
import { Conversation, Message, } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    listing: SafeListing;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: Date;
    updatedAt: Date;
    emailVerified: Date | null;
};


export type FullMessageType = Message & {
    sender: User, 
    seen: User[]
  };
  
  export type FullConversationType = Conversation & { 
    users: User[]; 
    messages: FullMessageType[]
  };
  
