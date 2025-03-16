'use client';
import { BACKEND_BASE_URL } from "@/config";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io(BACKEND_BASE_URL);
interface IProps {
    noteDetails: { title: string; content: string } | null;
    noteId: string;
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditNote = ({ noteDetails, noteId,isOpen, onClose }: IProps) => {
  const [note, setNote] = useState<{ title: string; content: string }>({
    title: noteDetails?.title || "",
    content: noteDetails?.content || "",
   });

  useEffect(() => {
    socket.emit("joinNote", { noteId });
    socket.on("noteUpdated", (updatedNote) => {
      setNote(updatedNote);
    });

    return () => {
      socket.off("noteUpdated");
    };
  }, [noteId]);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name;
    const updatedNote = { 
      title: note?.title ?? '', 
      content: note?.content ?? '', 
      [field]: e.target.value 
    };
  
    setNote(updatedNote);
    socket.emit("editNote", { noteId, updateData: updatedNote });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={note?.title}
          onChange={handleEdit}
          className="w-full p-2 mb-3 border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={note?.content}
          name="content"
          onChange={handleEdit}
          className="w-full p-2 h-32 border rounded-md"
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            close and save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;