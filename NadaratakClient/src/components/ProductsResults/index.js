import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from './../forms/FormSelect';
import './styles.scss';
import axios from 'axios';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const { filterType } = useParams();
    const [currentFace, setFace] = useState("");
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType, currentFace]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    }

    if(!Array.isArray(products)) return null;
    if(products.length < 1) {
        return (
            <div className="products">
                <p>
                    No search results.
                </p>
            </div>
        )
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Mens',
            value: 'mens'
        }, {
            name: 'Womens',
            value: 'womens'
        }], 
        handleChange: handleFilter
    };

    const onSubmit = (data) => {
        console.log(data);
        const file = data.picture[0];
        const fd = new FormData();
        fd.append('file', file);
        axios.post('http://127.0.0.1:5000/uploader', fd, {headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
            console.log(res.data.faceshape);
            setFace(res.data.faceshape.toLowerCase());
        });
    }
    
    return (
        <div className="products">
            <div className="uploadContainer">
                <h1>🤖</h1>
                <h1>You can now let the robot choose glasses for you!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('picture')} type="file" />
                    <button>Submit</button>
                </form>
            </div>

            {currentFace ? <h3>{currentFace} face detected.</h3>
            : null}
            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters} />

            <div className="productResults">
                {products.map((product, pos) => {
                    const { productThumbnail, productName, productPrice, tryonLink, compatibleFace } = product;
                    if (!productThumbnail || !productName || 
                        typeof productPrice === 'undefined') return null;

                    if(currentFace !== "" && compatibleFace !== currentFace) return null;

                    const configProduct = {
                        productThumbnail, 
                        productName, 
                        productPrice,
                        tryonLink,
                        compatibleFace
                    };

                    return (
                        <Product {...configProduct} />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductResults;