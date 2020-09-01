import React from 'react'
import { Input, Button, Row, Col, Form } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { FormListFieldData } from 'antd/lib/form/FormList';

type Options = {
    field: FormListFieldData;
    form: FormInstance<any>;
}

export const Objective = ({ field, form }: Options) => {

    return (
        <Form.List name={[field.name, 'options']}>
            {
                (optionsField, { add, remove }) => (
                    <React.Fragment>
                        {
                            optionsField.map(option => (
                                <React.Fragment key={option.name}>
                                    <Row>
                                        <Col sm={optionsField.length > 1? 23 : 24}>
                                            <Form.Item
                                                {...option}
                                                wrapperCol={{ offset: option.name > 0? 4 : 0, sm: 20 }}
                                                label={option.name !== 0 ? '' : 'Options'}
                                                name={[option.name]}
                                                fieldKey={[option.fieldKey]}
                                                rules={[{ required: true, message: 'You must fill the option.' }]}
                                            >
                                                <Input placeholder="Enter your options" />
                                            </Form.Item>
                                        </Col>

                                        {optionsField.length > 2 ? (
                                            <Col sm={1}>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    style={{ margin: '0 8px' }}
                                                    onClick={() => remove(option.name)}
                                                />
                                            </Col>
                                        ) : null}

                                    </Row>
                                </React.Fragment>
                            ))
                        }
                        <Form.Item wrapperCol={{ sm: 20, offset: 4 }}>
                            <Button type="ghost" htmlType="button" onClick={() => { add(); }}><PlusOutlined /> Add new option</Button>
                        </Form.Item>
                    </React.Fragment>
                )
            }
        </Form.List>
    )
}
