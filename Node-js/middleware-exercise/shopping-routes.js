const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./express-error");

router.get('/items', (req,res,next) => {
    res.json(items)
})

router.post("/items", (req, res, next) => {
    try {
        if (!req.body.name) throw new ExpressError("Name is required", 400);
        if (!req.body.price) throw new ExpressError("Price is required", 400);
        const newItem = { 'id': '2' , 'name': req.body.name, 'price': req.body.price }
        items.push(newItem)
        return res.status(201).json({ item: newItem })
    } catch (e) {
        return next(e)
    }
  })

router.get('/items/:id', (req,res,next) => {
    try{
        const item = items.find(item => item['id'] === req.params.id)
        if(!item){ 
            throw new ExpressError("No item with that ID", 404)
        }
        res.json({ item })
    } catch(e){
        return next(e)
    }
})

router.patch("/items/:id", (req, res, next) => {
    try{
        const foundItem = items.find(item => item['id'] === req.params.id)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        // only change name if new name passed through
        if(!req.body.name){
            foundItem.name = foundItem.name
        }else{
            foundItem.name = req.body.name
        }
        // only change price if new price passed through
        if(!req.body.price){
            foundItem.price = foundItem.price
        }else{
            foundItem.price = req.body.price            
        }
        res.json({ 'updated item': foundItem })
    }catch(e) {
        return next(e)
    }
})

router.delete("/items/:id", function (req, res, next) {
    try{
        const foundItem = items.find(item => item['id'] === req.params.id)
        if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
        }
        items.splice(foundItem, 1)
        res.json({ message: "Item Deleted" })
    }catch(e){
        return next(e)
    }
})

module.exports = router;