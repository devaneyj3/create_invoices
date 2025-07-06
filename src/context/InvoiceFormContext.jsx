"use client";
import { createContext, useContext, useState } from "react";

export const InvoiceForm = createContext({});

export const InvoiceFormProvider = ({ children, overrides = {} }) => {
  const [formState, setFormState] = useState({
    invoiceNumber: "",
    amount: "",
    to: "",
    jobTitle: "",
    jobType: "",
    jobDescription: "",
    success: "",
    error: ""
  });

  
  return (
    <InvoiceForm.Provider
      value={{
        formState,
        setFormState
      }}>
      {children}
    </InvoiceForm.Provider>
  );

}
export const useInvoiceForm = () => {
  return useContext(InvoiceForm);
};
  
