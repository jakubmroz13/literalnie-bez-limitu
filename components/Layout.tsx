const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header className="h-[5vh] md:text-xl flex justify-center items-center border-b border-neutral-500">Literalnie Bez Limitu</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
