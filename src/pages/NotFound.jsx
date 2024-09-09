import { useRouteError, Link } from "react-router-dom";
import React from "react";

function MainContent() {
  return (
    <main className="self-end mt-14 w-full max-w-[1318px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col items-center">
        {/* Image Section */}
        <section className="flex flex-col w-[60%] max-md:w-full items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d9e2892c8f2cceb89f0073cda5585140d4725d456d2d39f7e3e15b1339aa07?placeholderIfAbsent=true&apiKey=4a6b075cba4d439db44d5a2134fb5890"
            className="object-contain w-full rounded-lg aspect-[16/9] max-md:aspect-auto max-md:w-full max-md:h-auto"
            alt="Mecat Museum exhibit"
          />
        </section>

        {/* Text Section */}
        <section className="flex flex-col w-[40%] text-center max-md:w-full">
          <h1 className="text-7xl font-bold text-blue-500 uppercase leading-tight tracking-wider max-md:text-4xl max-md:leading-snug">
            Mecat museum
          </h1>
        </section>
      </div>
    </main>
  );
}

export default MainContent;
