import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { postRequest, putRequest } from "../../../../apihandler";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const theme = createTheme();

const FormDemo = ({ formData }) => {
  const [loading, setLoading] = React.useState(false);
  const history = useNavigate();
  const schema = yup
    .object()
    .shape({
      categoryName: yup.string().required("Category is required"),
      description: yup.string().required("Description is required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("errors = > ", errors);
  const onSubmit = async (values) => {
    console.log("values => ", values);
    if (formData) {
      //update
      setLoading(true);
      const response = await putRequest(`/categories/${formData?.id}`, values);
      if (response.status === 200) {
        setLoading(false);
        swal("Success", "Category updated successfully!", "success").then(
          () => {
            history("/category/view");
          }
        );
      } else {
        swal("Failed to update, Try Again!", response?.err?.message, "error");
        setLoading(false);
      }
    } else {
      //add
      setLoading(true);
      const response = await postRequest("/categories", values);
      if (response.status === 200) {
        setLoading(false);
        swal("Success", "CAtegory added successfully!", "success").then(() => {
          history("/category/view");
        });
      } else {
        swal("Failed to add, Try Again!", response?.err?.message, "error");
        setLoading(false);
      }
      console.log("responsec -> ", response);
    }
  };
  React.useEffect(() => {
    if (formData) {
      const { categoryName, description } = formData;
      setValue("categoryName", categoryName);
      setValue("description", description);
    } else {
      setValue("categoryName", "");
      setValue("description", "");
    }
  }, [formData]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CategoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formData ? "Update category details" : "Add new category"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="categoryName"
                  {...register("categoryName")}
                  required
                  fullWidth
                  id="firstName"
                  label="Category Name"
                  error={!!errors?.categoryName}
                  helperText={errors?.categoryName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Description"
                  name="description"
                  {...register("description")}
                  error={!!errors?.description}
                  helperText={errors?.description?.message}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={20} /> : null}{" "}
              {formData ? "Update" : "Add"}
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default FormDemo;
