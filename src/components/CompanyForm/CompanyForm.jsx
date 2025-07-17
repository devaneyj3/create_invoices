import React, { useActionState, useEffect } from "react";
import styles from "./CompanyForm.module.scss";
import { addCompany } from "@/app/lib/actions";
import { useCompany } from "@/context/companyContext";

const initialState = {
  companyName: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyZip: "",
  error: "",
  success: false,
};

export default function CompanyForm({setShowAddCompany}) {
  const [state, action, pending] = useActionState(addCompany, initialState);
  const {createCompany} = useCompany()
  
  useEffect(() => {
  if (state.success) {
    createCompany(state); 
    setTimeout(() => {
      setShowAddCompany(false);
    }, 3000);
  }
  }, [state]);
  
  const submitCompany = async () => {
    setTimeout(() => {
      setShowAddCompany(false)

    }, 3000)
  }


  return (
    <div>
      <h2 className={styles.title}>Add a Company</h2>
      <form action={action} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName" className={styles.label}>Company Name</label>
          <input
            name="companyName"
            type="text"
            placeholder="Enter company name"
            className={styles.input}
            required
            defaultValue={state.companyName}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="companyAddress" className={styles.label}>Company Address</label>
          <input
            name="companyAddress"
            type="text"
            placeholder="Enter company address"
            className={styles.input}
            required
            defaultValue={state.companyAddress}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="companyCity" className={styles.label}>Company City</label>
          <input
            name="companyCity"
            type="text"
            placeholder="Enter company city"
            className={styles.input}
            required
            defaultValue={state.companyCity}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="companyState" className={styles.label}>Company State</label>
          <input
            name="companyState"
            type="text"
            placeholder="Enter company state"
            className={styles.input}
            required
            defaultValue={state.companyState}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="companyZip" className={styles.label}>Company Zip</label>
          <input
            name="companyZip"
            type="text"
            placeholder="Enter company zip"
            className={styles.input}
            required
            defaultValue={state.companyZip}
          />
        </div>
        <button type="submit" disabled={pending} className={styles.button} onClick={submitCompany}>
          {pending ? "Adding..." : "Add Company"}
        </button>
        {state.error && <div className={styles.error}>{state.error}</div>}
        {state.success && <div className={styles.success}>Company added!</div>}
      </form>
    </div>
  );
} 