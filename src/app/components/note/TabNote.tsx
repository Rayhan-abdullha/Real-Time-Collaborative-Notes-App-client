import React from 'react';

interface IProps {
  activeTab: "myNotes" | "otherNotes" | "allNotes";
  setActiveTab: React.Dispatch<React.SetStateAction<"myNotes" | "otherNotes" | "allNotes">>;
}

const TabNote = ({ activeTab, setActiveTab }: IProps) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-2 py-1 rounded-md font-medium text-sm transition ${
          activeTab === "myNotes" ? "bg-[#5f27cd] text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("myNotes")}
      >
        My Notes
      </button>
      <button
        className={`px-2 py-1 rounded-md font-medium text-sm transition ${
          activeTab === "otherNotes" ? "bg-[#5f27cd] text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("otherNotes")}
      >
        Other Notes
      </button>
      <button
        className={`px-2 py-1 rounded-md font-medium text-sm transition ${
          activeTab === "allNotes" ? "bg-[#5f27cd] text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("allNotes")}
      >
        All Notes
      </button>
    </div>
  );
};

export default TabNote;
