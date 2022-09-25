import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import Header from "../Component/Header";
import { toast } from "react-toastify";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import "../Styles/home.css";
import { Data } from "../Store/Assets/Data";
import AddEditData from "../Component/AddEditData";
import Loading from "../Component/Loader/Loader";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Store/Actions/commonAction";
import { timeOutTime } from "../Config/SetTimeOut-Config";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataDialog, setDataDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cm = useRef(null);

  const statuses = [
    { label: "In Stock", value: "INSTOCK" },
    { label: "Low Stock", value: "LOWSTOCK" },
    { label: "Out of Stock", value: "OUTOFSTOCK" },
  ];

  const menuModel = [
    {
      label: "View Details",
      icon: "pi pi-fw pi-user",
      command: () => viewDetails(selectedProduct),
    },
    {
      label: "Delete Data",
      icon: "pi pi-fw pi-times-circle",
      command: () => deleteUser(selectedProduct),
    },
  ];

  useEffect(() => {
    setProduct(Data);
  }, [Data]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "INSTOCK":
        return "In Stock";

      case "LOWSTOCK":
        return "Low Stock";

      case "OUTOFSTOCK":
        return "Out of Stock";

      default:
        return "NA";
    }
  };

  const viewDetails = (userData) => {
    navigate(`details/Id=${userData?.id}`);
  };

  const deleteUser = (userData) => {
    dispatch(showLoader());
    const index = product.indexOf(userData);
    Data.splice(index, 1);
    setTimeout(() => {
      dispatch(hideLoader());
      toast("Data Deleted");
    }, timeOutTime);
  };

  const onRowEditComplete = (e) => {
    let { newData, index } = e;
    const oldData = Data[index];
    Data.splice(index, 1);
    const idArray = Data.map((item) => {
      return item.id;
    });
    if (idArray.includes(newData?.id.toString())) {
      toast(
        `Data with Id ${newData?.id} already exists. Try Changin it's value`
      );
      Data.splice(index, 0, oldData);
    } else {
      dispatch(showLoader());
      Data.splice(index, 0, newData);
      setTimeout(() => {
        dispatch(hideLoader());
        toast("Edit Successful");
      }, timeOutTime);
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const numberEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="INR"
        locale="en-US"
      />
    );
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return (
            <span
              className={`product-badge status-${option.value.toLowerCase()}`}
            >
              {option.label}
            </span>
          );
        }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return getStatusLabel(rowData.inventoryStatus);
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(rowData.price);
  };

  return (
    <div>
      <Loading />
      <Header />
      <ContextMenu
        model={menuModel}
        ref={cm}
        onHide={() => setSelectedProduct(null)}
      />
      <div className="componentContainer">
        <AddEditData
          showDialog={dataDialog}
          setShowDialog={setDataDialog}
          header="Add Data"
        />
        <div className="homeButton">
          <button onClick={() => setDataDialog(true)}>Add Data</button>
        </div>
        <div className="tableContainer">
          <div className="table">
            <DataTable
              value={product}
              paginator
              rows={5}
              rowsPerPageOptions={[2, 5, 10]}
              responsiveLayout="scroll"
              editMode="row"
              dataKey="id"
              onRowEditComplete={onRowEditComplete}
              contextMenuSelection={selectedProduct}
              onContextMenuSelectionChange={(e) => setSelectedProduct(e.value)}
              onContextMenu={(e) => cm.current.show(e.originalEvent)}
              rowHover
              removableSort
            >
              <Column
                field="id"
                header="Id"
                editor={(options) => numberEditor(options)}
                sortable
              ></Column>
              <Column
                field="code"
                header="Code"
                editor={(options) => textEditor(options)}
                sortable
              ></Column>
              <Column
                field="name"
                header="Name"
                editor={(options) => textEditor(options)}
                sortable
              ></Column>
              <Column
                field="description"
                header="Description"
                editor={(options) => textEditor(options)}
                sortable
              ></Column>
              <Column
                field="price"
                header="Price"
                body={priceBodyTemplate}
                editor={(options) => priceEditor(options)}
                sortable
              ></Column>
              <Column
                field="category"
                header="Category"
                editor={(options) => textEditor(options)}
                sortable
              ></Column>
              <Column
                field="quantity"
                header="Quantity"
                editor={(options) => numberEditor(options)}
                sortable
              ></Column>
              <Column
                field="inventoryStatus"
                header="Status"
                body={statusBodyTemplate}
                editor={(options) => statusEditor(options)}
                sortable
              ></Column>
              <Column
                field="rating"
                header="Rating"
                editor={(options) => numberEditor(options)}
                sortable
              ></Column>
              <Column
                rowEditor
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
