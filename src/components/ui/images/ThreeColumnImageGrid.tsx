export default function ThreeColumnImageGrid() {
  return (
    <div className="flex flex-wrap gap-5">
      <div className="w-full sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.833rem)]">
        <img
          src="/images/grid-image/image-04.png"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div className="w-full sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.833rem)]">
        <img
          src="/images/grid-image/image-05.png"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div className="w-full sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.833rem)]">
        <img
          src="/images/grid-image/image-06.png"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
