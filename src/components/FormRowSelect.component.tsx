import React from 'react';

export interface FormRowSelectProps {
  list: string[];
  name: string;
  value: string;
  labelText: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormRowSelect = ({
  list,
  name,
  value,
  labelText,
  handleChange,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor="status" className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-select"
        onChange={handleChange}
      >
        {list.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
