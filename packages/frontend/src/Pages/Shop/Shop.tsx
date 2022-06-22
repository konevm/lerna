import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import ProductsList from "../../components/ProductsList/ProductsList";
import "./Shop.scss";

interface ISortedProps {
  isNew?: boolean;
}

const Shop: React.FC<ISortedProps> = ({ isNew }) => {
  const products = useAppSelector((store) => store.data.products);
  const [sortMethod, setSortMethod] = useState<string>(() => (isNew ? "new" : "all"));
  const onlyNew = products.filter((product) => product.new);
  const onlySale = products.filter((product) => product.sale);
  const sortedProducts = (() => {
    switch (sortMethod) {
      case "new":
        return onlyNew;
      case "sale":
        return onlySale;
      default:
        return products;
    }
  })();

  return (
    <main className="app__products">
      <FormControl className="products__select">
        <InputLabel id="demo-simple-select-label">Sorted by:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortMethod}
          label="Sorted by:"
          onChange={(e) => {
            setSortMethod(e.target.value);
          }}>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="sale">Sale</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <ProductsList products={sortedProducts} />
    </main>
  );
};

export default Shop;
