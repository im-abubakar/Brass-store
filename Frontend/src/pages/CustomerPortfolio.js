import React, { useState, useEffect, useContext } from "react";
import AddCustomer from "../components/AddCustomer";
import UpdateCustomer from "../components/UpdateCustomer";
import AuthContext from "../AuthContext";

function CustomerPortfolio() {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState([]);
  const [customers, setAllCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchCustomersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePage]);

  const fetchCustomersData = async () => {
    try {
      // console.log("user is ",authContext.user)
      const response = await fetch(`http://localhost:4000/api/customer/get/${authContext.user}`);
      const data = await response.json();
      console.log("data is ", data)
      setAllCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching Data of Search Customers
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/customer/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllCustomers(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Customer ADD
  const addCustomerModalSetting = () => {
    setShowCustomerModal(!showCustomerModal);
  };

  // Modal for Customer UPDATE
  const updateCustomerModalSetting = (selectedCustomerData) => {
    setUpdateCustomer(selectedCustomerData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete customer
  const deleteCustomer = (id) => {
    fetch(`http://localhost:4000/api/customer/delete/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Customers List</span>
        </div>

        {showCustomerModal && (
          <AddCustomer
            addCustomerModalSetting={addCustomerModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateCustomer
            updateCustomerData={updateCustomer}
            updateModalSetting={updateCustomerModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Customers</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addCustomerModalSetting}
              >
                Add Customer
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Sr.
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Register Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Update
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Remove
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {customers.map((element, index) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={() => updateCustomerModalSetting(element)}
                    >
                      Edit
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      onClick={() => deleteCustomer(element._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerPortfolio;
