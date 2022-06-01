const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

const env = exphbs.create();
env.handlebars.registerHelper('stripTags', function(string) {
    return string.replace(/<\/?[a-z]+>/g, "");
});

app.listen(3000, () => {
    console.log("The server is up!");
    console.log("Your routes are running on http://localhost:3000");
});