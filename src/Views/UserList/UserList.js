import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import DataTable from "react-data-table-component";
import Tokendata from "../../Common/Tokendata";
import { DeleteUser, UpdateUser, UserlistData } from "../../Services/Services";
import Lightbox  from "react-modal-image";
import { Loader } from "../../Components/Loader/Loader";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./UserList.module.scss";
import Modal from "react-modal";
import { AiOutlineCloseCircle,AiFillEye } from "react-icons/ai";
import moment from "moment";
const UserList = () => {
  const [userdata, setUserdata] = useState();
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [createdevmodal, setCreatedevmodal] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [getuser, setUser] = useState("");
  const[data,setDate]=useState("text");
  const dateChange=()=>{
    setDate("date")
  }
  function closeModal() {
    setCreatedevmodal(false);
  }
  const handleupdate = (e, row) => {
    setCreatedevmodal(true);
    setEditItem(row);
    if (row.user_type === "driver") {
      setUser("driver");
    } else {
      setUser("user");
    }
  };
  const columns = [
    {
      name: <p>Sr. No.</p>,
      cell: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Profile",
      cell: (row, index) => (
        <div className="table_prifileimg">
          {row.profile !=="" ? <img src={row.profile} alt="Profile Img" />:"No Image"}
        </div>
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "C Code",
      selector: (row) => row.ccode,
      sortable: true,
      width: "80px",
    },
    {
      name: "User Type",
      selector: (row) => row.user_type,
      sortable: true,
      width: "100px",
    },
    {
      name: "Registartion No",
      selector: (row) => <>{row.registartion_no !==""? row.registartion_no:"---"}</>,
      sortable: true,
    },
    {
      name: "Vehical Class",
      selector: (row) => <>{row.vehical_class !==""? row.vehical_class:"---"}</>,
      sortable: true,
    },
    {
      name: "Registartion Date",
      selector: (row) => (
        <> {row.registartion_date !== "" ? moment(row.registartion_date).format('DD-MM-YYYY') : "---"} </>
      ),
      sortable: true,
    },
    {
      name: "Registartion Upto",
      selector: (row) => (
        <> {row.registartion_upto !=="" ? moment(row.registartion_upto).format('DD-MM-YYYY'): "---"} </>
      ),
      sortable: true,
    },
    {
      name: "Id Card",
      cell: (row, index) => (
        <div className="table_cardimg">
          {row.id_card !=="" ? <Lightbox hideZoom={true} showRotate={true} small={row.id_card} large={row.id_card} alt="Id Card" />:"No Image"}
        </div>
      ),
      width: "130px",
    },
    {
      name: "Status",
      cell: (row, index) => row.deleted_reason == "" ? ( <div className="status active_status">Active</div> ) : ( <div className="status delete_status" title={row.deleted_reason}> Delete <BsFillExclamationCircleFill className="icon_summry" /> </div> ),
      sortable: true,
      width: "130px",
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className={styles.action_btn}>
          <button
            onClick={(e) => handleupdate(e, row)}
            className={styles.update_btn}
          >
            <FaUserEdit/>
          </button>
          <button
            onClick={(e) => handleDelete(e, row)}
            className={styles.delete_btn}
          >
            <MdDelete/>
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  const getUserlist = async () => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    const apiResponse = await UserlistData(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setUserdata(apiResponse.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const handlesubmit = async (e, id) => {
    e.preventDefault();
    let valueget=e.target
    let userid = Tokendata.UserData;
    const profile = valueget.profile.files[0];
    const id_card = valueget.id_card.files[0];
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    formData.append("user_id", editItem._id);
    formData.append("name", valueget.name.value);
    formData.append("ccode", valueget.ccode.value);
    formData.append("phone", valueget.phone.value);
    if (profile) {
      formData.append("profile", profile);
    }
    if (id_card) {
      formData.append("id_card", id_card);
    }
    if (id.user_type === "driver") {
      formData.append("registartion_upto", valueget.registartionupto.value);
      formData.append("registartion_date", valueget.registartiondate.value);
      formData.append("vehical_class", valueget.vehical_class.value);
      formData.append("registartion_no", valueget.registartion_no.value);
    }
    const apiResponse = await UpdateUser(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      getUserlist();
      setCreatedevmodal(false);
    }
  };
  const handleDelete = async (e, id) => {
    setLoader(true);
    let userid = Tokendata.UserData;
    let formData = new FormData();
    formData.append("admin_id", userid._id);
    formData.append("user_id", id._id);
    const apiResponse = await DeleteUser(formData);
    if (apiResponse.ResponseCode === 1 || apiResponse.ResponseCode === "1") {
      setLoader(false);
      getUserlist();
    }
  };
  useEffect(() => {
    document.title = "Gawal - User List";
    getUserlist();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div>
          <div className={styles.display_set}>
            <h2 className="table_heading">UserList</h2>
          </div>
          <DataTable
            pagination
            columns={columns}
            data={userdata && userdata}
            actions={
              <input
                className="table_search_input"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </Layout>
      <Modal
        isOpen={createdevmodal}
        onRequestClose={closeModal}
        className="comman_modal update_modal"
        ariaHideApp={false}
      >
        <button className="close_btn" onClick={() => closeModal()}>
          <AiOutlineCloseCircle />
        </button>
        <div className="model_bg">
          <div className="model_name">
            <h4>
              <b>Update Details</b>
            </h4>
            <form onSubmit={(e) => handlesubmit(e, editItem)}>
              <div className={styles.update_data}>
                {getuser === "user" ? (
                  <div>
                    <div className="form_control">
                      <label>Profile Image</label>
                      <input
                        type="file"
                        files={editItem.profile}
                        name="profile"
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    <div className="form_control">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editItem.name}
                        required
                      />
                    </div>
                    <div className="form_control display_set">
                      <div className="country_code">
                        <label>Country Code</label>
                        <input
                          type="text"
                          defaultValue={editItem.ccode}
                          name="ccode"
                          required
                        />
                      </div>
                      <div className="mobile_number">
                        <label>Number</label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={editItem.phone}
                          required
                        />
                      </div>
                    </div>
                    <div className="form_control">
                      <label>Id Card</label>
                      <input type="file" name="id_card" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="form_control">
                      <label>Profile Image</label>
                      <input type="file" accept="image/png, image/jpeg" name="profile" />
                    </div>
                    <div className="form_control">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editItem.name}
                      />
                    </div>
                    <div className="form_control display_set">
                      <div className="country_code">
                        <label>Country Code</label>
                        <input
                          type="text"
                          name="ccode"
                          required
                          defaultValue={editItem.ccode}
                        />
                      </div>
                      <div className="mobile_number">
                        <label>Number</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          defaultValue={editItem.phone}
                        />
                      </div>
                    </div>
                    <div className="form_control">
                      <label>Registartion No</label>
                      <input
                        type="text"
                        name="registartion_no"
                        required
                        defaultValue={editItem.registartion_no}
                      />
                    </div>
                    <div className="form_control">
                      <label>Vehical Class</label>
                      <input
                        type="text"
                        name="vehical_class"
                        required
                        defaultValue={editItem.vehical_class}
                      />
                    </div>
                    <div className="form_control">
                      <label>Registartion Date</label>
                      <input
                        type={data}
                        name="registartiondate"
                        required
                        onChange={dateChange}
                        defaultValue={editItem.registartion_date}
                      />
                    </div>
                    <div className="form_control">
                      <label>Registartion Upto</label>
                      <input
                         type={data}
                        name="registartionupto"
                        required
                        onChange={dateChange}
                        defaultValue={editItem.registartion_upto}
                      />
                    </div>
                    <div className="form_control">
                      <label>Id Card</label>
                      <input type="file" name="id_card" />
                    </div>
                  </div>
                )}
              </div>
              <div className="submit_btn">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UserList;
