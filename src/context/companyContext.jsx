'use client'
import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

export const CompanyContext = createContext({});

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  // Fetch companies for the current user
  useEffect(() => {
    const fetchCompanies = async () => {
      if (!session?.user?.id) {
        setCompanies([]);
        setSelectedCompany(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/companies?userId=${session.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data);
        if (data.length > 0) setSelectedCompany(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (status === "authenticated") {
      fetchCompanies();
    }
  }, [session?.user?.id, status]);

  // Create a new company
  const createCompany = async (companyData) => {
    if (!session?.user?.id) return null;
    setError(null);
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...companyData, userId: session.user.id }),
      });
      if (!res.ok) throw new Error('Failed to create company');
      const newCompany = await res.json();
      setCompanies(prev => [...prev, newCompany.company]);
      if (!selectedCompany) setSelectedCompany(newCompany);
      return newCompany;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Update a company
  const updateCompany = async (companyId, companyData) => {
    setError(null);
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });
      if (!res.ok) throw new Error('Failed to update company');
      const updatedCompany = await res.json();
      setCompanies(prev => prev.map(c => c.id === companyId ? updatedCompany : c));
      if (selectedCompany?.id === companyId) setSelectedCompany(updatedCompany);
      return updatedCompany;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Delete a company
  const deleteCompany = async (companyId) => {
    setError(null);
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete company');
      setCompanies(prev => prev.filter(c => c.id !== companyId));
      if (selectedCompany?.id === companyId) setSelectedCompany(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const contextValue = useMemo(() => ({
    companies,
    setCompanies,
    selectedCompany,
    setSelectedCompany,
    isLoading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
  }), [companies, selectedCompany, isLoading, error]);

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);