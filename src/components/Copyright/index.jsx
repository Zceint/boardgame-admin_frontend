import { Typography, Link } from "@material-ui/core";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.econdary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
