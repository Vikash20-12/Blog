const express           = require('express');

const articleRouter     = require('./routes/articles');
const app               = express();




app.use('/articles', articleRouter);


app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    const date = Date.now();
    const subtitle = new Date(date).toLocaleDateString();
    const articles = [{
        title: 'test-article 1',
        createdAt: subtitle,
        description: 'test-description 1'
    },{
        title: 'test-article 2',
        createdAt: subtitle,
        description: 'test-description 1'
    }]
    res.render('articles/index', { articles: articles});
});

//server created
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
