'use client'
import useAuth from "@/hooks/useAuth";
import NotesList from "../components/note/NoteList";
function NotesPage() {
    useAuth();
    return (
      <>        
        <NotesList/>
      </>
    );
  }
  export default NotesPage;