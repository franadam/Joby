import React from 'react';

export interface FormRowProps {
  type: string;
  name: string;
  value: string;
  labelText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({
  type,
  name,
  value,
  labelText,
  handleChange,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
