import React from 'react';

interface Props {
  type: string;
  name: string;
  value: string;
  labelText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({ type, name, value, labelText, handleChange }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
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
