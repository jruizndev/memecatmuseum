/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gatos-siendo-gatos1':
                    'linear-gradient(to bottom, #ff4b2b, #ff416c)',
                'gatos-siendo-humanos2':
                    'linear-gradient(to bottom, #ff416c, #0072ff)',
                'gatos-enfadados3':
                    'linear-gradient(to bottom, #0072ff, #FBD786)',
                'me-dijiste4': 'linear-gradient(to bottom, #FBD786, #EAEAEA)',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                '20px': '20px',
                '24px': '24px',
                '28px': '28px', // Tamaño adicional
            },
            letterSpacing: {
                '3px': '3px',
            },
        },
    },
    plugins: [],
}
