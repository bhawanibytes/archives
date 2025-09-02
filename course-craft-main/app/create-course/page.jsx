"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { act, useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourse_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

let id = 111;
const id_generator = () => {
  const current_id = id;
  id = id + 1;
  return current_id;
};

function CreateCourse() {
  const router = useRouter();
  const { user } = useUser();
  console.log("user is : ", user);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 1,
      name: "Topic",
      icon: <HiLightBulb />,
    },
    {
      id: 1,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  // next btn status
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };
  const [loading, setLoading] = useState(false);

  const GenerateCourse = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate a comprehensive JSON-formatted course outline based on the following requirements. Include key details such as the Course Name, Description, Chapter breakdown (with Chapter Name, Description, and Duration for each chapter), and an overall course summary \n";
    const USER_PROMPT = `Category : ${userCourseInput?.category}, Topic : ${userCourseInput?.topic}, Level : ${userCourseInput?.level}, Duration : ${userCourseInput?.duration}, Chapter : ${userCourseInput?.noOfChapter}`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourse_AI.sendMessage(FINAL_PROMPT);
    console.log(JSON.parse(result?.response?.text()));
    setLoading(false);
    SaveCourseInDb(JSON.parse(result?.response?.text()));
  };

  const SaveCourseInDb = async (course) => {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: course,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });

    console.log("finish");
    setLoading(false);
    router.replace("/create-course/" + id);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-primary font-medium text-4xl">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={id_generator()} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white
                ${activeIndex >= index && "bg-primary"}`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 m-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300
                  ${activeIndex - 1 >= index && "bg-purple-500"}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* component  */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption></SelectOption>
        )}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button disabled={checkStatus()} onClick={() => GenerateCourse()}>
              Generate Course
            </Button>
          )}
        </div>
      </div>
      <div>
        <LoadingDialog loading={loading} />
      </div>
    </>
  );
}

export default CreateCourse;
