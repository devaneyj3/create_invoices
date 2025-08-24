import React from "react";
import styles from "./profile.module.scss";

export default function ProfileForm({ state, pending, onSubmit }) {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <div className={styles.headerIcon}>👤</div>
        <h2 className={styles.formTitle}>Complete Your Profile</h2>
        <p className={styles.formSubtitle}>
          Help us personalize your invoice experience
        </p>
      </div>

      <form action={onSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Professional Information</h3>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              <span className={styles.labelIcon}>💼</span>
              Job Title
            </label>
            <input 
              name="jobTitle" 
              type="text" 
              placeholder="e.g., Software Developer, Consultant, Freelancer" 
              defaultValue={state.jobTitle} 
              className={styles.input} 
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Contact Details</h3>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              <span className={styles.labelIcon}>📱</span>
              Phone Number
            </label>
            <input 
              name="phone" 
              type="tel" 
              placeholder="(555) 123-4567" 
              defaultValue={state.phone} 
              className={styles.input} 
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Address Information</h3>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              <span className={styles.labelIcon}>🏠</span>
              Street Address
            </label>
            <input 
              name="address" 
              type="text" 
              placeholder="123 Main Street" 
              defaultValue={state.address} 
              className={styles.input} 
            />
          </div>
          
          <div className={styles.addressRow}>
            <div className={styles.formGroup}>
              <label htmlFor="addressCity" className={styles.label}>
                <span className={styles.labelIcon}>🏙️</span>
                City
              </label>
              <input 
                name="addressCity" 
                type="text" 
                placeholder="New York" 
                defaultValue={state.addressCity} 
                className={styles.input} 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="addressState" className={styles.label}>
                <span className={styles.labelIcon}>🗺️</span>
                State
              </label>
              <input 
                name="addressState" 
                type="text" 
                placeholder="NY" 
                defaultValue={state.addressState} 
                className={styles.input} 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="addressZip" className={styles.label}>
                <span className={styles.labelIcon}>📮</span>
                ZIP Code
              </label>
              <input 
                name="addressZip" 
                type="text" 
                placeholder="10001" 
                defaultValue={state.addressZip} 
                className={styles.input} 
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            disabled={pending} 
            className={styles.submitButton}
          >
            {pending ? (
              <span className={styles.loadingState}>
                <span className={styles.spinner}></span>
                Updating Profile...
              </span>
            ) : (
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>✨</span>
                Complete Profile
              </span>
            )}
          </button>
        </div>

        {state.error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {state.error}
          </div>
        )}
        
        {state.success && (
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>🎉</span>
            Profile updated successfully!
          </div>
        )}
      </form>
    </div>
  );
} 