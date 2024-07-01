import ISO6391 from 'iso-639-1';
import { Controller, Control } from 'react-hook-form';

import { FC } from "react";

import Select from 'react-select';

const languages = ISO6391.getAllNames().map((name) => ({
    value: ISO6391.getCode(name),
    label: name,
}));

interface LanguageSelectProps {
    control: Control<any>;
}

const LanguageSelect: FC<LanguageSelectProps> = ({ control }) => {
    return (
        <Controller
            name="languages"
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    options={languages}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select languages"
                />
            )}
        />
    );
};

export default LanguageSelect;
