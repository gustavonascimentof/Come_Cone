// App.jsx — versão final com Hero

import { useState } from 'react'
import { CartProvider, useCart } from '../../context/CartContext'
import { AuthProvider, useAuth } from '../../context/AuthContext'
import Hero from '../features/Hero'
import Catalog from '../../pages/Catalog'
import Admin from '../../pages/Admin'
import MyOrders from '../../pages/MyOrders'
import CartDrawer from '../features/CartDrawer'
import AuthModal from '../features/AuthModal'
import pacmanLogo from '../../assets/Pac_man_logo.png'

function Header({ onCartClick, onAuthClick, currentPage, setCurrentPage }) {
  const { totalItems } = useCart()
  const { user, isLoggedIn, isAdmin, handleLogout } = useAuth()

  return (
    <header className="border-b border-[#2a2a2a] py-4 px-6 sticky top-0 z-30
      bg-[#0a0a0a] bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

        {/* Logo — à esquerda */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => setCurrentPage('home')}
        >
          <img src={pacmanLogo} alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-arcade text-yellow-400 text-sm leading-tight"
              style={{ textShadow: '0 0 10px rgba(255,215,0,0.7)' }}>
              COME
            </h1>
            <p className="font-arcade text-white text-sm leading-tight">
              CONE
            </p>
          </div>
        </div>

        {/* Nav — Desktop (centro) */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {isLoggedIn ? (
            <>
              <span className="text-gray-400 font-body text-sm hidden md:inline">
                Olá, <span className="text-yellow-400 font-bold">{user.name}</span>
              </span>

              <button
                onClick={() => setCurrentPage('orders')}
                className={`font-body text-sm uppercase tracking-wider transition-colors
          ${currentPage === 'orders'
                    ? 'text-yellow-400'
                    : 'text-gray-400 hover:text-yellow-400'}`}
              >
                Meus Pedidos
              </button>
              {isAdmin && (
                <button
                  onClick={() => setCurrentPage(
                    currentPage === 'admin' ? 'home' : 'admin'
                  )}
                  className={`font-body text-sm uppercase tracking-wider transition-colors
                    ${currentPage === 'admin'
                      ? 'text-yellow-400'
                      : 'text-gray-400 hover:text-yellow-400'}`}
                >
                  {currentPage === 'admin' ? '← Início' : '⚙ Admin'}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 transition-colors
                  font-body text-sm uppercase tracking-wider"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-yellow-400 text-black font-arcade text-[9px] px-4 py-2
                hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95"
              style={{
                clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))'
              }}
            >
              Entrar
            </button>
          )}
        </nav>

        {/* Centro — Mobile (botão Entrar centralizado) */}
        <div className="md:hidden flex-1 flex justify-center">
          {/* Botão Entrar — Mobile (usuário não logado) */}
          {!isLoggedIn && currentPage !== 'admin' && (
            <button
              onClick={onAuthClick}
              className="bg-yellow-400 text-black font-arcade text-[9px] px-3 py-2
                hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95"
              style={{
                clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))'
              }}
            >
              Entrar
            </button>
          )}

          {/* Menu Usuário — Mobile (usuário logado) */}
          {isLoggedIn && currentPage !== 'admin' && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage('orders')}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-arcade"
              >
                📋
              </button>
              {isAdmin && (
                <button
                  onClick={() => setCurrentPage(
                    currentPage === 'admin' ? 'home' : 'admin'
                  )}
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-arcade"
                >
                  ⚙
                </button>
              )}
            </div>
          )}
        </div>

        {/* Ações — à direita (carrinho) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Carrinho — esconde no admin */}
          {currentPage !== 'admin' && (
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 border border-yellow-400 px-3 py-2
                hover:bg-yellow-400 hover:bg-opacity-10 transition-all"
              style={{ boxShadow: '0 0 8px rgba(255,215,0,0.2)' }}
            >
              <span className="text-lg">🛒</span>
              <span className={`
              bg-yellow-400 text-black font-arcade text-[9px] w-5 h-5 rounded-full
              flex items-center justify-center font-bold transition-transform duration-200
              ${totalItems > 0 ? 'scale-100' : 'scale-0'}
            `}>
                {totalItems}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  // Página inicial agora é 'home' (Hero)
  const [currentPage, setCurrentPage] = useState('home')

  function handleOpenAuth() {
    setAuthOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <Hero onCatalogClick={() => setCurrentPage('catalog')} />
        )}
        {currentPage === 'catalog' && <Catalog />}
        {currentPage === 'admin' && <Admin />}
        {currentPage === 'orders' && <MyOrders />}
      </main>

      <footer className="border-t border-[#2a2a2a] py-4 text-center">
        <p className="font-arcade text-[8px] text-gray-600">
          © 2025 COME CONE — CAMPUS EDITION
        </p>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onAuthClick={handleOpenAuth}
      />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}