/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gatos-siendo-gatos1':
                    'linear-gradient(to bottom, #ff4b2b, #ff416c )',
                'gatos-siendo-humanos2':
                    'linear-gradient(to bottom, #ff416c, #0072ff)',
                'gatos-enfadados3':
                    'linear-gradient(to bottom, #0072ff, #FBD786)',
                'me-dijiste4': 'linear-gradient(to bottom, #FBD786, #EAEAEA)',
            },
        },
    },
    plugins: [],
}
