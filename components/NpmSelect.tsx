import React from "react";

import Select from "react-select";

interface ValueOption {
  value: string;
  label: string;
}

interface NpmSelectProps {
  options: ValueOption[];
  isLoading: boolean;
  onChange: (value: any) => void;
  defaultValue?: ValueOption;
}

const NpmSelect: React.FC<NpmSelectProps> = ({
  options,
  isLoading,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      className="basic-single w-full"
      classNamePrefix="select"
      defaultValue={defaultValue || options[0]}
      isDisabled={isLoading}
      isLoading={isLoading}
      isClearable={true}
      isRtl={false}
      isSearchable={true}
      name="teacher"
      onChange={onChange}
      options={options}
    />
  );
};

export default NpmSelect;
