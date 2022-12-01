import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'

interface SerosaProps {
  id: number
}

interface Serosa {
  corte_630: number
  corte_470: number
  corte_320: number
  corte_170: number
}

export function EditSerosa({ id }: SerosaProps) {
  const { register, handleSubmit, setValue } = useForm<Serosa>()

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Serosa> = async (data) => {
      try {
        await api.put(`serosa/${id}`, {
          corte_630: Number(data.corte_630),
          corte_470: Number(data.corte_470),
          corte_320: Number(data.corte_320),
          corte_170: Number(data.corte_170),
        })
        Notification.fire({
          icon: 'success',
          title: 'Atualizado com sucesso!',
        })
        window.location.reload(), 4000
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
    api.get<Serosa>(`serosa/${id}`).then((res) => {
      setValue('corte_630', res.data.corte_630)
      setValue('corte_470', res.data.corte_470)
      setValue('corte_320', res.data.corte_320)
      setValue('corte_170', res.data.corte_170)
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
                      630
                    </label>
                    <input
                      {...register('corte_630')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      470
                    </label>
                    <input
                      {...register('corte_470')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      320
                    </label>
                    <input
                      {...register('corte_320')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      170
                    </label>
                    <input
                      {...register('corte_170')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full h-full text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </AnimatedDiv>
        )
      }}
    </Modal>
  )
}
