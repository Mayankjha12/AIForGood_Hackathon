import React from 'react';

// Syncing keys with Backend Model (Farm.js)
const fieldMap = [
    { key: 'landSize', labelKey: 'landSizeLabel', optionsKey: 'landSizeOptions', type: 'select' },
    { key: 'crop', labelKey: 'cropLabel', optionsKey: 'cropOptions', type: 'select' },
    { key: 'soilType', labelKey: 'soilTypeLabel', optionsKey: 'soilTypeOptions', type: 'select' },
    { key: 'soilCharacter', labelKey: 'soilCharacterLabel', optionsKey: 'soilCharacterOptions', type: 'select' },
    // ID changed to 'irrigationSource' to match Backend
    { key: 'irrigationSource', labelKey: 'irrigationLabel', optionsKey: 'irrigationOptions', type: 'select' },
    { key: 'sowingType', labelKey: 'sowingLabel', optionsKey: 'sowingOptions', type: 'select' },
    { key: 'sowingDate', labelKey: 'sowingDateLabel', type: 'date' },
    { key: 'cropStage', labelKey: 'cropStageLabel', optionsKey: 'cropStageOptions', type: 'select' },
    { key: 'currentProblem', labelKey: 'problemLabel', optionsKey: 'problemOptions', type: 'select' }
];

function FormInputs({ langData, setFormData, formData, onLocationDetect }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Field with Auto-detect */}
            <div className="flex flex-col space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="fa-solid fa-location-crosshairs text-green-600"></i>
                    Location (City, State)
                </label>
                <div className="flex gap-2">
                    <input
                        id="location"
                        type="text"
                        readOnly
                        value={formData.location || ""}
                        placeholder="Click Detect to find your City/State"
                        className="flex-1 p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none"
                    />
                    <button
                        type="button"
                        onClick={onLocationDetect}
                        className="px-4 bg-green-100 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-200 transition-all text-xs"
                    >
                        Detect
                    </button>
                </div>
            </div>

            {/* Dynamic Fields */}
            {fieldMap.map(field => (
                <div key={field.key} className="flex flex-col space-y-1.5">
                    <label htmlFor={field.key} className="text-sm font-semibold text-gray-600">
                        {langData[field.labelKey]}
                    </label>
                    {field.type === 'select' ? (
                        <select
                            id={field.key}
                            onChange={handleChange}
                            className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                            defaultValue={langData[field.optionsKey]?.[0]}
                        >
                            {(langData[field.optionsKey] || []).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={field.key}
                            type={field.type}
                            onChange={handleChange}
                            className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
export default FormInputs;
