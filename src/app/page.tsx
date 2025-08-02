"use client";

import Link from "next/link";
import Counter from "@/components/counter/counter.component";
import Image from "next/image";
import TaskCard from "@/components/task-card/task-card.component";
import { useEffect, useState } from "react";
import { getAPI } from "@/utils/api";

export type TaskType = {
  id: string;
  title: string;
  color?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const updateTasks = (newTasks: TaskType[]) => {
    const sortedTasks = [...newTasks].sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    });
    setTasks(sortedTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAPI("/tasks");
        const data = (await response.data) as TaskType[];
        updateTasks(data);
      } catch {
        console.log("error");
      }
    };
    fetchTasks();
  }, []);

  const updateSingleTask = (updatedTask: TaskType) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      return updated.sort((a, b) => Number(a.completed) - Number(b.completed));
    });
  };

  const deleteSingleTask = (deletion: TaskType) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.filter((task) => task.id !== deletion.id);

      return updated;
    });
  };

  return (
    <div className="flex flex-row justify-center pb-20 gap-16 pt-10 px-3 sm:p-20 z-20">
      <Link
        href={"/create"}
        className="absolute top-53 flex flex-row justify-center items-center p-4 rounded-lg h-[52px] max-w-[736px] w-full bg-[#1E6F9F] hover:bg-[#2494d4ff] gap-2 z-2"
      >
        <span>Create Task</span>
        <Image
          aria-hidden
          src="/plus.svg"
          alt="plus icon"
          width={16}
          height={16}
        />
      </Link>
      <div className="flex flex-col w-[736px] gap-16 mt-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center gap-2 text-[#4EA8DE] text-sm leading-4">
              Tasks
              <Counter>
                {tasks.reduce((count, task) => {
                  if (!task.completed) return count + 1;
                  return count;
                }, 0)}
              </Counter>
            </span>
            <span className="flex flex-row items-center gap-2 text-[#8284FA] text-sm leading-4">
              Completed
              <Counter>
                {tasks.reduce((count, task) => {
                  if (task.completed) return count + 1;
                  return count;
                }, 0)}{" "}
                of {tasks.length}
              </Counter>
            </span>
          </div>
          <div>
            {tasks.length === 0 ? (
              <div className="flex flex-col w-full justify-center items-center mt-6 gap-5">
                <hr className="w-full mb-8 rounded-lg text-gray-700" />
                <Image
                  aria-hidden
                  src="/clipboard.svg"
                  alt="Clipboard icon"
                  width={50}
                  height={50}
                />
                <span className="font-bold text-[#808080]">
                  {"You don't have any tasks registered yet."}
                </span>
                <span className="text-[#808080]">
                  {"Create tasks and organize your to-do items."}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 py-5">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskUpdate={updateSingleTask}
                    onTaskDelete={deleteSingleTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
