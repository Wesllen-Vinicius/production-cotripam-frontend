import { AnimatedDiv } from "../animations/Transition"
import { Modal } from "./Modal"



export function ContatosFooter() {
    return (
        <Modal>
            {({ handleCloseModal }) => {
                return (
                    <AnimatedDiv>
                        <div className="max-w-5xl mx-auto bg-white p-5">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                    <h2 className="text-center text-lg p-1" >Contatos</h2>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            E-Mail :
                                        </th>
                                        <td className="py-4 px-4">
                                            cotripam@hotmail.com
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Telefone:
                                        </th>
                                        <td className="py-4 px-4">
                                            0000-0000
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Celular:
                                        </th>
                                        <td className="py-4 px-4">
                                            (68) 9 0000-0000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </AnimatedDiv>
                )
            }}
        </Modal>
    )
}
