const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function run() {
  const conn = await mysql.createConnection({host:'localhost', user:'root', password:'1234', database:'HostelBiteDB'});
  const hash = await bcrypt.hash('password123', 10);
  
  // 1. Rename existing users instead of deleting to prevent foreign key errors
  await conn.execute('UPDATE management SET email = CONCAT("archived_", email) WHERE email LIKE "%sheevan%" OR email LIKE "%nizam%"');
  await conn.execute('UPDATE staff SET email = CONCAT("archived_", email) WHERE email LIKE "%tajuk%" OR email LIKE "%tajul%" OR email LIKE "%nizam%"');
  await conn.execute('UPDATE student SET email = CONCAT("archived_", email) WHERE email LIKE "%sheevan%" OR email LIKE "%nizam%" OR email LIKE "%tajuk%" OR email LIKE "%tajul%"');
  
  // 2. Ensure admin@test.com exists
  const [adminCheck] = await conn.execute('SELECT * FROM management WHERE email = "admin@test.com"');
  if (adminCheck.length === 0) {
    // Check if we just archived the only one, maybe un-archive one of them to be the generic admin
    const [archivedAdmins] = await conn.execute('SELECT * FROM management WHERE email LIKE "archived_%" LIMIT 1');
    if (archivedAdmins.length > 0) {
      await conn.execute('UPDATE management SET email = "admin@test.com", name = "Admin User", password = ? WHERE management_id = ?', [hash, archivedAdmins[0].management_id]);
      console.log('Converted archived admin to admin@test.com');
    } else {
      await conn.execute('INSERT INTO management (name, email, password) VALUES (?, ?, ?)', ['Admin User', 'admin@test.com', hash]);
      console.log('Inserted admin@test.com');
    }
  } else {
    await conn.execute('UPDATE management SET password = ? WHERE email = "admin@test.com"', [hash]);
  }
  
  // 3. Ensure staff@test.com exists
  const [staffCheck] = await conn.execute('SELECT * FROM staff WHERE email = "staff@test.com"');
  if (staffCheck.length === 0) {
    const [archivedStaff] = await conn.execute('SELECT * FROM staff WHERE email LIKE "archived_%" LIMIT 1');
    if (archivedStaff.length > 0) {
      await conn.execute('UPDATE staff SET email = "staff@test.com", name = "Staff User", password = ? WHERE staff_id = ?', [hash, archivedStaff[0].staff_id]);
      console.log('Converted archived staff to staff@test.com');
    } else {
      await conn.execute('INSERT INTO staff (name, role, email, password, salary_amount) VALUES (?, ?, ?, ?, ?)', ['Staff User', 'cook', 'staff@test.com', hash, '25000.00']);
      console.log('Inserted staff@test.com');
    }
  } else {
    await conn.execute('UPDATE staff SET password = ? WHERE email = "staff@test.com"', [hash]);
  }
  
  // 4. Ensure student@test.com exists
  const [studentCheck] = await conn.execute('SELECT * FROM student WHERE email = "student@test.com"');
  if (studentCheck.length === 0) {
    await conn.execute('INSERT INTO student (name, email, password, room_number) VALUES (?, ?, ?, ?)', ['Student User', 'student@test.com', hash, '101']);
    console.log('Inserted student@test.com');
  } else {
    await conn.execute('UPDATE student SET password = ? WHERE email = "student@test.com"', [hash]);
  }
  
  // Log final DB state
  const [admins] = await conn.execute('SELECT email FROM management');
  const [staffs] = await conn.execute('SELECT email FROM staff');
  const [students] = await conn.execute('SELECT email FROM student');
  console.log('Admins:', admins);
  console.log('Staff:', staffs);
  console.log('Students:', students);
  
  await conn.end();
}

run().catch(console.error);
