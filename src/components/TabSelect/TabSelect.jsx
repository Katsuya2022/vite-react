import React from 'react';
import CreatableSelect from 'react-select/creatable';

const TabSelect = ({options, setValue, value, placeholder, id, classProp, styles}) => {
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
        styles={styles}
      />
    </div>
  );
};

export default TabSelect;
