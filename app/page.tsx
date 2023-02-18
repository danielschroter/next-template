import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'


const inter = Inter({ subsets: ['latin'] })


export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {!session?.user ?
        <h1 className="text-lg py-5">Hello Next</h1>
       : <h1 className="text-lg py-5">Hello {session?.user.name}</h1>
       }
    </main>
  )
}
