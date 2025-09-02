"use client";

import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import { db } from "@/configs/db";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  // get course info
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="md:w-[20%] w-full md:h-screen h-auto border-r shadow-sm bg-white">
        <h2 className="font-medium text-lg bg-primary p-4 text-white text-center">
          {course?.courseOutput?.course_name}
        </h2>
        <div className="divide-y">
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 hover:bg-purple-50 transition-colors ${
                selectedChapter?.name === chapter?.chapter_name &&
                "bg-purple-100"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </main>
    </div>
  );
}

export default CourseStart;
