import React from 'react'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthProvider'
import theme from './theme'

export const metadata = {
  title: 'Kansas Blockchain Fellowship',
  description: 'Kansas Blockchain Fellowship dApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
