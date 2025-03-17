"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { baseURL } from "@/utils/api";
import { io } from "socket.io-client";
import EditNote from "@/app/components/note/EditNote";
import { BACKEND_BASE_URL } from "@/config";
import toast from "react-hot-toast";
import { AuthErrorType } from "@/lib/ErrorType";
import { formatUpdatedAt } from "@/lib";
import { IAuthor } from "@/app/profile/page";

const socket = io(BACKEND_BASE_URL);

export interface INote {
  author: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const NoteDetails = () => {
  const [noteDetails, setNoteDetails] = useState<INote | null>(null);
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);  
  const [authorError, setAuthorError] = useState<string | null>(null);
  const router = useRouter();
  
  const { id } = useParams();
  const noteId = id ? id[0] : "";

  useEffect(() => {
    if (!noteId) return;
    const fetchTask = async () => {
      try {
        const response = await api.get(`${baseURL}/notes/${noteId}`);
        setNoteDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setNoteError("Error fetching note details");
          console.error("Error fetching task details:", error);
        }
        setLoading(false);
      }
    };
    fetchTask();

    socket.emit("joinNote", { noteId });
    socket.on("noteUpdated", (updatedNote) => {
      setNoteDetails(updatedNote);
    });

    return () => {
      socket.off("noteUpdated");
    };
  }, [noteId]);

  useEffect(() => {
    if (noteDetails?.author) {
      const fetchAuthor = async () => {
        try {
          const response = await api.get(`${baseURL}/auth/user/${noteDetails.author}`);
          setAuthor(response.data.data);
        } catch (error) {
          setAuthorError("Error fetching author details");
          console.error("Error fetching author details:", error);
        }
      };
      fetchAuthor();
    }
  }, [noteDetails?.author]);

  const deleteNote = async () => {
    try {
      const response = await api.delete(`${baseURL}/notes/${noteId}`);
      if (response.status === 200) {
        toast.success("Note deleted successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error((error as AuthErrorType).response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5f27cd]"></div>
      </div>
    );
  }

  if (noteError) {
    return <div className="text-center text-red-500">{noteError}</div>;
  }

  if (!noteDetails) {
    return <div className="text-center text-red-500">Note not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">📝 Task Details</h1>
      <div className="bg-white p-10 rounded-2xl shadow-2xl space-y-6 border border-gray-200">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">{noteDetails?.title}</h2>
        <div className="flex flex-col gap-y-2 text-sm text-gray-500">
          <p className="italic font-sm">{formatUpdatedAt(noteDetails?.updatedAt)}</p>
          {authorError ? (
            <p className="text-red-500">{authorError}</p>
            ) : author ? (
                // author name will be italic
            <p className="italic font-sm">Author: <>{author.name}</></p>
          ) : (
            <p className="text-sm">Author: Loading...</p>
          )}
        </div>
        <p className="text-gray-700 text-lg first-letter:uppercase leading-relaxed border-l-4 border-purple-500 pl-4">
          {noteDetails?.content}
        </p>

      <div className="flex justify-between space-x-4 mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 transition-all duration-300"
        >
          Edit Note
        </button>
        <button
          onClick={deleteNote}
          className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          Delete Task
        </button>
      </div>
      </div>
      <EditNote
        noteDetails={noteDetails}
        noteId={noteId}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      />
      </div>
    </div>
  );
};

export default NoteDetails;
