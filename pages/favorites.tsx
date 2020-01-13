import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Header from "../components/Header";
import "../static/style.css";
import { logIn, logOut } from "../lib/actions";
import {
    Card,
    CardText,
    CardHeader,
    CardBody,
    Button,
    Container,
    Table
} from "reactstrap";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

type favoritesRow = {
    id: number;
    station_from: string;
    station_to: string;
    depature_time: Date;
    arrival_time: Date;
    type: string;
    model: string;
};

type State = {
    favorites: favoritesRow[];
};

type Props = {
    login: string;
    id: number;
    authorized: boolean;
    logIn: any;
    logOut: any;
};

const spanStyle: Object = {
    marginLeft: 20
};

const tableStyle: Object = {
    marginTop: 20,
    border: "1px solid #DDD"
};

class FavoritesPage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            favorites: []
        };
        const pageRequest = `http://localhost:3000/api/favorites?id=${this.props.id}`;
        fetch(pageRequest).then(res => {
            res.json().then(json => {
                this.setState({
                    favorites: json.schedule
                });
            });
        });
    }

    render() {
        console.log(1);
        return (
            <>
                <Header />
                <Container>
                    <Table hover style={tableStyle}>
                        <thead>
                            <tr>
                                <th>Станция отправления</th>
                                <th>Станция прибытия</th>
                                <th>Время отправления</th>
                                <th>Время прибытия</th>
                                <th>Режим движения</th>
                                <th>Модель поезда</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.favorites.map(record => (
                                <Link
                                    href="/record/[id]"
                                    as={`/record/${record.id}`}
                                >
                                    <tr
                                        className="schedule-row"
                                        key={record.id}
                                    >
                                        <td>{record.station_from}</td>
                                        <td>{record.station_to}</td>
                                        <td>{record.depature_time}</td>
                                        <td>{record.arrival_time}</td>
                                        <td>{record.type}</td>
                                        <td>{record.model}</td>
                                    </tr>
                                </Link>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </>
        );
    }
}

type globalState = {
    user: Props;
};

const mapStateToProps = (state: globalState) => ({
    login: state.user.login,
    id: state.user.id,
    authorized: state.user.authorized
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
