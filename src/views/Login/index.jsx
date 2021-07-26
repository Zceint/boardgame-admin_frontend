import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import { reqLogin } from "../../api";
import message from "../../util/message";
import storageUtil from "../../util/storage";

export default function LogIn(props) {
  const initState = { email: "", password: "" };
  const initError = { emailErr: false, emailMessage: "", passwordErr: false, passwordMessage: "" };
  const [state, setState] = useState(initState);
  const [error, setError] = useState(initError);

  const validateEmail = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    emailRegex.test(state.email)
      ? setError({ ...error, emailErr: false, emailMessage: "" })
      : setError({ ...error, emailErr: true, emailMessage: "The email is not a valid email address." });
  };

  const validatePassword = () => {
    state.password.length < 6
      ? setError({ ...error, passwordErr: true, passwordMessage: "Please choose a stronger password" })
      : setError({ ...error, passwordErr: false, passwordMessage: "" });
  };

  const handleState = (e) => {
    //console.log(e.target.name);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(error.emailErr || error.passwordErr)) {
      const response = await reqLogin(state);
      console.log(response);
      const result = response.data;
      if (result.status === 0) {
        message.success("Login success");
        storageUtil.saveUser(result.data);

        props.history.replace("/");
      } else {
        message.error(result.msg);
      }
      //props.openSnackbar("login success", "success");
    } else {
      message.error("illegal email or password input");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={error.emailErr}
            helperText={error.emailMessage}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={validateEmail}
            onChange={handleState}
          />
          <TextField
            error={error.passwordErr}
            helperText={error.passwordMessage}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={validatePassword}
            onChange={handleState}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
