import axios from "axios";
import Config from "../Common/Config";

// login
const Logindata = async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/login`, data, {
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// userList
const  UserlistData= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/userList`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// bookingHistory
const  BookingHistory= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/bookingHistory`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// pendingBooking
const  PendingBooking= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/pendingBooking`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};
// acceptRejectBooking
const  AcceptRejectBooking= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/acceptRejectBooking`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// deleteUserProfile
const  DeleteUser= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/deleteUserProfile`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// updateuserProfile
const  UpdateUser= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/updateuserProfile`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// payoutDriver
const PayoutDriver= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/payoutDriver`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};

// reversePayment
const ReversePayment= async (data) => {
    var apiPromise = new Promise((resolve, reject) => {
        axios
            .post(`${Config.API_BASE_URL}/reversePayment`, data, {
                headers: {
                    token: Config.token,
                },
            })
            .then(async (response) => {
                if (
                    response.data.ResponseCode === 1 ||
                    response.data.ResponseCode === "1"
                ) {
                    return resolve(response.data);
                } else {
                    return resolve(response.data);
                }
            })
            .catch((error) => {
                return reject(error);
            });
    });
    return await apiPromise;
};
export {Logindata,UserlistData,BookingHistory,PendingBooking,AcceptRejectBooking,DeleteUser,UpdateUser,PayoutDriver,ReversePayment};