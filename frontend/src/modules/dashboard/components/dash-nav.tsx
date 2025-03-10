"use client"
import ProfileAvatar from "./avatar";


const Navbar = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl border border-border w-full h-auto py-4 md:py-6 lg:h-32 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-0">
          <ProfileAvatar size="lg" src="https://avatar.iran.liara.run/public/boy" alt="John" />
          <div className="flex flex-col items-start">
            <h1 className=" text-4xl font-medium ">Good Morning, John</h1>
            <p className=" font-lexend font-light text-sm md:text-base lg:text-xl text-secondary">Hope your day goes organised!</p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <ProfileAvatar size="md" alt="Home" />
              <ProfileAvatar size="md" alt="Office" />
              <ProfileAvatar size="md" alt="People" />
              <ProfileAvatar size="md" alt="Heroes" />
            </div>
            <span className="text-xl">...</span>
            <div className="ml-4 border border-gray-200 rounded-xs px-2 py-1">
              <span className="text-xs">@ 23</span>
            </div>
          </div>
          <p className="font-darker font-medium  md:text-lg lg:text-xl leading-tight md:leading-[21px] tracking-tighter max-w-[225px] mt-2">
            You have received <span className="text-[#E63946]">132</span>  messages since you last logged in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;