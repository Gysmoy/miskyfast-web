import Tippy from "@tippyjs/react";
import React from "react";
import "tippy.js/dist/tippy.css";
import Logout from "../../Actions/Logout";
import MenuItem from "../MenuItem";
import MenuItemContainer from "../MenuItemContainer";

const Menu = ({ session, hasRole }) => {
  const mainRole = session.roles[0];

  return (
    <div className="left-side-menu">
      <div className="h-100" data-simplebar>
        <div className="user-box text-center">
          <img
            src={`/api/profile/thumbnail/${session.uuid}?v=${new Date(session.updated_at).getTime()}`}
            alt={session.name}
            title={session.name}
            className="rounded-circle img-thumbnail avatar-md"
            style={{
              backgroundColor: "unset",
              borderColor: "#98a6ad",
              objectFit: "cover",
              objectPosition: "center",
            }}
            onError={(e) =>
              (e.target.src = `https://ui-avatars.com/api/?name=${session.name}+${session.lastname}&color=7F9CF5&background=EBF4FF`)
            }
          />
          <div className="dropdown">
            <a href="#"
              className="user-name dropdown-toggle h5 mt-2 mb-1 d-block"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              {session.name.split(" ")[0]}{" "}
              {session.lastname.split(" ")[0]}
            </a>
            <div className="dropdown-menu user-pro-dropdown">
              <a href="/profile"
                className="dropdown-item notify-item">
                <i className="fe-user me-1"></i>
                <span>Mi perfil</span>
              </a>

              <a href="/account"
                className="dropdown-item notify-item">
                <i className="mdi mdi-account-key-outline me-1"></i>
                <span>Mi cuenta</span>
              </a>

              <a href="#"
                className="dropdown-item notify-item right-bar-toggle dropdown notification-list">
                <i className="fe-settings me-1"></i>
                <span>Configuracion</span>
              </a>

              <a href="#"
                className="dropdown-item notify-item"
                onClick={Logout}>
                <i className="fe-log-out me-1"></i>
                <span>Cerrar sesion</span>
              </a>
            </div>
          </div>

          {/* <Tippy content={mainRole.description} arrow={true}> */}
          <p className="text-muted left-user-info">{mainRole.name}</p>
          {/* </Tippy> */}

          <ul className="list-inline">
            <li className="list-inline-item">
              <Tippy content="Configuracion">
                <a href="#"
                  className="text-muted left-user-info right-bar-toggle dropdown notification-list">
                  <i className="mdi mdi-cog"></i>
                </a>
              </Tippy>
            </li>

            <li className="list-inline-item">
              <Tippy content="Cerrar sesion">
                <a href="#"
                  className="text-danger"
                  onClick={Logout}>
                  <i className="mdi mdi-power"></i>
                </a>
              </Tippy>
            </li>
          </ul>
        </div>
        {hasRole("Admin") && (
          <div id="sidebar-menu" className="show">
            <ul id="side-menu">
              <li className="menu-title">Navigation Panel</li>
              {hasRole("Admin") && (
                <>
                  {/* Administración */}
                  <MenuItem href="/admin/home" icon="mdi mdi-home">Dashboard</MenuItem>

                  <MenuItem href="/admin/restaurants" icon="mdi mdi-silverware">Restaurantes</MenuItem>

                  <MenuItemContainer title="Usuarios" icon="mdi mdi-account-group">
                    <MenuItem href="/admin/restaurant-users" icon="mdi mdi-account-group">Restaurantes</MenuItem>
                    <MenuItem href="/admin/deliveries" icon="mdi mdi-moped">Deliveries</MenuItem>
                    <MenuItem href="/admin/clients" icon="mdi mdi-account-multiple">Clientes</MenuItem>
                  </MenuItemContainer>

                  <li className="menu-title">Aplicación</li>

                  <MenuItem href="/admin/categories" icon="mdi mdi-shape-outline">Categorías</MenuItem>
                  <MenuItem href="/admin/statuses" icon="mdi mdi-tag-text">Estados</MenuItem>
                  <MenuItem href="/admin/messages" icon="mdi mdi-message-text">Mensajes</MenuItem>

                  <li className="menu-title">Configuraciones</li>
                  <MenuItem href="/admin/profile" icon="mdi mdi-account-box">Mi perfil</MenuItem>
                  <MenuItem href="/admin/account" icon="mdi mdi-account-key">Mi cuenta</MenuItem>
                </>
              )}
            </ul>
          </div>
        )}
        {hasRole("Customer") && (
          <div id="sidebar-menu" className="show">
            <ul id="side-menu">
              <li className="menu-title">Panel del Cliente</li>

              {hasRole("Customer") && (
                <>
                  <MenuItem href="/customer/orders" icon="mdi mdi-cart-outline">
                    Mis Pedidos</MenuItem>
                  <MenuItem href="/customer/albums" icon="mdi mdi-cart-outline">
                    Mis Albums</MenuItem>
                </>
              )}
            </ul>
          </div>
        )}

        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default Menu;
