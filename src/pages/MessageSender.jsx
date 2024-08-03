import axios from "axios";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
const MessageSender = () => {
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState([]);
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1)
  const [processing, setProcessing] = useState(false);
  const [isSubmitted,setIsSubmitted]=useState(false)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileUpload(selectedFile);
  };
  const handleUploadFile = async () => {
    try {
      if (fileUpload.type !== "text/csv") {
        console.error("Invalid file type. Please select a CSV file.");
        toast.error("Invalid file type. Please select a CSV file.");
        return;
      }
      setIsSubmitted(true);
      const url = await uploadImage(fileUpload);
      toast.success("File uploaded successfully");
      const res = await axios.post('/api/v1/sms/process', { url });
      toast.success("Data sent successfully");
      setIsSubmitted(false);
      console.log(res,"res")
      setGroups(res.data?.data);
    } catch (error) {
      toast.error("File upload failed: " + error.message);
      setIsSubmitted(false);
    }
  };
 

  const handlelogOut = async () => {
    const token = localStorage.removeItem("acesss_token")
    if (!token) {
    navigate("/login");
    }
  };
  const FetchGroupsData = async (page,limit=5) => {
    try {
      setProcessing(true)
      const res = await axios.get(`/api/v1/sms/group?page=${page}&limit=${limit}`);
      setPage(page)
      setProcessing(false)
      setGroups(res.data?.data);
    } catch (error) {
      setProcessing(false)
      console.log(error)
    }
  }
  useEffect(() => {
    FetchGroupsData(page);
  }, []);
  console.log(groups)
  console.log(page)
  const memoizedComponent = useMemo(() => {
    return (
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:my-8 sm:max-w-lg xl:p-0">
            <div className="p-3 pt-2 space-y-4 md:space-y-6 sm:p-8 sm:pt-3 w-full mt-5">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Send Messages
                </h1>
                <button
                  onClick={handlelogOut}
                  className=" text-white bg-red-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Logout
                </button> 
              </div>
                <div className="flex items-center justify-center w-full flex-col gap-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">CSV File</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  {fileUpload.length !== 0 && <h1>File::{fileUpload?.name}</h1>}
                <button
                    disabled={isSubmitted}
                    onClick={handleUploadFile}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit 
                  </button>
                </div>
              {/* <div>
                <label
                  htmlFor="number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Add new number to list:
                </label>
                <input
                  type="text"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="13458222"
                  required
                />
              </div> */}
              {isSubmitted && <div className="flex justify-center items-center"> <Loader /></div>}
              {processing && <div className="flex justify-center items-center"> <Loader /></div>}
              {groups.length !== 0 && (
                <>
                  <div>
                    <label
                      htmlFor="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  <Groups groups={groups} message={message} setGroups={setGroups} FetchGroupsData={FetchGroupsData} page={page} setPage={setPage} setProcessing={ setProcessing} processing={ processing} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }, [fileUpload, message, processing,isSubmitted,page]);
  return memoizedComponent;
};

export default MessageSender;

function Loader() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function Groups({ groups,setGroups,message, page, setPage, processing, setProcessing }) {

  const loadMoreData = async () => {
    if (!processing) {
      try {
        setProcessing(true);
        const res = await axios.get(`/api/v1/sms/group?page=${page + 1}&limit=20`);
        setPage(page + 1);
        setProcessing(false);
        setGroups((prevGroups) => [...prevGroups, ...res.data?.data]);
      } catch (error) {
        setProcessing(false);
        console.log(error);
      }
    }
  };

  const handleSendMessage = async (data, message) => {
    try {
      const res = await axios.post(`file/sendbulkmessages`, { data, message });
      if (res.status === 200) {
        toast.success("Message successfully sent");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-7">
        {groups?.map((elem, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200 p-2 rounded-lg flex-col"
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold">Group {index + 1}</h3>
              <button
                onClick={() => handleSendMessage(elem, message)}
                className={`
                  text-white bg-primary-600 hover:bg-primary-700
                  focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                  py-2.5 text-center`}
              >
                Send
              </button>
            </div>
            {/* {elem.map((item, itemIndex) => (
              <div key={itemIndex} className=" bg-gray-200 p-2 rounded-lg flex justify-between items-center w-full">
                <h3 className="font-semibold">{item.Name} </h3>
              </div>
            ))} */}
          </div>
        ))}
      </div>

      {groups.length > 0 && (
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={loadMoreData}
            disabled={processing}
            className={`
              text-white bg-primary-600 hover:bg-primary-700
              focus:ring-4
              focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
              py-2.5 text-center`}
          >
            {processing ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
