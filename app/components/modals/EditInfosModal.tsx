import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './';
import Passions from '../Passions';
import LanguageSelect from '../inputs/LanguageSelect';
import TravelerType from '../inputs/TravelerType';
import CountrySelect from '../inputs/CountrySelect';
import useEditInfosModal from '@/app/hooks/useEditInfosModal';
import Heading from '../Heading';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaMusic, FaBook, FaCode, FaRunning, FaPaintBrush, FaCamera, FaHiking, FaGuitar, FaFilm, FaUtensils, FaPlane, FaBiking, FaLeaf, FaSwimmer, FaFish, FaPray, FaChess, FaBeer } from 'react-icons/fa';

const passionsList = [
    { label: 'Music', icon: FaMusic },
    { label: 'Reading', icon: FaBook },
    { label: 'Coding', icon: FaCode },
    { label: 'Running', icon: FaRunning },
    { label: 'Painting', icon: FaPaintBrush },
    { label: 'Photography', icon: FaCamera },
    { label: 'Hiking', icon: FaHiking },
    { label: 'Guitar', icon: FaGuitar },
    { label: 'Movies', icon: FaFilm },
    { label: 'Cooking', icon: FaUtensils },
    { label: 'Traveling', icon: FaPlane },
    { label: 'Cycling', icon: FaBiking },
    { label: 'Gardening', icon: FaLeaf },
    { label: 'Swimming', icon: FaSwimmer },
    { label: 'Fishing', icon: FaFish },
    { label: 'Meditation', icon: FaPray },
    { label: 'Chess', icon: FaChess },
    { label: 'Beer', icon: FaBeer },
    // add more passions here
];

interface EditInfosModalProps {
    currentUser: SafeUser;
    onClose: () => void;
}

const EditInfosModal: React.FC<EditInfosModalProps> = ({ currentUser, onClose }) => {
    const editInfosModal = useEditInfosModal();
    const router = useRouter();
    const { register, handleSubmit, setValue, watch, control, reset } = useForm<FieldValues>({
        defaultValues: {
            passions: currentUser.passions || [],
            travelerType: currentUser.travelerType || [],
            nationality: currentUser.nationality || '',
            languages: currentUser.languages || [],
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        axios.post('/api/edit-infos', data)
            .then(() => {
                toast.success('Information updated successfully!');
                onClose();
                router.refresh();
              
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Something went wrong!');
            });
    };

    const renderBody = () => {
        switch (editInfosModal.selectedField) {
            case 'nationality':
                return (
                    <CountrySelect value={watch('nationality')} onChange={(value) => setValue('nationality', value)} />
                );
            case 'languages':
                return <LanguageSelect control={control} />;
            case 'travelerType':
                return <TravelerType register={register} errors={{}} setValue={setValue} watch={watch} />;
            case 'passions':
                return <Passions passionsList={passionsList} errors={{}} register={register} setValue={setValue} watch={watch} />;
            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={editInfosModal.isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Save"
            title={`Edit ${editInfosModal.selectedField}`}
            body={
                <>
                    <Heading title={`Edit Your ${editInfosModal.selectedField}`} />
                    {renderBody()}
                </>
            }
        />
    );
};

export default EditInfosModal;
