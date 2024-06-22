"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Value } from "@radix-ui/react-select";

const storiesPath = "public/stories";

const StoryWriter = () => {
  const [story, setStory] = useState<string>("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState();
  const [runStarted, setRunStarted] = useState<boolean>(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState();

  const runScript = async () => {
    setRunStarted(true);
    setRunFinished(false);

    const response = await fetch("/api/run-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story, pages, path: storiesPath }),
    });

    if (response.ok && response.body) {
      // handle streams from API
    } else {
      setRunFinished(true);
      setRunStarted(false);
      console.error("Failed to start streaming");
    }
  };

  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2">
        <Textarea
          className="flex-1 text-black"
          placeholder="write what you want a  story to be about ..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />

        <Select onValueChange={(value) => setPages(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="How many pages should the story be ?" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-full"
          size="lg"
          disabled={!story || !pages || runStarted}
          onClick={runScript}
        >
          Generate Story
        </Button>
      </section>

      <section className="flex-1 pb-5 mt-5">
        <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
          <div>
            {runFinished === null && (
              <>
                <p className="animate-purse mr-5">
                  I'm waiting for you to Generate a story above...
                </p>
                <br />
              </>
            )}

            <span className="mr-5">{">>"}</span>
            {progress}
          </div>

          {/* current tool */}
          {currentTool && (
            <div className="py-10">
              <span className="mr-5">{"----  [Current Tool] ---"}</span>
              {currentTool}
            </div>
          )}
          {/* Render events */}
          {runStarted && (
            <div>
              <span className="mr-5 animate-in">
                {"--- [AI StoryBook Has Started]"}
              </span>
              <br />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StoryWriter;
