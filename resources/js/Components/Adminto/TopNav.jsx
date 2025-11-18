import Logout from "../../Actions/Logout"
import MenuItem from "./Menu/MenuItemHorizontal"

const TopNav = ({ session, hasRole }) => {
  return <div className="topnav">
            <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand-lg topnav-menu">

                    <div className="collapse navbar-collapse" id="topnav-menu-content">
                        <ul className="navbar-nav">
                            <MenuItem href='/kitchen/home' icon='mdi mdi-home'>Inicio</MenuItem>
                            <MenuItem onClick={Logout} icon='mdi mdi-logout'>Cerrar sesión</MenuItem>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link arrow-none" href="index.html" id="topnav-dashboard" role="button"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-view-dashboard me-1"></i> Dashboard
                                </a>

                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-ui" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-invert-colors me-1"></i> UI Elements <div className="arrow-down">
                                    </div>
                                </a>

                                <div className="dropdown-menu mega-dropdown-menu dropdown-mega-menu-xl"
                                    aria-labelledby="topnav-ui">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div>
                                                <a href="ui-buttons.html" className="dropdown-item">Buttons</a>
                                                <a href="ui-cards.html" className="dropdown-item">Cards</a>
                                                <a href="ui-avatars.html" className="dropdown-item">Avatars</a>
                                                <a href="ui-tabs-accordions.html" className="dropdown-item">Tabs &
                                                    Accordions</a>
                                                <a href="ui-modals.html" className="dropdown-item">Modals</a>
                                                <a href="ui-progress.html" className="dropdown-item">Progress</a>

                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div>
                                                <a href="ui-notifications.html" className="dropdown-item">Notifications</a>
                                                <a href="ui-offcanvas.html" className="dropdown-item">Offcanvas</a>
                                                <a href="ui-placeholders.html" className="dropdown-item">Placeholders</a>
                                                <a href="ui-spinners.html" className="dropdown-item">Spinners</a>
                                                <a href="ui-images.html" className="dropdown-item">Images</a>
                                                <a href="ui-carousel.html" className="dropdown-item">Carousel</a>

                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div>
                                                <a href="ui-video.html" className="dropdown-item">Embed Video</a>
                                                <a href="ui-dropdowns.html" className="dropdown-item">Dropdowns</a>
                                                <a href="ui-tooltips-popovers.html" className="dropdown-item">Tooltips &
                                                    Popovers</a>
                                                <a href="ui-general.html" className="dropdown-item">General UI</a>
                                                <a href="ui-typography.html" className="dropdown-item">Typography</a>
                                                <a href="ui-grid.html" className="dropdown-item">Grid</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-apps" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fe-grid me-1"></i> Apps <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="topnav-apps">

                                    <a href="apps-calendar.html" className="dropdown-item">Calendar</a>
                                    <a href="apps-chat.html" className="dropdown-item">Chat</a>

                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-email"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Email <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-email">
                                            <a href="email-inbox.html" className="dropdown-item">Inbox</a>
                                            <a href="email-templates.html" className="dropdown-item">Email Templates</a>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-task"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Tasks <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-task">
                                            <a href="task-details.html" className="dropdown-item">Details</a>
                                            <a href="task-kanban-board.html" className="dropdown-item">Kanban Board</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item arrow-none" href="apps-projects.html"
                                            id="topnav-contact" role="button" aria-haspopup="true"
                                            aria-expanded="false">
                                            Projects
                                        </a>
                                    </div>

                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#"
                                            id="topnav-contacts" role="button" data-bs-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            Contacts <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-contacts">
                                            <a href="contacts-list.html" className="dropdown-item">Members List</a>
                                            <a href="contacts-profile.html" className="dropdown-item">Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </li>



                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components"
                                    role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-lifebuoy me-1"></i> Components <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="topnav-components">
                                    <a href="widgets.html" className="dropdown-item">Widgets</a>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#"
                                            id="topnav-extendedui" role="button" data-bs-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            Extended UI <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-extendedui">
                                            <a href="extended-range-slider.html" className="dropdown-item">Range Slider</a>
                                            <a href="extended-sweet-alert.html" className="dropdown-item">Sweet Alert</a>
                                            <a href="extended-draggable-cards.html" className="dropdown-item">Draggable
                                                Cards</a>
                                            <a href="extended-tour.html" className="dropdown-item">Tour Page</a>
                                            <a href="extended-notification.html" className="dropdown-item">Notification</a>
                                            <a href="extended-treeview.html" className="dropdown-item">Tree View</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-form"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Forms <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-form">
                                            <a href="forms-elements.html" className="dropdown-item">General Elements</a>
                                            <a href="forms-advanced.html" className="dropdown-item">Advanced</a>
                                            <a href="forms-validation.html" className="dropdown-item">Validation</a>
                                            <a href="forms-wizard.html" className="dropdown-item">Wizard</a>
                                            <a href="forms-quilljs.html" className="dropdown-item">Quilljs Editor</a>
                                            <a href="forms-pickers.html" className="dropdown-item">Pickers</a>
                                            <a href="forms-file-uploads.html" className="dropdown-item">File Uploads</a>
                                            <a href="forms-x-editable.html" className="dropdown-item">X Editable</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-charts"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Charts <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-charts">
                                            <a href="charts-flot.html" className="dropdown-item">Flot Charts</a>
                                            <a href="charts-morris.html" className="dropdown-item">Morris Charts</a>
                                            <a href="charts-chartjs.html" className="dropdown-item">Chartjs Charts</a>
                                            <a href="charts-chartist.html" className="dropdown-item">Chartist Charts</a>
                                            <a href="charts-sparklines.html" className="dropdown-item">Sparklines Charts</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-table"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Tables <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-table">
                                            <a href="tables-basic.html" className="dropdown-item">Basic Tables</a>
                                            <a href="tables-datatables.html" className="dropdown-item">Data Tables</a>
                                            <a href="tables-editable.html" className="dropdown-item">Editable Tables</a>
                                            <a href="tables-responsive.html" className="dropdown-item">Responsive Tables</a>
                                            <a href="tables-tablesaw.html" className="dropdown-item">Tablesaw Tables</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-icons"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Icons <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-icons">
                                            <a href="icons-feather.html" className="dropdown-item">Feather Icons</a>
                                            <a href="icons-mdi.html" className="dropdown-item">Material Design Icons</a>
                                            <a href="icons-dripicons.html" className="dropdown-item">Dripicons</a>
                                            <a href="icons-font-awesome.html" className="dropdown-item">Font Awesome 5</a>
                                            <a href="icons-themify.html" className="dropdown-item">Themify</a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-map"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Maps <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-map">
                                            <a href="maps-google.html" className="dropdown-item">Google Maps</a>
                                            <a href="maps-vector.html" className="dropdown-item">Vector Maps</a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-cards-outline me-1"></i> Pages <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="topnav-pages">
                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-auth"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Auth Style <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-auth">
                                            <a href="auth-login.html" className="dropdown-item">Log In</a>
                                            <a href="auth-register.html" className="dropdown-item">Register</a>
                                            <a href="auth-recoverpw.html" className="dropdown-item">Recover Password</a>
                                            <a href="auth-lock-screen.html" className="dropdown-item">Lock Screen</a>
                                            <a href="auth-confirm-mail.html" className="dropdown-item">Confirm Mail</a>
                                            <a href="auth-logout.html" className="dropdown-item">Logout</a>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-error"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Errors <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-error">
                                            <a href="pages-404.html" className="dropdown-item">Error 404</a>
                                            <a href="pages-500.html" className="dropdown-item">Error 500</a>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-utility"
                                            role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Utility <div className="arrow-down"></div>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="topnav-utility">
                                            <a href="pages-pricing.html" className="dropdown-item">Pricing</a>
                                            <a href="pages-timeline.html" className="dropdown-item">Timeline</a>
                                            <a href="pages-invoice.html" className="dropdown-item">Invoice</a>
                                            <a href="pages-faqs.html" className="dropdown-item">FAQs</a>
                                            <a href="pages-gallery.html" className="dropdown-item">Gallery</a>
                                            <a href="pages-maintenance.html" className="dropdown-item">Maintenance</a>
                                            <a href="pages-coming-soon.html" className="dropdown-item">Coming Soon</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-layout" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-card-bulleted-settings-outline me-1"></i> Layouts <div
                                        className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="topnav-layout">
                                    <a href="layouts-horizontal.html" className="dropdown-item">Horizontal</a>
                                    <a href="index.html" className="dropdown-item">Vertical</a>
                                    <a href="layouts-preloader.html" className="dropdown-item">Preloader</a>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
}

export default TopNav