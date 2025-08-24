import { getUser } from "@/actions/getUser";
import EmployerJobContent from "@/components/EmployerJobContent";
import { Suspense } from "react";

const EmployerJobsPage = async() => {
  const response = await getUser()
  // console.log('EmployerJobsPage user response:', response);
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EmployerJobContent userId={response.data._id}/>
    </Suspense>
  )
}

export default EmployerJobsPage;