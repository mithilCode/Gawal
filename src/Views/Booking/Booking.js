import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import DataTable from "react-data-table-component";
import { BookingHistory, PayoutDriver } from "../../Services/Services";
import Tokendata from "../../Common/Tokendata";
import ErrorBoundary from "../../ErrorBoundary";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Loader } from "../../Components/Loader/Loader";
import Modal from "react-modal";
import moment from "moment";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Booking = () => {
  const [bookingdata, setBookingdata] = useState();
  const [loader, setLoader] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [dataget, setDataget] = useState(false);
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
      width: "150px",
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
      width: "150px",
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
      name: "Create By",
      selector: (row) => <>{moment(row.created_at).format("DD-MM-YYYY")}</>,
      sortable: true,
      width: "190px",
    },
    {
      name: "Pickup Location",
      selector: (row) => row.pickup_loc,
      sortable: true,
      width: "120px",
    },
    {
      name: "Drop Loaction",
      selector: (row) => row.drop_loc,
      sortable: true,
      width: "150px",
    },
    {
      name: "Pickup Time",
      selector: (row) => <>{moment(row.pickup_time).format("DD-MM-YYYY")}</>,
      sortable: true,
      width: "160px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      width: "100px",
    },
    {
      name: "Payout",
      selector: (row) => (
        <div onClick={(e) => paymentset(e, row)}>
          <RiSecurePaymentFill className="payment_icon" />
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Request Status",
      cell: (row, index) =>
        row.request_status === "pending" ? (
          <div className="status pending_status">{row.request_status}</div>
        ) : (
          <div className="status active_status">{row.request_status}</div>
        ),
      sortable: true,
      width: "130px",
    },
    {
      name: "Booking Status",
      selector: (row) => row.booking_status,
      cell: (row, index) =>
        row.booking_status === "pending" ? (
          <div className="status pending_status">{row.request_status}</div>
        ) : (
          <>
            {row.booking_status === "accepted" ? (
              <div className="status active_status">{row.booking_status}</div>
            ) : (
              <div className="status reject_status">{row.booking_status}</div>
            )}
          </>
        ),
      sortable: true,
      width: "130px",
    },
  ];
  const getUserlist = async () => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    const apiResponse = await BookingHistory(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setBookingdata(apiResponse.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const paymentset = (e, row) => {
    setopenmodal(true);
    setDataget(row);
  };
  const approvePayment = async () => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    formData.append("booking_id", dataget._id);
    formData.append("driver_id", dataget.driver._id);
    const apiResponse = await PayoutDriver(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setLoader(false);
      setopenmodal(false);
      toast.success("Payment Successfully", {
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
  useEffect(() => {
    document.title = "Gawal - Booking History";
    getUserlist();
  }, []);
  return (
    <>
      <ErrorBoundary fallback={"Something Was an Error"}>
        {loader && <Loader />}
        <Layout>
          <div>
            <h2 className="table_heading">Booking History</h2>
            <DataTable pagination columns={columns} data={bookingdata} />
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
              <p className="modal_note">Are you Sure For this Payment ?</p>
            </div>
            <div className="action_btn">
              <button onClick={approvePayment} className="payment_approve_btn">
                Yes
              </button>
              <button onClick={closeModal} className="payment_reject_btn">
                No
              </button>
            </div>
          </div>
        </Modal>
      </ErrorBoundary>
    </>
  );
};

export default Booking;
