import React from 'react'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthContext'
import { MetaMaskProvider } from './contexts/MetaMaskContext'
import { IPFSProvider } from './contexts/IpfsContext'
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
          <MetaMaskProvider>
          <IPFSProvider>
              {children}
          </IPFSProvider>
          </MetaMaskProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
