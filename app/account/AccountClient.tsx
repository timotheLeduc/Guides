"use client";

import { useState } from 'react';
import { SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { FaUser, FaEnvelope, FaBirthdayCake, FaFlag, FaLanguage, FaInfoCircle, FaUserTag, FaHeart, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import useEditInfosModal from '@/app/hooks/useEditInfosModal';
import EditInfosModal from '@/app/components/modals/EditInfosModal';

interface AccountClientProps {
    currentUser: SafeUser;
}

type FormData = {
    name: string;
    email: string;
    age: string | number;
    description: string;
    nationality: string;
    languages: string;
    travelerType: string;
    passions: string;
};

const AccountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [formData, setFormData] = useState<FormData>({
        name: currentUser.name || '',
        email: currentUser.email || '',
        age: currentUser.age || '',
        description: currentUser.description || '',
        nationality: currentUser.nationality?.label || '',
        languages: currentUser.languages.map(lang => lang.label).join(', ') || '',
        travelerType: currentUser.travelerType.join(', ') || '',
        passions: currentUser.passions.join(', ') || ''
    });

    const editInfosModal = useEditInfosModal();

    const handleEditClick = (field: keyof FormData) => {
        if (['nationality', 'languages', 'travelerType', 'passions'].includes(field)) {
            editInfosModal.onOpen(field);
        } else {
            setIsEditing(prevState => ({ ...prevState, [field]: true }));
        }
    };
    
    

    const handleCancelClick = (field: keyof FormData) => {
        setIsEditing(prevState => ({ ...prevState, [field]: false }));
        setFormData(prevState => ({
            ...prevState,
            [field]: field === 'nationality'
                ? currentUser.nationality?.label || ''
                : field === 'languages'
                ? currentUser.languages.map(lang => lang.label).join(', ') || ''
                : field === 'travelerType'
                ? currentUser.travelerType.join(', ') || ''
                : field === 'passions'
                ? currentUser.passions.join(', ') || ''
                : (currentUser[field] as string)
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveClick = async (field: keyof FormData) => {
        try {
            await axios.post('/api/user/update', { [field]: formData[field] });
            setIsEditing(prevState => ({ ...prevState, [field]: false }));
            // Optionally update currentUser with the response data or refetch the user data
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const renderField = (field: keyof FormData, label: string, icon: JSX.Element) => (
        <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-between">
            <div>
                {icon}
                <label className="block text-sm font-medium">{label}:</label>
                {isEditing[field] ? (
                    <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black"
                    />
                ) : (
                    <p className="mt-1 text-lg font-semibold">{formData[field] || 'N/A'}</p>
                )}
            </div>
            {isEditing[field] ? (
                <div>
                    <button onClick={() => handleSaveClick(field)} className="mr-2"><FaSave /></button>
                    <button onClick={() => handleCancelClick(field)}><FaTimes /></button>
                </div>
            ) : (
                <button onClick={() => handleEditClick(field)}><FaEdit /></button>
            )}
        </div>
    );

    return (
        <Container>
            <Heading
                title="My Account"
                subtitle="View and edit your account details"
                center
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {renderField('name', 'Name', <FaUser className="text-2xl mb-2" />)}
                {renderField('email', 'Email', <FaEnvelope className="text-2xl mb-2" />)}
                {renderField('age', 'Age', <FaBirthdayCake className="text-2xl mb-2" />)}
                {renderField('description', 'Description', <FaInfoCircle className="text-2xl mb-2" />)}
                {renderField('nationality', 'Nationality', <FaFlag className="text-2xl mb-2" />)}
                {renderField('languages', 'Languages', <FaLanguage className="text-2xl mb-2" />)}
                {renderField('travelerType', 'Traveler Type', <FaUserTag className="text-2xl mb-2" />)}
                {renderField('passions', 'Passions', <FaHeart className="text-2xl mb-2" />)}
            </div>
            <EditInfosModal currentUser={currentUser} onClose={editInfosModal.onClose} />
        </Container>
    );
};

export default AccountClient;
