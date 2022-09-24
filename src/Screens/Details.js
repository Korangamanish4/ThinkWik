import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { useParams } from "react-router-dom";
import "../Styles/details.css";
import { Data } from "../Store/Assets/Data";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Loading from "../Component/Loader/Loader";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Store/Actions/commonAction";
import AddEditData from "../Component/AddEditData";

const Details = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [dataDialog, setDataDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const accept = () => {
    dispatch(showLoader());
    const index = Data.indexOf(data);
    setTimeout(() => {
      dispatch(hideLoader());
      Data.splice(index, 1);
      setShowData(false);
      toast("Data Deleted. Navigating to Home Page");
    }, 5000);
    setTimeout(() => {
      navigate("/home");
    }, 7500);
  };

  const deleteData = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
    });
  };

  return (
    <div>
      <Loading />
      <Header />
      <ConfirmDialog />
      {showData ? (
        <div className="detailsContainer">
          <AddEditData
            showDialog={dataDialog}
            setShowDialog={setDataDialog}
            data={data}
            header="Edit Data"
            setData={setData}
          />
          <div className="detailsButton">
            <button className="editButton" onClick={() => setDataDialog(true)}>
              Edit
            </button>
            <button className="deleteButton" onClick={() => deleteData()}>
              Delete
            </button>
          </div>
          <div className="detailsCard">
            <div className="input">
              <span className="p-float-label">
                <InputText readOnly id="Id" value={data?.id} />
                <label htmlFor="Id">
                  <h3>ID</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText readOnly id="Code" value={data?.code} />
                <label htmlFor="Code">
                  <h3>Code</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText readOnly id="Name" value={data?.name} />
                <label htmlFor="Name">
                  <h3>Name</h3>
                </label>
              </span>
            </div>
            <div className="input">
              <span className="p-float-label">
                <InputText
                  readOnly
                  id="Description"
                  value={data?.description}
                />
                <label htmlFor="Description">
                  <h3>description</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText
                  readOnly
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
                <InputText readOnly id="Category" value={data?.category} />
                <label htmlFor="Category">
                  <h3>Category</h3>
                </label>
              </span>
            </div>
            <div className="input">
              <span className="p-float-label">
                <InputText readOnly id="Quantity" value={data?.quantity} />
                <label htmlFor="Quantity">
                  <h3>Quantity</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText readOnly id="Status" value={data?.inventoryStatus} />
                <label htmlFor="Status">
                  <h3>Inventory Status</h3>
                </label>
              </span>
              <span className="p-float-label">
                <InputText readOnly id="Rating" value={data?.rating} />
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
