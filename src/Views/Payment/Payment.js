import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Tokendata from "../../Common/Tokendata";
import Layout from "../../Components/Layout/Layout";
import { Loader } from "../../Components/Loader/Loader";
import {
  PendingBooking,
  AcceptRejectBooking,
  ReversePayment,
} from "../../Services/Services";
import moment from "moment";
import Modal from "react-modal";
import ErrorBoundary from "../../ErrorBoundary";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const Payment = () => {
  const [pendingdata, setPendingdata] = useState();
  const [loader, setLoader] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [userdata, setUserdata] = useState();
  function closeModal() {
    setopenmodal(false);
  }
  const columns = [
    {
      name: <p>Sr. No.</p>,
      cell: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "User Name",
      selector: (row) => <>{row.user == null ? "---" : row.user.name}</>,
      sortable: true,
    },
    {
      name: "User Phone No.",
      selector: (row) => <>{row.user == null ? "---" : row.user.phone}</>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Driver Name",
      selector: (row) => <>{row.driver == null ? "---" : row.driver.name}</>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Driver Phone No.",
      selector: (row) => <>{row.driver == null ? "---" : row.driver.phone}</>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Pickup Type",
      selector: (row) => row.pickup_type,
      sortable: true,
      width: "110px",
    },

    {
      name: "Start Trip",
      selector: (row) => row.is_start_trip,
      sortable: true,
    },
    {
      name: "End Trip",
      selector: (row) => row.is_end_trip,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => <>{moment(row.created_at).format("DD-MM-YYYY")}</>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Pickup Location",
      selector: (row) => row.pickup_loc,
      sortable: true,
      width: "200px",
    },
    {
      name: "Drop Location",
      selector: (row) => row.drop_loc,
      sortable: true,
      width: "200px",
    },
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
      sortable: true,
      width: "250px",
    },
    {
      name: "Pickup Time",
      selector: (row) => <>{moment(row.pickup_time).format("DD-MM-YYYY")}</>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },

    {
      name: "Request Status",
      selector: (row) => row.request_status,
      cell: (row, index) =>
        row.request_status === "pending" ? (
          <div className="status pending_status">{row.request_status}</div>
        ) : (
          <div className="status active_status">{row.request_status}</div>
        ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Booking Status",
      selector: (row) => row.booking_status,
      cell: (row, index) =>
        row.booking_status === "pending" ? (
          <div className="status pending_status">{row.request_status}</div>
        ) : (
          <div className="status active_status">{row.request_status}</div>
        ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Return Payment",
      selector: (row) => (
        <div onClick={(e) => reversepayment(e, row)}>
          <RiSecurePaymentFill className="reverse_payment" />
        </div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row, index) => (
        <div className="status_btn_group">
          <button
            className="accept_btn"
            onClick={(e) => handleaccept(e, row._id)}
          >
            Accept
          </button>
          <button
            className="reject_btn"
            onClick={(e) => handlerejected(e, row._id)}
          >
            Reject
          </button>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
  ];
  const reversepayment = (e, data) => {
    setUserdata(data);
    setopenmodal(true);
  };
  const approvePayment = async () => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    formData.append("booking_id", userdata._id);
    const apiResponse = await ReversePayment(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setLoader(false);
      setopenmodal(false);
      getUserlist();
      toast.success("Reverse Payment Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setLoader(false);
      setopenmodal(false);
      toast.error(apiResponse.ResponseMsg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const getUserlist = async () => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    const apiResponse = await PendingBooking(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setPendingdata(apiResponse.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const handleaccept = (e, id) => {
    StatusUpdating(id, "accepted");
  };
  const handlerejected = (e, id) => {
    StatusUpdating(id, "rejected");
  };
  const StatusUpdating = async (id, statusupdate) => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    formData.append("booking_id", id);
    formData.append("status", statusupdate);
    const apiResponse = await AcceptRejectBooking(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setLoader(false);
      getUserlist();
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    document.title = "Gawal - Pending Payment";
    getUserlist();
  }, []);
  return (
    <ErrorBoundary>
      {loader && <Loader />}
      <Layout>
        <div>
          <h2 className="table_heading">Pending Payment</h2>
          <DataTable
            pagination
            columns={columns}
            data={pendingdata && pendingdata}
          />
        </div>
      </Layout>
      <Modal
        isOpen={openmodal}
        onRequestClose={closeModal}
        className="comman_modal update_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => closeModal()}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div>
            <h4 className="heading_set">
              <b>Are You Sure?</b>
            </h4>
            <p className="modal_note">Are you Sure For this Return Payment ?</p>
          </div>
          <div className="action_btn">
            <button onClick={approvePayment} className="payment_approve_btn">
              {" "}
              Yes{" "}
            </button>
            <button onClick={closeModal} className="payment_reject_btn">
              No
            </button>
          </div>
        </div>
      </Modal>
    </ErrorBoundary>
  );
};
export default Payment;
