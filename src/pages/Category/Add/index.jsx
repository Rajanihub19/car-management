import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRequest } from "../../../apihandler";
import { CircularProgress } from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import FormDemo from "../../../components/category/add/FormDemo";

const Add = () => {
  let [searchParams] = useSearchParams();
  const [formData, setFormdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = searchParams.get("id");
  const getDataById = async () => {
    setLoading(true);
    const response = await getRequest(`/categories/${id}`);
    if (response.status === 200) {
      console.log("data  -> ", response.data);
      const { createdAt, categoryName, description, id } = response.data;
      setFormdata(response.data);
      setLoading(false);
    } else {
      setFormdata(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getDataById();
    } else {
      setFormdata(null);
    }
  }, [id]);
  return (
    <MainLayout>
      {loading ? <CircularProgress /> : <FormDemo formData={formData} />}
    </MainLayout>
  );
};

export default Add;
