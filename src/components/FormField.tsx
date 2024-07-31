// src/components/FormField.tsx

import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  type?: string;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, error, type = "text", ...props }) => (
  <div className="text-left">
    <label htmlFor={id} className="block text-sm font-medium">{label}</label>
    <input
      id={id}
      type={type}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      {...props}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default FormField;
