const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header className="p-1 text-2xl text-center border-b border-neutral-500">Literalnie bez limitu</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
