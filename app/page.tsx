"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useRef, useState } from "react";
import { GenerateTask } from "./api/gemini";
import Todo from "./(page)/Todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { LucideInfo } from "lucide-react";

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    //const numberRef = useRef<HTMLInputElement>(null);
    const [selectedValue, setSelectedValue] = useState<string>("");

    const [task, setTask] = useLocalStorage<TodoItem[]>("todoItems", []);
    const [loading, setLoading] = useState<boolean>(false);

    const generateTaskHandler = async () => {
        //console.log(inputRef.current?.value);
        // console.log(numberRef.current?.value);
        // console.log(selectedValue);
        const numberOfTask = selectedValue == "lazy" ? 3 : selectedValue == "active" ? 5 : 11;

        if (inputRef.current && inputRef.current?.value.trim() != "") {
            setLoading(true);
            const prompt = `${inputRef.current?.value}. Provide me minimum ${numberOfTask} tasks for now to achieve my goal such that I can create this as a habit. (micro habit or atomic habit or mini habit)`;
            console.log(prompt);
            inputRef.current.value = "";

            // console.log(result.response?.text());
            // console.log(JSON.parse(result.response?.text()));

            // setTask([result.response?.text(), ...task]);

            try {
                const result = await GenerateTask.sendMessage(prompt);
                //console.log(result);
                const output = JSON.parse(result.response?.text());
                //console.log(output);

                // console.log("end");

                setTask([...output, ...task]);
                //console.log("this is task: " + task);
            } catch (error) {
                alert("Some error occured!");
                console.error("error parsing response", error);
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <div className="p-5">
            <main className="flex gap-3">
                <Input ref={inputRef} placeholder="What do you want to achieve? What are your goals?" />
                <Button onClick={generateTaskHandler} variant="outline">
                    Generate Todo List
                </Button>
            </main>
            {/* <div className="mt-3 flex items-center gap-3">
                <label>Total Task</label>
                <Input ref={numberRef} type="number" className="w-24" placeholder="11" max={11} />
            </div> */}
            <div className="mt-3 flex items-center gap-3">
                <label>Energy Level</label>
                <Select onValueChange={(value) => setSelectedValue(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Energy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lazy">Lazy</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="energetic">Energetic</SelectItem>
                    </SelectContent>
                </Select>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <LucideInfo />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>1. Double click to mark your task as completed.</p>
                            <p>2. Right click to delete your task.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="my-5 text-center text-xl">Your Todo Items</div>
            <Todo items={task} setItems={setTask} loading={loading} setLoading={setLoading} />
        </div>
    );
}
