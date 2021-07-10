const express           = require('express');
const mongoose          = require('mongoose');
const dotenv            = require('dotenv');
const articleRouter     = require('./routes/articles');
const Article           = require('./models/article');
const methodOverride    = require('method-override');
const app               = express();

dotenv.config({path: 'config/config.env'})


const connectDB = async (req, res)=>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    });
    try {
        console.log(`mongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        return res.status(400).send(error);
    }
}
connectDB();

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs')

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('articles/index', { articles: articles});
});

//Routes Middleware
app.use('/articles', articleRouter);

//server created
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
