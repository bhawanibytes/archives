"use client";
import Image from "next/image";
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiMiniShieldCheck,
  HiOutlinePower,
} from "react-icons/hi2";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: "Menu",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiMiniShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <HiOutlinePower />,
      path: "/dashboard/logout",
    },
  ];
  const path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      {/* <Image src={''} width={160} height={100}/> */}
      
      <ul>
        {Menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <div
              className={` flex items-center gap-2 p-3 text-gray-600 cursor-pointer
             hover:bg-gray-100 hover:text-black rounded-lg mb-3
             ${item.path == path && "bg-gray-100 text-black"}`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out of 5 Course Created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generation
        </h2>
      </div>
    </div>
  );
}

export default SideBar;
