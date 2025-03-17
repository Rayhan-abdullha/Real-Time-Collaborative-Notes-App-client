import Link from 'next/link'
import React from 'react'

const NoteItem = ({note}: {note: {title: string, content: string, _id: string}}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
        <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 first-letter:uppercase">{note.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-1 first-letter:uppercase">{note.content}</p>
        <Link
            href={`/notes/${note._id}`}
            className="inline-block px-4 py-2 text-sm font-medium text-purple-600 hover:text-white bg-purple-100 rounded-lg transition-all duration-300 hover:bg-[#5f27cd]"
        >
            See Note
        </Link>
        </div>
    </div>
  )
}

export default NoteItem