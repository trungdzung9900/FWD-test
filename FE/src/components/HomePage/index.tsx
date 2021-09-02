
import { CalculationForm, } from '../CalculationForm';
import { ProductList, } from '../ProductList';
import { Row, Col } from 'antd';
import './index.scss';
export default function HomePage() {
    return (
        <div className="container">
            <Row>
                <Col span={6} push={17}>
                    <ProductList />

                </Col>
                <Col span={15} pull={5}>
                    <CalculationForm />

                </Col>
            </Row>

        </div>


    )
}