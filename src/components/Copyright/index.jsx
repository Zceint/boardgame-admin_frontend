import { Typography, Link } from "@material-ui/core";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        BoardgameCo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
