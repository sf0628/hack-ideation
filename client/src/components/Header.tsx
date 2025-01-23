interface HeaderProps {
    onClickHome: () =>  void;
    onClickGames: () => void;
    onClickStats: () => void;
}

function Header({onClickHome, onClickGames, onClickStats}: HeaderProps) {
    return (
        <nav >
            <ul className="flex flex-row justify-evenly">
                <li><button type="button" className="menu-button text-black" onClick={onClickHome}>CoSMO X HackBeanpot</button></li>
                <li><button type="button" className="menu-button text-black" onClick={onClickGames}>Browse</button></li>
                <li><button type="button" className="menu-button text-black" onClick={onClickStats}>History</button></li>
            </ul>
        </nav>
    )
}

export default Header;