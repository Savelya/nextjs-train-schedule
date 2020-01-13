import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Container } from "reactstrap";

export default function About() {
    return (
        <>
            <Header />
            <Container>
                <Layout>
                    <div>Курсовой проект выполнил студент группы М8О-313-17 Безенков Савелий. Используются такие технологии как: React, Redux, MySql, TypeScript, Next.js.</div>
                </Layout>
            </Container>
        </>
    );
}
