import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <label>
          Write the topic for which you want to generate the course (e.g.
          Python, Algebra, Optics)
        </label>
        <Input
          placeholder={"Topic"}
          className="h-14 text-xl"
          defaultValue={userCourseInput?.topic}
          onChange={(event) => handleInputChange("topic", event.target.value)}
        />
      </div>

      <div className="mt-5">
        <label>
          Enter more details about the course like topics you want to include
          (optional)
          <Textarea
            placeholder={"Tell more about the course"}
            className="h-24 text-xl"
            defaultValue={userCourseInput?.description}
            onChange={(event) =>
              handleInputChange("description", event.target.value)
            }
          />
        </label>
      </div>
    </div>
  );
}

export default TopicDescription;
