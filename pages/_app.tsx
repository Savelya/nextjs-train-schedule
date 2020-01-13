import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import initStore from "../lib/store";

export default withRedux(initStore)(
    class MyApp extends App {
        // @ts-ignore
        static async getInitialProps({ Component, ctx }) {
            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            };
        }

        render() {
            // @ts-ignore
            const { Component, pageProps, store } = this.props;
            return (
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            );
        }
    }
);
