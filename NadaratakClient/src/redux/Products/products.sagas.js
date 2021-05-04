import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct } from './products.helpers';
import productsTypes from './products.types';


export function* addProduct({ payload: {
        productCategory,
        compatibleFace,
        productName,
        tryonLink,
        productThumbnail,
        productPrice,
        productStock
}}) {
        try {
            const timestamp = new Date();
            yield handleAddProduct({
                productCategory,
                compatibleFace,
                productName,
                tryonLink,
                productThumbnail,
                productPrice,
                productStock,
                productAdminUserUID: auth.currentUser.uid,
                createdDate: timestamp
            })
        } catch(err) {

        }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart)
    ])
}