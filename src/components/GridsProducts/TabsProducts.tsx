import { Tab } from '@headlessui/react'
import { AnimatedDiv } from '../animations/Transition'
import GridCongelados from './GridProductsCongelados'
import GridSalgados from './GridProductsSalgados'
import GridSerosa from './GridProductsSerosa'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const TabsProducts = () => {
  return (
    <div className="w-full mt-12 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-300 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-blue-700 shadow'
                  : 'text-gray-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Serosa
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-blue-700 shadow'
                  : 'text-gray-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Congelados
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-blue-700 shadow'
                  : 'text-gray-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Salgados
          </Tab>

        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <GridSerosa />
            </AnimatedDiv>
          </Tab.Panel>

          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <GridCongelados />
            </AnimatedDiv>
          </Tab.Panel>

          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <GridSalgados />
            </AnimatedDiv>
          </Tab.Panel>

        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
