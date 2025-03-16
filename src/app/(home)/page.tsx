'use client'
import useAuth from "@/hooks/useAuth";
import NotesList from "../components/note/NoteList";

function NotesPage() {
    useAuth();
    return (
      <div>
        <NotesList/>
      </div>
    );
  }
  export default NotesPage;