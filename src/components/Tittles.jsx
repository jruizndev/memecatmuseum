import React from 'react'

const Tittles = ({ categoryTitles }) => {
    return (
        <div className="w-[20%] fixed bottom-0 right-0">
            <p className="flex justify-end items-end text-white">
                {categoryTitles}
            </p>
        </div>
    )
}

export default Tittles
