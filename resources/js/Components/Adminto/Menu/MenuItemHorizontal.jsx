const MenuItemHorizontal = ({ href, icon, children, onClick, target = '_self', rightBarToggle }) => {
    return <li class="nav-item dropdown">
        {
            onClick
                ? <a href="#" className="nav-link arrow-none cursor-pointer" onClick={(e) => {
                    e.preventDefault;
                    onClick()
                }}>
                    <i class={`${icon} me-1`}></i>
                    <span>{children}</span>
                </a>
                : <a href={href} target={target} class={`nav-link arrow-none ${location.pathname.startsWith(href) ? 'active' : ''}`}>
                    <i class={`${icon} me-1`}></i>
                    <span>{children}</span>
                </a>
        }

    </li>
}

export default MenuItemHorizontal