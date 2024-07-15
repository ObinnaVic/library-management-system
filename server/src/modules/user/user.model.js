const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Bcrypt = require("bcrypt");
const validator = require("validator");


//schema for all borrows made by each user regardless of role

const BorrowsSchema = new Schema({
  bookID: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    required: true,
    trim: true,
  },

  borrowDuration: {
    //duration of borrowed book
    type: Number,
    default: 3, // 3 days duration on default
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
});


//schema for book that is overdue
const overdueSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  fee: {
    type: Number,
    default: 100 //#100 fee for overdue
  }
})


//Schema for borrowing history
const historySchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true
  }
});

//Users schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },

  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
    private: true
  },

  role: {
    type: String,
    enum: ["Member", "Librarian", "Admin"],
    required: true,
    default: "Member"
  },

  borrows: {
    type: [BorrowsSchema], //array of all books borrowed by a user
  },

  overdueBooks: {
    type: [overdueSchema] //array of all books overdue with a user
  },

  history: {
    type: [historySchema]
  }
});

function excludePrivateFields(schema) {
  schema.eachPath((path, schemaType) => {
    if (schemaType.options && schemaType.options.private) {
      schemaType.select(false);
    }
  });

  schema.set("toJSON", {
    transform: function (doc, ret, options) {
      for (const path in schema.paths) {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          delete ret[path];
        }
      }
      return ret;
    },
  });

  schema.set("toObject", {
    transform: function (doc, ret, options) {
      for (const path in schema.paths) {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          delete ret[path];
        }
      }
      return ret;
    },
  });
}

userSchema.plugin(excludePrivateFields);

userSchema.methods.isEmailTaken = async function (email, excludeUserId) {  //check if email is unique before saving
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

//compare hashed password and raw password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return Bcrypt.compare(password, user.password);
};

//encrypt or hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || this.isNew) {
    const num = await Bcrypt.genSalt(10);
    user.password = await Bcrypt.hash(user.password, num);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;