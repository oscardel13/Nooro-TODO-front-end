"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import Popover from "../popover/popover.component";

import { putAPI, deleteAPI } from "@/utils/api";
import { TaskType } from "@/app/page";

type Task = {
  task: TaskType;
  onTaskUpdate: (updated: TaskType) => void;
  onTaskDelete: (deletion: TaskType) => void;
};

export default function TaskCard(props: Task) {
  const { task, onTaskUpdate, onTaskDelete } = props;
  const { id, title, color, completed } = task;
  const [showDeletePopover, setShowDeletePopover] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(completed);

  const handleDelete = async () => {
    try {
      await deleteAPI(`/tasks/${id}`);
      onTaskDelete(task);
      setShowDeletePopover(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePopover = () => {
    setShowDeletePopover((showPopover) => !showPopover);
  };

  const handleChecked = async () => {
    const payload = { completed: !completed, id: id };
    try {
      const respond = await putAPI(`/tasks/${id}`, payload);
      const updatedTask = respond.data as TaskType;
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row p-1 py-2 sm:p-2  min-h-[72px] bg-[#262626] w-full rounded-lg border border-[#333333] shadow-lg">
      {showDeletePopover && (
        <Popover closeTrigger={handleDeletePopover}>
          <div className="flex flex-col gap-4">
            <span>Are you sure you want to delete this task?</span>
            <div className="flex flex-row justify-between gap-4">
              <button
                className="flex flex-row justify-center items-center p-4 gap-3 rounded-lg h-[52px] max-w-[736px] bg-red-700 gap-2 cursor-pointer hover:bg-red-500"
                onClick={handleDelete}
              >
                <span>Delete</span>
              </button>
              <button
                className="flex flex-row justify-center items-center p-4 gap-3 rounded-lg h-[52px] max-w-[736px] bg-[#1E6F9F] gap-2 cursor-pointer hover:bg-[#2494d4ff]"
                onClick={handleDeletePopover}
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </Popover>
      )}
      <div className="flex justify-start items-start w-1/12">
        <button className="cursor-pointer" onClick={handleChecked}>
          {completed ? (
            <Image
              aria-hidden
              src="/purple-check.svg"
              alt="purple-check icon"
              width={24}
              height={24}
            />
          ) : (
            <Image
              aria-hidden
              src="/blue-check.svg"
              alt="blue-check icon"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
      <Link
        href={{
          pathname: `/edit/${id}`,
          query: {
            title: title,
            color: color,
          },
        }}
        className="flex w-10/12"
      >
        {title}
      </Link>
      <div className="flex justify-end items-start w-1/12">
        <button onClick={handleDeletePopover} className="cursor-pointer">
          <Image
            aria-hidden
            src="/trash.svg"
            alt="trash icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
