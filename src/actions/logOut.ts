'use server';
import { cookies } from "next/headers";

export const logOut = async () => {
    try{
        const cookie = await cookies();
        const token = cookie.get('token')?.value;

        if(!token) {
            throw new Error('No token found');
        }

        cookie.delete('token');

    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}