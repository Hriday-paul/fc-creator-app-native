import { IAuthResponse, IUser } from '@/redux/types';

// Frontend-only mode: stand-in data used while API calls are commented out.
// Search the codebase for "TODO(api)" to find every place to re-enable.

export const mockUser: IUser = {
    id: 'mock-user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+8801700000000',
    picture: null,
    auth: { role: 'USER', status: true },
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
};

export const mockCredentials: IAuthResponse = {
    user: mockUser,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
};

/** Mock member ID (Email / Member ID sign-in accepts this format: MEM-<digits>). */
export const mockMemberId = 'MEM-68986';
