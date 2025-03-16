import React from "react";
import { RxCross1 } from "react-icons/rx";

interface PropsType {
    isModalOpen: boolean;
    handleConfirm: (isConfirm: boolean) => void;
}

const ConfirmModal = ({ isModalOpen, handleConfirm } : PropsType) => {

  return (
    <div
      className={`${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      } fixed inset-0 z-[200000000] bg-black/50 transition-opacity duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } w-[90%] max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Confirm Action
          </h2>
          <RxCross1
            className="text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1 transition"
            onClick={() => handleConfirm(false)}
          />
        </div>
        <div className="p-6 text-gray-700 dark:text-gray-300">
          <p className="text-base">
            Are you sure you want to proceed with this action? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-gray-300 dark:border-gray-700">
          <button
            className="py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-800 dark:text-white"
            onClick={() => handleConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 rounded-md bg-[#5f27cd] hover:bg-[#4d18b6] text-white transition"
            onClick={() => {
              handleConfirm(true);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
