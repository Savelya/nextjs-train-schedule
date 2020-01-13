import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Header from "../components/Header";
import "../static/style.css";
import { logIn } from "../lib/actions";
import {
    Card,
    CardText,
    CardHeader,
    CardBody,
    Button,
    Container,
    Table
} from "reactstrap";

type scheduleRow = {
    id: number;
    station_from: string;
    station_to: string;
    depature_time: Date;
    arrival_time: Date;
    type: string;
    model: string;
};

type Props = {
    schedule: scheduleRow[];
    pageCount: number;
    page: number;
};

const spanStyle: Object = {
    marginLeft: 20
};

const tableStyle: Object = {
    marginTop: 20,
    border: "1px solid #DDD"
};

const HomePage: NextPage<Props> = ({ schedule, pageCount, page }) => {
    return (
        <>
            <Header/>
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
                        {schedule.map(record => (
                            <Link
                                href="/record/[id]"
                                as={`/record/${record.id}`}
                            >
                                <tr className="schedule-row" key={record.id}>
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
};

HomePage.getInitialProps = async ({ req, query }) => {
    const pageRequest = `http://localhost:3000/api/schedule`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    return json;
};

export default HomePage;