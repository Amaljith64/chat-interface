"use client";
import ProfileAvatar from "@/modules/dashboard/components/avatar";
import InsightsPanel from "@/modules/dashboard/components/insights";
import SmallCard from "@/modules/dashboard/components/small-card";
import Dashboard from "@/modules/dashboard/templates/Dashboard";
import { getData } from "@/services/api/data/data";
import { escalationDataType, groupDataType, taskDataType } from "@/types/data";
import { Suspense, useEffect, useState } from "react";

interface dataState {
  groupData: groupDataType[];
  escalationData: escalationDataType[];
  taskData: taskDataType[];
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(true);
  const [data, setData] = useState<dataState>({
    groupData: [],
    escalationData: [],
    taskData: [],
  });

  const handleOpen = () => {
    setChatOpen(!chatOpen);
  };

  const getAllData = async () => {
    try {
      const resp = await getData();
      setData(resp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Dashboard>
      <div className="w-full flex-1 flex flex-col h-full">
        <div
          className={` grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8 transition-all duration-300 ease-in-out ${
            chatOpen ? "grid" : "hidden"
          }`}
        >
          <SmallCard className={"md:px-5"} title={"groups"}>
            <div className={"space-y-1"}>
              {data.groupData &&
                data.groupData.map((data, ind) => (
                  <div
                    key={ind}
                    className={`relative flex items-center rounded-md p-2
                    ${data.highlight ? "bg-[#f9d0d3]" : "hover:bg-[#f3f3f3]"}`}
                  >
                    <ProfileAvatar />
                    <span className="font-darker text-lg md:text-xl leading-[27px] tracking-tighter ml-3">
                      {data.title}
                    </span>
                    <div className="ml-auto bg-white rounded-full p-1 w-6 h-6 flex items-center justify-center border border-gray-200">
                      <span className="text-xs font-medium">{data.count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </SmallCard>
          <SmallCard className={"md:px-5"} title={"tasks"}>
            <div className={"space-y-1"}>
              {data.taskData &&
                data.taskData.map((data, ind) => (
                  <div
                    key={ind}
                    className={`relative flex flex-col rounded-md p-2
                ${data.highlight ? " bg-[#fff0cc]" : "bg-[#f3f3f3]"}`}
                  >
                    <span className="font-lexend font-light text-lg  leading-[27px] tracking-tighter ml-1">
                      {data.title}
                    </span>
                    <span className="ml-1 underline text-xs text-gray-500">
                      view conversation
                    </span>
                  </div>
                ))}
            </div>
          </SmallCard>
          <SmallCard className={"md:px-5"} title={"Escalations"}>
            <div className={"space-y-1"}>
              {data.escalationData &&
                data.escalationData.map((data, ind) => (
                  <div
                    key={ind}
                    className={`relative flex flex-col rounded-md p-2
                ${data.highlight ? " bg-[#f9d0d3]" : "bg-[#f3f3f3]"}`}
                  >
                    <span className="ml-1 underline text-xs text-gray-500">
                      {data.sub_heading}
                    </span>
                    <span className="font-lexend font-light text-lg  leading-[27px] tracking-tighter ml-1">
                      {data.title}
                    </span>
                    <span className="ml-1 underline text-xs text-gray-500 flex gap-1">
                      <ProfileAvatar size="sm" /> {data.user_name}
                    </span>
                  </div>
                ))}
            </div>
          </SmallCard>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <InsightsPanel open={chatOpen} handleOpen={handleOpen} />
        </Suspense>
      </div>
    </Dashboard>
  );
}
