import React from "react";
import styles from "./profile.module.scss";

export default function ProfileForm({ state, pending, onSubmit }) {
  return (
    <form action={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>Phone</label>
        <input name="phone" type="tel" placeholder="Enter your phone number" defaultValue={state.phone} className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.label}>Address</label>
        <input name="address" type="text" placeholder="Enter your address" defaultValue={state.address} className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="addressCity" className={styles.label}>City</label>
        <input name="addressCity" type="text" placeholder="Enter your city" defaultValue={state.addressCity} className={styles.input} />
        <label htmlFor="addressState" className={styles.label}>State</label>
        <input name="addressState" type="text" placeholder="Enter your state" defaultValue={state.addressState} className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="addressZip" className={styles.label}>Zip</label>
        <input name="addressZip" type="number" placeholder="Enter your zip" defaultValue={state.addressZip} className={styles.input} />
      </div>
      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? "Updating..." : "Update Profile"}
      </button>
      {state.error && <div className={styles.error}>{state.error}</div>}
      {state.success && <div className={styles.success}>Profile updated!</div>}
    </form>
  );
} 