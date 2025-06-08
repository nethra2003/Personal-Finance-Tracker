// import React, { useState , useEffect} from "react";
// import { Form, Input, message, Modal ,Select, Table ,DatePicker} from 'antd';
// import {UnorderedListOutlined, AreaChartOutlined  , EditOutlined , DeleteOutlined} from "@ant-design/icons";
// import Layout from "./../components/Layouts/Layout.js";
// import axios from 'axios';
// import Spinner from './../components/Spinner.js';
// import moment from "moment";
// import Analytics from "../components/Analytics.js";
// const {RangePicker } = DatePicker;

// const HomePage = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [loading,setLoading] = useState(false);
//     const [allTransection , setAllTransection] = useState([]);
//     const[frequency, setFrequency] = useState("7");
//     const [selectedDate, setselectedate] = useState([]);
//     const [type, setType] = useState("all");
//     const [viewData, setViewData] = useState("table");
//     const [editable, setEditable]=useState(null);

//     //table data
//     const columns = [
//         {
//            title : "Date",
//            dataIndex : "date",
//            render : (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
//         },
//         {
//             title : "Amount",
//             dataIndex : "amount",
//          },
//          {
//             title : "Type",
//             dataIndex : "type",
//          },
//          {
//             title : "Category",
//             dataIndex : "category",
//          },
//          {
//             title : "Refrence",
//             dataIndex : "refrence",
//          },
//          {
//             title : "Actions",
//             render : (text,record) => (
//                 <div>
//                     <EditOutlined 
//                         onClick={() => {
//                         setEditable(record);
//                         setShowModal(true);
//                     }}/>
//                     <DeleteOutlined className="mx-2" 
//                     onClick={() => 
//                     {handleDelete(record);
//                     }}/>
//                 </div>
//             ),
//          },

//     ];

//     // getall transaction
    
//    // useEffect Hook
//    useEffect(() => {
//     const getAllTransactions = async () => {
//         try{
//             const user = JSON.parse(localStorage.getItem('user'));
//             setLoading(true);
//             const res = await axios.post('/transections/get-transection' , {
//                 userid: user._id,
//                 frequency,
//                 selectedDate,
//                 type
//         });
//             setLoading(false);
//             setAllTransection(res.data);
//             console.log(res.data)
//         }catch(error){
//             console.log(error);
//             message.error('Something issues in the Transaction');
//         }
//     };
//      getAllTransactions();
//    },[frequency , selectedDate, type]) ;

//    //delete Handler
//    const handleDelete = async(record) => {
//     try{
//         setLoading(true);
//         await axios.post("/transections/delete-transection" , {transacationId : record._id} );
//         setLoading(false);
//         message.success("Transaction Deleted")
//     }catch(error) {
//         setLoading(false);
//         console.log(error);
//         message.error('Unable to delete');
//     }
//    }
   
//    //form handling
//     const handleSubmit = async (values) => {
//        try{
//         const user = JSON.parse(localStorage.getItem("user"));
//         setLoading(true);
//         if(editable){
//             await axios.post("/transections/edit-transection",
//                 {payload:{...values, userid:user._id},
//                 transacationId: editable._id,
//             });
//             setLoading(false);
//             message.success('Transaction Updated Successfully');
//         }else{
//             await axios.post('/transections/add-transection',{...values, userid:user._id});
//         setLoading(false);
//         message.success('Transaction Added Successfully');
//         }
//         setShowModal(false);
//         setEditable(null);
//        } catch (error) 
//        {
//         setLoading(false);
//         message.error('Failed to add Transaction');
//        }
//     };

//     return (
//         <Layout>
//             {loading && <Spinner />}
//             <div className="filters">
//                 <div>
//                     <h6>Select Frequency</h6>
//                     <Select value = {frequency} onChange={(values) => setFrequency(values)}>
//                         <Select.Option value = "7">Last 1 Week</Select.Option>
//                         <Select.Option value = "30">Last 1 Month</Select.Option>
//                         <Select.Option value = "365">Last 1 Year</Select.Option>
//                         <Select.Option value = "custom">custom</Select.Option>
//                     </Select>
//                     {frequency === "custom" && (
//                     <RangePicker 
//                     value={selectedDate} 
//                     onChange={(values) => setselectedate(values)}
//                     />
//                     )};
//                 </div>
//                 <div>
//                     <h6>Select Type</h6>
//                     <Select value = {type} onChange={(values) => setType(values)}>
//                         <Select.Option value = "all">ALL</Select.Option>
//                         <Select.Option value = "income">INCOME</Select.Option>
//                         <Select.Option value = "expense">EXPENSE</Select.Option>
//                     </Select>
//                     {frequency === "custom" && (
//                     <RangePicker 
//                     value={selectedDate} 
//                     onChange={(values) => setselectedate(values)}
//                     />
//                     )};
//                 </div>
//                 <div className="switch-icons">
//                       <UnorderedListOutlined 
//                       className={`mx-2 ${viewData === "table" ? 'active-icon' : 'inactive-icon'} `}
//                       onClick={() => setViewData("table")}
//                       />
//                       <AreaChartOutlined 
//                        className={`mx-2 ${viewData === "analytics" ? 'active-icon' : 'inactive-icon'} `}
//                       onClick={() => setViewData("analytics")}
//                       />
//                 </div>
//                 <div>
//                     <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//                         Add New
//                     </button>
//                 </div>
//             </div>
//             <div className="content">
//                 {viewData === "table" ?  (
//                 <Table columns={columns} dataSource={allTransection} />
//                 ) : (
//                 <Analytics allTransection={allTransection}/>
//                 )}
//             </div>
//             <Modal
//                 title={editable ? "Edit Transaction" : "Add Transaction"}
//                 open={showModal}
//                 onCancel={() => setShowModal(false)}
//                 footer={false}
//             >
//                 <Form layout="vertical" 
//                 onFinish={handleSubmit}
//                 initialValues={editable}
//                 >
//                     <Form.Item label="Amount" name="amount">
//                         <Input type="text" />
//                     </Form.Item>
//                     <Form.Item label="Type" name="type">
//                         <Select >
//                             <Select.Option value="income" >Income</Select.Option>
//                             <Select.Option value="expense">Expense</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item label="Category" name="category">
//                         <Select >
//                             <Select.Option value="salary" >Salary</Select.Option>
//                             <Select.Option value="tip">Tip</Select.Option>
//                             <Select.Option value="project">Project</Select.Option>
//                             <Select.Option value="food">Food</Select.Option>
//                             <Select.Option value="movie">Movie</Select.Option>
//                             <Select.Option value="bills">Bills</Select.Option>
//                             <Select.Option value="medical">Medical</Select.Option>
//                             <Select.Option value="fees">Fees</Select.Option>
//                             <Select.Option value="tax">Tax</Select.Option>
//                             <Select.Option value="shopping">Shopping</Select.Option>
//                             <Select.Option value="rent">Rent</Select.Option>
//                             <Select.Option value="loan">Loan</Select.Option>
//                             <Select.Option value="market">Market</Select.Option>
//                             <Select.Option value="investment">Investment</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item label="Date" name="date" >
//                         <Input type="date" />
//                     </Form.Item>
//                     <Form.Item label="Reference" name="refrence">
//                         <Input type="text" />
//                     </Form.Item>
//                     <Form.Item label="Description" name="description">
//                         <Input type="text" />
//                     </Form.Item>
//                     <div className="d-flex justify-content-end">
//                         <button type="submit" className="btn btn-primary">
//                             {""}
//                             SAVE
//                         </button>
//                     </div>
//                 </Form>
//             </Modal>
//         </Layout>
//     );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "./../components/Layouts/Layout.js";
import axios from 'axios';
import Spinner from './../components/Spinner.js';
import moment from "moment";
import Analytics from "../components/Analytics.js";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setselectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }} />
          <DeleteOutlined className="mx-2"
            onClick={() => {
              handleDelete(record);
            }} />
        </div>
      ),
    },

  ];

  // Get all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/transections/get-transection', {
          userid: user._id,
          frequency,
          selectedDate,
          type
        });
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
        message.error('Something issues in the Transaction');
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // Delete Handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transections/delete-transection", { transacationId: record._id });
      setLoading(false);
      message.success("Transaction Deleted")
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Unable to delete');
    }
  }

  // Calculate the total income and total expense
  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    allTransection.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });
    return { totalIncome, totalExpense };
  };

  // Form handling
  const handleSubmit = async (values) => {
    const { totalIncome, totalExpense } = calculateTotals();

    // Check if the transaction being added is an expense
    if (values.type === 'expense' && values.amount > totalIncome - totalExpense) {
      setError("Expense cannot exceed available income.");
      return;
    }

    setError(""); // Reset any previous errors

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: { ...values, userid: user._id },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success('Transaction Updated Successfully');
      } else {
        await axios.post('/transections/add-transection', { ...values, userid: user._id });
        setLoading(false);
        message.success('Transaction Added Successfully');
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error('Failed to add Transaction');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setselectedate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === "table" ? 'active-icon' : 'inactive-icon'} `}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === "analytics" ? 'active-icon' : 'inactive-icon'} `}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
          form={form}
        >
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter the amount' }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income" >Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select >
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="loan">Loan</Select.Option>
              <Select.Option value="market">Market</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          {/* Error message if expense exceeds income */}
          {error && (
            <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
          )}

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
