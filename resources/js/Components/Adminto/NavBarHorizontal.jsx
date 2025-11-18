import React, { useEffect } from "react"
import Logout from "../../Actions/Logout"
import Global from "../../Utils/Global"

const NavBar = ({ session = {}, title = 'Pagina' }) => {

  useEffect(() => {
    document.title = `${title} | ${Global.APP_NAME}`
  }, [null])

  return <div className="navbar-custom">
    <div className="container-fluid">
      <ul className="list-unstyled topnav-menu float-end mb-0">

        <li className="dropdown notification-list topbar-dropdown">
          <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown"
            href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src={`/api/profile/thumbnail/${session.uuid}?v=${crypto.randomUUID()}`} alt="user-image" className="rounded-circle" style={{ objectFit: 'cover', objectPosition: 'center' }} onError={e => e.target.src = `https://ui-avatars.com/api/?name=${session.name}+${session.lastname}&color=7F9CF5&background=EBF4FF`} />
            <span className="pro-user-name ms-1">
              {session.name.split(' ')[0]} {session.lastname.split(' ')[0]}
              <i className="mdi mdi-chevron-down"></i>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end profile-dropdown ">

            {/* <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Bienvenido !</h6>
            </div>


            <a href="/profile" className="dropdown-item notify-item">
              <i className="fe-user"></i>
              <span>Mi perfil</span>
            </a>

            <a href="/account" className="dropdown-item notify-item">
              <i className="mdi mdi-account-key-outline"></i>
              <span>Mi cuenta</span>
            </a>
            <a href="#" className="dropdown-item notify-item right-bar-toggle dropdown notification-list">
              <i className="fe-lock"></i>
              <span>Configuracion</span>
            </a>

            <div className="dropdown-divider"></div> */}


            <a href="#" className="dropdown-item notify-item" onClick={Logout}>
              <i className="fe-log-out"></i>
              <span>Cerrar sesion</span>
            </a>

          </div>
        </li>

        {/* <li className="dropdown notification-list">
          <a href="javascript:void(0);" className="nav-link right-bar-toggle waves-effect waves-light">
            <i className="fe-settings noti-icon"></i>
          </a>
        </li> */}

      </ul>
      <div className="logo-box">
         <a href="/" className="logo logo-light text-center">
          <span className="logo-sm">
            <img src="/assets/resources/icon.png" alt="" height="22" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/img/icon-bk.svg';
            }} />
          </span>
          <span className="logo-lg">
            <img src="/assets/resources/logo.png" alt="" style={{ height: '30px', aspectRatio: 49/8 }} onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/img/banner.svg';
            }} />
          </span>
        </a>
        <a href="/" className="logo logo-dark text-center">
          <span className="logo-sm">
            <img src="/assets/resources/icon.png" alt="" height="22" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/img/icon-bk.svg';
            }} />
          </span>
          <span className="logo-lg">
            <img src="/assets/resources/logo.png" alt="" style={{ height: '30px', aspectRatio: 49/8 }} onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/img/banner.svg';
            }} />
          </span>
        </a>
      </div>

      <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">

        <li>
          <a className="navbar-toggle nav-link" data-bs-toggle="collapse"
            data-bs-target="#topnav-menu-content">
            <div className="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </li>

      </ul>

      <div className="clearfix"></div>

    </div>

  </div>
}

export default NavBar