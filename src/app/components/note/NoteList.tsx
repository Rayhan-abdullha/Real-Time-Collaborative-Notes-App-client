"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Skeleton from "@/components/Skeleton";
import NoteItem from "./NoteItem";
import { BACKEND_BASE_URL } from "@/config";
import { CustomErrorType } from "@/lib/ErrorType";
import api, { baseURL } from "@/utils/api";
import { useAuthContext } from "@/context/AuthContext";
import TabNote from "./TabNote";

const socket = io(BACKEND_BASE_URL);

export default function NotesList() {
  const [notes, setNotes] = useState<{ _id: string; title: string; author: string; content: string }[]>([]);
  const { state } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"myNotes" | "otherNotes" | "allNotes">("allNotes");

  useEffect(() => {
    setLoading(true);
    const fetchNotes = async () => {
      try {
        const response = await api.get(`${baseURL}/notes`);
        setNotes(response.data.data);
        setError(null);
      } catch (error) {
        setError((error as CustomErrorType).response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();

    socket.on("noteUpdated", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === updatedNote.id ? updatedNote : note))
      );
    });

    return () => {
      socket.off("noteUpdated");
    };
  }, []);

  const filteredNotes =
    activeTab === "myNotes"
      ? notes.filter((note) => note.author === state.id)
      : activeTab === "otherNotes"
      ? notes.filter((note) => note.author !== state.id)
      : notes;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6"> 📝 Notes List </h1>
      <TabNote activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading && <Skeleton />}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => <NoteItem key={note._id} note={note} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
}
