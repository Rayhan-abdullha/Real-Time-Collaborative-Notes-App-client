'use client'
import api, { baseURL } from '@/utils/api';
import React, { useState } from 'react';
const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Creating note object
    const note = {
      title,
      content,
    };

    try {
      await api.post(`${baseURL}/notes`, note);
      setTitle('');
      setContent('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error?.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center min-h-[80vh]'>
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f27cd] focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f27cd] focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            loading ? 'bg-gray-500' : 'bg-[#5f27cd] hover:bg-[#4e18ba]'
          } focus:outline-none focus:ring-2 focus:ring-[#5f27cd] focus:ring-opacity-50`}
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateNote;
