'use client'

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from 'next/link'

import React from 'react'

export default function Logged() {
  return (
    <li>
        <button  onClick={() => signOut()} className="bg-gray-700 text-white text-sm px-6 py-2 rounded-xl">
            Sign Out
        </button>
    </li>
  )
}