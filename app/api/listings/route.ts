import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    meetingPoint,
    duration,
    groupSize,
    inclusions,
    location,
    price
  } = body;

  // if one of the body items is empty ->
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      meetingPoint,
      duration,
      groupSize,
      inclusions,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
