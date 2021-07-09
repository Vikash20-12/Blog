const express           = require('express');

const articleRouter     = require('./routes/articles');
const app               = express();




app.use('/articles', articleRouter);


app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index', { text: 'This is  bLOG!'});
});

//server created
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
