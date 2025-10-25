export default function TwoColumnImageGrid() {
  return (
    <div className="flex flex-wrap gap-5">
      <div className="w-full sm:w-[calc(50%-0.625rem)]">
        <img
          src="/images/grid-image/image-02.png"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div className="w-full sm:w-[calc(50%-0.625rem)]">
        <img
          src="/images/grid-image/image-03.png"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
