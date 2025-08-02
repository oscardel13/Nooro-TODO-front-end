"use client";

import { useState } from "react";

import TaskFields from "@/components/task-fields/task-fields.component";

import { useRouter } from "next/navigation";
import { postAPI } from "@/utils/api";
import Image from "next/image";

export default function Create() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleColorClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelectedColor(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("Please fill out title.");
      return;
    }

    const payload = {
      title,
      color: selectedColor,
    };

    try {
      await postAPI("/tasks", payload);
      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <div className="flex flex-row justify-center p-4 md:py-20">
      <div className="flex flex-col max-w-[736px] w-full m:p-0 gap-10">
        <TaskFields
          handleTitleChange={handleTitleChange}
          handleColorClick={handleColorClick}
          selectedColor={selectedColor}
          title={title}
        />

        <button
          className="flex flex-row justify-center items-center p-4 gap-3 rounded-lg h-[52px] max-w-[736px] bg-[#1E6F9F] gap-2 cursor-pointer hover:bg-[#2494d4ff]"
          onClick={handleSubmit}
        >
          <span>Add Task</span>
          <Image
            aria-hidden
            src="/plus.svg"
            alt="plus icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
