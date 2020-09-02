import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import Colors from '../../components/Colors';
import Subjective from './components/Subjective';
import Rating from './components/Rating';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Objective } from './components/Objective';
import { SelectValue } from 'antd/lib/select';
import { FormListFieldData } from 'antd/lib/form/FormList';
import Weather from './components/Weather';

const Container = styled.div`
    width: 80%;
    margin: 50px auto;
    padding: 0;
    box-shadow: 0 0 4px ${Colors.GREY};
`;

const SurveyStyled = styled.div`
    padding: 35px;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
`;

const Desc = styled.p`
    font-size: 14px;
    font-weight: 500;
`;

const Wrap = styled.div`
    box-shadow: 2px 2px 5px ${Colors.DARKGREY};
    padding: 20px 30px;
    margin: 25px 0;
`;

const Survey = () => {

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const title = 'Create Survey';
    const desc = 'Please add valid survey title and add question to start creating a survey. You can select from Start rating question for objective type question a minimum of two options is required.';

    const [fieldTypes, setfieldTypes] = useState<Array<string>>(['subjective']);
    const { Option } = Select;
    const [form] = Form.useForm();

    const handleAddQuestion = () => {
        setfieldTypes(prevState => [...prevState, 'subjective']);
    }

    const handleSubmitForm = (values: any) => {
        console.log(form);

        console.log(form.getFieldsValue());
    }

    const handleQuestionChange = (value: SelectValue, index: number) => {
        let tempField = [...fieldTypes];
        tempField[index] = value.toString();
        setfieldTypes([...tempField]);
    }

    const handleFieldTypesRemove = (index: number) => {
        let tempField = [...fieldTypes];
        tempField.splice(index, 1);
        setfieldTypes([...tempField]);
    }

    const switchQuestions = (type: string, field: FormListFieldData) => {
        switch (type) {
            case 'subjective':
                return <Subjective />;
            case 'rating':
                return <Rating />;
            case 'objective':
                return <Objective field={field} form={form} />;
            default:
                return <Subjective />;
        }
    }

    return (
        <Container>
            <Weather />
            <SurveyStyled>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            <Form form={form} {...layout} initialValues={{ data: [{ options: ['',''] }] }} labelAlign="left" onFinish={handleSubmitForm} name="surveyForm">
                <Form.Item
                    label="Survey Title:"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Survey title is a required field!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Row>
                    <Col offset={4} sm={16}>
                        <Form.List name="data">
                            {(data, { add, remove }) => (
                                <>
                                    {
                                        data.map((field, index) => (
                                            <Wrap key={index} >
                                                <Row>
                                                    <Col sm={19}>
                                                        <Form.Item {...field} wrapperCol={{ sm: 24 }} label="Question" name={[field.name, 'question']} fieldKey={[field.key, 'question']} rules={[{ required: true, message: 'Question field must not be empty!' }]}>
                                                            <Input placeholder="Enter your questions here." />
                                                        </Form.Item>
                                                        {
                                                            switchQuestions(fieldTypes[field.name], field)
                                                        }
                                                    </Col>
                                                    <Col offset={1} sm={3}>
                                                        <Form.Item {...field} name={[field.name, 'type']} fieldKey={[field.key, 'type']} initialValue="subjective" >
                                                            <Select style={{ width: 120 }} onChange={value => handleQuestionChange(value, field.name)}>
                                                                <Option value="subjective">Subjective</Option>
                                                                <Option value="rating">Rating</Option>
                                                                <Option value="objective">Objective</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {
                                                    (data.length > 1) &&
                                                    <Form.Item {...field}>
                                                        <Button htmlType="button" onClick={() => {
                                                            handleFieldTypesRemove(field.name);
                                                            remove(field.name);
                                                        }}><DeleteOutlined /> Delete</Button>
                                                    </Form.Item>
                                                }
                                            </Wrap>
                                        ))
                                    }
                                    <Form.Item>
                                        <Button htmlType="button" type="ghost" onClick={() => {
                                            handleAddQuestion();
                                            add();
                                        }}><PlusOutlined /> Add Question</Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            </SurveyStyled>
        </Container>
    )
}

export default Survey
