'use client';

import { signIn } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useAuth } from '@/context/authContext';
import CompanyForm from '../CompanyForm/CompanyForm';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function SignedInUser() {
  const { signedInUser } = useAuth();
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [loading, setLoading] = useState(false);
  
  const runCron = async () => {
	setLoading(true);
	try {
		const res = await fetch('/api/test-cron', { method: 'GET', cache: 'no-store' });
		const data = await res.json();
		console.log('Triggered:', data);
	} catch (e) {
		console.error(e);
		alert('Failed to trigger');
	} finally {
		setLoading(false);
	}
};
  if (signedInUser) {
    return (
      <div className={styles.profileContainer}>
        <Button onClick={runCron} disabled={loading}>
	{loading ? 'Running…' : 'Run Cron Job'}
</Button>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {signedInUser.name ? signedInUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.welcomeTitle}>Welcome back, {signedInUser.name}!</h1>
              <p className={styles.userEmail}>{signedInUser.email}</p>
            </div>
          </div>
          
          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {signedInUser.profileComplete ? '100%' : '60%'}
              </span>
              <span className={styles.statLabel}>Profile Complete</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>✨</span>
              <span className={styles.statLabel}>Ready to Invoice</span>
            </div>
          </div>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <span className={styles.infoIcon}>💼</span>
                <h3 className={styles.infoTitle}>Job Title</h3>
              </div>
              <p className={styles.infoValue}>
                {signedInUser.jobTitle || 'Not set'}
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <span className={styles.infoIcon}>📱</span>
                <h3 className={styles.infoTitle}>Phone</h3>
              </div>
              <p className={styles.infoValue}>
                {signedInUser.phone || 'Not set'}
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <span className={styles.infoIcon}>🏠</span>
                <h3 className={styles.infoTitle}>Address</h3>
              </div>
              <p className={styles.infoValue}>
                {signedInUser.address || 'Not set'}
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <span className={styles.infoIcon}>🌆</span>
                <h3 className={styles.infoTitle}>Location</h3>
              </div>
              <p className={styles.infoValue}>
                {signedInUser.city && signedInUser.state && signedInUser.zip 
                  ? `${signedInUser.city}, ${signedInUser.state} ${signedInUser.zip}`
                  : 'Not set'
                }
              </p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button 
              className={styles.primaryButton} 
              onClick={() => setShowAddCompany(true)}
            >
              <span className={styles.buttonIcon}>🏢</span>
              Add Company
            </button>
            
            <button className={styles.secondaryButton}>
              <span className={styles.buttonIcon}>📝</span>
              Edit Profile
            </button>
          </div>

          {showAddCompany && (
            <div className={styles.companyFormOverlay}>
              <CompanyForm setShowAddCompany={setShowAddCompany} />
            </div>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.notSignedInContent}>
        <div className={styles.notSignedInIcon}>🔒</div>
        <h2 className={styles.notSignedInTitle}>Not Signed In</h2>
        <p className={styles.notSignedInText}>
          Please sign in to access your profile and create invoices
        </p>
        <button className={styles.signInButton} onClick={() => signIn()}>
          <span className={styles.buttonIcon}>🚀</span>
          Sign In
        </button>
      </div>
    </div>
  )
} 