function ProductReview(props) {
  const imageSrc = Array.isArray(props.img) ? props.img[0] : "";
  return (
    <>
      <h3 style={{ display: "block", textAlign: "center" }}>Preview</h3>
      <div className="previewimgdesc">
        <img src={imageSrc} alt="" />
      </div>
      <div className="previewdetail">
        <p>
          <b>Name</b> : {props.name}
        </p>
        <p>
          <b>Category</b> : {props.categoryname}
        </p>
      </div>
      <div className="previewdetail">
        <p>
          <b>Price</b> : {props.price} Rs
        </p>
        <p>
          <b>Mrp</b> : {props.Mrp} Rs
        </p>
        <p className="text-danger">
          <b>Discount</b> : {Math.floor((1 - props.price / props.Mrp) * 100)}%
        </p>
      </div>
      <div className="previewdetail">
        <p>
          <b>Weight</b> : {props.weight}Kg
        </p>
        <p>
          <b>Brand</b> : {props.brand}
        </p>
        <p>
          <b>Instock</b> : {props.Instock}
        </p>
      </div>

      <br />
      <p className="pdesc">
        <b>Description</b> : {props.description}
      </p>
      <p className="pdesc">
        <b>Key fetaures</b> : {props.keyfeatures}
      </p>
      <p className="pdesc">
        <b>Producttype</b>: {props.producttype}
      </p>
    </>
  );
}
export default ProductReview;
