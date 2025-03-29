"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const CollapsibleTaskSection = ({ date, tasks, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0 ? true : false);
  return (
    <div className="border border-gray-700 rounded-lg shadow-md overflow-hidden bg-gray-900 text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 bg-gray-800 hover:bg-gray-700 font-semibold"
      >
        {date}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 space-y-3 bg-gray-950">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg p-4 border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  {task?.title}
                </h3>
                <span className="text-sm font-medium text-purple-400 bg-purple-800 px-3 py-1 rounded-full">
                  {`${task?.hours} hrs`}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {task?.activity_description}
              </p>
              {task?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-purple-700 text-white text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
