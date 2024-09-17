const Footer = () => {
  return (
    <footer className='bg-black text-white py-4 z-20'>
      {/* Contenedor Principal */}

      {/* Segunda sección con las columnas */}
      <div className='w-full px-4 sm:px-6 lg:px-12 pt-10 sm:pt-5 lg:pt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 mb-8 items-start'>
        {/* Follow Us Section */}
        <div className='flex flex-col items-center sm:items-center lg:items-end relative'>
          {/* Logo principal */}
          <div className='container'>
            <img
              className='w-32 sm:w-24 md:w-64 lg:w-80 rounded-full border-black mb-6 lg:mb-16 sm:justify-center mr-3'
              src='assets/LogoBlanco2.png'
              alt='Icon'
            />
          </div>

          {/* Texto "Follow Us" */}
          <div className='container mb-8 sm:item-center lg:mr-3 flex flex-col sm:items-center lg:text-center lg:items-center'>
            <p className='text-[#eee8e1] lg:mr-52 sm:text-lg lg:text-2xl font-bold uppercase tracking-widest mt-2 text-center sm:text-center'>
              Follow Us
            </p>

            {/* Logos de redes sociales */}
            <div className='flex gap-4 mt-2 justify-center sm:justify-center lg:justify-end'>
              {/* Instagram */}
              <a
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='assets/logoIgGato.png'
                  className='w-10 sm:w-8 md:w-16 lg:w-20'
                  alt='Instagram Logo'
                />
              </a>
              {/* Facebook */}
              <a
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='assets/logoFacebookGato.png'
                  className='w-10 sm:w-8 md:w-16 lg:w-20 lg:mr-52'
                  alt='Facebook Logo'
                />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className='flex flex-col items-center sm:items-center md:items-start'>
          <p className='text-[#eee8e1] text-lg font-bold uppercase tracking-widest sm:text-center md:text-left'>
            Quick Links
          </p>
          <ul className='mt-4 space-y-2 text-center sm:text-center md:text-left'>
            <li>
              <a href='#about' className='text-[#eee8e1] text-lg opacity-50'>
                About
              </a>
            </li>
            <li>
              <a href='#reports' className='text-[#eee8e1] text-lg opacity-50'>
                Reports
              </a>
            </li>
            <li>
              <a href='#services' className='text-[#eee8e1] text-lg opacity-50'>
                Services
              </a>
            </li>
            <li>
              <a href='#contact' className='text-[#eee8e1] text-lg opacity-50'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className='flex flex-col items-center sm:items-center md:items-start'>
          <p className='text-[#eee8e1] text-lg font-bold uppercase tracking-widest sm:text-center md:text-left'>
            Subscribete
          </p>
          <p className='text-[#eee8e1] text-base mt-4 leading-relaxed text-center sm:text-center md:text-left'>
            Recibe las tendencias y los conocimientos de nuestro equipo
            directamente en su bandeja de entrada todos los meses.
          </p>
          <div className='relative mt-6 w-full sm:w-full md:w-auto'>
            <input
              className='px-20 py-2 text-base text-[#8b8a8a] bg-transparent border-2 border-[#eee8e1]/70 rounded-full w-full pr-12'
              placeholder='Your email'
            />
            <button className='absolute right-1 top-1/2 transform -translate-y-1/2'>
              <img
                src='/assets/botonCat.png'
                alt='Submit'
                className='w-10 lg:w-14 h-10 rounded-full border-2 border-white'
              />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className='border-t border-white/30 py-4 w-full mx-0 px-0'>
        <div className='flex flex-col sm:flex-col lg:flex-row lg:justify-between lg:items-center w-full'>
          <p className='text-[#eee8e1]/70 text-sm text-center lg:text-left ml-8'>
            © 2024 Cat Square - The Meme’s Cat Museum
          </p>
          <div className='flex space-x-6 mt-4 lg:mt-0 mr-8'>
            <a href='#' className='text-[#eee8e1]/70 text-sm'>
              Privacy
            </a>
            <a href='#' className='text-[#eee8e1]/70 text-sm'>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
