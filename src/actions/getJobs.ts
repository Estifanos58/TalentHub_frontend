import axios from "axios";

export async function getJobs(
  searchParams: { [key: string]: string | string[] | undefined }
) {
  // Filter out any Symbol keys and convert the searchParams object
  const filteredParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, value]) => typeof key === 'string' && value !== undefined)
  );

  const query = new URLSearchParams(filteredParams as Record<string, string>);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // console.log("Fetching jobs from:", apiUrl);

  const res = await axios.get(`${apiUrl}/jobs/?${query.toString()}`, {
    withCredentials: true,
  });

  return res.data;
}