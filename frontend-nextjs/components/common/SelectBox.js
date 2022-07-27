import React, { useState } from "react";
import Select from "react-select";
import "./SelectBox.module.css";

const options = [
    { value: "value 1", label: "value 1"},
    { value: "value 2", label: "value 2"},
    { value: "value 3", label: "value 3"},
    { value: "value 4", label: "value 4"},
    { value: "value 5", label: "value 5"},
];

const SelectBox = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    return (
        
        <Select 
            className ="select"
            isMulti
            onChange={(item) => setSelectedOptions(item)}
            options={options}
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
        />
    );
};

export default SelectBox