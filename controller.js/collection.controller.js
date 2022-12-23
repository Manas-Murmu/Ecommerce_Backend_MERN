import Collection from "../models/collection.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";

export const createCollection = asyncHandler(async (req, res) => {
  //take name from frontend

  const { name } = req.body;

  if (!name) {
    throw new CustomError("Collection name is required", 400);
  }

  //add this to database

  const collection = await Collection.create({
    name,
  });

  //send this response value to frontend

  res.status(200).json({
    success: true,
    message: "Collection Created with Success",
    collection,
  });
});

export const updateCollection = asyncHandler(async (req, res) => {
  //Existing value to be updated.

  const { id: collectionId } = req.params;

  //new value to get updated.
  const { name } = req.body;

  if (!name) {
    throw new CustomError("Collection name is required", 400);
  }

  let updatedCollection = await Collection.findByIdAndUpdate(
    collectionId,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCollection) {
    throw new CustomError("Collection not found", 400);
  }

  //send Response to Frontend
  res.status(200).json({
    success: true,
    message: "Collection updated Successfully",
    updatedCollection,
  });
});

export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;

  const collectionToDelete = await Collection.findByIdAndDelete(collectionId);

  if (!collectionToDelete) {
    throw new CustomError("Collection not found", 400);
  }

  collectionToDelete.remove();

  //send Response to Frontend
  res.status(200).json({
    success: true,
    message: "Collection deleted Successfully",
  });
});

export const getAllCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find();

  if (!collections) {
    throw new CustomError("No Collection Found", 400);
  }

  res.status(200).json({
    success: true,
    collections,
  });
});
