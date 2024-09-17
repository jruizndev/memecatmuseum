import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <main className="self-end mt-14 w-full max-w-[1318px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-center gap-5 max-md:flex-col">
        <section className="flex flex-col w-full text-center mb-10">
          {" "}
          {/* Added margin-bottom to section */}
          <h1 className="text-7xl font-bold text-blue-500 uppercase leading-tight tracking-wider max-md:text-4xl max-md:leading-snug mb-10">
            Mecat Museum
          </h1>
        </section>
        <section className="flex flex-col w-[60%] max-md:w-full items-center">
          <div className="border border-gray-500 p-4">
            {" "}
            {/* Add border and padding */}
            <video
              loading="lazy"
              className="object-contain w-full rounded-lg aspect-[16/9] max-md:aspect-auto max-md:w-full max-md:h-auto"
              alt="Mecat Museum exhibit"
              autoPlay
              muted
              loop
            >
              <source src="src/assets/animaciones/cat404.mp4" />
            </video>
          </div>
          <Link to="/" className="mt-5">
            {" "}
            {/* Link to home */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded-[10px]">
              Volver a Home
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
