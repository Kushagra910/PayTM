const mongoose = require("mongoose");
const Account = require("../models/account");

exports.getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId
    });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      });
    }
    res.status(200).json({
      success: true,
      balance: account.balance
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while getting balance info"
    });
  }
};

exports.transaction = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, toUser_id } = req.body;
    const account = await Account.findOne({
      userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid account/Insufficient balance"
      });
    }

    const toUser = await Account.findOne({ userId: toUser_id }).session(session);
    if (!toUser) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Recipient account not found"
      });
    }

    // Transaction
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: toUser_id }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Transfer Successful"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Transaction Failed, please try again"
    });
  }
};

