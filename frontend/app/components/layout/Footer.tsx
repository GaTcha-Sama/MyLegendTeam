import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-[#191713] py-4">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <div className="text-yellow-500 font-[family-name:var(--font-title)]">
                    &copy; {new Date().getFullYear()} My Legend Team. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <a href="/terms" className="text-yellow-500 hover:text-gray-800 font-[family-name:var(--font-title)]">Terms of Service</a>
                    <a href="/privacy" className="text-yellow-500 hover:text-gray-800 font-[family-name:var(--font-title)]">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
  )
}
