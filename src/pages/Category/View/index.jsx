import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../../../apihandler";
import MainLayout from "../../../layouts/MainLayout";
import swal from "sweetalert";
import DataTable from "../../../components/SideBar";
const View = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const response = await getRequest("/categories");
    if (response?.status !== 200) {
      swal("Failed to fetch!", response?.err?.message, "error");
    } else {
      setData(response?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <MainLayout>
      {loading ? <CircularProgress /> : <DataTable rows={data ? data : []} />}
    </MainLayout>
  );
};

export default View;
