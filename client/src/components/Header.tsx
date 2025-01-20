interface HeaderProps {
    onClickHome: () =>  void;
    onClickGames: () => void;
    onClickCreateGame: () => void;
}

function Header({onClickHome, onClickGames, onClickCreateGame}: HeaderProps) {
    return (
        <header className="">
            <nav >
                <ul className="flex flex-row justify-between">
                    <li><button type="button" className="menu-button text" onClick={onClickHome}>CoSMO X HackBeanpot</button></li>
                    <li><button type="button" className="menu-button" onClick={onClickGames}>Browse</button></li>
                    <li><button type="button" className="menu-button" onClick={onClickCreateGame}>Create</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;