import { useRouteError, Link } from "react-router-dom";
import React from "react";

function MainContent() {
  return (
    <main className="self-end mt-14 w-full max-w-[1318px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col items-center">
        {/* Image Section */}
        <section className="flex flex-col w-[60%] max-md:w-full items-center">
          <video
            loading="lazy"
            className="object-contain w-full rounded-lg aspect-[16/9] max-md:aspect-auto max-md:w-full max-md:h-auto"
            alt="Mecat Museum exhibit"
            autoPlay
            loop
          >
            <source src="src/assets/animaciones/video cat404.mp4" />
          </video>
        </section>

        {/* Text Section */}
        <section className="flex flex-col w-[40%] text-center max-md:w-full">
          <h1 className="text-7xl font-bold text-blue-500 uppercase leading-tight tracking-wider max-md:text-4xl max-md:leading-snug">
            Mecat Museum
          </h1>
        </section>
      </div>
    </main>
  );
}

export default MainContent;
