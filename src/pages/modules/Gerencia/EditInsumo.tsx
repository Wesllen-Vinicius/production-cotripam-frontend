import { number } from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'

interface InsumoProps {
  id: number
}

interface Insumo {
  sal_fino: number,
  sal_grosso: number,
  metabissulfito: number,
  peroxido: number,
  bombonas: number,
  calVirgem: number
}

export function EditInsumos({ id }: InsumoProps) {
  const { register, handleSubmit, setValue } = useForm<Insumo>()

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Insumo> = async (data) => {
      try {
        await api.put(`insumos/${id}`, {
          sal_fino: Number(data.sal_fino),
          sal_grosso: Number(data.sal_grosso),
          metabissulfito: Number(data.metabissulfito),
          peroxido: Number(data.peroxido),
          bombonas: Number(data.bombonas),
          calVirgem: Number(data.calVirgem)
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
    api.get<Insumo>(`insumos/${id}`).then((res) => {
      setValue('sal_fino', res.data.sal_fino)
      setValue('sal_grosso', res.data.sal_grosso)
      setValue('metabissulfito', res.data.metabissulfito)
      setValue('peroxido', res.data.peroxido)
      setValue('bombonas', res.data.bombonas)
      setValue('calVirgem', res.data.calVirgem)
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
                      SAL_FINO
                    </label>
                    <input
                      {...register('sal_fino')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      SAL_GROSSO
                    </label>
                    <input
                      {...register('sal_grosso')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      METABISSULFITO
                    </label>
                    <input
                      {...register('metabissulfito')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      PEROXIDO
                    </label>
                    <input
                      {...register('peroxido')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      BOMBONAS
                    </label>
                    <input
                      {...register('bombonas')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      CAL_VIRGEM
                    </label>
                    <input
                      {...register('calVirgem')}
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
