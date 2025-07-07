"use client";
import { createContext, useContext, useState, useMemo } from "react";

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

  // Memoize the context value to prevent infinite re-renders
  const contextValue = useMemo(() => ({
    formState,
    setFormState
  }), [formState]);
  
  return (
    <InvoiceForm.Provider value={contextValue}>
      {children}
    </InvoiceForm.Provider>
  );

}
export const useInvoiceForm = () => {
  return useContext(InvoiceForm);
};
  
