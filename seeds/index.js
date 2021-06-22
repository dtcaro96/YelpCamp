const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connnected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60c38342749bb80970db3e1e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwfwsstet/image/upload/v1623776118/YelpCamp/mmlvhrriyx2kgdorfu8u.jpg',
                    filename: 'YelpCamp/mmlvhrriyx2kgdorfu8u'
                },
                {
                    url: 'https://res.cloudinary.com/dwfwsstet/image/upload/v1623776119/YelpCamp/evqcr30snlxaujys6jt8.jpg',
                    filename: 'YelpCamp/evqcr30snlxaujys6jt8'
                },
                {
                    url: 'https://res.cloudinary.com/dwfwsstet/image/upload/v1623776118/YelpCamp/sxp358ckzriy9g5mwaxg.jpg',
                    filename: 'YelpCamp/sxp358ckzriy9g5mwaxg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem, optio enim ex iusto ea reprehenderit magnam eaque nihil temporibus dolorem vel nisi animi placeat recusandae eligendi vitae soluta quis.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})