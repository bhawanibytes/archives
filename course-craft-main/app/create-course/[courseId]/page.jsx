"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import { CookingPot } from "lucide-react";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapter_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import { getVideos } from "@/configs/service";
import { useRouter } from "next/navigation";

function Course({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput.course_name}, Chapter:${chapter.chapter_name}, in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable`;
      console.log(PROMPT);
      console.log("index : ", index);

      try {
        let videoId = "";
        // generate video url
        getVideos(course?.name + ":" + chapter.chapter_name).then((res) => {
          videoId = res[0].id.videoId;
          console.log(videoId);
        });

        // generate chapter content
        const result = await GenerateChapter_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        // save chapter and video url
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      router.replace("/create-course/" + course?.courseId + "/finish");
    });
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl"> Course Layout</h2>

      <LoadingDialog loading={loading} />
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
