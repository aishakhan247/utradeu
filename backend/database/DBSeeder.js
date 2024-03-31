const mongoose = require('mongoose')

const User = require('../schemas/User')
const {Comments,Post} = require('../schemas/Post')

async function seedDB ()
{
    //await seedDBUsers()
    await seedDBPosts()
}

async function seedDBUsers ()
{
    await User.deleteMany({}).then(function(){
        console.log("Should have deleted all Users :)");
    }).catch(function(error)
    {
        console.log(error)
    });
    const users = [
        new User(
            {
                firstName: "Jacob",
                lastName: "Day",
                uID: "u1111111",
                phoneNumber : "111-111-1111",
                email : "test@test.com",
                bio : "I am a stegosaurus",
                major : "CS",
                services: ["Photography", "Rubik's Cube Tutoring"]

            }
        ),
        new User(
            {
                firstName: "Nasser",
                lastName: "Mughrabi",
                uID: "u2222222",
                phoneNumber : "123-456-7890",
                email : "test2@test.com",
                bio : "Front end is love, Front end is life",
                major : "CS",
                services: ["Editing", "Filming", "Acting"]

            }
        ),
        new User(
            {
                firstName: "Aisha",
                lastName: "Khan",
                uID: "u7654321",
                phoneNumber : "222-222-2222",
                email : "t3st@test.com",
                bio : "If there's one thing about me, it's that I always got a matcha in hand and my legs crossed",
                major : "CS",
                services: ["Painting", "Coffee Getting"]

            }
        ),
        new User(
            {
                firstName: "Cameron",
                lastName: "Hanney",
                uID: "u3423145",
                phoneNumber : "555-678-9012",
                email : "test4@test.com",
                bio : "Everything either is or isn't a potato",
                major : "CS",
                services: ["Firing people", "Singing the avocado song"]

            }
        ),
        new User(
            {
                firstName: "Admin",
                lastName: "Admin",
                uID: "u0000000",
                phoneNumber : "N/A",
                email : "admin@utradeu.com",
                bio : "Feeling a little bit adminny today",
                major : "Administration",
                services: ["Deleting inappropriate posts", "Moderating", "Sleeping"]

            }
        ),
    ];
    await User.insertMany(users)
    .then(function()
    {
        console.log("Added a bunch of Users :))))");
    })
    // .error(function(error)
    // {
    //     console.log(error);
    // })
    ;
}

async function seedDBPosts()
{
    await Post.deleteMany({}).then(function(){
        console.log("Should have deleted all Posts :)");
    }).catch(function(error)
    {
        console.log(error)
    });

    const users = await User.find().exec();

    const posts = [
        new Post(
            {
                user : users[0],
                postTitle: "DSLR Camera",
                likes: 4,
                description: "Camera for the photography class",
                pictureURL: ["camera.png"],
                liked: false,
                comments: [],
                category:"electronics",
                quality: "good",
                price: 200
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle : "TI-84 Calculator",
                likes: 20,
                description: "Calculator",
                pictureURL: ["calculator.png"],
                liked: false,
                comments: [],
                category: "electronics",
                quality: "new",
                price: 50
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Lamp",
                likes: 20382,
                description: "Desk Lamp from Pixar",
                pictureURL: ["lamp.png"],
                liked: false,
                comments: [],
                category: "home",
                quality: "good",
                price: 0
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Air Fryer",
                likes: 2,
                description: "Brand new Air fryer, this thing has saved my life 30 times",
                pictureURL: ["air_fryer.png"],
                liked: false,
                comments: [],
                category: "appliances",
                quality: "good",
                price: 50
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Shoes",
                likes: 126,
                description: "Coolest shoes around the block",
                pictureURL: ["shoes.png"],
                liked: false,
                comments: [],
                category: "clothing",
                quality: "new",
                price: 0
            }
        ),
        new Post(
            {
                user : users[0],
                likes: 0,
                postTitle: "Laptop",
                description: "Old laptop, 128GB RAM, 128GB SSD, Windows 9",
                pictureURL: ["laptop.png"],
                liked: false,
                comments: [],
                quality: "fair",
                category: "electronics",
                price: 500
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Shirt",
                likes: 20,
                description: "An old shirt I don't want, free",
                pictureURL: ["shirt.png"],
                liked: false,
                comment: [],
                category: "clothing",
                quality: "fair",
                price: 0
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Microwave",
                likes: 20382,
                description: "Microwave, 120 Watts, works like new",
                pictureURL: ["microwave.png"],
                liked: false,
                comments: [],
                category: "appliances",
                quality: "good",
                Price: "100"
            }
        ),
        new Post(
            {
                user : users[0],
                postTitle: "Fish tank",
                likes: 2,
                description: "My old Fish moved out, so we have an extra tank up for sale",
                pictureURL: ["fish_tank.png"],
                liked: false,
                comments: [],
                category: "other",
                price: 100,
                quality: "fair"
            }
        ),
        new Post(
            {
                user : users[3],
                postTitle: "Airpods",
                likes: 126,
                description: "Airpods, I got an android phone and can't be seen using two competitors together",
                pictureURL: ["airpods.png"],
                liked: false,
                comments: [],
                quality: "fair",
                category: "electronics",
                price: 250
            }
        ),
        new Post(
            {
                user: users[3],
                postTitle: "Taylor Swift Tickets",
                description:"Monday at 4:30 at the District Megaplex",
                pictureURL: ["movietickets.jfif"],
                comments: [],
                category: "tickets",
                price: 20,
                quality: "new"
            }
        ),
        
        // new Post(
        //     {
        //         user: users[16],
        //         postTitle: "Chai and chill!",
        //         postType : "event",
        //         description: "Come learn how to spell porridge!",
        //         pictureURL: ["chaichill.jpg"],
        //         comments: [],
        //         category: "social",
        //         price: 0,
        //         location: "Union Ballroom"
        //     }
        // ),
        
        new Post(
            {
                user: users[8],
                postTitle: "Bathroom art",
                description: "*Lion not for sale*",
                pictureURL: ["bathroom art.webp"],
                comments: [],
                category: "home",
                price: 0,
                quality: "new"
            }
        ),
        
        new Post(
            {
                user: users[8],
                postTitle: "Couch for sale!",
                description: "*Lion not for sale*",
                pictureURL: ["couch.jpg"],
                comments: [],
                category: "furniture",
                price: 100,
                quality: "fair"
            }
        ),
        new Post(
            {
                user: users[13],
                postTitle: "Web Dev textbook",
                description: "This textbook saved my life. Please take care of it",
                pictureURL: ["funnytextbook.jpg"],
                comments: [],
                category: "books",
                price:0,
                quality: "good"
            }
        ),
        new Post(
            {
                user: users[15],
                postTitle: "Bowling Night!",
                postType : "event",
                description: "Come enjoy our U of U bowling night!",
                pictureURL: ["bowling_night.jpg"],
                comments: [],
                category: "social",
                price: 0,
                location: "Union bowling alley"
            }
        ),
        new Post(
            {
                user: users[14],
                postTitle: "Mini Fridge",
                description: "Can hold 15 matchas at the same time!",
                pictureURL: ["mini-fridge.jpg"],
                comments: [],
                category: "appliances",
                price: 50,
                quality: "good"
            }
        ),
        new Post(
            {
                user: users[8],
                postTitle: "Extremely Heavy Weights",
                description: "must come pick them up \n Bring some gym bros",
                pictureURL: ["weights.webp"],
                comments: [],
                category: "fitness",
                price: 0,
                quality: "new"
            }
        ),
        new Post(
            {
                user: users[15],
                postTitle: "An Old Shirt",
                description: "Haven't worn this in a long time, needs a new home!",
                pictureURL: ["T-Shirt.webp"],
                comments: [],
                category: "clothing",
                price: 0,
                quality:"fair"
            }
        ),
        
        new Post(
            {
                user: users[16],
                postTitle: "Pet sitting",
                postType : "service",
                description: "Willing to watch cats",
                pictureURL: ["Porridge.png"],
                comments: [],
                category: "pets",
                payRate: "20",
                location: "Union bowling alley"
            }
        ),
        new Post(
            {
                user: users[3],
                postTitle: "Math Textbook",
                postType : "item",
                description: "Textbook needed for most math classes here at the U",
                pictureURL: ["Textbook.png"],
                comments: [],
                category: "books",
                price: 20,
                quality: "fair"
            }
        ),
        new Post(
            {
                user: users[15],
                postTitle: "Career Fair!",
                postType : "event",
                description: "Meet with employers around the city for a potenial internship/job!",
                pictureURL: ["bowling_night.jpg"],
                comments: [],
                category: "social",
                price: 0,
                location: "Union ballroom"
            }
        ),
        new Post(
            {
                user: users[2],
                postTitle: "Tutoring for CS!",
                postType : "service",
                description: "Willing to help out with any undergrad CS courses",
                pictureURL: ["Porridge.png"],
                comments: [],
                category: "tutoring/lessons",
                payRate: "5",
                location: "CADE lab"
            }
        ),
        new Post(
            {
                user: users[3],
                postTitle: "Rubik's Cube",
                postType : "item",
                description: "Puzzle toy, I have a bunch and looking to get rid of a few",
                pictureURL: ["Textbook.png"],
                comments: [],
                category: "other",
                price: 0,
                quality: "good"
            }
        )

    ]

    await Post.insertMany(posts).then(console.log("Should have added a bunch of posts :))))"))
}

module.exports = seedDB;
