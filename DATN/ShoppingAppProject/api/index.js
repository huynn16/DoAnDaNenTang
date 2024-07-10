const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 8000;
const cors = require("cors");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const jwt = require("jsonwebtoken");

// Kết nối mongodb
mongoose
  .connect("mongodb+srv://HuyDuong:huy1903@cluster0.jsmyvtz.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });
// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const User = require("./schema/user");
const Order = require("./schema/order");
const Product = require("./schema/product");
const Message = require("./schema/message");

// Tạo endpoint post để đăng ký tài khoản mới
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã được đăng ký chưa
    const existingUser = await User.findOne({ email }); // Nếu đã đăng ký thì gán vào biến existingUser
    if (existingUser) {
      console.log("Email đã được đăng ký!");
      // Trả về phản hồi HTTP, mã 400 (yêu cầu không hợp lệ từ người dùng)
      return res.status(400).json({ message: "Email đã được đăng ký!" });
    }

    // Tạo một đối tượng là người dùng mới
    const newUser = new User({ name, email, password });

    // Tạo mã xác minh và lưu vào verificationToken
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Lưu người dùng vào database
    await newUser.save();

    // Thông báo đăng ký thành công
    res
      .status(200)
      .json({ message: "Đăng ký thành công!", userId: newUser._id });
  } catch (error) {
    console.log("Lỗi đăng ký!", error);
    res.status(500).json({ message: "Lỗi đăng ký!" });
  }
});

// Tạo một khóa ngẫu nhiên
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

// Lưu khóa trên vào biến secretKey
const secretKey = generateSecretKey();

// Tạo endpoint POST để đăng nhập
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email trong database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Kiểm tra mật khẩu
    if (user.password !== password) {
      return res.status(401).json({ message: "Sai mật khẩu!" });
    }

    // Tạo token với jsonwebtoken
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Đăng nhập thất bại!" });
  }
});

// Tạo endpoint GET để lấy tất cả sản phẩm
app.get("/products", async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ database
    const products = await Product.find({});

    // Trả về phản hồi HTTP, mã 200 (thành công) và danh sách sản phẩm
    res.status(200).json(products);
  } catch (error) {
    console.log("Lỗi!", error);
    res.status(500).json({ message: "Lỗi!" });
  }
});

// Tạo endpoint GET để lấy sản phẩm theo category
app.get("/products/category/:category", async (req, res) => {
  try {
    // Lấy category từ URL
    const category = req.params.category;

    // Tìm các sản phẩm theo category
    const products = await Product.find({ category: category });

    // Kiểm tra xem có sản phẩm nào thuộc category này không
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm nào thuộc loại này!" });
    }

    // Trả về phản hồi HTTP, mã 200 (thành công) và danh sách sản phẩm
    res.status(200).json(products);
  } catch (error) {
    console.log("Lỗi khi lấy sản phẩm theo loại!", error);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo loại!" });
  }
});

// API tìm các sản phẩm theo từ khóa
app.get("/products/search", async (req, res) => {
  try {
    // Lấy từ khóa từ URL
    const keyword = req.query.keyword;

    // Tìm các sản phẩm phù hợp với từ khóa
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });

    // Kiểm tra xem có sản phẩm nào phù hợp không
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm nào phù hợp!" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Lỗi khi tìm kiếm sản phẩm!", error);
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm!" });
  }
});

// Tạo endpoint lưu địa chỉ mới
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Tìm người dùng theo id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Thêm địa chỉ mới vào mảng
    user.addresses.push(address);

    // Lưu lại
    await user.save();

    res.status(200).json({ message: "Thêm địa chỉ mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm địa chỉ mới!" });
  }
});

// Tạo endpoint lấy tất cả địa chỉ đã có của một người dùng cụ thể
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Lấy mảng địa chỉ từ đối tượng người dùng
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy địa chỉ!" });
  }
});

// Tạo endpoint cập nhật địa chỉ
app.put("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddress = req.body;

    // Tìm người dùng theo id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Tìm và cập nhật địa chỉ
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
    }

    user.addresses[addressIndex] = updatedAddress;

    // Lưu lại
    await user.save();

    res.status(200).json({ message: "Cập nhật địa chỉ thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật địa chỉ!" });
  }
});

// API xóa một địa chỉ cụ thể của một người dùng cụ thể
app.delete("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Xóa địa chỉ từ mảng địa chỉ của người dùng
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: "Đã xóa địa chỉ thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa địa chỉ!" });
  }
});

// API để tạo đơn hàng
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, total, DeliAddress, DeliMethod, paymentMethod } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "UserId không hợp lệ!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Tạo mảng products
    const products = cartItems.map((item) => ({
      name: item?.name,
      image: item?.image,
      price: item.price,
      quantity: item.quantity,
    }));

    // Tạo đơn hàng mới
    const order = new Order({
      user: userId,
      products: products,
      total: total,
      DeliAddress: DeliAddress,
      DeliMethod: DeliMethod,
      paymentMethod: paymentMethod,
    });

    await order.save();

    // Thêm order._id vào mảng orders của user và lưu lại user
    user.orders.push(order._id);
    await user.save();

    res.status(200).json({ message: "Tạo đơn hàng thành công!" });
  } catch (error) {
    console.log("Tạo đơn hàng thất bại!", error);
    res.status(500).json({ message: "Tạo đơn hàng thất bại!" });
  }
});

// Tạo endpoint POST để tạo sản phẩm mới
app.post("/products", async (req, res) => {
  try {
    // Tạo một sản phẩm mới từ dữ liệu gửi lên
    const product = new Product({
      userId: req.body.userId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      count: req.body.count,
      rate: req.body.rate,
      carouselimage: {
        image1: req.body.carouselimage.image1,
        image2: req.body.carouselimage.image2,
        image3: req.body.carouselimage.image3,
      },
    });

    // Lưu sản phẩm vào database
    const savedProduct = await product.save();

    // Tìm người dùng theo id
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // Thêm sản phẩm mới vào mảng
    user.products.push(savedProduct._id);

    // Lưu lại
    await user.save();

    // Trả về phản hồi HTTP, mã 201 (đã tạo) và sản phẩm đã lưu
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("Lỗi khi tạo sản phẩm mới!", error);
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm mới!" });
  }
});

// Tạo endpoint GET để lấy các sản phẩm của một người dùng cụ thể
app.get("/products/:userId", async (req, res) => {
  try {
    // Lấy userId từ tham số của URL
    const { userId } = req.params;

    // Tìm tất cả sản phẩm mà người dùng này đã đăng
    const products = await Product.find({ userId: userId });

    // Trả về phản hồi HTTP, mã 200 (OK) và danh sách sản phẩm
    res.status(200).json(products);
  } catch (error) {
    console.log("Lỗi khi lấy sản phẩm của người dùng!", error);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm của người dùng!" });
  }
});

// Tạo endpoint DELETE để xóa một sản phẩm cụ thể
app.delete("/products/:productId", async (req, res) => {
  try {
    // Lấy productId từ tham số của URL
    const { productId } = req.params;

    // Xóa sản phẩm
    await Product.findByIdAndDelete(productId);

    // Trả về phản hồi HTTP, mã 200 (OK) và thông báo thành công
    res.status(200).json({ message: "Sản phẩm đã được xóa thành công!" });
  } catch (error) {
    console.log("Lỗi khi xóa sản phẩm!", error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm!" });
  }
});

// Tạo endpoint PUT để cập nhật một sản phẩm cụ thể
app.put("/products/:productId", async (req, res) => {
  try {
    // Lấy productId từ tham số của URL
    const { productId } = req.params;

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    // Trả về phản hồi HTTP, mã 200 (OK) và sản phẩm đã được cập nhật
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Lỗi khi cập nhật sản phẩm!", error);
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm!" });
  }
});

// Tạo endpoint để lấy tất cả đơn hàng của một người dùng cụ thể
app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Lỗi!" });
  }
});

// API cập nhật lại số lượng bán ra của một sản phẩm sau khi tạo đơn hàng
app.put("/products/:id/purchase", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const quantity = req.body.quantity;
    product.count += quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo endpoint để lấy thông tin về người dùng
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi!" });
  }
});

// API lấy danh sách người dùng
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi" });
  }
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API gửi tin nhắn và lưu vào backend
app.post("/messages", upload.single("imageFile"), async (req, res) => {
  try {
    const { senderId, recipientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" ? req.file.path : null,
    });

    await newMessage.save();
    res.status(200).json({ message: "Gửi tin nhắn thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi" });
  }
});

// API lấy thông tin người dùng
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const recipientId = await User.findById(userId);
    res.json(recipientId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi" });
  }
});

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, recipientId, message } = data;
      const newMessage = new Message({ senderId, recipientId, message });
      await newMessage.save();
      io.to(recipientId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error handling the messages", error);
    }

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
});

http.listen(3000, () => {
  console.log("Socket.IO server running on port 3000");
});

// API lấy tin nhắn giữa 2 người dùng
app.get("/messages/:senderId/:recipientId", async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recipientId: recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).populate("senderId", "_id name");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi" });
  }
});
