import React from "react";

export default function Modal({ modalTitle, animation, children }) {
  const { overlay, modalContent, modalContainer } = modalStyle;
  return (
    <>
      {
        <div
          className={
            modalContainer +
            `${
              animation
                ? " translate-y-0 transition duration-500 ease-in-out"
                : " -translate-y-full"
            }`
          }
        >
          <div className={modalContent}>
            <h2 className="p-4 text-2xl font-semibold text-center font-poppins">
              {modalTitle}
            </h2>
            <div className="mx-auto border-t-2 border-t-red-500">
              {children}
            </div>
            <div className="flex flex-row w-1/2 mx-auto justify-evenly"></div>
          </div>
        </div>
      }
    </>
  );
}

const modalStyle = {
  // overlay: " absolute top-0 left-0 w-full bg-[#64748b] h-screen z-0 ",
  modalContent: "border-2 bg-[#f1f1f1] py-4 px-8 rounded mx-auto mt-4 ",
  modalContainer: "absolute top-0 w-11/12 overflow-scroll mx-auto ml-8 z-10",
};
