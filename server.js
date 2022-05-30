const express = require("express");
const morgan = require("morgan");

// routes
const ImageRoutes = require("./routes/ImageRoutes");

// middlewares
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// body parser
app.use(express.json());
app.use(morgan("dev"));

/* Sample Header:
{
  'content-type': 'multipart/form-data',
}
*/
app.get("/api/", (req, res) => {
  res.send("API is running");
});
// use routes
app.use("/api/image", ImageRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// start listening
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
