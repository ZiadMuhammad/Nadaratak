import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import { Link } from 'react-router-dom';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
})

const Admin = props => {
    const { products } = useSelector(mapState);
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

    useEffect(() => {
      dispatch(
        fetchProductsStart()
      );

    }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('mens');
    setProductName('');
    setCompatibleFace('oval');
    setProductThumbnail('');
    setTryonLink('');
    setProductPrice(0);
  }

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
    );

    resetForm();

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
      
      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1 align="left">
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice, 
                        compatibleFace, 
                        documentID,
                        tryonLink
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img width="100px" src={productThumbnail}/>
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            LE {productPrice}
                          </td>
                          <td>
                            {compatibleFace}
                          </td>
                          <td>
                            {tryonLink ? 
                            <a target="_blank" href={tryonLink}>Try</a>
                            : <p>N/A</p>}
                          </td>
                          <td>
                            <Button onClick = {() => dispatch(deleteProductStart(documentID))}>
                                Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;