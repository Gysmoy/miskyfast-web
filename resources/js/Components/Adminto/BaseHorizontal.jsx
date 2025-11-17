import Footer from './Footer'
import NavBar from './NavBarHorizontal'
import RigthBar from './RightBar'
import TopNav from './TopNav';

moment.tz.setDefault('UTC');

const Base = ({ children, title, ...props }) => {
  return (<>
    <div id="wrapper">
      <NavBar {...props} title={title} />
      <TopNav {...props} />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid py-3">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
    {/* <RigthBar {...props} /> */}
    <div className="rightbar-overlay"></div>
  </>)
}

export default Base