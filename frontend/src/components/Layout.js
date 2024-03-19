import TopBar from './TopBar'

const Layout = ({ children }) => {
  return (
    <div>
        <div class="fixed top-0 w-screen z-50">
            <TopBar />
        </div>
        <div className='containers' class="bg-gray-50">{children}</div>
    </div>
  )
}

export default Layout