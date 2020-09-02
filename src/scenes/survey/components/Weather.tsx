import React, { useEffect, useState } from 'react';
import { weatherInstance } from '../../../utils/axiosInstance';
import { geoLocation } from '../../../utils/geoLocation';
import { Image, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { WeatherTypes } from '../interface';
import styled from 'styled-components';
import Paragraph from 'antd/lib/typography/Paragraph';
import Colors from '../../../components/Colors';

const WeatherWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${Colors.GREY};
    background: #fff;
    box-shadow: 0 4px 10px -5px ${Colors.GREY};
`;

const WeatherDetail = styled.div`

    &.second{
        margin: 0 30px;
        display: flex;

        .ant-typography:not(:last-child){
            margin-right: 50px;
            margin-bottom: 0;
        }
    }
`;

const AntdTitle = styled(Title)`
    margin: 0!important;
`;

const Weather = () => {

    const [weatherInfo, setweatherInfo] = useState<WeatherTypes>();

    const getWeatherInfo = (position: Position) => {
        weatherInstance.get('weather', {
            params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                appid: process.env.REACT_APP_API_KEY,
                units: 'metric'
            }
        }).then(data => {
            setweatherInfo(data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        geoLocation(getWeatherInfo);
    }, []);

    console.log(weatherInfo);


    if (!weatherInfo) return <p>Loading Weather Info...</p>;

    return (
        <WeatherWrap>
            <WeatherDetail>
                <Row>
                    <Col>
                        <Image src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.name} />
                    </Col>
                    <Col style={{marginTop: '10px'}}>
                        <AntdTitle level={4}>{weatherInfo.main.temp} <sup>o</sup>C</AntdTitle>
                        <AntdTitle level={5}>{weatherInfo.name}</AntdTitle>
                        <Paragraph style={{fontSize: '12px'}}>{weatherInfo.weather[0].main}, {weatherInfo.weather[0].description}</Paragraph>
                    </Col>
                </Row>
            </WeatherDetail>
            <WeatherDetail className="second">
                <Paragraph><strong>Max Temprature:</strong> &nbsp; {weatherInfo.main.temp_max} <sup>o</sup>C</Paragraph>
                <Paragraph><strong>Min Temprature:</strong> &nbsp; {weatherInfo.main.temp_min} <sup>o</sup>C</Paragraph>
                <Paragraph><strong>Wind Speed:</strong> &nbsp; {weatherInfo.wind.speed} Km/hr</Paragraph>
            </WeatherDetail>
        </WeatherWrap>
    )
}

export default Weather
