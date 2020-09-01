import React from 'react'
import { Form, Rate } from 'antd';

const Rating = () => {
    return (
        <Form.Item wrapperCol={{sm: 24}} label="Rating" >
            <Rate allowHalf defaultValue={2.5} disabled/>
        </Form.Item>
    )
}

export default Rating
