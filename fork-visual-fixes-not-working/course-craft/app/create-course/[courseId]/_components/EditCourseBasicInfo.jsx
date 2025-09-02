import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";

function EditCourseBasicInfo({ course }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const onUpdateHandler = async () => {
    course.courseOutput.course_name = name;
    course.courseOutput.description = description;

    const result = await db.update(CourseList).set({
      courseOutput: cour,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div>
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.course_name}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label>Course Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.description}
                onChange={(event) => setDescription(event?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
