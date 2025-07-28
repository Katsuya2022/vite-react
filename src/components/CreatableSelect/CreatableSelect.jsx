import React from 'react';
import CreatableSelect from 'react-select/creatable';

const LanguageSelect = ({options, setValue, value, placeholder, id}) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <label htmlFor={id}>使用言語</label>
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
