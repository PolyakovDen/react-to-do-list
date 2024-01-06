import { useState } from "react";
import { Inter } from "next/font/google";
import Textfield from "@/components/Textfield";
import Task from "@/components/Task";

const inter = Inter({ subsets: ["latin"] });

type Task = {
  done: boolean;
  title: string;
  id: string;
};

function generateId() {
  return "_" + Math.random().toString(36).substring(2, 11);
}

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const onChangeTitle = (value: string) => setTaskTitle(value);

  const addTask = () => {
    if (taskTitle.trim() !== "") {
      let task = {
        done: false,
        title: taskTitle,
        id: generateId(),
      };

      setTasksList([...tasksList, task]);
      setTaskTitle("");
    }
  };

  const setDoneTask = (value: boolean, id: string) => {
    const updatedTasks = tasksList.map((task) => {
      if (task.id === id) {
        return { ...task, done: value };
      }
      return task;
    });

    setTasksList(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasksList.filter((task) => task.id !== id);

    setTasksList(updatedTasks);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1 className="text-3xl font-bold text-center text-gray-600 py-4">
        To Do List App
      </h1>
      <div className="flex items-center">
        <Textfield
          value={taskTitle}
          placeholder="Введіть назву задачі"
          onChange={(value) => onChangeTitle(value)}
          handleEnter={() => addTask()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => addTask()}
        >
          Add
        </button>
      </div>
      <div className="mt-8">
        {tasksList.map((task) => {
          return (
            <Task
              title={task.title}
              done={task.done}
              key={task.id}
              id={task.id}
              onChange={(value) => {
                setDoneTask(value, task.id);
              }}
              onDelete={(id) => {
                deleteTask(id);
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
