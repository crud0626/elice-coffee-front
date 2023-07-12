const express = require('express');
const app = express();
const path = require('path');

/* routers */
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const payRouter = require('./routes/payRouter');
const cartRouter = require('./routes/cartRouter');
const mypageRouter = require('./routes/mypageRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');

const PORT = process.env.PORT || 8080;

// 정적 파일들을 서빙하기 위한 절대 경로 설정
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

/* 라우팅 처리 로직 */
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/pay', payRouter);
app.use('/cart', cartRouter);
app.use('/mypage', mypageRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// 404
app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`The server is listening on port ${PORT}`);
});
