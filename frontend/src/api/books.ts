import clientPromise from "@utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const collection = db.collection("books");

    switch (req.method) {
      case "GET":
        const { page = 1, limit = 10, search = "", genre = "" } = req.query;

        const query: any = {};
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ];
        }
        if (genre) {
          query.genre = genre;
        }

        const books = await collection
          .find(query)
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .toArray();

        const total = await collection.countDocuments(query);

        res.status(200).json({
          books,
          totalPages: Math.ceil(total / Number(limit)),
          currentPage: Number(page),
        });
        break;

      case "GET_DETAIL":
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: "Book ID is required" });
        }

        const book = await collection.findOne({
          _id: new ObjectId(id as string),
        });

        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(book);
        break;

      case "POST":
        const newBook = req.body;

        if (!newBook.title || !newBook.author) {
          return res.status(400).json({
            error: "Title and author are required",
          });
        }

        const insertResult = await collection.insertOne({
          ...newBook,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        res.status(201).json({
          message: "Book added successfully",
          bookId: insertResult.insertedId,
        });
        break;

      case "PUT":
        const { id: updateId } = req.query;
        const bookUpdates = req.body;

        if (!updateId) {
          return res.status(400).json({ error: "Book ID is required" });
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(updateId as string) },
          {
            $set: {
              ...bookUpdates,
              updatedAt: new Date(),
            },
          }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json({
          message: "Book updated successfully",
          modifiedCount: updateResult.modifiedCount,
        });
        break;

      case "DELETE":
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ error: "Book ID is required" });
        }

        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(deleteId as string),
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json({
          message: "Book deleted successfully",
          deletedCount: deleteResult.deletedCount,
        });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to connect to database",
      details: error.message,
    });
  }
}
