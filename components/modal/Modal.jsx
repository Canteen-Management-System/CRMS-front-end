import React from "react";

export default function Modal({
  modalTitle,
  animation,
  toggleModal,
  formId,
  children,
}) {
  const { overlay, modalContent, modalContainer } = modalStyle;
  console.log(animation);
  return (
    <>
      {
        <div
          className={
            modalContainer +
            `${
              animation
                ? " translate-y-0 transition duration-500 ease-in-out"
                : "-translate-y-full"
            }`
          }
        >
          <div className={overlay}>
            <div className={modalContent}>
              <h2 className="p-4 text-2xl font-semibold text-center font-poppins">
                {modalTitle}
              </h2>
              <div className="border-t-2 opacity-100 border-t-red-500">
                {children}
              </div>
              <div className="flex flex-row w-1/2 mx-auto justify-evenly">
                <button
                  className="px-4 py-2 mt-4 text-white bg-green-400 rounded"
                  form={formId}
                >
                  Submit
                </button>
                <button
                  className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

const modalStyle = {
  overlay: " absolute top-0 left-0 w-full h-screen bg-[#64748b]",
  modalContent: "border-2 bg-[#f1f1f1] w-max py-4 px-8 rounded mx-auto mt-20",
  modalContainer: " absolute top-0 left-0 right-0 w-full h-screen ",
};
