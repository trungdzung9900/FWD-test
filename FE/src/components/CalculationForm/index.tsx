import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Radio, DatePicker, Select, InputNumber } from 'antd';
import { getProducts } from '../../features/products/productsSlice';
import './index.scss';
import { paymentFrequency, plans } from '../../app/constants';


const { Option } = Select;

export const CalculationForm = () => {
    const [calculationType, setCalculateType] = React.useState('premium');
    const productLoading = useSelector((state: any) => state.products.loading);
    const dispatch = useDispatch();
    const handleCalculateType = (type: any) => {
        setCalculateType(type.target?.type);
    }
    const handleCalculation = async (data: any) => {
        const payload = {
            ...data
        };
        if (calculationType === 'assured') {
            delete payload.saPerYear;
        }
        await dispatch(
            getProducts(payload)
        );
    }
 
    return (
        <div className="welcome--form">
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 9 }}
                initialValues={{
                    type: calculationType,
                    genderCd: 'MALE',
                    planCode: 'T11A20',
                    paymentFrequency: 'YEARLY'
                }}
                onFinish={handleCalculation}
            >
                <Form.Item
                    label="Calculation Type"
                    name="type"
                >
                    <Radio.Group onChange={handleCalculateType}>
                        <Radio value='assured'>Assured</Radio>
                        <Radio value='premium'>Premium</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="firstAndSurname"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="genderCd"
                >
                    <Radio.Group>
                        <Radio value='MALE'>Male</Radio>
                        <Radio value='FEMALE'>Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Date of birth"
                    name="dob"
                    rules={[{ required: true, message: 'Must choose your date of birth' }]}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label="Plan"
                    name="planCode"
                >
                    <Select>
                        {Object.keys(plans || {}).map(planCode => (
                            <Option value={planCode}>{plans[planCode]}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Payment Frequency"
                    name="paymentFrequency"
                >
                    <Select>
                        {Object.keys(paymentFrequency || {}).map(data => (
                            <Option value={data}>{paymentFrequency[data]}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Premium per year"
                    name="premiumPerYear"
                    rules={[{ required: true, message: 'Must input premium per year' }]}
                >
                    <InputNumber
                        formatter={(value: any) => `$ ${value}`}
                        parser={(value: any) => (value || '').replace(/\$\s?|(,*)/g, '')}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                {calculationType === 'premium' && (
                    <Form.Item
                        label="Sum assured per year"
                        name="saPerYear"
                        rules={[{ required: true, message: 'Must input sum assured per year' }]}
                    >
                        <InputNumber
                            formatter={(value: any) => `$ ${value}`}
                            parser={(value: any) => (value || '').replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={productLoading}>
                        Calculate
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}