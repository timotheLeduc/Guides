"use client"

import { usePathname, useSearchParams } from 'next/navigation';
import { FaCocktail, FaHiking, FaTheaterMasks, FaUtensils, FaSpa, FaRunning, FaShoppingBag, FaStar, FaTree, FaLandmark } from 'react-icons/fa';

import Container from '../Container';
import CategoryBox from '../CategoryBox';

export const categories = [
    {
        label: 'Bars and Nightlife',
        icon: FaCocktail,
        description: 'Discover the best bars and nightlife!',
    },
    {
        label: 'Exploration and Adventure',
        icon: FaHiking,
        description: 'Join exciting adventures and explorations!',
    },
    {
        label: 'Local Culture',
        icon: FaTheaterMasks,
        description: 'Explore local culture and arts!',
    },
    {
        label: 'Gastronomy',
        icon: FaUtensils,
        description: 'Taste delicious local cuisine!',
    },
    {
        label: 'Wellness and Relaxation',
        icon: FaSpa,
        description: 'Enjoy moments of wellness and relaxation!',
    },
    {
        label: 'Sports and Leisure',
        icon: FaRunning,
        description: 'Participate in sports and leisure activities!',
    },
    {
        label: 'Shopping',
        icon: FaShoppingBag,
        description: 'Discover the best local shops and markets!',
    },
    {
        label: 'Unique Experiences',
        icon: FaStar,
        description: 'Have unique and memorable experiences!',
    },
    {
        label: 'History and Education',
        icon: FaLandmark,
        description: 'Discover local history and culture!',
    },
    {
        label: 'Nature and Wildlife',
        icon: FaTree,
        description: 'Explore nature and observe local wildlife!',
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex 
                    flex-row 
                    items-center 
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
