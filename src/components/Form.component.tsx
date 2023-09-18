import React from 'react';
import FormRow, { FormRowProps } from './FormRow.component';
import FormRowSelect, { FormRowSelectProps } from './FormRowSelect.component';

export enum RowType {
  INPUT = 'input',
  SELECT = 'select',
}

interface Props {
  type: RowType.INPUT | RowType.SELECT;
  items: FormRowProps[] | FormRowSelectProps[];
}

const Form = ({ type, items }: Props): JSX.Element => {
  //console.log('Form items', items);
  return (
    <>
      {items.map((item) => {
        if (type === RowType.INPUT) {
          const inputRow = item as FormRowProps;
          return (
            <FormRow
              key={inputRow.name}
              type={inputRow.type}
              name={inputRow.name}
              value={inputRow.value}
              labelText={inputRow.labelText}
              handleChange={inputRow.handleChange}
            />
          );
        } else {
          const selectRow = item as FormRowSelectProps;
          return (
            <FormRowSelect
              key={selectRow.name}
              list={selectRow.list}
              name={selectRow.name}
              value={selectRow.value}
              labelText={selectRow.labelText}
              handleChange={selectRow.handleChange}
            />
          );
        }
      })}
    </>
  );
};

export default Form;
