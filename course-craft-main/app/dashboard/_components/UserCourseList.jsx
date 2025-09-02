"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

function UserCourseList() {
  const [courseList, setUserCourseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setUserCourseList(result);
  };
  return (
    <div>
      <h2 className="font-bold text-xl">My Courses</h2>

      <div className="grid grid-cols-2 md:grid-3 md:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-slate-200 animate-pulse rounded-lg h-[270px] mt-5 "
                ></div>
              );
            })}
      </div>
    </div>
  );
}

export default UserCourseList;
