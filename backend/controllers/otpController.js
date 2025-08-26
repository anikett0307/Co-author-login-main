const axios = require('axios');
require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const twilio = require('twilio');

// Initialize Twilio client only when proper credentials are provided
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
let client = null;
if (twilioAccountSid && twilioAccountSid.startsWith('AC') && twilioAuthToken) {
  client = twilio(twilioAccountSid, twilioAuthToken);
} else {
  console.warn('[otpController] Twilio credentials missing/invalid. Running in dev-safe mode (SMS disabled).');
}

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.json({ success: false, message: "Phone is required" });
  }

  try {
    // Check if number exists in database
    const user = await User.findOne({ number: phone });

    if (!user) {
      return res.json({ success: false, message: "Mobile number is not registered." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp_attempts = hashedOtp;
    user.otp_attempt_count = 0;
    user.otp_cooldown_until = null;
    await user.save();

    console.log(`(Dev Mode) OTP for ${phone}: ${otp}`);

    if (client) {
      await client.messages.create({
        body: `Your OTP is ${otp}. Do not share this with anyone.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${phone}`,
      });
      return res.json({ success: true, message: 'OTP sent successfully' });
    } else {
      // Dev-safe mode: skip SMS but still respond success for local testing
      return res.json({ success: true, message: 'OTP generated (dev mode, SMS skipped)' });
    }
  }
  catch (error) {
    console.error('Error sending OTP:', error);

    if (error.response) {
      console.error('Status Code:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }

};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.json({ success: false, message: "Phone and OTP are required" });
  }

  try {
    const user = await User.findOne({ number: phone });

    if (!user) {
      return res.json({ success: false, message: "Phone number not found" });
    }

    const storedOtp = user.otp_attempts;
    const currentTime = Date.now();

    // Cooldown check
    if (user.otp_cooldown_until && currentTime < user.otp_cooldown_until) {
      return res.json({
        success: false,
        cooldown: true,
        retryAfter: Math.ceil((user.otp_cooldown_until - currentTime) / 1000),
        message: "Too many attempts. Try again later.",
      });
    }

    if (!storedOtp) {
      return res.json({ success: false, message: "No OTP found. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp.trim(), storedOtp.trim());

    if (isMatch) {
      user.otp_attempts = null;
      user.otp_attempt_count = 0;
      user.otp_cooldown_until = null;
      await user.save();
      return res.json({ success: true, message: "OTP verified successfully" });
    }

    //  OTP didn't match → increase count
    const newAttemptCount = user.otp_attempt_count + 1;

    if (newAttemptCount >= 3) {
      const cooldownUntil = currentTime + 10 * 1000; // 10 seconds
      user.otp_attempt_count = 0;
      user.otp_cooldown_until = cooldownUntil;
      await user.save();
      return res.json({
        success: false,
        cooldown: true,
        retryAfter: 10,
        message: "Too many attempts. Try again after 10 seconds.",
      });
    } else {
      user.otp_attempt_count = newAttemptCount;
      await user.save();
    }

    return res.json({ success: false, message: "Invalid OTP" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

