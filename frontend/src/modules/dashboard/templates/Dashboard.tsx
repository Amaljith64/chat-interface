"use client";
import Navbar from "../components/dash-nav";
import Sidebar from "../components/sidebar";



interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {



  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto p-4 md:p-6 lg:p-8">
        <Navbar />

        <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 lg:gap-8 mt-8 h-full ">
          <div className="w-full md:w-auto md:flex-shrink-0 h-full flex">
            <Sidebar />
          </div>

        {children}
          
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
