import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Divider,
  Pagination,
} from "@material-ui/core";
import { reqProduct, searchProduct } from "../../api";

export default function Product() {
  const [productState, setProductState] = useState([]);
  const [curDisplay, setCurDisplay] = useState([]);
  const [searchString, setSearchString] = useState("");
  const displayNum = 4;
  let startIndex = 0;
  let endIndex = displayNum;
  const maxPageNum = Math.ceil(productState.length / displayNum);

  const handlePage = (e, pageNum) => {
    endIndex = pageNum * displayNum;
    startIndex = endIndex - displayNum;
    setCurDisplay(productState.slice(startIndex, endIndex));
    console.log(startIndex, endIndex);
  };
  const handleSearch = () => {
    searchProduct({ name: searchString }).then((res) => setCurDisplay([...res.data.games]));
  };

  useEffect(() => {
    reqProduct.then((res) => setProductState([...res.data.games]));
  }, []);

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "secondary.main",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        id="standard-basic"
        label="serach name"
        color="primary"
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ marginTop: "10px", marginLeft: "10px" }}>
        search
      </Button>
      {/* <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%", overflow: "auto" }}>
        {a.map((product) => (
          <Card key={product.id} sx={{ backgroundColor: "black", width: "25%", border: "1px solid grey" }}></Card>
        ))}
      </Box> */}
      <ImageList sx={{ width: "100%", height: "350px" }} cols={displayNum} gap={15}>
        {(curDisplay.length ? curDisplay : productState.slice(0, 4)).map((product) => (
          <ImageListItem
            key={product.id}
            sx={{
              border: "1px solid grey",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              padding: "15px",
              backgroundColor: "white",
            }}
          >
            <div style={{ width: "200px", height: "210px" }}>
              <img
                // srcSet={`${product.thumb_url}?w=248&fit=crop&auto=format 1x,
                //   ${product.thumb_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={product.thumb_url}
                alt={product.name}
                loading="lazy"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>

            <Divider />
            <ImageListItemBar title={product.name} subtitle={<span>AUD:$ {product.price_au}</span>} position="below" />
          </ImageListItem>
        ))}
      </ImageList>

      <Pagination
        color="primary"
        count={maxPageNum}
        shape="rounded"
        onChange={handlePage}
        sx={{ display: "flex", justifyContent: "center", marginTop: "35px" }}
      />
    </Box>
  );
}
