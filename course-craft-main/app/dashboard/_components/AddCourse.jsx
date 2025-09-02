"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function AddCourse() {
  const { user } = useUser();
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-3xl">
          Hello,
          <span className="font-bold"> {user?.fullName}</span>
          <p className="text-sm text-gray-500">
            Create course with course craft and share with friends!
          </p>
        </h2>
      </div>
      <Link href={"/create-course"}>
        <Button>+ Create Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
