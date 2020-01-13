import * as React from "react";

type Props = {};

const layoutStyle: Object = {
    margin: 20,
    padding: 20,
    border: "1px solid #DDD"
};

const Layout: React.FunctionComponent<Props> = (props) => (
    <div style={layoutStyle}>
        {props.children}
    </div>
);

export default Layout;
