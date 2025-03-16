
import Image from "next/image";
import React, {useState} from "react";

// react icons
import {IoMdCloudUpload} from "react-icons/io";
import {MdDelete} from "react-icons/md";

const FileInput = () => {
    const [image, setImage] = useState("");

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <input
                type="file"
                name="image"
                id="image_input"
            />
            {image === "" ? (
                <div
                    className="w-full md:w-[90%] flex items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 ">
                    <IoMdCloudUpload className="text-[3rem] text-primary"/>
                    <p className="mt-2 text-text">Drag and drop here</p>
                    <p className=" text-text">or</p>

                    <button
                        className="px-6 py-1.5 text-[#3B9DF8]"
                    >
                        Browse
                    </button>
                </div>
            ) : (
                <div className="relative w-full md:w-[80%] h-[200px]">
                        <Image
                            width={50}
                            height={50}
                            src={image}
                            alt="image"
                            className="w-full h-full object-cover"
                        />
                    <MdDelete
                        className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                        onClick={() => setImage("")}
                    />
                </div>
            )}
        </div>
    );
};

export default FileInput;
                