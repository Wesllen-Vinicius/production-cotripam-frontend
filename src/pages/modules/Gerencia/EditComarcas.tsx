import { motion } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'

interface ComarcaProps {
  id: string
}

interface Comarca {
  nome: string
  cidade_estado: string
  meta_preCozido: number
  meta_serosa: number
}

export function EditComarca({ id }: ComarcaProps) {
  const { register, handleSubmit, setValue } = useForm<Comarca>()

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Comarca> = async (data) => {
      console.log(data)
      try {
        await api
          .put(`unidades/${id}`, {
            nome: String(data.nome),
            cidade_estado: String(data.cidade_estado),
            meta_preCozido: Number(data.meta_preCozido),
            meta_serosa: Number(data.meta_serosa),
          })
          .then(() => {
            Notification.fire({
              icon: 'success',
              title: 'Atualizado com sucesso!',
            })
            window.location.reload(), 4000
          })
        fn()
      } catch (e: any) {
        Notification.fire({
          icon: 'error',
          title: e.message,
        })
      }
    }
    return submit
  }

  const loadData = () => {
    api.get<Comarca>(`unidades/${id}`).then((res) => {
      setValue('nome', res.data.nome)
      setValue('meta_preCozido', res.data.meta_preCozido)
      setValue('meta_serosa', res.data.meta_serosa)
      setValue('cidade_estado', res.data.cidade_estado)
    })
  }

  return (
    <Modal onOpen={loadData}>
      {({ handleCloseModal }) => {
        return (
          <AnimatedDiv>
            <div className="max-w-5xl mx-auto bg-white p-16 ">
              <form onSubmit={handleSubmit(onSubmit(handleCloseModal))}>
                <div className="grid xl:grid-cols-2 xl:gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Nome
                    </label>
                    <input
                      {...register('nome')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Cidade/Estado
                    </label>
                    <input
                      {...register('cidade_estado')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Meta Serosa
                    </label>
                    <input
                      {...register('meta_serosa')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Meta pré Cozido
                    </label>
                    <input
                      {...register('meta_preCozido')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white mt-5 bg-[#199f53] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Confirmar
                  </motion.button>
                </div>
              </form>
            </div>
          </AnimatedDiv>
        )
      }}
    </Modal>
  )
}
