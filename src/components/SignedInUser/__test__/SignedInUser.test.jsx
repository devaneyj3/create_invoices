// src/components/__tests__/SignedInUser.test.jsx
import { render, screen } from '@testing-library/react';
import SignedInUser from '../SignedInUser';

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '8888888888',
        address: '333 Chicago Blvd',
        city: 'Chicago',
        state: 'IL',
        zip: '48402',
      },
    },
    status: 'authenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// If you use useAuth, you may need to mock that too
vi.mock('../../../context/authContext', () => ({
  useAuth: () => ({
    setSignedInUser: vi.fn(),
    fetchUser: vi.fn().mockResolvedValue({
      name: 'Test User',
      email: 'test@example.com',
    }),
  }),
}));

describe('SignedInUser', () => {
  it('shows signed in user', () => {
    render(<SignedInUser />);
    expect(screen.getByText(/Welcome, Test User!/)).toBeInTheDocument();
    expect(screen.getByText(/Email: test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 8888888888/)).toBeInTheDocument();
    expect(screen.getByText(/Address: 333 Chicago Blvd/)).toBeInTheDocument();
    expect(screen.getByText(/City: Chicago/)).toBeInTheDocument();
    expect(screen.getByText(/State: IL/)).toBeInTheDocument();
    expect(screen.getByText(/Zip: 48402/)).toBeInTheDocument();
  });
});