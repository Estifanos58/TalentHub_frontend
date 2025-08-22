'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getUser = async () => {
    // console.log("Fetching user...");
    const cookie = await cookies();
    const token = cookie.get('token')?.value;

    // console.log("Cookie token:", token);
    if (!token) {
        return null; // No token found, user is not authenticated
    }

    // console.log("Token found:", token);

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        console.log('PUBLIC URL: ', apiUrl)

        const response = await axios.get(`${apiUrl}/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        // console.log("User fetch response:", response);

        if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
        }

        return response.data.data; 
    } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null if there's an error
    }
}