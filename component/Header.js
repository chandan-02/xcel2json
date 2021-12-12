/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import { Layout } from "antd";
const { Header } = Layout;

const Top = () => {
    return (
        <Layout>
            <Head>
                <title>Xcel2Json</title>
                <meta name="Xcel2json" content="Convert excel file to json" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></link>
            </Head>
            <Header >
                <h1 style={{textAlign:'center', color: '#ffffff',fontFamily:'Poppins',fontSize:'1.5rem'}}>Xcel2Json</h1>
            </Header>
        </Layout>
    )
}

export default Top;