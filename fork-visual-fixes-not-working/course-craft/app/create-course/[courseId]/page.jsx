"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import { CookingPot } from "lucide-react";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapter } from "@/configs/AiModel";

function Course({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  };

  const GenerateChapterContent = () => {
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput.course_name}, Chapter:${chapter.chapter_name}, in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable`;
      const result = await GenerateChapter.sendMessage(PROMPT);
      console.log(index);
      console.log(JSON.parse(result?.response?.text()));
    });
  };

  // const GenerateCourse = async () => {
  //   setLoading(true);
  //   const BASIC_PROMPT =
  //     "Generate a comprehensive JSON-formatted course outline based on the following requirements. Include key details such as the Course Name, Description, Chapter breakdown (with Chapter Name, Description, and Duration for each chapter), and an overall course summary \n";
  //   const USER_PROMPT = `Category : ${userCourseInput?.category}, Topic : ${userCourseInput?.topic}, Level : ${userCourseInput?.level}, Duration : ${userCourseInput?.duration}, Chapter : ${userCourseInput?.noOfChapter}`;
  //   const FINAL_PROMPT = BASIC_PROMPT + USER_PROMPT;
  //   console.log(FINAL_PROMPT);
  //   const result = await GenerateCourse_AI.sendMessage(FINAL_PROMPT);
  //   console.log(JSON.parse(result?.response?.text()));
  //   setLoading(false);
  //   SaveCourseInDb(JSON.parse(result?.response?.text()));
  // };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl"> Course Layout</h2>

      {/* Basic Course Info */}
      <CourseBasicInfo course={course} />
      <CourseDetails course={course} />
      <ChapterList course={course} />
      <Button className="my-10" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default Course;
