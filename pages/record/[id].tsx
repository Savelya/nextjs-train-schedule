import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { logIn } from "../../lib/actions";

type scheduleRow = {
    id: number;
    station_from: string;
    station_to: string;
    depature_time: Date;
    arrival_time: Date;
    type: string;
    train: string;
};

type Props = {
    record: scheduleRow;
};

const spanStyle: Object = {
    marginLeft: 20
};

const ProfilePage: NextPage<Props> = ({ record }) => {
    return (
        <>
            <Header/>
            <div>
                <span style={spanStyle}>{record.station_from}</span>
                <span style={spanStyle}>{record.station_to}</span>
                <span style={spanStyle}>{record.depature_time}</span>
                {/* <span style={spanStyle}>
                                    {record.arrival_time.getMilliseconds() - record.depature_time.getMilliseconds()}
                                </span> */}
                <span style={spanStyle}>{record.arrival_time}</span>
                <span style={spanStyle}>{record.type}</span>
                <span style={spanStyle}>{record.train}</span>
                <Link href="/">
                    <a>← Back to schedule</a>
                </Link>
            </div>
        </>
    );
};

ProfilePage.getInitialProps = async ({ req, query }) => {
    const pageRequest = `http://localhost:3000/api/schedule/record?id=${query.id}`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    return json;
};

export default ProfilePage;
