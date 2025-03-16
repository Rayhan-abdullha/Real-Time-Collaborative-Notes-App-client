"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";

const socket = io("http://localhost:4000");

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const noteId = id ? id[1] : ""; 
  const [note, setNote] = useState<{ title: string; content: string }>({ title: "", content: "" });

  useEffect(() => {
    socket.emit("joinNote", { noteId });

    // Listen for updates to the note
    socket.on("noteUpdated", (updatedNote) => {
      setNote(updatedNote);
    });

    // Cleanup the socket event listener when component unmounts
    return () => {
      socket.off("noteUpdated");
    };
  }, [noteId]);

  const handleEdit = (field: "title" | "content", value: string) => {
    const updatedNote = { ...note, [field]: value };
    setNote(updatedNote);
    socket.emit("editNote", { noteId, updateData: updatedNote });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Collaborative Notes</h1>

      {/* Display Title and Content */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={note.title}
          onChange={(e) => handleEdit("title", e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={note.content}
          onChange={(e) => handleEdit("content", e.target.value)}
          className="w-full p-2 h-40 border rounded-md"
        />
      </div>
    </div>
  );
}
