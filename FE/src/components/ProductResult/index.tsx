import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { paymentFrequency, plans } from '../../app/constants';

import './index.scss';

export const ProductResult = () => {
    const productSuccess = useSelector((state: any) => state.products.isSuccess);
    const productLoading = useSelector((state: any) => state.products.loading);
    const products = useSelector((state: any) => state.products.products);
  
    return (
        <div className="product-result">

            {
                !productLoading && (!products.length) ?
                    (
                        <div className="product-result--item">
                            <p>
                                <span>Product ID:</span>
                                <strong>{''}</strong>
                            </p>

                            <p>
                                <span>Product Family:</span>
                                <strong>{''}</strong>
                            </p>



                            <p>
                                <span>Product Type:</span>
                                <strong>{''}</strong>
                            </p>
                            <p>
                                <span>Plan:</span>
                                <strong>{''}</strong>
                            </p>

                            <p>
                                <span>Premium Paying Term:</span>
                                <strong>{''}</strong>
                            </p>
                            <p>
                                <span>Payment Frequency:</span>
                                <strong>{''}</strong>
                            </p>
                            <p>
                                <span>Product Term:</span>
                                <strong>{''}</strong>
                            </p>
                            <p>
                                <span>Base Sum Assured:</span>
                                <strong>{''}</strong>
                            </p>
                            <p>
                                <span>Base Annual Premium:</span>
                                <strong>{''}</strong>
                            </p>

                        </div>
                    ) :
                    productLoading ? (
                        <CircularProgress />
                    ) :
                        productSuccess && ((!products.length) ? (
                            <p>Product not found.</p>
                        ) : products.map((product: any) => (
                            <div className="product-result--item">
                                <p>
                                    <span>Product ID:</span>
                                    <strong>{product.productId}</strong>
                                </p>

                                <p>
                                    <span>Product Family:</span>
                                    <strong>{product.productFamilyCd}</strong>
                                </p>


                                <p>
                                    <span>Product Type:</span>
                                    <strong>{product.productTypeCd}</strong>
                                </p>



                                <p>
                                    <span>Plan:</span>
                                    <strong>{plans[product.planCode] || ''}</strong>
                                </p>
                                <p>
                                    <span>Premium Paying Term:</span>
                                    <strong>{product.premiumPayingTerm}</strong>
                                </p>
                                <p>
                                    <span>Payment Frequency:</span>
                                    <strong>{paymentFrequency[product.paymentFrequencyCd] || ''}</strong>
                                </p>
                                <p>
                                    <span>Product Term:</span>
                                    <strong>{product.productTerm}</strong>
                                </p>
                                <p>
                                    <span>Base Sum Assured:</span>
                                    <strong>${(product.baseSumAssured || '')}</strong>
                                </p>
                                <p>
                                    <span>Base Annual Premium:</span>
                                    <strong>${(product.baseAnnualPremium || '')}</strong>
                                </p>
                            </div>
                        ))
                        )}
        </div>
    )
}