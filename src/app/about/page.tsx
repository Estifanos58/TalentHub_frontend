export default function AboutPage() {
  return (
    <div className=" bg-background dark:bg-background-dark text-primary dark:text-primary-dark flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-dark">
          About This Project
        </h1>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          This project is a **Job Test** from <span className="font-semibold">MO Business PLC</span>. 
          It was built in **three days** as a demonstration of full-stack development skills.
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The <span className="font-semibold">backend</span> is built using <span className="text-primary dark:text-primary-dark font-medium">ExpressJs </span> 
          and <span className="text-primary dark:text-primary-dark font-medium">MongoDB</span> to handle job postings, user authentication, and applications.
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The <span className="font-semibold">frontend</span> is built with <span className="text-primary dark:text-primary-dark font-medium">NextJs</span> 
          and <span className="text-primary dark:text-primary-dark font-medium">TailwindCSS</span> to provide a responsive and modern user interface. 
          The application supports **dark mode** and is mobile-friendly.
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          This project showcases the ability to build a **complete full-stack application** in a short timeframe, with proper 
          state management, API integration, and clean UI design.
        </p>
      </div>
    </div>
  );
}
