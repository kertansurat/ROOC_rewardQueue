export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // รับข้อมูล JSON Body จาก Request
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const { password } = body || {};
  const envPassword = process.env.ADMIN_PASSWORD;

  // ตรวจสอบว่าได้ตั้งค่า ENV ใน Vercel แล้วหรือยัง
  if (!envPassword) {
    return res.status(500).json({ success: false, message: 'ยังไม่ได้ตั้งค่า ADMIN_PASSWORD บน Vercel' });
  }

  // เปรียบเทียบรหัสผ่าน
  if (password === envPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' });
  }
}
