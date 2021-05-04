import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProductStart } from './../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';

const Admin = props => {
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [compatibleFace, setCompatibleFace] = useState('oval');
    const [productName, setProductName] = useState('');
    const [tryonLink, setTryonLink] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);
    const [productDesc, setProductDesc] = useState('');

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
        addProductStart({
            productCategory,
            compatibleFace,
            productName,
            tryonLink,
            productThumbnail,
            productPrice,
            productStock
        })
    )

  };


  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormSelect
              label="Compatible Face"
              options={[{
                value: "oval",
                name: "Oval"
              }, {
                value: "heart",
                name: "Heart"
              }, {
                value: "oblong",
                name: "Oblong"
              }, {
                value: "round",
                name: "Round"
              }, {
                value: "square",
                name: "Square"
              }]}
              handleChange={e => setCompatibleFace(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Try on Link"
              type="url"
              value={tryonLink}
              handleChange={e => setTryonLink(e.target.value)}
            />

            <FormInput
              label="Stock"
              type="number"
              value={productStock}
              handleChange={e => setProductStock(e.target.value)}
            />  

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <br />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Admin;