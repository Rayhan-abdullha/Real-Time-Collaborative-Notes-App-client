"use client";
import api, { baseURL } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function NotesList() {
  const [notes, setNotes] = useState<{ _id: string; title: string; content: string }[]>([]);

  // Fetch notes from the server initially
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await api.get(`${baseURL}/notes`);
      setNotes(response.data.data);
    };
    fetchNotes();

    // Listen for note updates
    socket.on("noteUpdated", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === updatedNote.id ? updatedNote : note))
      );
    });

    return () => {
      socket.off("noteUpdated");
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">📄 Notes List</h1>
      <div>
        {notes.map((note, idx) => (
          <div key={idx} className="border p-4 mb-4">
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <Link href={`/note/${note._id}`}>
              <span className="cursor-pointer text-blue-500">Edit Note</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
