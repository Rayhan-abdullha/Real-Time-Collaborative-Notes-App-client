"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { baseURL } from "@/utils/api";
import { io } from "socket.io-client";
import EditNote from "@/app/components/note/EditNote";
import { BACKEND_BASE_URL } from "@/config";
import toast from "react-hot-toast";
import { AuthErrorType } from "@/lib/ErrorType";

const socket = io(BACKEND_BASE_URL);

function NoteDetails() {
  const [noteDetails, setNoteDetails] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {id} = useParams();
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
          console.error("Error fetching task details:", error);
        }
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

  if (!noteDetails) {
    return <div className="text-center text-red-500">Note not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">📝 Task Details</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{noteDetails?.title}</h2>
          <p className="text-gray-600 text-lg mt-2">{noteDetails?.content}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-white bg-purple-100 rounded-lg transition-all duration-300 hover:bg-[#5f27cd]"
          >
            Edit Note
          </button>
          <button
            onClick={deleteNote}
            className="px-6 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
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
  );
}

export default NoteDetails;