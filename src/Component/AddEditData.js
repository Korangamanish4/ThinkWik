import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "../Styles/addEditDialog.css";
import { Data } from "../Store/Assets/Data";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../Store/Actions/commonAction";
import { toast } from "react-toastify";
import { FormValidation } from "../CommonFiles/FormsValidation";
import { Dropdown } from "primereact/dropdown";
import { timeOutTime } from "../Config/SetTimeOut-Config";

const AddEditData = ({ showDialog, setShowDialog, data, header, setData }) => {
  const [id, setId] = useState(data?.id);
  const [code, setCode] = useState(data?.code);
  const [name, setName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);
  const [price, setPrice] = useState(data?.price);
  const [category, setCategory] = useState(data?.category);
  const [quantity, setQuantity] = useState(data?.quantity);
  const [inventoryStatus, setInventoryStatus] = useState(data?.inventoryStatus);
  const [rating, setRating] = useState(data?.rating);
  const [disableId, setDisableId] = useState(false);
  const product = {
    id: "",
    code: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    inventoryStatus: "",
    rating: "",
  };

  const statuses = [
    { label: "In Stock", value: "INSTOCK" },
    { label: "Low Stock", value: "LOWSTOCK" },
    { label: "Out of Stock", value: "OUTOFSTOCK" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (header === "Edit Data") {
      setDisableId(true);
    }
  },[header]);

  const collectData = (callBack) => {
    product.id = id;
    product.code = code;
    product.category = category;
    product.description = description;
    product.inventoryStatus = inventoryStatus;
    product.name = name;
    product.price = price;
    product.rating = rating;
    product.quantity = quantity;
    callBack();
  };

  const checkValidation = async () => {
    const isFormValid = await FormValidation.isValid(product, {
      abortEarly: false, // Prevent aborting validation after first error
    });

    if (isFormValid) {
        const idArray = Data.map((item) => {return item.id})
        if (idArray.includes(id) && header === "Add Data"){
            toast(`Data with Id ${id} already exists. Try Changin it's value`)
        }
        else saveData()
    } else {
      toast("All Fields are Mandatory to be filled");
    }
  };

  const saveData = () => {
    dispatch(showLoader());
    if (header === "Add Data") {
      Data.unshift(product);
      setTimeout(() => {
        setShowDialog(false);
        toast("Data Added");
        dispatch(hideLoader());
      }, timeOutTime);
    } else if (header === "Edit Data") {
      const index = Data.indexOf(data);
      Data.splice(index, 1);
      Data.splice(index, 0, product);
      setTimeout(() => {
        setShowDialog(false);
        setData(product);
        toast("Data Edited");
        dispatch(hideLoader());
      }, timeOutTime);
    }
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => collectData(checkValidation)}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog
        header={header}
        visible={showDialog}
        style={{ width: "770px" }}
        footer={renderFooter("displayBasic")}
        onHide={() => setShowDialog(false)}
      >
        <div className="p-fluid grid">
          <div className="dialogInput">
            <span className="p-float-label">
              <InputText
                id="Id"
                value={id}
                disabled={disableId}
                onChange={(e) => setId(e.target.value)}
              />
              <label htmlFor="Id">
                <h3>ID</h3>
              </label>
            </span>
            <span className="p-float-label">
              <InputText
                id="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <label htmlFor="Code">
                <h3>Code</h3>
              </label>
            </span>
            <span className="p-float-label">
              <InputText
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="Name">
                <h3>Name</h3>
              </label>
            </span>
          </div>
          <div className="dialogInput">
            <span className="p-float-label">
              <InputText
                id="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="Description">
                <h3>description</h3>
              </label>
            </span>
            <span className="p-float-label">
              <InputText
                inputId="Price"
                value={price}
                mode="currency"
                currency="INR"
                locale="en-US"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="Price">
                <h3>Price</h3>
              </label>
            </span>
            <span className="p-float-label">
              <InputText
                id="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="Category">
                <h3>Category</h3>
              </label>
            </span>
          </div>
          <div className="dialogInput">
            <span className="p-float-label">
              <InputText
                inputId="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label htmlFor="Quantity">
                <h3>Quantity</h3>
              </label>
            </span>
            <span className="p-float-label">
            <InputText
                inputId="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="Rating">
                <h3>Rating</h3>
              </label>
            </span>
            <span className="p-float-label">
              <Dropdown
                value={inventoryStatus}
                options={statuses}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => setInventoryStatus(e.value)}
                placeholder="Select a Status"
              />
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddEditData;
