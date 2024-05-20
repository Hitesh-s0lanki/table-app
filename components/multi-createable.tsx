import React from "react";

import CreatableSelect from "react-select/creatable";

interface SelectProps {
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const MultiCreatableSelect = ({
  value,
  onChange,
  options,
  disabled,
}: SelectProps) => {
  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      isMulti
      options={options}
      isDisabled={disabled}
    />
  );
};

export default MultiCreatableSelect;
