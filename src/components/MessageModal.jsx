import React from 'react'

const MessageModal = ({
    message,
    type,
    onClose,
    onConfirm,
    isConfirmDialog = false, // Para decidir si es un mensaje de confirmación o informativo
}) => {
    const modalStyle = {
        backgroundColor: type === 'success' ? 'green' : 'red',
        color: 'white',
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                className="rounded-lg p-6 bg-gradient-to-br from-purple-600 to-yellow-400 shadow-lg"
                style={{ minWidth: '300px', ...modalStyle }}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {type === 'success' ? '' : 'Error'}
                </h2>
                <p className="mb-6">{message}</p>

                <div className="flex justify-end space-x-4">
                    {isConfirmDialog ? (
                        <>
                            <button
                                className="bg-black text-white py-3 px-8 rounded-3xl transition-all duration-300 ease-in-out hover:bg-pink-300"
                                onClick={onConfirm}
                            >
                                Confirmar
                            </button>
                            <button
                                className="bg-red-500 text-white py-3 px-8 rounded-3xl transition-all duration-300 ease-in-out hover:bg-pink-200"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-black text-white py-3 px-8 rounded-3xl transition-all duration-300 ease-in-out hover:bg-pink-300"
                            onClick={onClose}
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageModal
