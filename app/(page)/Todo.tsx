"use client";

import { useEffect, useState } from "react";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import Loading from "./Loading";

export default function Todo({ items, setItems, loading, setLoading }: TodoProps) {
    const [isMounted, setIsMounted] = useState(false);
    //console.log(items);
    // const [isCompleted, setIsCompleted] = useLocalStorage<number[]>("complete", []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    const completeEventHandler = (index: number) => {
        // if (isCompleted.includes(index)) {
        //     setIsCompleted(isCompleted.filter((item) => item !== index));
        // } else {
        //     setIsCompleted([...isCompleted, index]);
        // }
        setItems((prevItems) => prevItems.map((item, i) => (i === index ? { ...item, isCompleted: true } : item)));
    };

    const deleteEventHandler = (index: number) => {
        // const updatedItem = isCompleted.filter((item, i) => i !== index).map((item, i) => (i >= index ? item - 1 : item));
        // setIsCompleted(updatedItem);
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            {!loading ? (
                items.map((item, index) => (
                    <ContextMenu key={index}>
                        <ContextMenuTrigger>
                            <div
                                className={`m-5 p-3 rounded-lg shadow-md cursor-pointer select-none ${item.isCompleted ? "bg-[#a6d189]" : "bg-[#e78284]"}`}
                                onDoubleClick={() => completeEventHandler(index)}
                            >
                                <h1 className="text-xl font-bold">{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem onClick={() => deleteEventHandler(index)}>Delete</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))
            ) : (
                <Loading />
            )}
        </div>
    );
}
