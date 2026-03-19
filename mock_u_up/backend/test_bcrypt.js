const bcrypt = require('bcryptjs');

(async () => {
  try {
    const hashed = await bcrypt.hash(undefined, 10);
    console.log("Success:", hashed);
  } catch (err) {
    console.log("Error:", err.message);
  }
})();
