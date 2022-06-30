import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Support from '~/pages/Support';
import Profile from '~/components/Profile';
import Purchase from '~/components/Purchase';
import Coin from '~/components/Coin';
import Voucher from '~/components/Voucher';
import Notification from '~/components/Notification';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog/:slug" component={Product} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/cart" component={Cart} />
            <Route path="/support" component={Support} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/purchase" component={Purchase} />
            <Route path="/user/coin" component={Coin} />
            <Route path="/user/voucher" component={Voucher} />
            <Route path="/user/notification" component={Notification} />
        </Switch>
    );
};

export default Routes;
