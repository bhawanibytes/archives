import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddCourse from "./_components/AddCourse";
import { CourseList } from "@/configs/schema";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <div>
      <AddCourse />

      <UserCourseList />
    </div>
  );
}

export default Dashboard;
