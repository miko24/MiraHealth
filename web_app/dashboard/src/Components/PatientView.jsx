import {
    SettingOutlined,
    ExpandOutlined
} from '@ant-design/icons';
import { Card, Col, Row, theme} from 'antd';
import { useState } from 'react';
import Chart from "./Chartt";
const { Meta } = Card;

export default function PatientView({user}) {
    const [lastBPM,setLastBPM] = useState(0);
    const [lastTemp,setLastTemp] = useState(0);
    const [lastBP,setLastBP] = useState(0);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (!user) {
        return null;
    }

    return (
            <div
            style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
            }}
        >
            <h2>Stats for: {user.first_name} {user.last_name}</h2>
            <Row align={"middle"}>
                <Col span={4}>
                    <svg style={{width: "100%", display: "block", marginBottom: "-35px"}}
                         viewBox="0 0 512 512" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="_x37_19_x2C__heartbeat_x2C__love_x2C__heart_x2C__wedding">
                            <g>
                                <path
                                    d="M308.304,157.579c26.28,0,47.564,21.284,47.564,47.502c0,39.215-32.424,64.5-70.456,98.844    c-8.038,7.252-16.323,14.916-24.599,23.203c-8.909-8.91-17.807-17.098-26.405-24.836c-37.234-33.521-68.599-58.619-68.599-97.211    c0-26.218,21.271-47.502,47.502-47.502c23.751,0,35.626,11.876,47.502,35.627C272.689,169.455,284.565,157.579,308.304,157.579z"
                                    style={{fill: "#EF3E5C"}}/>
                                <g>
                                    <g>
                                        <g>
                                            <path
                                                d="M258.908,312.178c-37.234-33.521-68.599-58.619-68.599-97.211       c0-26.218,21.271-47.502,47.502-47.502c1.774,0,3.474,0.074,5.12,0.207c-7.703-6.729-16.979-10.093-29.62-10.093       c-26.23,0-47.502,21.284-47.502,47.502c0,38.592,31.364,63.689,68.599,97.211c8.599,7.738,17.496,15.926,26.405,24.836       c2.332-2.335,4.664-4.615,6.991-6.856C264.813,317.516,261.842,314.818,258.908,312.178z"
                                                style={{fill: "#E42A53"}}/>
                                        </g>
                                    </g>
                                </g>
                                <path
                                    d="M360.227,354.421c-0.022,0-0.045,0-0.066,0c-2.319-0.031-4.313-1.651-4.815-3.915l-14.207-63.93    l-12.414,37.242c-0.681,2.042-2.591,3.419-4.743,3.419h-63.429c-2.762,0-5-2.238-5-5s2.238-5,5-5h59.825l16.982-50.948    c0.71-2.132,2.754-3.537,5.001-3.412c2.244,0.115,4.136,1.715,4.623,3.908l13.528,60.876l22.047-88.187    c0.557-2.226,2.557-3.787,4.851-3.787s4.294,1.562,4.851,3.787l17.176,68.701h23.279c2.762,0,5,2.238,5,5s-2.238,5-5,5h-27.184    c-2.294,0-4.294-1.562-4.851-3.787l-13.271-53.086l-22.333,89.331C364.52,352.861,362.518,354.421,360.227,354.421z"
                                    style={{fill: "#EF3E5C"}}/>
                                <path
                                    d="M160.836,354.421c-2.291,0-4.293-1.559-4.85-3.787l-22.333-89.331l-13.272,53.086    c-0.556,2.226-2.556,3.787-4.851,3.787H79.285c-2.761,0-5-2.238-5-5s2.239-5,5-5h32.342l17.176-68.701    c0.556-2.226,2.556-3.787,4.851-3.787c2.294,0,4.294,1.562,4.851,3.787l22.047,88.186l13.527-60.875    c0.487-2.193,2.379-3.793,4.624-3.908c2.237-0.128,4.29,1.28,5.001,3.412l16.982,50.948h59.824c2.762,0,5,2.238,5,5s-2.238,5-5,5    h-63.429c-2.152,0-4.063-1.377-4.743-3.419l-12.414-37.242l-14.206,63.93c-0.503,2.264-2.497,3.884-4.815,3.915    C160.881,354.421,160.858,354.421,160.836,354.421z"
                                    style={{fill: "#EF3E5C"}}/>
                            </g>
                        </g>
                        <g id="Layer_1"/>
                    </svg>
                </Col>
                <Col span={1}></Col>
                <Col span={12}>
                    <Chart setLastBPM={setLastBPM} color={"rgb(255, 99, 132)"}
                           url={`http://34.159.120.168:9090/api/v1/query?query=bpm_metric{job="script",MacAddress="${user.mac_address}"}[100s]`}/>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                    <Card
                        style={{
                            width: 300,
                            // height:136,
                        }}
                        cover={
                            <h3 style={{fontSize: 40, textAlign: "center", margin: 0}}>{lastBPM}</h3>
                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <ExpandOutlined key="expand"/>,
                        ]}
                    >
                        <Meta
                            title="BPM"
                            style={{textAlign: "center"}}
                        />
                    </Card>
                </Col>
            </Row>
            <Row align={"middle"}>
                <Col span={4}>
                    <svg style={{width: "60%", display: "block", margin: "0 auto"}}
                         viewBox="0 0 1024 1024" className="icon" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M691.6 231.4H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8s-8.9 19.8-19.8 19.8zM691.6 305.7H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8s-8.9 19.8-19.8 19.8zM691.6 380H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8 0 10.8-8.9 19.8-19.8 19.8z"
                            fill="#1A1A1A"/>
                        <path
                            d="M603.3 589.7V159.5c0-51.9-42.2-94.1-94.1-94.1-51.9 0-94.1 42.2-94.1 94.1v430.2c-61 33.4-102.4 98.2-102.4 172.5 0 108.4 88.2 196.5 196.5 196.5s196.5-88.2 196.5-196.5c0-74.3-41.5-139.1-102.4-172.5z m-94.2 327.7c-85.6 0-155.3-69.7-155.3-155.3 0-50.3 24-95 61.2-123.4 12.4-9.5 26.3-17.2 41.2-22.6V159.5c0-29.2 23.7-52.9 52.9-52.9s52.9 23.7 52.9 52.9V616.1c14.9 5.4 28.8 13.1 41.2 22.6 37.1 28.4 61.2 73.1 61.2 123.4 0 85.7-69.6 155.3-155.3 155.3z"
                            fill="#1A1A1A"/>
                        <path d="M509.4 766.5m-83.3 0a83.3 83.3 0 1 0 166.6 0 83.3 83.3 0 1 0-166.6 0Z"
                              fill="#00B36A"/>
                        <path
                            d="M613.3 767.2c-9.5-1.8-18.7 3.7-21.7 12.7-6.4 39.6-40.8 69.9-82.2 69.9-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3c6.7 0 13.2 0.8 19.4 2.3 0.1-0.8 0.2-1.6 0.2-2.3V207.7c0-10.5-8.6-19-19-19-10.5 0-19 8.6-19 19v440.1c-0.9 0-1.9 0.1-2.8 0.3-49 9.1-86.8 46.6-96.3 95.5-12.7 65.2 30.1 128.6 95.3 141.2 7.7 1.5 15.4 2.2 23 2.2 56.5 0 107.1-40 118.2-97.5 1.9-10.3-4.8-20.3-15.1-22.3z"
                            fill="#1A1A1A"/>
                    </svg>
                </Col>
                <Col span={1}></Col>
                <Col span={12}>
                    <Chart setLastBPM={setLastTemp} color={"rgb(70,180,80)"}
                           range={[30,50]}
                           url={`http://34.159.120.168:9090/api/v1/query?query=Temp_metric{job="script",MacAddress="${user.mac_address}"}[100s]`}/>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                    <Card
                        style={{
                            width: 300,
                            // height:136,
                        }}
                        cover={
                            <h3 style={{fontSize: 40, textAlign: "center", margin: 0}}>{lastTemp}</h3>
                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <ExpandOutlined key="expand"/>,
                        ]}
                    >
                        <Meta
                            title="°C"
                            style={{textAlign: "center"}}
                        />
                    </Card>
                </Col>
            </Row>
            <Row align={"middle"} style={{margin:"30px 0"}}>
                <Col span={4}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         style={{width: "45%", display: "block", margin: "0 auto"}}
                         viewBox="0 0 297.5 297.5"
                         fill="#000000" stroke="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g id="XMLID_28_">
                                    <g>
                                        <path style={{fill: "#ede701"}}
                                              d="M67.825,269.98v0.71c0,3.59-2.93,6.51-6.52,6.51h-17.6c-3.59,0-6.51-2.92-6.51-6.51v-0.71 c0-3.59,2.92-6.52,6.51-6.52h17.6C64.895,263.46,67.825,266.39,67.825,269.98z"></path>
                                        <rect x="155.445" y="26.95" style={{fill: "#ede701"}} width="13.74"
                                              height="115.1"></rect>
                                        <rect x="189.235" y="26.95" style={{fill: "#ede701"}} width="81.31"
                                              height="115.1"></rect>
                                        <path style={{fill: "#ede701"}}
                                              d="M90.785,44.78c-1.27,0.19-2.46,0.78-3.37,1.68c-1.12,1.12-1.76,2.67-1.76,4.26 s0.64,3.13,1.76,4.25c0.91,0.91,2.1,1.5,3.37,1.69c-2.39,12.02-11.88,21.5-23.89,23.89c-0.2-1.27-0.78-2.46-1.69-3.37 c-1.12-1.12-2.67-1.76-4.25-1.76c-1.59,0-3.14,0.64-4.25,1.76c-0.92,0.91-1.5,2.1-1.69,3.37c-12.02-2.39-21.5-11.88-23.89-23.89 c1.26-0.19,2.45-0.79,3.36-1.69c1.12-1.12,1.77-2.66,1.77-4.25s-0.65-3.14-1.77-4.26c-0.9-0.9-2.1-1.49-3.36-1.68 c2.77-13.94,15.09-24.48,29.83-24.48S88.015,30.84,90.785,44.78z M66.965,50.72v-16.9c0-3.32-2.69-6.01-6.01-6.01 c-3.32,0-6.02,2.69-6.02,6.01v16.9c0,3.32,2.7,6.01,6.02,6.01C64.275,56.73,66.965,54.04,66.965,50.72z"></path>
                                        <path
                                            d="M290.595,16.93v135.15c0,5.53-4.49,10.02-10.03,10.02h-74.44v67.79c0,27.83-22.64,50.47-50.47,50.47h-69.62 c-3.87,9.87-13.49,16.89-24.73,16.89h-17.6c-11.23,0-20.86-7.02-24.73-16.89h-2.05c-5.53,0-10.02-4.49-10.02-10.03 c0-5.53,4.49-10.02,10.02-10.02h2.05c3.87-9.88,13.5-16.9,24.73-16.9h17.6c11.24,0,20.86,7.02,24.73,16.9h69.62 c16.78,0,30.42-13.65,30.42-30.42V162.1h-13.74v17.11c0,27.83-22.64,50.47-50.46,50.47h-20.48c-27.83,0-50.47-22.64-50.47-50.47 v-79.03c-23.04-4.66-40.44-25.07-40.44-49.46c0-27.83,22.64-50.47,50.47-50.47c27.82,0,50.46,22.64,50.46,50.47 c0,24.39-17.4,44.8-40.44,49.46v79.03c0,16.77,13.65,30.42,30.42,30.42h20.48c16.77,0,30.41-13.65,30.41-30.42V162.1h-6.86 c-5.54,0-10.03-4.49-10.03-10.02V16.93c0-5.54,4.49-10.03,10.03-10.03h135.14C286.105,6.9,290.595,11.39,290.595,16.93z M270.545,142.05V26.95h-81.31v115.1H270.545z M169.185,142.05V26.95h-13.74v115.1H169.185z M87.415,46.46 c0.91-0.9,2.1-1.49,3.37-1.68c-2.77-13.94-15.09-24.48-29.83-24.48s-27.06,10.54-29.83,24.48c1.26,0.19,2.46,0.78,3.36,1.68 c1.12,1.12,1.77,2.67,1.77,4.26s-0.65,3.13-1.77,4.25c-0.91,0.9-2.1,1.5-3.36,1.69c2.39,12.01,11.87,21.5,23.89,23.89 c0.19-1.27,0.77-2.46,1.69-3.37c1.11-1.12,2.66-1.76,4.25-1.76c1.58,0,3.13,0.64,4.25,1.76c0.91,0.91,1.49,2.1,1.69,3.37 c12.01-2.39,21.5-11.87,23.89-23.89c-1.27-0.19-2.46-0.78-3.37-1.69c-1.12-1.12-1.76-2.66-1.76-4.25S86.295,47.58,87.415,46.46z M67.825,270.69v-0.71c0-3.59-2.93-6.52-6.52-6.52h-17.6c-3.59,0-6.51,2.93-6.51,6.52v0.71c0,3.59,2.92,6.51,6.51,6.51h17.6 C64.895,277.2,67.825,274.28,67.825,270.69z"></path>
                                        <path
                                            d="M66.965,33.82v16.9c0,3.32-2.69,6.01-6.01,6.01c-3.32,0-6.02-2.69-6.02-6.01v-16.9c0-3.32,2.7-6.01,6.02-6.01 C64.275,27.81,66.965,30.5,66.965,33.82z"></path>
                                    </g>
                                    <g></g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </Col>
                <Col span={1}></Col>
                <Col span={12}>
                    <Chart setLastBPM={setLastBP} color={"#ede701"}
                           range={[80,180]}
                           url={`http://34.159.120.168:9090/api/v1/query?query=Pressure_metric{job="script",MacAddress="${user.mac_address}"}[100s]`}/>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                    <Card
                        style={{
                            width: 300,
                        }}
                        cover={
                            <h3 style={{fontSize: 40, textAlign: "center", margin: 0}}>{lastBP}</h3>
                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <ExpandOutlined key="expand"/>,
                        ]}
                    >
                        <Meta
                            title="mm Hg"
                            style={{textAlign: "center"}}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}