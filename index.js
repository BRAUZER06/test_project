import express from "express";
import { connect } from "http2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator"; //для проверки при получении запроса

import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";

mongoose.set("strictQuery", false); //Когда для strict параметра установлено значение true , Mongoose гарантирует, что в базе данных будут сохранены только те поля, которые указаны в вашей схеме, а все остальные поля не будут сохранены (если будут отправлены какие-то другие поля).
mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.ypr2jd1.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Подключение к BD"))
  .catch((err) => console.log("Ошибка при подключении  BD", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const { email, password: passwordReq, fullName, avatarUrl } = req.body;
    const password = passwordReq;
    const salt = await bcrypt.genSalt(10); // тут мы создаем соль
    const passwordHash = await bcrypt.hash(password, salt); // тут мы хешируем
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const doc = new UserModel({
      email,
      passwordHash,
      fullName,
      avatarUrl,
    });
    const token = jwt.sign(
      {
        _id: user.id,
      },
      "secret123", //тут мы его шифруем
      { expiresIn: "30d" } //тут мы говорим что токен будет держаться 30 дней
    );
    const user = await doc.save();

    res.json({ ...user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `не удалось зарегистрироваться` });
  }
});
 
// app.get("/auth/register", registerValidation, (req, res) => {
//   res.json({ success: true });
// });

app.listen(4444, (err) => {
  if (err) {
    throw console.error(err);
  }
  console.log(`Server запущен`);
});
