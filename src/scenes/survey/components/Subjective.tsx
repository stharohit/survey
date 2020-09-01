import React from 'react'
import { Form, Input } from 'antd'

const Subjective = () => {
    return (
        <Form.Item wrapperCol={{sm: 24}} label="Answer" >
            <Input.TextArea rows={4} placeholder="Enter your answers here." readOnly={true}/>
        </Form.Item>
    )
}

export default Subjective;
