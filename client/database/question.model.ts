// import { Schema, models, model, Types, Document } from "mongoose";

// export interface IQuestion {
//   title: string;
//   content: string;
//   tags: Types.ObjectId[];
//   views: number;
//   answers: number;
//   upvotes: number;
//   downvotes: number;
//   author: Types.ObjectId;
// }

// export interface IQuestionDoc extends IQuestion, Document {}
// const QuestionSchema = new Schema<IQuestion>(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//     views: { type: Number, default: 0 },
//     answers: { type: Number, default: 0 },
//     upvotes: { type: Number, default: 0 },
//     downvotes: { type: Number, default: 0 },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// const Question =
//   models?.Question || model<IQuestion>("Question", QuestionSchema);

// export default Question;
// 2
// import { Schema, models, model, Types, Document } from "mongoose";

// export interface IQuestion extends Document {
//   title: string;
//   content: string;
//   tags: Types.ObjectId[];
//   views: number;
//   answers: number;
//   upvotes: number;
//   downvotes: number;
//   author: Types.ObjectId;
// }

// const QuestionSchema = new Schema<IQuestion>(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//     views: { type: Number, default: 0 },
//     answers: { type: Number, default: 0 },
//     upvotes: { type: Number, default: 0 },
//     downvotes: { type: Number, default: 0 },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// // Ensure `_id` and `author` are converted to strings in JSON response
// QuestionSchema.set("toJSON", {
//   transform: (_doc, ret) => {
//     ret._id = ret._id.toString();
//     ret.author = ret.author.toString();
//     return ret;
//   },
// });

// const Question =
//   models?.Question || model<IQuestion>("Question", QuestionSchema);

// export default Question;
import { model, models, Schema, Types, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
}

export interface IQuestionDoc extends IQuestion, Document {}
const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
