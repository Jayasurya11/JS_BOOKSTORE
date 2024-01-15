const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser"); app.use(bodyParser.json());
require("dotenv").config()
// middlewares

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = 
  process.env.MONGO_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const bookCollections = client.db("BookInventory").collection("books");
    const cartCollections = client.db("BookInventory").collection("cart");
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });
    app.post("/create-user-cart", async (req, res) => {
      const emailId = req.query.q;
      const data = {
        email: emailId,
        cart: [],
      };
      const existing=await cartCollections.findOne({email:emailId});
      if(!existing){
        var result = await cartCollections.insertOne(data);
      }
      else{
        var result="already exist"
      }
      res.send(result);
    });
    app.post("/add-to-cart/:id", async (req, res) => {
      const { id } = req.params;
      if (req.query?.email) {
        var query = { email: req.query.email };
      } else {
        var query = {};
      }
      const { cart } = await cartCollections.findOne(query);

      const data = await bookCollections.findOne({ _id: new ObjectId(id) });
      // cartCollections.findOneAndReplace(query,)
      if (cart.filter(e => e.bookTitle === data.bookTitle).length > 0) {
        /* vendors contains the element we're looking for */
        cart.map((item)=>{
          if(item.name==data.name){
            item.quantity+=1;
            return item;
          }
          else{
            return item;
          }
        })
      }
      else{
        var find=data;
        find.quantity=1;
        cart.push(find);
      }
      
      const new_data = { email: req.query.email, cart };
      const result = await cartCollections.findOneAndReplace(query, new_data);
      res.send(result);
    });
    app.get("/usercart", async (req, res) => {
      
      if(req.query?.q){
        var query={email:req.query.q}
        var user_cart=await cartCollections.findOne(query);
        res.send(user_cart);
      }
      else{
        var user_cart={};
        res.send(user_cart);

      }
      
     
    });
    app.get("/remove-from-cart",async(req,res)=>{
      const {emailid,item}=req.query;
      const {cart}= await cartCollections.findOne({email:emailid})
      var updated=[];
      cart.map((book)=>{
        if(book._id!=item){
          updated.push(book)
        }
      })
      updated_cart={email:emailid,cart:updated};
      const updatingcart= await cartCollections.findOneAndReplace({email:emailid},updated_cart);
      const newcart=await cartCollections.findOne({email:emailid});
      res.send(newcart)
    })
    app.get("/updatecart/increase",async(req,res)=>{
      const {q,v}= req.query;

      const data= await cartCollections.findOne({email:q});
      var data_cart=data.cart;
      data_cart.map((item)=>{
        if(item._id==v){
          item.quantity=item.quantity+1;
          return item;
        }
        else{
          return item;
        }
        
      })
      await cartCollections.findOneAndReplace({email:q},{email:q,cart:data_cart});
      const result= await cartCollections.findOne({email:q});
      res.send(result)
    })
    app.get("/updatecart/decrease",async(req,res)=>{
      const {q,v}= req.query;

      const data= await cartCollections.findOne({email:q});
      var data_cart=data.cart;
      data_cart.map((item)=>{
        if(item._id==v){
          if(item.quantity>1){
            item.quantity=item.quantity-1;
            
          }
          return item;
        }
        else{
          return item;
        }
        
      })
      await cartCollections.findOneAndReplace({email:q},{email:q,cart:data_cart});
      const result=await cartCollections.findOne({email:q})
      res.send(result)
    })
    app.post("/create-checkout-session",async(req,res)=>{
      try{
        // const customer = await stripe.customers.create({
        //   name: "Jayasurya E",
        //   id:"cus_PNTChvW1xdlyKO",
        //   address:{
        //     line1:"1/111, Mettu Street",
        //     line2:"Alampoondi",
        //     postal_code:"604151",
        //     city:"Villupuram",
        //     state:"Tamil Nadu",
        //     country:"IN"
        //   }
        // });
        
        const session= await stripe.checkout.sessions.create({
        
        payment_method_types:['card'],
        
        mode:'payment',
        
        line_items:req.body.map(item=>{
          return{
            price_data:{
              currency:"INR",
              product_data:{
                name:item.bookTitle
              },
              unit_amount:item.price*100,
              
            },
            quantity:item.quantity,
            
          }}),
          billing_address_collection: "required",
          shipping_address_collection:{
            allowed_countries:["IN"]
          },
        success_url:"https://jsbookstore.netlify.app/success",
        cancel_url:"https://jsbookstore.netlify.app/cancel"

        });
        res.json({url:session.url})
      }catch(e){
        res.status(500).json({error:e.message})
      }
      
    })
    app.get("/all-books", async (req, res) => {
      if (req.query?.q) {
        var query = { category: req.query.q };
      } else {
        var query = {};
      }
      const books = bookCollections.find(query);
      const result = await books.toArray();

      res.send(result);
    });
    app.get("/search-book",async(req,res)=>{
      const name=req.query.q;
      const query={bookTitle:name.charAt(0).toUpperCase()+name.slice(1)}
      
      const result= await bookCollections.findOne(query);
      res.send(result);
    })
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upset: true };
      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
