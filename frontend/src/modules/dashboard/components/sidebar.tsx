import { Card, CardBody, CardTitle } from "@/modules/common/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: "/icons/icon_dashboard_.svg",
    active: true,
    count: 2,
  },
  {
    title: "Insights",
    url: "/",
    icon: "/icons/icon _insights_.svg",
  },
  {
    title: "Tasks",
    url: "/",
    icon: "/icons/icon _pencil_.svg",
  },
  {
    title: "Sales",
    url: "/",
    icon: "/icons/icon _CLean Hands_.svg",
  },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-full md:w-[22rem]"
      } md:min-h-[51rem] h-full transition-width duration-300`}
    >
      <div className="flex md:hidden justify-between  mb-4 p-4">
        <h2 className="text-2xl">Menu</h2>
        <button
          className="text-gray-dark"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />} */}
        </button>
      </div>

      <Card
        className={`h-full ${isMobileMenuOpen ? "block" : "hidden md:block"}`}
      >
        <CardBody className="flex flex-col h-full justify-between">
          <div>
            <CardTitle className="hidden md:flex items-center justify-between">
              {!isCollapsed && <h2>Menu</h2>}
              <button
                className={`text-[#CCCCCC] ${
                  isCollapsed ? "ml-auto mr-auto" : ""
                }`}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
              </button>
            </CardTitle>
            <div className="space-y-2 md:space-y-3">
              {menuItems.map((item, ind) => (
                <div
                key={ind}
                className={`flex items-center ${
                  item.active ? "bg-primary" : "hover:bg-primary/40"
                }  transition-all p-2 rounded-md`}
              >
                <div className={`relative flex-shrink-0 ${isCollapsed ? "mx-auto" : ""}`}>
                  <Image
                    src={item.icon}
                    width={23}
                    height={23}
                    alt="dash icons"
                    className="object-cover"
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="ml-2 font-darker text-lg font-medium">
                      {item.title}
                    </span>
                    {item.count && (
                      <div className="ml-auto bg-white rounded-full p-1 w-6 h-6 flex items-center justify-center border border-gray-200">
                        <span className="text-xs font-medium">
                          {item.count}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              ))}
            </div>
          </div>

          <div>
            {!isCollapsed && (
              <div className="bg-primary rounded-2xl p-4 md:p-5">
                <h3 className="font-semibold text-lg md:text-xl">
                  Upgrade Plan
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-lexend font-light text-xs my-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            )}

            <div
              className={`mt-8 md:mt-16 space-y-4 ${
                isCollapsed ? "px-1" : "px-4"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${isCollapsed ? "mx-auto" : ""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                {!isCollapsed && (
                  <span className="font-darker text-lg md:text-xl text-black tracking-tighter">
                    FAQs
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className={`${isCollapsed ? "mx-auto" : ""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-700"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </div>
                {!isCollapsed && (
                  <span className="font-darker text-lg md:text-xl tracking-tighter text-red-700">
                    Log Out
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
