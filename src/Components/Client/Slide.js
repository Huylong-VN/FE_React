import { Carousel } from "antd";

function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Slide = () => (
  <Carousel afterChange={onChange}>
    <div>
      <h3 style={contentStyle}>
        <img
          className="ant-image-img"
          src="https://localhost:5001/user-content/d7b10843-41dd-4560-8319-8ffb8b3414b8.jpg"
          style={{ height: 500, width: "100%" }}
          alt="no"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
export default Slide;
