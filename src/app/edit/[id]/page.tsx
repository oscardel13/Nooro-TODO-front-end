"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

import TaskFields from "@/components/task-fields/task-fields.component";
import { getAPI, putAPI } from "@/utils/api";
import { TaskType } from "@/app/page";

export default function Edit() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || ""
  );

  // just in case
  useEffect(() => {
    const fetchTask = async () => {
      const respond = await getAPI(`/tasks/${id}`);
      const task = (await respond.data) as TaskType;
      setTitle(task.title);
      setSelectedColor(task.color ?? "");
    };

    if (!title) fetchTask();
  }, [id, title]);

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
      await putAPI(`/tasks/${id}`, payload);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-center p-4 md:py-20">
      <div className="flex flex-col max-w-[736px] w-full gap-10">
        <TaskFields
          handleTitleChange={handleTitleChange}
          handleColorClick={handleColorClick}
          selectedColor={selectedColor}
          title={title}
        />

        <button
          className="flex flex-row justify-center items-center p-4 gap-3 rounded-lg h-[52px] max-w-[736px] bg-[#1E6F9F] cursor-pointer hover:bg-[#2494d4ff]"
          onClick={handleSubmit}
        >
          <span className="font-bold">Save</span>
          <Image
            aria-hidden
            src="/checked-bold.svg"
            alt="checked-medium icon"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
