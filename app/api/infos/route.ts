import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    console.log('Received body:', body); // Add this line
    const { description, age, passions, travelerType, nationality, languages } = body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                description,
                age: parseInt(age, 10),
                passions,
                travelerType,
                nationality,
                languages,
            },
        });

        console.log('Updated user:', updatedUser); // Add this line
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error); // Add this line
        return NextResponse.error();
    }
}
