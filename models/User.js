import mongoose from "mongoose";

//создаем схему, говорим что есть такие поля у user
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, //эта строчка гворит о том что type обязателен
    },
    email: {
      type: String,
      required: true, //обязательный для заполнения
      unique: true, //уникальный
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },

    //вот тут помимо создании жтих сущностей, мы прикрепляем поля которые будут отправлять вместе с другим
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
