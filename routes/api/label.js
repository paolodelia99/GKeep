const express = require('express');
const router = express.Router();

const Label = require('../../models/Label');

// @route GET api/labels
// @desc get All the labels
// @access Public
router.get('/',async (req,res)=>{
    try{
        const labels = await Label.find()
                            .sort({date:-1});

        res.json(labels)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/labels
// @desc create a label
// @access Public
router.post('/',async (req,res)=>{
    try{
        const newLabel = new Label({
            labelName: req.body.labelName
        });

        await newLabel.save();

        res.json(label)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/labels
// @desc delete a label
// @access Public
router.delete('/:id',async (req,res)=>{
    try{
        const label = await Label.findById(req.params.id);

        await label.remove();
        res.json({success:true})
    }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
    }
});

// @route PUT api/labels
// @desc edit a label
// @access Public
router.put('/:id', async (req,res)=>{
    const {
        labelName
    } = req.body;

    const labelFields = {};
    if(labelName) labelFields.labelName = labelName;

    try{
        let editedLabel = await Label.findByIdAndUpdate(req.params.id,{$set: labelFields},{ new: true, upsert: true,useFindAndModify:false });

        res.json(editedLabel);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;