export default function RenderHeader({ pageTitle }) {
  return (
    <div className="flex w-full h-20 my-auto mb-4 align-middle border-b border-[#2c5364]">
      <p className="my-auto ml-10 text-2xl font-semibold text-white font-poppins">
        {pageTitle}
      </p>
    </div>
  );
}
