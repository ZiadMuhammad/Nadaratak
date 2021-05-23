import React from 'react';
import Button from './../../forms/Button';

const Product = ({
    productThumbnail, 
    productName, 
    productPrice,
    tryonLink,
    compatibleFace
}) => {
    if (!productThumbnail || !productName || 
        typeof productPrice === 'undefined') return null;

    const configAddtoCartBtn = {
        type: 'button'
    };

    return (
        <div className="product">
            <div className="thumb">
                <img width="200px" src={productThumbnail} alt={productName} />
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            {productName}
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            L.E {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddtoCartBtn}>
                                Add to Cart
                            </Button>
                        </div>

                        {tryonLink ? 
                            <a className="customButton" target="_blank" href={tryonLink}>Try</a>
                            : <a className="noTryon" target="_blank">No Try on Available</a>
                        }
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Product;