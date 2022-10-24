
const { initializeApp } = require('firebase-admin/app');

initializeApp();
// import firebase-admin package

// Custom Verification Link
app.post("/api/token", (req, res, next) => {
  const { body } = req;
  console.log(body);
  const idToken = body.idToken;
  console.log(idToken);
  console.log(admin)
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid);
      console.log('LETS GOOOOO');
      next();
    })
    .catch((error) => {
      res.json({
        error: false,
        message: "Eres GILIPOLLAS",
      });
    });
});