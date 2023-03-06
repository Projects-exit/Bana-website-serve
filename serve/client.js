const path = require("path");
const express = require("express");
const fs = require("fs"); 
const app = express(); // create express app

const { getDataById } = require("./fetchData")
// import {getDataById} from './fetchData'

// add middlewares
app.use(express.static(path.join(__dirname, "..",  "build")));
app.use(express.static("public"));

const indexPath = path.join(__dirname, "..", "build", "index.html")

const _meta_description = `<meta name="description" content="We provide a platform for investors to meet and cooperate with their peers, and connect them with promising startups and entrepreneurs." data-react-helmet="true"/>`
const _meta_title = `<title> BANA – Business Angel Network of Armenia </title>`

const _og_description = `<meta name="og:description" content="We provide a platform for investors to meet and cooperate with their peers, and connect them with promising startups and entrepreneurs."/>`
const _og_title = `<meta property="og:title" content="BANA – Business Angel Network of Armenia"/>`

app.get("/:type/viewer/:id",(req, res, next) => {

  console.log("Yeah")
  // res.sendFile(indexPath);
  fs.readFile(indexPath, 'utf8', async (err, htmlData) =>{

    if(err){
      console.log("error")
      return res.sendFile(indexPath);
    }
    const _id = req.params.id
    const _type = req.params.type

    const data = await getDataById(_id, _type) || {}
    if(data?.data){
      const _attributes = data?.data?.attributes || {}
      htmlData = htmlData
      .replace(_meta_title, `<title> BANA – ${_type} - ${_attributes?.heading} </title>`)
      .replace(_meta_description, `<meta name="description" content="${_attributes?.description}" data-react-helmet="true" />`)
      .replace(_og_description, `<meta name="og:description" content="${_attributes.description}" />` )
      .replace(_og_title , `<meta property="og:title" content="${_attributes.heading}" />`)
      
      // console.log(htmlData)
      return res.send(htmlData);

    } else {
      return res.sendFile(indexPath);
    }

  })
});


app.get("/*",(req, res, next) => {
  
  res.sendFile(indexPath);

});



// start express server on port 5000
app.listen(5002, () => {
  console.log("Client serving started on port 5002");
});