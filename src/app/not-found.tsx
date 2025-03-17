import { Home } from 'lucide-react'
import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg ring-1 ring-gray-200 text-center">
        <h2 className="text-5xl font-extrabold text-[#5f27cd] mb-6">404</h2>
        <p className="text-xl text-gray-700 mb-4">Could not find the requested resource</p>
        <Link href="/" className='flex gap-2 items-center justify-center'>
            <Home className='w-[20px] h-[20px]'/>
          <p className="text-lg font-semibold text-[#5f27cd] hover:text-[#4e1ab7] hover:underline">
            Back
            </p>
        </Link>
      </div>
    </div>
  )
}
