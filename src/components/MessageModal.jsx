import React from 'react';

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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="rounded-lg p-6 bg-gradient-to-br from-purple-600 to-yellow-400 shadow-lg"
        style={{ minWidth: '300px', ...modalStyle }}
      >
        <h2 className="text-2xl font-bold mb-4">{type === 'success' ? 'Éxito' : 'Error'}</h2>
        <p className="mb-6">{message}</p>

        <div className="flex justify-end space-x-4">
          {isConfirmDialog ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={onConfirm}
              >
                Confirmar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
