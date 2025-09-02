import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";

function CourseCard({ course }) {
  return (
    <div className="shadow-md rounded-lg border p-2 cursor-pointer mt-4 hover:border-primary">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={"/course_img_placeholder.jpg"}
          width={300}
          height={300}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg">
          {course?.courseOutput.course_name}
        </h2>

        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen /> {course?.courseOutput?.chapters?.length}{" "}
            Chapters{" "}
          </h2>
          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.level}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
