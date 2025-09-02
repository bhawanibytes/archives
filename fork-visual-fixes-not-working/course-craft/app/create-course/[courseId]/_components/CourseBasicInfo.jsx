import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

function CourseBasicInfo({ course }) {
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course_name}{" "}
            {/* <EditCourseBasicInfo course={course} />{" "} */}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece />
            {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
          <Image
            src={"/course_img_placeholder.jpg"}
            width={300}
            height={300}
            className="w-full rounded-xl h-[250px] object-cover"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
