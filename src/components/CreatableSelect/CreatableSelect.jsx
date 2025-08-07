import React from 'react';
import CreatableSelect from 'react-select/creatable';

const LanguageSelect = ({options, setValue, value, placeholder, id, classProp}) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classProp}>
      <CreatableSelect
        isMulti
        options={options}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        id={id}
      />
    </div>
  );
};

export default LanguageSelect;
