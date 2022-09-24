import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { useParams } from "react-router-dom";
import "../Styles/details.css";
import { Data } from "../Store/Assets/Data";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  });

  const getData = () => {
    const idArray = Data.map((item) => {
      return item.id;
    });
    const index = idArray.indexOf(id);
    setData(Data[index]);
    setShowData(true);
  };

  const modifyData = (action) => {
    if (action === "editData") {
      toast("Edit Successful");
    } else if (action === "deleteData") {
      const index = Data.indexOf(data);
      Data.splice(index, 1);
      setShowData(false);
      toast("Data Deleted. Navigating to Home Page");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  return (
    <div>
      <Header />
      {showData ? (
        <div className="detailsContainer">
          <div className="detailsButton">
            <button
              className="editButton"
              onClick={() => modifyData("editData")}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              onClick={() => modifyData("deleteData")}
            >
              Delete
            </button>
          </div>
          <div className="detailsCard">
            <div className="input">
              <span className="p-float-label">
                <InputNumber disabled id="Id" value={data?.id} />
                <label htmlFor="Id">
                  <h3>ID</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText disabled id="Code" value={data?.code} />
                <label htmlFor="Code">
                  <h3>Code</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText disabled id="Name" value={data?.name} />
                <label htmlFor="Name">
                  <h3>Name</h3>
                </label>
              </span>
            </div>
            <div className="input">
              <span className="p-float-label">
                <InputText
                  disabled
                  id="Description"
                  value={data?.description}
                />
                <label htmlFor="Description">
                  <h3>description</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputNumber
                  disabled
                  id="Price"
                  value={data?.price}
                  mode="currency"
                  currency="INR"
                  locale="en-US"
                />
                <label htmlFor="Price">
                  <h3>Price</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText disabled id="Category" value={data?.category} />
                <label htmlFor="Category">
                  <h3>Category</h3>
                </label>
              </span>
            </div>
            <div className="input">
              <span className="p-float-label">
                <InputNumber disabled id="Quantity" value={data?.quantity} />
                <label htmlFor="Quantity">
                  <h3>Quantity</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText disabled id="Status" value={data?.inventoryStatus} />
                <label htmlFor="Status">
                  <h3>Inventory Status</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputNumber disabled id="Rating" value={data?.rating} />
                <label htmlFor="Rating">
                  <h3>Rating</h3>
                </label>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Details;
