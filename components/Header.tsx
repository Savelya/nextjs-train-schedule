import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormEvent, Component, ChangeEvent, MouseEvent } from "react";
import fetch from "isomorphic-unfetch";
import Cookies from "universal-cookie";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    FormFeedback,
    Button,
    FormGroup,
    Label,
    Input,
    Form
} from "reactstrap";
import { connect } from "react-redux";
import { logIn, logOut } from "../lib/actions";
import { bindActionCreators } from "redux";

const linkStyle: Object = {
    marginRight: 15
};

type Props = {
    login: string;
    id: number;
    authorized: boolean;
    logIn: any;
    logOut: any;
};

type State = {
    name: string;
    password: string;
    modal: boolean;
    author: boolean;
    addFavorite: boolean;
    incorrectFrom: boolean;
    incorrectTo: boolean;
    incorrectLogin: boolean;
    incorrectPassword: boolean;
    errorMessage: string;
    authorized: boolean;
    id: number;
    from: string;
    to: string;
};

type globalState = {
    user: Props;
};

class Header extends Component<Props, State> {
    toggle = () =>
        this.setState({
            modal: !this.state.modal
        });

    toggleAuthor = () => this.setState({ author: !this.state.author });

    toggleAdd = () => this.setState({ addFavorite: !this.state.addFavorite });

    handleSubmitRegistr = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const pageRequest = `http://localhost:3000/api/users/new_user?name=${this.state.name}&password=${this.state.password}`;
        const res = await fetch(pageRequest);
        const json = await res.json();
        if (json.newUser.alredy_exist != 1) {
            this.setState({
                modal: false,
                authorized: true,
                id: json.newUser.id,
                incorrectLogin: false,
                incorrectPassword: false
            });

            this.props.logIn({
                login: this.state.name,
                id: this.state.id,
                authorized: this.state.authorized
            });

            const cookies = new Cookies();
            cookies.set("Username", this.state.name);
            cookies.set("Id", this.state.id);
            cookies.set("Authorized", this.state.authorized);
        } else {
            this.setState({
                password: "",
                incorrectLogin: true,
                incorrectPassword: false,
                errorMessage: "Опа! Данное имя уже используется"
            });
        }
    };

    handleSubmitAuthor = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const pageRequest = `http://localhost:3000/api/users/user?name=${this.state.name}&password=${this.state.password}`;
        const res = await fetch(pageRequest);
        const json = await res.json();
        if (json.user[0][0] === 0) {
            this.setState({
                incorrectLogin: false,
                incorrectPassword: true,
                errorMessage: "Упс! Неверный пароль"
            });
        } else if (json.user[0][1] === 1) {
            this.setState({
                incorrectLogin: true,
                incorrectPassword: false,
                errorMessage: "Упс! Пользователь не найден"
            });
        } else {
            this.setState({
                modal: false,
                authorized: true,
                id: json.user[0].id,
                incorrectLogin: false,
                incorrectPassword: false
            });

            this.props.logIn({
                login: this.state.name,
                id: this.state.id,
                authorized: this.state.authorized
            });

            const cookies = new Cookies();
            cookies.set("Username", this.state.name);
            cookies.set("Id", this.state.id);
            cookies.set("Authorized", this.state.authorized);
        }
    };

    handleSubmitFavorite = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const pageRequest = `http://localhost:3000/api/favorites/new_favorite?id=${this.state.id}&from=${this.state.from}&to=${this.state.to}`;
        const res = await fetch(pageRequest);
        const json = await res.json();
        if (json.newFavorite.from_exists === 0) {
            this.setState({
                incorrectFrom: true
            });
        }
        if (json.newFavorite.to_exists === 0) {
            this.setState({
                incorrectTo: true
            });
        }
        if (json.newFavorite.done === 1) {
            this.setState({
                incorrectTo: false,
                incorrectFrom: false, 
                addFavorite: false,
                from: "",
                to: ""
            });
        }
    };

    handleChangeName = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: ev.target.value, incorrectLogin: false });
    };

    handleChangePassword = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: ev.target.value, incorrectPassword: false });
    };

    handleChangeFrom = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({ from: ev.target.value, incorrectFrom: false });
    };

    handleChangeTo = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({ to: ev.target.value, incorrectTo: false });
    };

    handleExitButton = (event: MouseEvent) => {
        this.setState({ name: "", password: "", authorized: false });

        this.props.logOut();

        const cookies = new Cookies();
        cookies.set("Username", "");
        cookies.set("Id", 0);
        cookies.set("Authorized", "");
    };

    constructor(props: Props) {
        super(props);

        // const cookies = new Cookies();
        // cookies.set('myCat', 'Pacman', { path: '/' });
        // console.log(cookies.get('myCat'));

        this.state = {
            name: this.props.login,
            password: "",
            modal: false,
            author: false,
            addFavorite: false,
            authorized: this.props.authorized,
            id: this.props.id,
            incorrectLogin: false,
            incorrectPassword: false,
            incorrectFrom: false,
            incorrectTo: false,
            from: "",
            to: "",
            errorMessage: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitRegistr = this.handleSubmitRegistr.bind(this);
        this.handleSubmitAuthor = this.handleSubmitAuthor.bind(this);
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link href="/">
                        <NavbarBrand className="schedule-row">
                            Расписание поездов
                        </NavbarBrand>
                    </Link>
                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar LinkComponent={Link}>
                            <NavItem>
                                <NavLink
                                    onClick={this.toggleAuthor}
                                    className="schedule-row"
                                >
                                    Об авторе
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Savelya">
                                    GitHub
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="schedule-row" navbar>
                            {!this.state.authorized ||
                            this.state.authorized === undefined ? (
                                <NavItem>
                                    <NavLink onClick={this.toggle}>
                                        Войти
                                    </NavLink>
                                </NavItem>
                            ) : (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {this.state.name}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <Link href="/favorites">
                                            <DropdownItem className="schedule-row">
                                                Избранные
                                            </DropdownItem>
                                        </Link>
                                        <DropdownItem onClick={this.toggleAdd}>
                                            Добавить в избранное
                                        </DropdownItem>
                                        <Link href="/">
                                            <DropdownItem
                                                onClick={this.handleExitButton}
                                            >
                                                Выйти
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Авторизация</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitRegistr}>
                            <FormGroup>
                                <Label for="loginInput">Логин</Label>
                                <Input
                                    // innerRef={(node) => this.emailInputValue = node}
                                    type="text"
                                    value={this.state.name}
                                    name="text"
                                    id="loginInput"
                                    placeholder="Введите логин"
                                    onChange={this.handleChangeName}
                                    invalid={this.state.incorrectLogin}
                                />
                                <FormFeedback>
                                    {this.state.errorMessage}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passwordInput">Пароль</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="passwordInput"
                                    placeholder="Введите пароль"
                                    onChange={this.handleChangePassword}
                                    invalid={this.state.incorrectPassword}
                                />
                                <FormFeedback>
                                    {this.state.errorMessage}
                                </FormFeedback>
                            </FormGroup>
                            <Button
                                className="button"
                                onClick={this.handleSubmitAuthor.bind(this)}
                            >
                                Войти
                            </Button>
                            <Button className="button">
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.author} toggle={this.toggleAuthor}>
                    <ModalHeader toggle={this.toggleAuthor}>
                        Об авторе
                    </ModalHeader>
                    <ModalBody>
                        Курсовой проект выполнил студент группы М8О-313-17
                        Безенков Савелий. Используются такие технологии как:
                        React, Redux, MySql, TypeScript, Next.js.
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.addFavorite} toggle={this.toggleAdd}>
                    <ModalHeader toggle={this.toggleAdd}>
                        Добавить в избранное
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitFavorite}>
                            <FormGroup>
                                <Label for="fromInput">Начальная станция</Label>
                                <Input
                                    type="text"
                                    value={this.state.from}
                                    name="text"
                                    id="fromInput"
                                    placeholder="Введите начальную станцию"
                                    onChange={this.handleChangeFrom}
                                    invalid={this.state.incorrectFrom}
                                />
                                <FormFeedback>
                                    Опа! Станция не найдена
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="toInput">Конечная станция</Label>
                                <Input
                                    type="text"
                                    value={this.state.to}
                                    name="text"
                                    id="passwordInput"
                                    placeholder="Введите конечную станцию"
                                    onChange={this.handleChangeTo}
                                    invalid={this.state.incorrectTo}
                                />
                                <FormFeedback>
                                    Упс! Станция не найдена
                                </FormFeedback>
                            </FormGroup>
                            <Button className="button">Добавить</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state: globalState) => ({
    login: state.user.login,
    id: state.user.id,
    authorized: state.user.authorized
});

const mapDispatchToProps = (dispatch: any) => ({
    logIn: bindActionCreators(logIn, dispatch),
    logOut: bindActionCreators(logOut, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
