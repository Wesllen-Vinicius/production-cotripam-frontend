import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type NewType = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void
}) => ReactNode

interface ModalProps {
  onOpen?: () => void
  children: ReactNode | NewType
}

export const Modal: React.FC<ModalProps> = ({ children, onOpen }) => {
  const [showModal, setShowModal] = React.useState(false)
  const handleOpenModal = () => {
    onOpen && onOpen()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenModal}
      >
        <img className='pb-0 mb-0' src="/src/assets/share.png" width={20} />
      </motion.button>

      {showModal ? (
        <>
          <div className="absolute text-gray-900 dark:text-white p-5">
            <div className="flex justify-center  items-center  overflow-x-hidden overflow-y-hidden fixed  inset-0 z-50 outline-none focus:outline-none ">
              <div className="w-auto  mx-auto max-w-3xl ">
                {/*content*/}
                <div className="border-0  rounded-lg dark:bg-white shadow-lg relative flex flex-col w-full bg-white text-black outline-none focus:outline-none dark:text-white">
                  {/*header*/}
                  <div className="flex items-start justify-between p-1 border-b border-slate-300">
                    <button
                      className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>
                  {typeof children === 'function'
                    ? children({ handleCloseModal })
                    : children}
                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-300 rounded-b">
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="opacity-25 fixed inset-0 z-40 bg-black"
              onClick={() => setShowModal(false)}
            ></div>
          </div>
        </>
      ) : null}
    </>
  )
}
