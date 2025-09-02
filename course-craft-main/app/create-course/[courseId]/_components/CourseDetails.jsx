import React from "react";
import {
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlinePlay,
} from "react-icons/hi2";

function CourseDetails({ course }) {
  function calculateDuration() {
    const chapterArr = course?.courseOutput?.chapters;
    let totalTime = 0;
    if (chapterArr) {
      for (const chapter of chapterArr) {
        let time = (chapter?.duration.split(" "))[0];
        let timeInInt = parseInt(time);
        totalTime += timeInInt;
      }
    }
    totalTime = totalTime / 60;
    return `${totalTime} hours`;
  }
  calculateDuration();
  return (
    <div className="border p-5 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-primary  text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <HiOutlineClock className="text-primary  text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">{calculateDuration()}</h2>
          </div>
        </div> */}

        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-primary  text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">No of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.chapters?.length}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlay className="text-primary  text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
