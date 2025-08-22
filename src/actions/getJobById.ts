import axios from "axios";

export async function getJobById(id: string) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        withCredentials: true,
    });
    return res.data;
}