import { FormEvent, useState } from 'react'
import { useAuth } from './context/AuthContext'
import Link from '../components/Link'
import { motion } from 'framer-motion'
import { WhileHoverButton } from '../components/animations/motion.button'

export function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      email,
      password,
    }
    await signIn(data)
  }

  return (
    <div className="flex flex-col  justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 ">
      <div className="min-h-full flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Acesso Restrito
          </h2>
          <form onSubmit={handleSignIn}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only ">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:bg-white dark:text-black text-white bg-[#111827]  focus:outline-none"
              >
                Entrar
              </motion.button>
              <div className="pt-2">
                <Link href="/">
                  <WhileHoverButton>Voltar</WhileHoverButton>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
