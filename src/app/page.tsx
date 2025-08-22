
export default function Home() {
  return (
    <div className=" min-h-screen  bg-background dark:bg-background-dark text-primary dark:text-primary-dark flex flex-col items-center justify-center px-4">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-amber-300">TalentHub</span>
        </h1>

        <hr className="border-gray-300 dark:border-gray-700 w-24 mx-auto" />

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
          Here at <span className="font-semibold">TalentHub</span>, we connect industries with top talent. 
          Our platform bridges the gap between job seekers and employers, helping companies find the right candidates quickly 
          while giving professionals the opportunity to grow their careers. Whether you’re looking for your next opportunity 
          or seeking skilled talent for your organization, TalentHub makes the connection seamless, efficient, and impactful.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a
            href="/jobs"
            className="px-6 py-3 bg-primary dark:bg-primary-dark text-white font-semibold rounded-md hover:bg-secondary dark:hover:bg-secondary-dark transition-colors"
          >
            Explore Jobs
          </a>
          <a
            href="/register"
            className="px-6 py-3 border border-primary dark:border-primary-dark text-primary dark:text-primary-dark font-semibold rounded-md hover:bg-secondary dark:hover:bg-secondary-dark hover:text-white transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
