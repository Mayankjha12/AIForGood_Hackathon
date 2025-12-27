import React from 'react';

// Maps a form field key to its corresponding label and options in the translations data
const fieldMap = [
    { key: 'location', labelKey: 'locationLabel', optionsKey: 'locationOptions', type: 'select' },
    { key: 'landSize', labelKey: 'landSizeLabel', optionsKey: 'landSizeOptions', type: 'select' },
    { key: 'crop', labelKey: 'cropLabel', optionsKey: 'cropOptions', type: 'select' },
    { key: 'soilType', labelKey: 'soilTypeLabel', optionsKey: 'soilTypeOptions', type: 'select' },
    { key: 'soilCharacter', labelKey: 'soilCharacterLabel', optionsKey: 'soilCharacterOptions', type: 'select' },
    { key: 'irrigation', labelKey: 'irrigationLabel', optionsKey: 'irrigationOptions', type: 'select' },
    { key: 'sowing', labelKey: 'sowingLabel', optionsKey: 'sowingOptions', type: 'select' },
    { key: 'sowingDate', labelKey: 'sowingDateLabel', type: 'date' },
    { key: 'cropStage', labelKey: 'cropStageLabel', optionsKey: 'cropStageOptions', type: 'select' },
    { key: 'problem', labelKey: 'problemLabel', optionsKey: 'problemOptions', type: 'select' }
];

function FormInputs({ langData, setFormData }) {
    
    // Handler to update form state in the parent FormSection component
    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        
        // This ensures all required fields are being tracked
        setFormData(prev => ({
            ...prev,
            [id]: type === 'file' ? files[0] : value
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldMap.map(field => (
                <div key={field.key} className="flex flex-col space-y-1.5">
                    <label htmlFor={field.key} className="text-sm font-semibold text-gray-600">
                        {langData[field.labelKey]}
                    </label>
                    {field.type === 'select' ? (
                        <select
                            id={field.key}
                            onChange={handleChange}
                            className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                            defaultValue={langData[field.optionsKey]?.[0]}
                        >
                            {(langData[field.optionsKey] || []).map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={field.key}
                            type={field.type}
                            onChange={handleChange}
                            className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default FormInputs;
