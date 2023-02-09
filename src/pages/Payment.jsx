import React from 'react';
import StepCard from '~/components/step/StepCard';
import Helmet from '~/components/Helmet/Helmet';
const Payment = () => {
    console.log(123);
    return (
        <Helmet title="Thanh toán">
            <StepCard></StepCard>
        </Helmet>
    );
};

export default Payment;
