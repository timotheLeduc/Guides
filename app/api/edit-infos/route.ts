import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface RequestBody {
    description?: string;
    age?: string;
    passions?: string[];
    travelerType?: string[];
    nationality?: {
        value: string;
        label: string;
        flag: string;
        latlng: number[];
        region: string;
    };
    languages?: {
        value: string;
        label: string;
    }[];
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json() as RequestBody;
    console.log('Received body:', body); // Log the received body

    const { description, age, passions, travelerType, nationality, languages } = body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                description,
                age: age ? parseInt(age, 10) : undefined, // Parse age if provided
                passions: passions ? { set: passions } : undefined,
                travelerType: travelerType ? { set: travelerType } : undefined,
                nationality,
                languages: languages ? { set: languages } : undefined,
            },
        });

        console.log('Updated user:', updatedUser); // Log the updated user

        return NextResponse.json(updatedUser); // Return updated user as JSON response
    } catch (error) {
        console.error('Error updating user:', error); // Log the error if update fails
        return NextResponse.error(); // Return error response
    }
}
