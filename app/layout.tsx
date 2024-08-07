import { Nunito } from 'next/font/google';

import './globals.css'

import ToastProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
// Components
import Navbar from './components/navbar';
import ClientOnly from './components/ClientOnly';
// Modals
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import InfosModal from './components/modals/InfosModal';
import EditInfosModal from './components/modals/EditInfosModal';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';



export const metadata = {
  title: 'Airbnb | Home',
  description: 'Airbnb clone',
  icon: {
    url: "/favicon.png",
    type: "image/png",
  },
  shortcut: { url: "/favicon.png", type: "image/png" },
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
          
        <ClientOnly>
          <ToastProvider />
          <ActiveStatus />
          <RegisterModal />
          <LoginModal />
          <InfosModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </AuthContext>
      </body>
    </html>
  )
}
