"use client";

import { useState } from "react";
import { createTask } from "../services/task";

export default function TaskModal() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //   async function handleSubmit(formData) {
  //     "use server"; // Next.js Server Action
  //     const task = {
  //       title: formData.get("title"),
  //       description: formData.get("description"),
  //       tags,
  //     };
  //     console.log("Task Created:", task);
  //     setTags([]);
  //     setTagInput("");
  //     setIsOpen(false);
  //   }

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-black">
          <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Add a New Task</h2>
            <form
              action={(formData) => {
                formData.append("tags", JSON.stringify(tags)); // Append tags as a JSON string
                createTask(formData);
              }}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  name="title"
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Hours Spent</label>
                <input
                  name="hours"
                  inputMode="numeric"
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Enter hours spent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 border p-2 rounded">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-white hover:text-gray-300"
                        onClick={() =>
                          setTags(tags.filter((_, i) => i !== index))
                        }
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInput}
                    placeholder="Enter tag"
                    className="border-none focus:ring-0 w-auto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="activity_description"
                  className="w-full p-2 border rounded"
                  placeholder="Enter task description"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
